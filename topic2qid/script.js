const config = window.DATA_CONFIG || {};
const CSV_PATH = config.csvPath || 'topic2qid.csv';

const headingEl = document.querySelector('.main-header h1');
const infoTextEl = document.querySelector('.info-text');
const logoEl = document.querySelector('.logo');

if (config.pageTitle) document.title = config.pageTitle;
if (config.heading && headingEl) headingEl.textContent = config.heading;
if (config.infoText && infoTextEl) infoTextEl.textContent = config.infoText;
if (config.logo && logoEl) logoEl.src = config.logo;

// Data state
let parsedData = {};
let hierarchyDepth = 2; // 2 = Section -> Video, 3 = Organ -> Section -> Video
const selectedLeaves = new Set();

// UI references
const filtersContainer = document.getElementById('filters-container');
const uworldOutput = document.getElementById('uworld-ids');
const comlexOutput = document.getElementById('comlex-ids');
const uworldText = document.getElementById('uworld-ids-text');
const comlexText = document.getElementById('comlex-ids-text');
const uworldCount = document.getElementById('uworld-count');
const comlexCount = document.getElementById('comlex-count');
const searchInput = document.getElementById('search-input');
const uworldWarning = document.getElementById('uworld-warning');

const MAX_ORDER = Number.MAX_SAFE_INTEGER;

function makeKey(parts) {
    return JSON.stringify(parts);
}

function parseKey(key) {
    try {
        return JSON.parse(key);
    } catch (err) {
        return [];
    }
}

