// Embedded CSV Data
const CSV_DATA = `Topic,Subtopic,Uworld IDs,COMLEX IDs
Biochemistry,Vitamins,"123, 145, 1234, 232","1231,3452,667, 867"
Biochemistry,Metabolism,"153, 1412","17634, 344, 234"
Cardiology,Arrhythmias,"151","1677, 272, 23,4523,42"`;

// Data Parsing
function parseCSV(csv) {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',');
    const data = {};

    // Helper to parse CSV line handling quotes
    const parseLine = (line) => {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        return result;
    };

    for (let i = 1; i < lines.length; i++) {
        const cols = parseLine(lines[i]);
        if (cols.length < 4) continue;

        const topic = cols[0];
        const subtopic = cols[1];
        const uworldIds = cols[2].split(',').map(id => id.trim()).filter(id => id);
        const comlexIds = cols[3].split(',').map(id => id.trim()).filter(id => id);

        if (!data[topic]) {
            data[topic] = {};
        }
        data[topic][subtopic] = {
            uworld: uworldIds,
            comlex: comlexIds
        };
    }
    return data;
}

const parsedData = parseCSV(CSV_DATA);
const selectedSubtopics = new Set();

// UI Generation
const filtersContainer = document.getElementById('filters-container');
const uworldOutput = document.getElementById('uworld-ids');
const comlexOutput = document.getElementById('comlex-ids');

function renderFilters() {
    const topics = Object.keys(parsedData).sort();

    topics.forEach(topic => {
        const subtopics = Object.keys(parsedData[topic]).sort();
        
        const topicGroup = document.createElement('div');
        topicGroup.className = 'topic-group expanded'; // Default expanded

        // Topic Header
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

        // Subtopics List
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

            // Event Listener for Subtopic
            subCheckbox.addEventListener('change', (e) => {
                const key = `${topic}|${subtopic}`;
                if (e.target.checked) {
                    selectedSubtopics.add(key);
                } else {
                    selectedSubtopics.delete(key);
                }
                updateTopicCheckboxState(topicGroup, topicCheckbox);
                updateOutputs();
            });
        });

        topicGroup.appendChild(list);
        filtersContainer.appendChild(topicGroup);

        // Event Listener for Topic Checkbox (Select All)
        topicCheckbox.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            const subCheckboxes = list.querySelectorAll('input[type="checkbox"]');
            
            subCheckboxes.forEach(cb => {
                cb.checked = isChecked;
                const subtopic = cb.dataset.subtopic;
                const key = `${topic}|${subtopic}`;
                if (isChecked) {
                    selectedSubtopics.add(key);
                } else {
                    selectedSubtopics.delete(key);
                }
            });
            updateOutputs();
        });

        // Event Listener for Toggle
        toggleIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            topicGroup.classList.toggle('expanded');
        });
        
        // Allow clicking header to toggle expand as well, but not when clicking checkbox
        header.addEventListener('click', (e) => {
            if (e.target !== topicCheckbox && e.target !== checkboxContainer) {
                topicGroup.classList.toggle('expanded');
            }
        });
    });
}

function updateTopicCheckboxState(group, topicCheckbox) {
    const subCheckboxes = Array.from(group.querySelectorAll('.subtopics-list input[type="checkbox"]'));
    const allChecked = subCheckboxes.every(cb => cb.checked);
    const someChecked = subCheckboxes.some(cb => cb.checked);

    if (allChecked) {
        topicCheckbox.checked = true;
        topicCheckbox.indeterminate = false;
    } else if (someChecked) {
        topicCheckbox.checked = false;
        topicCheckbox.indeterminate = true;
    } else {
        topicCheckbox.checked = false;
        topicCheckbox.indeterminate = false;
    }
}

function updateOutputs() {
    let allUworld = [];
    let allComlex = [];

    selectedSubtopics.forEach(key => {
        const [topic, subtopic] = key.split('|');
        if (parsedData[topic] && parsedData[topic][subtopic]) {
            allUworld = allUworld.concat(parsedData[topic][subtopic].uworld);
            allComlex = allComlex.concat(parsedData[topic][subtopic].comlex);
        }
    });

    // Deduplicate and Sort
    const uniqueUworld = [...new Set(allUworld)].sort((a, b) => parseInt(a) - parseInt(b));
    const uniqueComlex = [...new Set(allComlex)].sort((a, b) => parseInt(a) - parseInt(b));

    // Render
    renderOutput(uworldOutput, uniqueUworld);
    renderOutput(comlexOutput, uniqueComlex);
}

function renderOutput(element, ids) {
    if (ids.length === 0) {
        element.innerHTML = '<span class="placeholder">Select topics to view IDs</span>';
    } else {
        element.textContent = ids.join(', ');
    }
}

// Initialize
renderFilters();

// Copy to Clipboard Functionality
function copyToClipboard(elementId, button) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    
    // Check if there is content to copy
    if (text.includes('Select topics to view IDs') || text.trim() === '') {
        alert('No IDs to copy!');
        return;
    }

    navigator.clipboard.writeText(text).then(() => {
        // Visual feedback
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
