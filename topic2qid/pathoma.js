/* Pathoma planner: parses Pathoma.txt and produces a sequential, roughly equal-time plan. */

const els = {
    status: document.getElementById('status'),
    startDate: document.getElementById('startDate'),
    endDate: document.getElementById('endDate'),
    showChapters: document.getElementById('showChapters'),
    recalcBtn: document.getElementById('recalcBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    output: document.getElementById('output'),
    summary: document.getElementById('summary'),
    error: document.getElementById('error'),
    lastUpdated: document.getElementById('lastUpdated'),
    sourceLink: document.getElementById('sourceLink'),
    breaks: Array.from(document.querySelectorAll('.planner-breaks input[type="checkbox"][data-dow]'))
};

// Embedded static data so the planner works as a standalone file.
// Source link is shown in the header/footer for attribution.
const PATHOMA_TEXT = `PATHOMA                                2087m (34h47)


1) Growth Adaptations, Cell Injury        154 mins
    1.1 Growth Adaptations                                        29 mins
    1.2 Cellular Injury                                                45 mins
    1.3 Cell Death                                                        39 mins
    1.4 Free Radical Injury                                        22 mins
    1.5 Amyloid                                                        20 mins


2) Inflammation & Healing                        221 mins
    2.1a Acute Inflammation (Part 1)                                36 mins
    2.1b Acute Inflammation (Part 2)                                27 mins
    2.1c Acute Inflammation (Part 3)                                19 mins
    2.2 Chronic Inflammation                                        26 mins
    2.3 Primary Immunodeficiency                                17 mins
    2.4a Autoimmune Disorders (Part 1)                                30 mins
    2.4b Autoimmune Disorders (Part 2)                                45 mins
    2.5 Wound Healing                                                25 mins


3) Neoplasia                                                        138 mins
    3.1 Neoplasia                                                        38 mins
    3.2a Carcinogenesis (Part 1)                                        21 mins
    3.2b Carcinogenesis (Part 2)                                        29 mins
    3.2c Carcinogenesis (Part 3)                                        20 mins
    3.3 Tumor Progression                                        9 mins
    3.4 Clinical Characteristics                                        21 mins


4) Hemostasis & Related Disorders        111 mins
    4.1 Primary Hemostasis & Related Disorders                43 mins
    4.2 Secondary Hemostasis and Related Disorders                21 mins
    4.3 Other Disorders of Hemostasis                                13 mins
    4.4 Thrombosis                                                22 mins
    4.5 Embolism                                                        12 mins






5) Red Blood Cell Disorders                        164 mins
    5.1 Anemia                                                        7 mins
    5.2a Microcytic Anemias (Part 1)                                28 mins
    5.2b Microcytic Anemias (Part 2)                                19 mins
    5.2c Microcytic Anemias (Part 3)                                19 mins
    5.3 Macrocytic Anemia                                        22 mins
    5.4 Normocytic Anemia                                        15 mins
    5.5 Normocytic Anemias w/ Extravascular Hemolysis        26 mins
    5.6 Normocytic Anemias w/ Intravascular Hemolysis        ~14 mins         2 combined
    5.7 Anemia due to Underproduction                                ~13 mins


6) White Blood Cell Disorders                118 mins
    6.1 Leukopenia & Leukocytosis                                21 mins
    6.2 Acute Leukemia                                                19 mins
    6.3 Chronic Leukemia                                                11 mins
    6.4 Myeloproliferative Disorders                                22 mins
    6.5 Lymphadenopathy                                        ~11 mins        3 combined
    6.6 Lymphoma                                                ~10 mins
    6.7 Hodgkin Lymphoma                                        ~10 mins
    6.8 Plasma Cell Disorders (Dyscrasias)                        ~8 mins        2 combined
    6.9 Langerhans Cell Histiocytosis                                ~7 mins


7) Vascular Pathology                                70 mins
    7.1 Vasculitis                                                        27 mins
    7.2 Hypertension                                                7 mins
    7.3 Arteriosclerosis                                                18 mins
    7.4 Aortic Dissection and Aneurysm                                13 mins
    7.5 Vascular Tumors                                                5 mins


8) Cardiac Pathology                                        94 mins
    8.1 Ischemic Heart Disease                                        30 mins
    8.2 Congestive Heart Failure                                        6 mins
    8.3 Congenital Defects                                        17 mins
    8.4 Valvular Disorders                                                25 mins
    8.5 Endocarditis                                                7 mins
    8.6 Cardiomyopathy                                                ~4 mins        2 combined
    8.7 Cardiac Tumors                                                ~4 mins




9) Respiratory Tract Pathology                136 mins
    9.1 Nasopharynx                                                ~4 mins        2 combined
    9.2 Larynx                                                        ~4 mins
    9.3 Pulmonary Infections                                        20 mins
    9.4 COPD                                                        50 mins
    9.5 Restrictive Diseases                                        22 mins
    9.6 Pulmonary Hypertension                                        ~8 mins        2 combined
    9.7 Respiratory Distress Syndromes                                ~7 mins
    9.8 Lung Cancer                                                18 mins
    9.9 Pleura                                                        3 mins


10) Gastrointestinal Pathology                157 mins
    10.1 Oral Cavity                                                6 mins
    10.2 Salivary Gland                                                7 mins
    10.3 Esophagus                                                28 mins
    10.4 Stomach                                                        35 mins
    10.5 Small Bowel                                                31 mins
    10.6 Appendix                                                        ~10 mins
    10.7 Inflammatory Bowel Disease                                ~9 mins
    10.8a Colon (Part 1)                                                22 mins
    10.8b Colon: Colorectal Carcinoma (Part 2)                        9 mins


11) Exo Pancreas, Gallbladder, Liver                65 mins
11.1 Exocrine Pancreas                                                13 mins
11.2 Gallbladder                                                        11 mins
    11.3a Liver: Jaundice        (Part 1)                                        12 mins
11.3b Liver: Hepatitis        (Part 2)                                        8 mins
    11.3c Liver: Cirrhosis & Tumors (Part 3)                                21 mins


12) Kidney & Urinary Tract Pathology                95 mins
    12.1 Congenital                                                        12 mins
    12.2 Acute Renal Failure                                                15 mins
    12.3 Nephrotic Syndrome                                                 27 mins
    12.4 Nephritic Syndrome                                                12 mins
    12.5 Urinary Tract Infection                                                ~6 mins    3 combined
    12.6 Nephrolithiasis                                                        ~5 mins
    12.7 Chronic Renal Failure                                                ~5 mins
    12.8 Renal Neoplasia                                                        6 mins
    12.9 Lower Urinary Tract Carcinoma                                        7 mins


13) Female Genital System                                153 mins
    13.1 Vulva                                                                22 mins
    13.2 Vagina                                                                14 mins
    13.3 Cervix                                                                 20 mins
    13.4 Endometrium and Myometrium                                        31 mins
    13.5 Ovary                                                                9 mins
    13.6 Ovarian Tumors                                                        33 mins
    13.7 Gestational Pathology                                                24 mins


14) Male Genital System Pathology                41 mins
    14.1 Penis                                                                7 mins
    14.2 Testicle                                                                 9 mins
    14.3 Testicular Tumors                                                 13 mins
    14.4 Prostate                                                                12 mins


15) Endocrine Pathology                                91 mins
    15.1 Anterior Pituitary Gland                                        ~7 mins        2 combined
    15.2 Posterior Pituitary Gland                                        ~7 mins
    15.3 Thyroid Gland                                                 ~6 mins        5 combined ayy
    15.4 Hyperthyroidism                                                ~5 mins
    15.5 Hypothyroidism                                                ~5 mins
    15.6 Thyroiditis                                                ~5 mins
    15.7 Thyroid Neoplasia                                        ~5 mins
    15.8 Parathyroid Gland                                        11 mins
    15.9 Endocrine Pancreas                                        15 mins
    15.10 Adrenal Cortex                                                ~13 mins        2 combined
    15.11 Adrenal Medulla                                        ~12 mins


16) Breast Pathology                                        59 mins
    16.1 Introduction                                                7 mins
16.2 Inflammatory Conditions                                        9 mins
    16.3 Benign Tumors and Fibrocystic Changes                15 mins
    16.4 Breast Cancer                                                 29 mins







17) CNS Pathology                                        96 mins
    17.1 Developmental Anomalies                                5 mins
    17.2 Spinal Cord Lesions                                        9 mins
    17.3 Meningitis                                                 6 mins
    17.4 Cerebrovascular Disease                                16 mins
    17.5 Trauma                                                        ~7 mins        2 combined
    17.6 Demyelinating Disorders                                ~6 mins
    17.7 Dementia and Degenerative Disorders                        35 mins
    17.8 CNS Tumors                                                12 mins


18) MSK Pathology                                        76 mins
    18.1 Skeletal System                                                25 mins
    18.2 Bone Tumors                                                15 mins
    18.3 Joint                                                         21 mins
    18.4 Skeletal Muscle                                                ~6 mins        3 combined
    18.5 Neuromuscular Junction                                        ~5 mins
    18.6 Soft Tissue Tumors                                        ~5 mins


19) Skin Pathology                                        48 mins
    19.1 Inflammatory Diseases                                        15 mins
    19.2 Blistering Dermatoses                                        9 mins
    19.3 Epithelial Tumors                                         8 mins
    19.4 Disorders of Pigmentation and Melanocytes                12 mins
    19.5 Infectious Disorders                                        4 mins
`;

/** @typedef {{ id: string, title: string, minutes: number, chapter: string }} Video */

/** @type {Video[]} */
let videos = [];
/** @type {Record<string, string>} */
let chapterNames = {};

function normalizeLine(line) {
    return (line || '')
        .replace(/\u00a0/g, ' ')
        .replace(/[\r\n]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function parseMinutesFromMatch(raw) {
    const value = Number.parseInt(String(raw), 10);
    return Number.isFinite(value) ? value : null;
}

function getChapterFromId(id) {
    const m = String(id).match(/^(\d+)/);
    return m ? m[1] : '0';
}

function parsePathomaText(text) {
    const lines = String(text || '').split(/\r?\n/);
    /** @type {Video[]} */
    const parsedVideos = [];
    /** @type {Record<string, string>} */
    const parsedChapterNames = {};

    for (const rawLine of lines) {
        const line = normalizeLine(rawLine);
        if (!line) continue;
        if (!/\bmins\b/i.test(line)) continue;

        // Chapter totals (not watchable videos): "1) Growth Adaptations, Cell Injury 154 mins"
        const chapterMatch = line.match(/^(\d+)\)\s+(.+?)\s+(\d+)\s*mins\b/i);
        if (chapterMatch) {
            const chapterNum = chapterMatch[1];
            const chapterTitle = chapterMatch[2].trim();
            parsedChapterNames[chapterNum] = chapterTitle;
            continue;
        }

        // Video lines: "2.1a Acute Inflammation (Part 1) 36 mins" or "5.6 ... ~14 mins"
        // Accept IDs like 11.3a, 2.1, 9.8, 16.2
        const videoMatch = line.match(/^(\d+(?:\.\d+)?[a-z]?)\)?\s+(.+?)\s+~?(\d+)\s*mins\b/i);
        if (!videoMatch) continue;

        const id = videoMatch[1];
        const title = videoMatch[2].trim();
        const minutes = parseMinutesFromMatch(videoMatch[3]);
        if (!minutes || minutes <= 0) continue;

        parsedVideos.push({
            id,
            title,
            minutes,
            chapter: getChapterFromId(id)
        });
    }

    return { videos: parsedVideos, chapterNames: parsedChapterNames };
}

function formatDuration(minutes) {
    const m = Math.max(0, Math.round(minutes));
    const h = Math.floor(m / 60);
    const r = m % 60;
    if (h <= 0) return `${r}m`;
    if (r === 0) return `${h}h`;
    return `${h}h ${r}m`;
}

function addDays(date, offsetDays) {
    const d = new Date(date.getTime());
    d.setDate(d.getDate() + offsetDays);
    return d;
}

function formatDateLabel(date) {
    // e.g. Mon, Jan 20, 2026
    return date.toLocaleDateString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatDateInputValue(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function parseDateInputValue(value) {
    if (!value) return null;
    const d = new Date(`${value}T00:00:00`);
    return Number.isNaN(d.getTime()) ? null : d;
}

function getBreakDowSet() {
    const set = new Set();
    for (const cb of els.breaks) {
        const dow = Number.parseInt(cb.dataset.dow || '', 10);
        if (cb.checked && Number.isFinite(dow)) set.add(dow);
    }
    return set;
}

function buildStudyDates(startDate, endDate, breakDows) {
    /** @type {Date[]} */
    const dates = [];
    const cur = new Date(startDate.getTime());
    while (cur <= endDate) {
        const dow = cur.getDay();
        if (!breakDows.has(dow)) {
            dates.push(new Date(cur.getTime()));
        }
        cur.setDate(cur.getDate() + 1);
    }
    return dates;
}

function buildPlanSequentialEqualTime(items, days) {
    const safeDays = Math.max(1, Math.floor(days));
    const totalMinutes = items.reduce((acc, v) => acc + v.minutes, 0);
    const n = items.length;

    if (n === 0) {
        return { plan: Array.from({ length: safeDays }, () => ({ items: [], minutes: 0 })), totalMinutes: 0 };
    }

    // If the user asks for more days than videos, partition into at most n non-empty days
    // and leave the remainder empty at the end.
    const k = Math.min(safeDays, n);

    // Prefix sums for O(1) range sums
    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + items[i].minutes;

    // dp[j][i] = minimal possible maximum day-minutes when partitioning first i items into j days
    // div[j][i] = best split point p (0..i-1) for that optimum
    /** @type {number[][]} */
    const dp = Array.from({ length: k + 1 }, () => new Array(n + 1).fill(Infinity));
    /** @type {number[][]} */
    const div = Array.from({ length: k + 1 }, () => new Array(n + 1).fill(0));

    dp[0][0] = 0;
    for (let i = 1; i <= n; i++) {
        dp[1][i] = prefix[i];
        div[1][i] = 0;
    }

    for (let j = 2; j <= k; j++) {
        dp[j][0] = 0;
        for (let i = 1; i <= n; i++) {
            // Need at least j items to have j non-empty partitions
            if (i < j) {
                dp[j][i] = Infinity;
                continue;
            }

            let bestCost = Infinity;
            let bestP = 0;

            // Try placing the last cut after p items (so last segment is (p..i-1))
            for (let p = j - 1; p <= i - 1; p++) {
                const left = dp[j - 1][p];
                const right = prefix[i] - prefix[p];
                const cost = Math.max(left, right);
                if (cost < bestCost) {
                    bestCost = cost;
                    bestP = p;
                }
            }

            dp[j][i] = bestCost;
            div[j][i] = bestP;
        }
    }

    // Reconstruct boundaries
    /** @type {{start: number, end: number}[]} */
    const ranges = [];
    let i = n;
    let j = k;
    while (j > 1) {
        const p = div[j][i];
        ranges.push({ start: p, end: i });
        i = p;
        j--;
    }
    ranges.push({ start: 0, end: i });
    ranges.reverse();

    const plan = ranges.map(r => {
        const slice = items.slice(r.start, r.end);
        const minutes = slice.reduce((acc, v) => acc + v.minutes, 0);
        return { items: slice, minutes };
    });

    // Add any extra empty days the user requested
    while (plan.length < safeDays) plan.push({ items: [], minutes: 0 });

    return { plan, totalMinutes };
}

function renderSummary({ totalMinutes, days, videoCount }) {
    const avg = totalMinutes / Math.max(1, days);
    els.summary.hidden = false;
    els.summary.innerHTML = `
        <div class="planner-summary-row">
            <div><strong>${videoCount}</strong> videos</div>
            <div><strong>${formatDuration(totalMinutes)}</strong> total</div>
            <div><strong>${formatDuration(avg)}</strong> avg/day</div>
        </div>
    `;
}

function escapeHtml(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function renderPlan({ plan, totalMinutes, studyDates, calendarDays }) {
    const days = plan.length;
    const showChapters = !!els.showChapters.checked;

    renderSummary({ totalMinutes, days, videoCount: videos.length });
    if (els.summary && !els.summary.hidden) {
        const breakCount = Math.max(0, calendarDays - studyDates.length);
        els.summary.innerHTML += `
            <div class="planner-summary-row" style="margin-top: 0.5rem;">
                <div><strong>${studyDates.length}</strong> study days</div>
                <div><strong>${breakCount}</strong> break days</div>
                <div><strong>${calendarDays}</strong> calendar days</div>
            </div>
        `;
    }

    const parts = [];
    for (let d = 0; d < plan.length; d++) {
        const day = plan[d];

        const date = studyDates[d];
        const dateLabel = date ? ` — ${escapeHtml(formatDateLabel(date))}` : '';
        parts.push(`<div class="planner-day">`);
        parts.push(`  <div class="planner-day-header">`);
        parts.push(`    <div class="planner-day-title">Day ${d + 1}${dateLabel}</div>`);
        parts.push(`    <div class="planner-day-meta">${escapeHtml(formatDuration(day.minutes))} (${day.minutes} mins)</div>`);
        parts.push(`  </div>`);

        if (day.items.length === 0) {
            parts.push(`<div class="planner-day-empty">No videos assigned.</div>`);
            parts.push(`</div>`);
            continue;
        }

        parts.push(`<ul class="planner-list">`);
        let lastChapter = null;

        for (const item of day.items) {
            if (showChapters && item.chapter !== lastChapter) {
                const chName = chapterNames[item.chapter] ? `: ${chapterNames[item.chapter]}` : '';
                parts.push(`<li class="planner-chapter">Chapter ${escapeHtml(item.chapter)}${escapeHtml(chName)}</li>`);
                lastChapter = item.chapter;
            }

            parts.push(
                `<li class="planner-item">` +
                `<span class="planner-item-title">${escapeHtml(item.id)} ${escapeHtml(item.title)}</span>` +
                `<span class="planner-item-minutes">${escapeHtml(formatDuration(item.minutes))}</span>` +
                `</li>`
            );
        }

        parts.push(`</ul>`);
        parts.push(`</div>`);
    }

    els.output.innerHTML = parts.join('\n');
}

function setError(message) {
    if (message) {
        els.error.hidden = false;
        els.error.textContent = message;
    } else {
        els.error.hidden = true;
        els.error.textContent = '';
    }
}

function recalculate() {
    setError(null);

    if (!videos || videos.length === 0) {
        els.output.innerHTML = '<div class="planner-placeholder">No videos found.</div>';
        els.summary.hidden = true;
        return;
    }

    const startDate = parseDateInputValue(els.startDate.value);
    const endDate = parseDateInputValue(els.endDate.value);

    if (!startDate) {
        setError('Please choose a valid start date.');
        return;
    }
    if (!endDate) {
        setError('Please choose a valid end date.');
        return;
    }
    if (endDate < startDate) {
        setError('End date must be on or after start date.');
        return;
    }

    const msPerDay = 24 * 60 * 60 * 1000;
    const calendarDays = Math.floor((endDate.getTime() - startDate.getTime()) / msPerDay) + 1;
    const studyDates = buildStudyDates(startDate, endDate, getBreakDowSet());
    if (studyDates.length === 0) {
        setError('No study days available in this range (all days are breaks).');
        return;
    }

    const { plan, totalMinutes } = buildPlanSequentialEqualTime(videos, studyDates.length);
    renderPlan({ plan, totalMinutes, studyDates, calendarDays });
}

function pad2(n) {
    return String(n).padStart(2, '0');
}

function formatIcsDate(date) {
    // All-day events use YYYYMMDD
    return `${date.getFullYear()}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}`;
}

function formatIcsTimestamp(now) {
    // UTC timestamp YYYYMMDDTHHMMSSZ
    return `${now.getUTCFullYear()}${pad2(now.getUTCMonth() + 1)}${pad2(now.getUTCDate())}T${pad2(now.getUTCHours())}${pad2(now.getUTCMinutes())}${pad2(now.getUTCSeconds())}Z`;
}

function icsEscape(value) {
    return String(value)
        .replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\n')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,');
}

function buildPlanModel() {
    if (!videos || videos.length === 0) return null;
    const startDate = parseDateInputValue(els.startDate.value);
    const endDate = parseDateInputValue(els.endDate.value);
    if (!startDate || !endDate || endDate < startDate) return null;

    const msPerDay = 24 * 60 * 60 * 1000;
    const calendarDays = Math.floor((endDate.getTime() - startDate.getTime()) / msPerDay) + 1;
    const studyDates = buildStudyDates(startDate, endDate, getBreakDowSet());
    if (studyDates.length === 0) return null;

    const { plan, totalMinutes } = buildPlanSequentialEqualTime(videos, studyDates.length);
    return { plan, totalMinutes, studyDates, calendarDays, startDate, endDate };
}

function buildIcs({ plan, studyDates }) {
    const now = new Date();
    const dtstamp = formatIcsTimestamp(now);
    const lines = [];

    lines.push('BEGIN:VCALENDAR');
    lines.push('VERSION:2.0');
    lines.push('PRODID:-//Pathoma Planner//EN');
    lines.push('CALSCALE:GREGORIAN');
    lines.push('METHOD:PUBLISH');
    lines.push('X-WR-CALNAME:Pathoma Plan');

    for (let i = 0; i < plan.length; i++) {
        const day = plan[i];
        const date = studyDates[i];
        if (!date) continue;

        const dtstart = formatIcsDate(date);
        const dtend = formatIcsDate(addDays(date, 1));
        const uid = `pathoma-${dtstart}-${i}@topic2qid`;

        const summary = day.items.length > 0
            ? `Pathoma (${day.items.length} videos, ${day.minutes} mins)`
            : 'Pathoma (no videos)';

        const descLines = [];
        for (const item of day.items) {
            descLines.push(`- ${item.id} ${item.title} (${item.minutes} mins)`);
        }

        lines.push('BEGIN:VEVENT');
        lines.push(`UID:${icsEscape(uid)}`);
        lines.push(`DTSTAMP:${dtstamp}`);
        lines.push(`DTSTART;VALUE=DATE:${dtstart}`);
        lines.push(`DTEND;VALUE=DATE:${dtend}`);
        lines.push(`SUMMARY:${icsEscape(summary)}`);
        if (descLines.length > 0) {
            lines.push(`DESCRIPTION:${icsEscape(descLines.join('\n'))}`);
        }
        lines.push('END:VEVENT');
    }

    lines.push('END:VCALENDAR');
    return lines.join('\r\n');
}

function downloadIcs() {
    setError(null);
    const model = buildPlanModel();
    if (!model) {
        setError('Please ensure your dates are valid and at least one study day is available.');
        return;
    }

    const ics = buildIcs(model);
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const start = formatDateInputValue(model.studyDates[0]);
    const end = formatDateInputValue(model.studyDates[model.studyDates.length - 1]);
    a.href = url;
    a.download = `pathoma-plan_${start}_to_${end}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

function init() {
    // Header meta
    if (els.lastUpdated && !els.lastUpdated.textContent.trim()) {
        els.lastUpdated.textContent = '2026-01-20';
    }
    if (els.sourceLink && els.sourceLink.getAttribute('href') === '') {
        // User requested leaving it blank for manual entry later.
        // Keep as-is.
    }

    // Parse embedded data
    els.status.textContent = 'Loading Pathoma list…';
    const parsed = parsePathomaText(PATHOMA_TEXT);
    videos = parsed.videos;
    chapterNames = parsed.chapterNames;

    if (!videos || videos.length === 0) {
        els.status.textContent = 'No videos found.';
        els.output.innerHTML = '<div class="planner-placeholder">No videos found.</div>';
        els.summary.hidden = true;
        return;
    }

    els.status.textContent = `Loaded ${videos.length} videos.`;

    // Defaults: start date = today, end date = today + 20 days (21 calendar days inclusive)
    const today = new Date();
    const startDefault = formatDateInputValue(today);
    const endDefault = formatDateInputValue(addDays(today, 20));
    if (!els.startDate.value) els.startDate.value = startDefault;
    if (!els.endDate.value) els.endDate.value = endDefault;

    recalculate();
}

els.recalcBtn.addEventListener('click', () => recalculate());
els.startDate.addEventListener('change', () => recalculate());
els.endDate.addEventListener('change', () => recalculate());
els.showChapters.addEventListener('change', () => recalculate());
for (const cb of els.breaks) cb.addEventListener('change', () => recalculate());

els.downloadBtn.addEventListener('click', () => downloadIcs());

init();