function normalizeText(value) {
    return (value || '').replace(/\u00a0/g, ' ').replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function splitIds(raw) {
    if (!raw) return [];
    return raw.split(',').map(id => normalizeText(id)).filter(Boolean);
}

// CSV parsing that preserves quoted fields
function parseCSV(csv) {
    const rows = [];
    let currentRow = [];
    let currentField = '';
    let inQuotes = false;

    for (let i = 0; i < csv.length; i++) {
        const char = csv[i];
        const nextChar = csv[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                currentField += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            currentRow.push(currentField);
            currentField = '';
        } else if ((char === '\r' || char === '\n') && !inQuotes) {
            if (char === '\r' && nextChar === '\n') i++;
            currentRow.push(currentField);
            if (currentRow.length > 0) rows.push(currentRow);
            currentRow = [];
            currentField = '';
        } else {
            currentField += char;
        }
    }
    if (currentField || currentRow.length > 0) {
        currentRow.push(currentField);
        rows.push(currentRow);
    }

    if (rows.length === 0) return {};

    const headers = rows[0].map(normalizeText);
    const findIndex = (labels) => {
        const lowerHeaders = headers.map(h => h.toLowerCase());
        for (const label of labels) {
            const idx = lowerHeaders.indexOf(label.toLowerCase());
            if (idx !== -1) return idx;
        }
        return null;
    };

    const organIdx = findIndex(['organ system']);
    const sectionIdx = findIndex(['section']);
    const videoIdx = findIndex(['video', 'topic']);
    const uworldIdx = findIndex(['uworld qids', 'uworld ids', 'uworld']);
    const comlexIdx = findIndex(['comlex qids', 'comlex ids', 'comlex']);
    const orderIdx = findIndex(['order']);

    hierarchyDepth = organIdx !== null && sectionIdx !== null && videoIdx !== null ? 3 : 2;

    const data = {};
    let lastOrgan = 'Uncategorized';
    let lastSection = 'Uncategorized';

    for (let i = 1; i < rows.length; i++) {
        const cols = rows[i];
        if (hierarchyDepth === 3) {
            const organ = normalizeText(cols[organIdx]) || lastOrgan;
            const section = normalizeText(cols[sectionIdx]) || lastSection;
            const video = normalizeText(cols[videoIdx]);
            if (!organ || !section || !video) continue;
            lastOrgan = organ;
            lastSection = section;

            const orderValue = orderIdx !== null ? parseInt(normalizeText(cols[orderIdx]), 10) : MAX_ORDER;
            const order = Number.isFinite(orderValue) ? orderValue : MAX_ORDER;
            const uworldIds = splitIds(cols[uworldIdx]);
            const comlexIds = splitIds(cols[comlexIdx]);

            if (!data[organ]) data[organ] = {};
            if (!data[organ][section]) data[organ][section] = {};
            data[organ][section][video] = { uworld: uworldIds, comlex: comlexIds, order };
        } else {
            const topic = normalizeText(cols[sectionIdx]);
            const subtopic = normalizeText(cols[videoIdx]);
            if (!topic || !subtopic) continue;

            const uworldIds = splitIds(cols[uworldIdx]);
            const comlexIds = splitIds(cols[comlexIdx]);

            if (!data[topic]) data[topic] = {};
            data[topic][subtopic] = { uworld: uworldIds, comlex: comlexIds };
        }
    }

    return data;
}

function sortNumericAware(a, b) {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

// Search Functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    if (hierarchyDepth === 3) {
        const organGroups = document.querySelectorAll('.organ-group');
        organGroups.forEach(group => {
            const organLabel = (group.dataset.label || '').toLowerCase();
            const sectionItems = group.querySelectorAll('.section-item');
            const organMatches = organLabel.includes(searchTerm);
            let hasVisibleSection = false;

            sectionItems.forEach(sectionItem => {
                const sectionLabel = (sectionItem.dataset.label || '').toLowerCase();
                const videoItems = sectionItem.querySelectorAll('.video-item');
                const sectionMatches = sectionLabel.includes(searchTerm);
                let hasVisibleVideo = false;

                videoItems.forEach(videoItem => {
                    const videoLabel = (videoItem.dataset.label || '').toLowerCase();
                    const visible = organMatches || sectionMatches || videoLabel.includes(searchTerm);
                    videoItem.style.display = visible ? '' : 'none';
                    if (visible) hasVisibleVideo = true;
                });

                const sectionVisible = organMatches || sectionMatches || hasVisibleVideo;
                sectionItem.style.display = sectionVisible ? '' : 'none';
                if (sectionVisible && searchTerm) sectionItem.classList.add('expanded');
                hasVisibleSection = hasVisibleSection || sectionVisible;
            });

            const organVisible = organMatches || hasVisibleSection;
            group.style.display = organVisible ? '' : 'none';
            if (organVisible && searchTerm) group.classList.add('expanded');
        });
        return;
    }

    const topicGroups = document.querySelectorAll('.topic-group');

    topicGroups.forEach(group => {
        const topicLabel = group.querySelector('.topic-header .checkbox-container').textContent.toLowerCase();
        const subtopicItems = group.querySelectorAll('.subtopic-item');
        let hasVisibleSubtopic = false;

        const topicMatches = topicLabel.includes(searchTerm);

        subtopicItems.forEach(item => {
            const subtopicLabel = item.querySelector('.checkbox-container').textContent.toLowerCase();
            const subtopicMatches = subtopicLabel.includes(searchTerm);

            if (topicMatches || subtopicMatches) {
                item.style.display = '';
                hasVisibleSubtopic = true;
            } else {
                item.style.display = 'none';
            }
        });

        if (topicMatches || hasVisibleSubtopic) {
            group.style.display = '';
            if (searchTerm !== '' && !topicMatches) {
                group.classList.add('expanded');
            }
        } else {
            group.style.display = 'none';
        }
    });
});

function renderFilters() {
    filtersContainer.innerHTML = '';
    if (hierarchyDepth === 3) {
        renderThreeLevel();
    } else {
        renderTwoLevel();
    }

    if (searchInput.value.trim() !== '') {
        searchInput.dispatchEvent(new Event('input'));
    }
}

function renderThreeLevel() {
    const organs = Object.keys(parsedData).sort((a, b) => organSort(a, b));

    organs.forEach(organ => {
        const organGroup = document.createElement('div');
        organGroup.className = 'topic-group organ-group';
        organGroup.dataset.label = organ;

        const header = document.createElement('div');
        header.className = 'topic-header';

        const toggleIcon = document.createElement('span');
        toggleIcon.className = 'toggle-icon';
        toggleIcon.textContent = '▶';
        header.appendChild(toggleIcon);

        const checkboxContainer = document.createElement('label');
        checkboxContainer.className = 'checkbox-container';

        const organCheckbox = document.createElement('input');
        organCheckbox.type = 'checkbox';
        organCheckbox.dataset.organ = organ;

        checkboxContainer.appendChild(organCheckbox);
        checkboxContainer.appendChild(document.createTextNode(organ));
        header.appendChild(checkboxContainer);
        organGroup.appendChild(header);

        const sectionList = document.createElement('div');
        sectionList.className = 'section-list';

        const sections = Object.keys(parsedData[organ]).sort((a, b) => sectionSort(organ, a, b));
        sections.forEach(section => {
            const sectionItem = document.createElement('div');
            sectionItem.className = 'section-item';
            sectionItem.dataset.label = section;

            const sectionHeader = document.createElement('div');
            sectionHeader.className = 'section-header';

            const sectionToggle = document.createElement('span');
            sectionToggle.className = 'toggle-icon';
            sectionToggle.textContent = '▶';

            const sectionCheckboxContainer = document.createElement('label');
            sectionCheckboxContainer.className = 'checkbox-container';

            const sectionCheckbox = document.createElement('input');
            sectionCheckbox.type = 'checkbox';
            sectionCheckbox.dataset.organ = organ;
            sectionCheckbox.dataset.section = section;

            sectionCheckboxContainer.appendChild(sectionCheckbox);
            sectionCheckboxContainer.appendChild(document.createTextNode(section));

            sectionHeader.appendChild(sectionToggle);
            sectionHeader.appendChild(sectionCheckboxContainer);
            sectionItem.appendChild(sectionHeader);

            const videoList = document.createElement('div');
            videoList.className = 'video-list';

            const videos = Object.entries(parsedData[organ][section]).sort((a, b) => videoSort(a, b));
            videos.forEach(([video, payload]) => {
                const videoItem = document.createElement('div');
                videoItem.className = 'video-item';
                videoItem.dataset.label = video;

                const videoLabel = document.createElement('label');
                videoLabel.className = 'checkbox-container';

                const videoCheckbox = document.createElement('input');
                videoCheckbox.type = 'checkbox';
                videoCheckbox.dataset.organ = organ;
                videoCheckbox.dataset.section = section;
                videoCheckbox.dataset.video = video;

                videoLabel.appendChild(videoCheckbox);
                videoLabel.appendChild(document.createTextNode(video));
                videoItem.appendChild(videoLabel);
                videoList.appendChild(videoItem);

                videoCheckbox.addEventListener('change', (evt) => {
                    const key = makeKey([organ, section, video]);
                    if (evt.target.checked) {
                        selectedLeaves.add(key);
                    } else {
                        selectedLeaves.delete(key);
                    }
                    updateSectionCheckboxState(sectionItem, sectionCheckbox, organCheckbox);
                    updateOutputs();
                });
            });

            sectionItem.appendChild(videoList);
            sectionList.appendChild(sectionItem);

            sectionCheckbox.addEventListener('change', (evt) => {
                const isChecked = evt.target.checked;
                const videoCheckboxes = sectionItem.querySelectorAll('.video-list input[type="checkbox"]');
                videoCheckboxes.forEach(cb => {
                    cb.checked = isChecked;
                    const video = cb.dataset.video;
                    const key = makeKey([organ, section, video]);
                    if (isChecked) {
                        selectedLeaves.add(key);
                    } else {
                        selectedLeaves.delete(key);
                    }
                });
                updateSectionCheckboxState(sectionItem, sectionCheckbox, organCheckbox);
                updateOutputs();
            });

            sectionToggle.addEventListener('click', (evt) => {
                evt.stopPropagation();
                sectionItem.classList.toggle('expanded');
            });

            sectionHeader.addEventListener('click', (evt) => {
                if (evt.target !== sectionCheckbox && evt.target !== sectionCheckboxContainer) {
                    sectionItem.classList.toggle('expanded');
                }
            });
        });

        organGroup.appendChild(sectionList);
        filtersContainer.appendChild(organGroup);

        organCheckbox.addEventListener('change', (evt) => {
            const isChecked = evt.target.checked;
            const leafCheckboxes = organGroup.querySelectorAll('.video-list input[type="checkbox"]');
            leafCheckboxes.forEach(cb => {
                cb.checked = isChecked;
                const key = makeKey([cb.dataset.organ, cb.dataset.section, cb.dataset.video]);
                if (isChecked) {
                    selectedLeaves.add(key);
                } else {
                    selectedLeaves.delete(key);
                }
            });
            const sectionCheckboxes = organGroup.querySelectorAll('.section-header input[type="checkbox"]');
            sectionCheckboxes.forEach(cb => {
                cb.checked = isChecked;
                cb.indeterminate = false;
            });
            updateOutputs();
        });

        toggleIcon.addEventListener('click', (evt) => {
            evt.stopPropagation();
            organGroup.classList.toggle('expanded');
        });

        header.addEventListener('click', (evt) => {
            if (evt.target !== organCheckbox && evt.target !== checkboxContainer) {
                organGroup.classList.toggle('expanded');
            }
        });
    });
}

function renderTwoLevel() {
    const topics = Object.keys(parsedData).sort();

    topics.forEach(topic => {
        const subtopics = Object.keys(parsedData[topic]).sort();

        const topicGroup = document.createElement('div');
        topicGroup.className = 'topic-group';

        const header = document.createElement('div');
        header.className = 'topic-header';

        const toggleIcon = document.createElement('span');
        toggleIcon.className = 'toggle-icon';
        toggleIcon.textContent = '▶';
        header.appendChild(toggleIcon);

        const checkboxContainer = document.createElement('label');
        checkboxContainer.className = 'checkbox-container';

        const topicCheckbox = document.createElement('input');
        topicCheckbox.type = 'checkbox';
        topicCheckbox.dataset.topic = topic;

        checkboxContainer.appendChild(topicCheckbox);
        checkboxContainer.appendChild(document.createTextNode(topic));
        header.appendChild(checkboxContainer);

        topicGroup.appendChild(header);

        const list = document.createElement('div');
        list.className = 'subtopics-list';

        subtopics.forEach(subtopic => {
            const item = document.createElement('div');
            item.className = 'subtopic-item';

            const label = document.createElement('label');
            label.className = 'checkbox-container';

            const subCheckbox = document.createElement('input');
            subCheckbox.type = 'checkbox';
            subCheckbox.dataset.topic = topic;
            subCheckbox.dataset.subtopic = subtopic;

            label.appendChild(subCheckbox);
            label.appendChild(document.createTextNode(subtopic));
            item.appendChild(label);
            list.appendChild(item);

            subCheckbox.addEventListener('change', (e) => {
                const key = makeKey([topic, subtopic]);
                if (e.target.checked) {
                    selectedLeaves.add(key);
                } else {
                    selectedLeaves.delete(key);
                }
                updateTopicCheckboxState(topicGroup, topicCheckbox);
                updateOutputs();
            });
        });

        topicGroup.appendChild(list);
        filtersContainer.appendChild(topicGroup);

        topicCheckbox.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            const subCheckboxes = list.querySelectorAll('input[type="checkbox"]');

            subCheckboxes.forEach(cb => {
                cb.checked = isChecked;
                const subtopic = cb.dataset.subtopic;
                const key = makeKey([topic, subtopic]);
                if (isChecked) {
                    selectedLeaves.add(key);
                } else {
                    selectedLeaves.delete(key);
                }
            });
            updateOutputs();
        });

        toggleIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            topicGroup.classList.toggle('expanded');
        });

        header.addEventListener('click', (e) => {
            if (e.target !== topicCheckbox && e.target !== checkboxContainer) {
                topicGroup.classList.toggle('expanded');
            }
        });
    });
}

function sectionSort(organ, sectionA, sectionB) {
    const orderA = minOrder(parsedData[organ][sectionA]);
    const orderB = minOrder(parsedData[organ][sectionB]);
    if (orderA !== orderB) return orderA - orderB;
    return sortNumericAware(sectionA, sectionB);
}

function organSort(organA, organB) {
    const orderA = minOrderOrgan(parsedData[organA]);
    const orderB = minOrderOrgan(parsedData[organB]);
    if (orderA !== orderB) return orderA - orderB;
    return sortNumericAware(organA, organB);
}

function videoSort([videoA, dataA], [videoB, dataB]) {
    const orderA = Number.isFinite(dataA.order) ? dataA.order : MAX_ORDER;
    const orderB = Number.isFinite(dataB.order) ? dataB.order : MAX_ORDER;
    if (orderA !== orderB) return orderA - orderB;
    return sortNumericAware(videoA, videoB);
}

function minOrder(sectionObj) {
    const orders = Object.values(sectionObj)
        .map(entry => entry.order)
        .filter(num => Number.isFinite(num));
    return orders.length ? Math.min(...orders) : MAX_ORDER;
}

function minOrderOrgan(organObj) {
    const orders = [];
    Object.values(organObj).forEach(sectionObj => {
        Object.values(sectionObj).forEach(videoObj => {
            if (Number.isFinite(videoObj.order)) orders.push(videoObj.order);
        });
    });
    return orders.length ? Math.min(...orders) : MAX_ORDER;
}

function updateSectionCheckboxState(sectionItem, sectionCheckbox, organCheckbox) {
    const videoCheckboxes = Array.from(sectionItem.querySelectorAll('.video-list input[type="checkbox"]'));
    const allChecked = videoCheckboxes.every(cb => cb.checked);
    const someChecked = videoCheckboxes.some(cb => cb.checked);

    sectionCheckbox.checked = allChecked;
    sectionCheckbox.indeterminate = !allChecked && someChecked;

    const organGroup = sectionItem.closest('.organ-group');
    if (organGroup) {
        const sectionCheckboxes = Array.from(organGroup.querySelectorAll('.section-header input[type="checkbox"]'));
        const organAll = sectionCheckboxes.every(cb => cb.checked);
        const organSome = sectionCheckboxes.some(cb => cb.checked || cb.indeterminate);
        organCheckbox.checked = organAll;
        organCheckbox.indeterminate = !organAll && organSome;
    }
}

function updateTopicCheckboxState(group, topicCheckbox) {
    const subCheckboxes = Array.from(group.querySelectorAll('.subtopics-list input[type="checkbox"]'));
    const allChecked = subCheckboxes.every(cb => cb.checked);
    const someChecked = subCheckboxes.some(cb => cb.checked);

    topicCheckbox.checked = allChecked;
    topicCheckbox.indeterminate = !allChecked && someChecked;
}

function updateOutputs() {
    let allUworld = [];
    let allComlex = [];

    selectedLeaves.forEach(key => {
        const parts = parseKey(key);

        if (hierarchyDepth === 3 && parts.length >= 3) {
            const [organ, section, video] = parts;
            const leaf = parsedData[organ]?.[section]?.[video];
            if (leaf) {
                allUworld = allUworld.concat(leaf.uworld);
                allComlex = allComlex.concat(leaf.comlex);
            }
        } else if (hierarchyDepth === 2 && parts.length >= 2) {
            const [topic, subtopic] = parts;
            const leaf = parsedData[topic]?.[subtopic];
            if (leaf) {
                allUworld = allUworld.concat(leaf.uworld);
                allComlex = allComlex.concat(leaf.comlex);
            }
        }
    });

    const uniqueUworld = [...new Set(allUworld)].sort(sortNumericAware);
    const uniqueComlex = [...new Set(allComlex)].sort(sortNumericAware);

    renderOutput(uworldOutput, uworldText, uworldCount, uniqueUworld, 40, uworldWarning);
    renderOutput(comlexOutput, comlexText, comlexCount, uniqueComlex);
}

function renderOutput(boxEl, textEl, countEl, ids, warnThreshold = null, warningEl = null) {
    if (!textEl) return;
    if (ids.length === 0) {
        textEl.innerHTML = '<span class="placeholder">Select topics to view IDs</span>';
    } else {
        textEl.textContent = ids.join(', ');
    }

    if (countEl) {
        const max = warnThreshold || ids.length;
        countEl.textContent = warnThreshold ? `${ids.length}/${warnThreshold}` : `${ids.length}`;
    }

    if (warningEl && warnThreshold !== null) {
        if (ids.length > warnThreshold) {
            warningEl.textContent = 'UWorlds allows up to 40 questions per block. Please unselect videos until this warning box goes away.';
            warningEl.classList.add('visible');
        } else {
            warningEl.textContent = '';
            warningEl.classList.remove('visible');
        }
    }
}

function copyToClipboard(elementId, button) {
    const element = document.getElementById(elementId);
    const textEl = element ? element.querySelector('.id-text') : null;
    const text = textEl ? textEl.textContent : '';

    if (text.includes('Select topics to view IDs') || text.trim() === '') {
        alert('No IDs to copy!');
        return;
    }

    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.backgroundColor = '#e8f5e9';
        button.style.borderColor = '#c8e6c9';
        button.style.color = '#2e7d32';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
            button.style.borderColor = '';
            button.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy to clipboard');
    });
}

async function init() {
    try {
        const response = await fetch(CSV_PATH);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const csvText = await response.text();
        parsedData = parseCSV(csvText);
        renderFilters();
    } catch (error) {
        console.error('Error loading CSV:', error);
        if (filtersContainer) {
            filtersContainer.innerHTML = '<div class="error">Error loading data. Please try refreshing the page.</div>';
        }
    }

}

init();
