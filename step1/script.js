const SYSTEM_ORDER = [
  "Fundamentals",
  "Biochemistry/Genetics",
  "Immunology",
  "Microbiology",
  "Hematology",
  "Cardiovascular",
  "Respiratory",
  "Renal",
  "Gastrointestinal",
  "Reproductive",
  "Endocrine",
  "Neurology",
  "Musculoskeletal/Derm",
  "Psychiatry",
  "Public Health/Ethics"
];
const RESOURCE_FILES = {
  pathoma: "pathoma.json",
  bnb: "bnb.json",
  sketchy: "sketchy_micro.json"
};

let pathomaData = [];
let bnbData = [];
let sketchyData = [];
let resourcesReady = false;
let resourceLoadPromise = null;

async function loadResourceData() {
  if (resourceLoadPromise) return resourceLoadPromise;
  resourceLoadPromise = (async () => {
    const fetchJson = async (fileName) => {
      const res = await fetch(fileName);
      if (!res.ok) throw new Error(`${fileName} ${res.status}`);
      return res.json();
    };
    const [pathoma, bnb, sketchy] = await Promise.all([
      fetchJson(RESOURCE_FILES.pathoma),
      fetchJson(RESOURCE_FILES.bnb),
      fetchJson(RESOURCE_FILES.sketchy)
    ]);
    pathomaData = pathoma;
    bnbData = bnb;
    sketchyData = sketchy;
    resourcesReady = true;
  })();
  resourceLoadPromise.catch(err => {
    console.error("Failed to load resource data", err);
    resetError("Failed to load study content. Refresh the page and try again.");
  });
  return resourceLoadPromise;
}

const practiceExamCatalog = [
  { id: "uwsa1", label: "UWSA 1", mandatory: false, defaultChecked: true, kind: "uwsa", order: 1, group: "testing" },
  { id: "uwsa2", label: "UWSA 2", mandatory: false, defaultChecked: true, kind: "uwsa", order: 2, group: "testing" },
  { id: "uwsa3", label: "UWSA 3", mandatory: false, defaultChecked: true, kind: "uwsa", order: 3, group: "testing" },
  { id: "nbme26", label: "NBME 26", mandatory: false, defaultChecked: true, kind: "nbme", order: 26, group: "testing" },
  { id: "nbme27", label: "NBME 27", mandatory: false, defaultChecked: true, kind: "nbme", order: 27, group: "testing" },
  { id: "nbme28", label: "NBME 28", mandatory: false, defaultChecked: true, kind: "nbme", order: 28, group: "testing" },
  { id: "nbme29", label: "NBME 29", mandatory: false, defaultChecked: true, kind: "nbme", order: 29, group: "testing" },
  { id: "nbme30", label: "NBME 30", mandatory: false, defaultChecked: true, kind: "nbme", order: 30, group: "testing" },
  { id: "nbme31", label: "NBME 31", mandatory: false, defaultChecked: true, kind: "nbme", order: 31, group: "testing" },
  { id: "nbme32", label: "NBME 32", mandatory: false, defaultChecked: true, kind: "nbme", order: 32, group: "testing" },
  { id: "free120old", label: "Free 120 (Old)", mandatory: false, defaultChecked: true, kind: "free", order: 120, group: "testing" },
  { id: "free120", label: "Free 120 (New)", mandatory: true, defaultChecked: true, kind: "free", order: 120, group: "testing" }
];

const els = {
  startDate: document.getElementById("startDate"),
  examDate: document.getElementById("examDate"),
  generateBtn: document.getElementById("generateBtn"),
  errorBox: document.getElementById("errorBox"),
  overview: document.getElementById("overviewStats"),
  breakBoxes: Array.from(document.querySelectorAll('.break-grid input[type="checkbox"][data-dow]')),
  weeklyCalendar: document.getElementById("weeklyCalendar"),
  calPrev: document.getElementById("calPrev"),
  calNext: document.getElementById("calNext"),
  calToday: document.getElementById("calToday"),
  calRange: document.getElementById("calRange"),
  downloadIcs: document.getElementById("downloadIcs"),
  learningGroup: document.getElementById("learningGroup"),
  practiceGroup: document.getElementById("practiceGroup"),
  testingGroup: document.getElementById("testingGroup"),
  dayDetail: document.getElementById("dayDetail"),
  dayPrev: document.getElementById("dayPrev"),
  dayNext: document.getElementById("dayNext"),
  dayLabel: document.getElementById("dayLabel"),
  dayNav: document.getElementById("dayNav"),
  pathomaToggle: null,
  bnbToggle: null,
  sketchyToggle: null,
  ankiToggle: null,
  uworldToggle: null,
  ambossToggle: null
};

const LIMIT_MINUTES_PER_DAY = 9 * 60;
const UWORLD_TOTAL_Q = 4000;
const UWORLD_BLOCK_Q = 40;
const UWORLD_BLOCK_MINUTES = 120; // 40 questions per block, includes review
const UWORLD_TOTAL_BLOCKS = Math.ceil(UWORLD_TOTAL_Q / UWORLD_BLOCK_Q);
const UWORLD_TOTAL_MINUTES = UWORLD_TOTAL_BLOCKS * UWORLD_BLOCK_MINUTES;
const AMBOSS_TOTAL_Q = 2800;
const AMBOSS_BLOCK_Q = 40;
const AMBOSS_BLOCK_MINUTES = 120;
const AMBOSS_TOTAL_BLOCKS = Math.ceil(AMBOSS_TOTAL_Q / AMBOSS_BLOCK_Q);
const AMBOSS_TOTAL_MINUTES = AMBOSS_TOTAL_BLOCKS * AMBOSS_BLOCK_MINUTES;
const EXAM_MINUTES = 9 * 60; // 9 hours for full-length exams
const ANKI_MINUTES = 60;
const MIN_LEARNING_MINUTES = 180; // Target daily video minutes during learning phase
const VIDEO_TARGET_MINUTES = 180; // Aim for ~3 hours of videos per day
const MAX_PRACTICE_BLOCKS_PER_DAY = 4;

let calendarWeekStart = null;
let currentPlan = null; // { dayMap, start, exam }
let selectedDayKey = null;

function formatDateLabel(date) {
  return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function formatDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function startOfWeekSunday(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

function formatWeekRangeLabel(start, end) {
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  if (sameMonth) {
    const monthYear = start.toLocaleDateString(undefined, { month: "long", year: "numeric" });
    return `${monthYear} — ${start.getDate()}–${end.getDate()}`;
  }
  const startLabel = start.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  const endLabel = end.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  return `${startLabel} – ${endLabel}`;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function buildRange(start, end) {
  const days = [];
  let cur = new Date(start);
  while (cur <= end) {
    days.push(new Date(cur));
    cur = addDays(cur, 1);
  }
  return days;
}

function minutesToHuman(min) {
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  if (h <= 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderResourceToggles() {
  const { learningGroup, practiceGroup, testingGroup } = els;
  if (!learningGroup || !practiceGroup || !testingGroup) return;

  const previous = {
    pathoma: els.pathomaToggle?.checked ?? true,
    bnb: els.bnbToggle?.checked ?? false,
    sketchy: els.sketchyToggle?.checked ?? false,
    anki: els.ankiToggle?.checked ?? true,
    uworld: els.uworldToggle?.checked ?? true,
    amboss: els.ambossToggle?.checked ?? false
  };

  learningGroup.innerHTML = "";
  practiceGroup.innerHTML = "";
  testingGroup.innerHTML = "";
  testingGroup.classList.add("testing-group");

  const makePill = (id, label, checked, disabled = false) => {
    const lab = document.createElement("label");
    lab.className = "pill";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = id;
    input.checked = checked;
    if (disabled) input.disabled = true;
    lab.appendChild(input);
    const span = document.createElement("span");
    span.textContent = label;
    lab.appendChild(span);
    return lab;
  };

  // Learning
  learningGroup.appendChild(makePill("pathomaToggle", "Pathoma", previous.pathoma));
  learningGroup.appendChild(makePill("bnbToggle", "Boards & Beyond", previous.bnb));
  learningGroup.appendChild(makePill("sketchyToggle", "Sketchy Micro", previous.sketchy));
  learningGroup.appendChild(makePill("ankiToggle", "Anki (daily)", previous.anki));

  // Practice
  practiceGroup.appendChild(makePill("uworldToggle", "UWorld Qbank", previous.uworld));
  practiceGroup.appendChild(makePill("ambossToggle", "Amboss Qbank", previous.amboss));

  // Testing
  const addHeading = (text) => {
    const h = document.createElement("div");
    h.className = "pill pill-heading";
    h.textContent = text;
    return h;
  };

  const testingByKind = (kind) => practiceExamCatalog.filter(e => e.group === "testing" && e.kind === kind);

  const addRow = (title, exams) => {
    const row = document.createElement("div");
    row.className = "pill-row";
    row.appendChild(addHeading(title));
    for (const exam of exams) {
      const pill = makePill(`exam-${exam.id}`, exam.label, exam.defaultChecked, false);
      row.appendChild(pill);
    }
    testingGroup.appendChild(row);
  };

  addRow("UWSA", testingByKind("uwsa"));
  addRow("NBME", testingByKind("nbme"));
  addRow("Free120", testingByKind("free"));

  els.pathomaToggle = document.getElementById("pathomaToggle");
  els.bnbToggle = document.getElementById("bnbToggle");
  els.sketchyToggle = document.getElementById("sketchyToggle");
  els.ankiToggle = document.getElementById("ankiToggle");
  els.uworldToggle = document.getElementById("uworldToggle");
  els.ambossToggle = document.getElementById("ambossToggle");
}

function getExamSelections() {
  const selections = [];
  for (const exam of practiceExamCatalog) {
    const input = document.getElementById(`exam-${exam.id}`);
    if (input && input.checked) selections.push(exam);
  }
  return selections;
}

function resetError(msg = "") {
  els.errorBox.textContent = msg;
}

function setFeasibility(status, tone) {
  if (!els.feasibilityChip) return;
  els.feasibilityChip.textContent = status;
  els.feasibilityChip.style.color = tone === "bad" ? "#ffd7d7" : "#c8ffe0";
  els.feasibilityChip.style.borderColor = tone === "bad" ? "#ff6b6b" : "#58d68d";
}

function pickLeastLoadedDay(slots, durationMinutes, windowEnd) {
  const candidates = slots
    .filter(d => d.date < windowEnd && (LIMIT_MINUTES_PER_DAY - d.usedMinutes) >= durationMinutes)
    .sort((a, b) => {
      if (a.usedMinutes !== b.usedMinutes) return a.usedMinutes - b.usedMinutes;
      return a.date - b.date;
    });
  return candidates[0] || null;
}

function buildChipTooltip(task) {
  const bits = [];
  if (task.label) bits.push(task.label);
  if (task.detail) bits.push(task.detail);
  if (task.videos && task.videos.length) bits.push(task.videos.join(", "));
  return bits.join(" — ");
}

function hasExam(day) {
  return day.tasks.some(t => t.type === "exam");
}

function getSortedDayKeys(dayMap) {
  return Array.from(dayMap.keys()).sort((a, b) => new Date(a) - new Date(b));
}

function renderDayNav(dayMap) {
  if (!els.dayNav || !els.dayLabel || !els.dayPrev || !els.dayNext) return;
  if (!dayMap || dayMap.size === 0) {
    els.dayLabel.textContent = "Select dates to start";
    els.dayPrev.disabled = true;
    els.dayNext.disabled = true;
    return;
  }

  const keys = getSortedDayKeys(dayMap);
  if (!selectedDayKey || !dayMap.has(selectedDayKey)) {
    selectedDayKey = keys[0];
  }
  const idx = keys.indexOf(selectedDayKey);
  const day = dayMap.get(selectedDayKey);
  els.dayLabel.textContent = day ? formatDateLabel(day.date) : "";
  els.dayPrev.disabled = idx <= 0;
  els.dayNext.disabled = idx === -1 || idx >= keys.length - 1;
}

function moveSelectedDay(dayMap, delta) {
  if (!dayMap || dayMap.size === 0) return;
  const keys = getSortedDayKeys(dayMap);
  if (!selectedDayKey || !dayMap.has(selectedDayKey)) {
    selectedDayKey = keys[0];
  }
  const idx = keys.indexOf(selectedDayKey);
  const nextIdx = idx + delta;
  if (nextIdx < 0 || nextIdx >= keys.length) return;
  selectedDayKey = keys[nextIdx];
  renderDayDetail(dayMap);
  renderCalendar(dayMap);
  renderDayNav(dayMap);
}

function buildDayMap(start, end, breakSet) {
  const map = new Map();
  for (const d of buildRange(start, end)) {
    const key = formatDateKey(d);
    const isBreak = breakSet.has(d.getDay());
    map.set(key, {
      date: d,
      tasks: [],
      usedMinutes: 0,
      isBreak
    });
  }
  return map;
}

function addTask(day, task) {
  const hydrated = { videos: [], ...task };
  hydrated.calendarLabel = hydrated.calendarLabel || hydrated.label;
  day.tasks.push(hydrated);
  day.usedMinutes += hydrated.durationMinutes || 0;
}

function addExamTask(day, label) {
  const short = label.includes("–") ? label.split("–")[0].trim() : label;
  addTask(day, {
    type: "exam",
    label,
    calendarLabel: short,
    durationMinutes: EXAM_MINUTES,
    detail: "Full-length practice exam with same-day review"
  });
}

function countPracticeBlocks(day) {
  return day.tasks.filter(t => t.type === "practice").length;
}

function hasVideoLearning(day) {
  return day.tasks.some(t => {
    const type = t.type || "learning";
    const label = (t.label || "").toLowerCase();
    return type === "learning" && !label.startsWith("anki");
  });
}

function markBreakDay(day) {
  if (!day) return false;
  if (hasExam(day)) return false; // do not break on exam days
  day.isBreak = true;
  day.tasks = [];
  day.usedMinutes = 0;
  addTask(day, { type: "buffer", label: "Buffer / Rest", durationMinutes: 0, detail: "Scheduled break" });
  return true;
}

function applyAutoBreaks(dayMap, start, exam) {
  if (!dayMap || dayMap.size === 0) return;
  // Reset break flags (keep exams intact)
  for (const day of dayMap.values()) {
    if (!hasExam(day)) {
      day.isBreak = false;
      day.tasks = day.tasks.filter(t => t.type === "exam");
      day.usedMinutes = day.tasks.reduce((s, t) => s + (t.durationMinutes || 0), 0);
    } else {
      day.isBreak = false;
    }
  }

  const days = Array.from(dayMap.values()).sort((a, b) => a.date - b.date);

  // Rule A: break every 4th non-exam day
  let counter = 0;
  for (const day of days) {
    if (hasExam(day)) continue;
    counter += 1;
    if (counter === 4) {
      markBreakDay(day);
      counter = 0;
    }
  }

  // Rule B: at least one break per week
  let weekStart = startOfWeekSunday(start);
  while (weekStart <= exam) {
    const weekEnd = addDays(weekStart, 6);
    const weekDays = days.filter(d => d.date >= weekStart && d.date <= weekEnd);
    const hasBreak = weekDays.some(d => d.isBreak);
    if (!hasBreak) {
      const candidate = weekDays.find(d => !hasExam(d));
      if (candidate) markBreakDay(candidate);
    }
    weekStart = addDays(weekEnd, 1);
  }

  // Rule C: day after each exam is a break if possible
  const examDays = days.filter(d => hasExam(d));
  for (const ed of examDays) {
    const after = addDays(ed.date, 1);
    const key = formatDateKey(after);
    const day = dayMap.get(key);
    if (day && !hasExam(day)) markBreakDay(day);
  }
}

function totalMinutesForResource(resource) {
  return resource.reduce((sum, entry) => {
    if (entry.chapters) {
      return sum + entry.chapters.reduce((s, ch) => s + (ch.videos || []).reduce((sv, v) => sv + (v.duration || 0), 0), 0);
    }
    if (entry.sections) {
      return sum + entry.sections.reduce((s, sec) => s + sec.duration, 0);
    }
    return sum;
  }, 0);
}

function findSystemBlock(data, systemName) {
  return data.find(s => s.system === systemName);
}

function buildSystemQueue(systemName, flags) {
  const queue = [];
  if (flags.pathoma) {
    const sys = findSystemBlock(pathomaData, systemName);
    if (sys) {
      for (const ch of sys.chapters || []) {
        for (const v of ch.videos || []) {
          queue.push({
            type: "learning",
            label: `Pathoma – ${v.title}`,
            calendarLabel: "Pathoma",
            durationMinutes: v.duration,
            detail: `${ch.title} (${v.id})`,
            videos: [`${v.id} ${v.title}`],
            system: systemName
          });
        }
      }
    }
  }
  if (flags.bnb) {
    const sys = findSystemBlock(bnbData, systemName);
    if (sys) {
      for (const ch of sys.chapters || []) {
        for (const v of ch.videos || []) {
          queue.push({
            type: "learning",
            label: `Boards & Beyond – ${v.title}`,
            calendarLabel: "BnB",
            durationMinutes: v.duration,
            detail: ch.title ? `${ch.title}${v.id ? ` (${v.id})` : ""}` : v.title,
            videos: [v.id ? `${v.id} ${v.title}` : v.title],
            system: systemName
          });
        }
      }
    }
  }
  if (flags.sketchy) {
    const sys = findSystemBlock(sketchyData, systemName);
    if (sys) {
      for (const sec of sys.sections || []) {
        queue.push({
          type: "learning",
          label: `Sketchy – ${sec.name}`,
          calendarLabel: "Sketchy",
          durationMinutes: sec.duration,
          detail: `${systemName} • ${sec.name}`,
          videos: sec.videos,
          system: systemName
        });
      }
    }
  }
  return queue;
}

function getStudyDays(dayMap) {
  return Array.from(dayMap.values())
    .filter(d => !d.isBreak && !hasExam(d))
    .sort((a, b) => a.date - b.date);
}

function nextSaturdayOnOrAfter(date) {
  const d = new Date(date);
  const offset = (6 - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + offset);
  return d;
}

function saturdayOnOrBefore(date) {
  const d = new Date(date);
  const offset = (d.getDay() + 7 - 6) % 7;
  d.setDate(d.getDate() - offset);
  return d;
}

function getBreakDowSet() {
  // Breaks are auto-generated; user checkboxes are ignored.
  return new Set();
}

function renderStats(stats) {
  const parts = [
    { label: "Total calendar", value: `${stats.totalDays} days` },
    { label: "Study days", value: `${stats.studyDays} days` },
    { label: "Total work", value: `${stats.totalHours.toFixed(1)} hours` },
    { label: "Avg/day", value: `${stats.avgPerDay.toFixed(1)} hours` }
  ];
  els.overview.innerHTML = parts
    .map(p => `<div class="stat"><div class="label">${p.label}</div><div class="value">${p.value}</div></div>`)  
    .join("");
}

function renderDayDetail(dayMap) {
  if (!els.dayDetail) return;
  if (!dayMap || dayMap.size === 0) {
    els.dayDetail.innerHTML = '<div class="schedule-empty">Generate a plan to view a day.</div>';
    return;
  }
  const day = dayMap.get(selectedDayKey || Array.from(dayMap.keys())[0]);
  if (!day) {
    els.dayDetail.innerHTML = '<div class="schedule-empty">Select a day from the calendar.</div>';
    return;
  }
  const dateLabel = formatDateLabel(day.date);
  const metaParts = [];
  if (day.isBreak) metaParts.push("Break day");
  if (day.usedMinutes > 0) metaParts.push(minutesToHuman(day.usedMinutes));
  const meta = metaParts.join(" • ");

  if (!selectedDayKey) selectedDayKey = formatDateKey(day.date);

  const isExamDay = hasExam(day);
  const orderedTasks = isExamDay
    ? day.tasks.filter(t => t.type === "exam")
    : (() => {
        const learning = [];
        const practice = [];
        const buffer = [];
        const other = [];
        for (const t of day.tasks) {
          const type = t.type || "learning";
          if (type === "exam") continue;
          if (type === "learning") learning.push(t);
          else if (type === "practice") practice.push(t);
          else if (type === "buffer") buffer.push(t);
          else other.push(t);
        }

        const byLabel = (a, b) => (a.calendarLabel || a.label || "").localeCompare(b.calendarLabel || b.label || "");
        learning.sort((a, b) => {
          const aAnki = (a.label || "").toLowerCase().startsWith("anki");
          const bAnki = (b.label || "").toLowerCase().startsWith("anki");
          if (aAnki !== bAnki) return aAnki ? -1 : 1;
          return byLabel(a, b);
        });
        practice.sort(byLabel);
        buffer.sort(byLabel);
        other.sort(byLabel);
        return [...learning, ...practice, ...buffer, ...other];
      })();

  if (!orderedTasks || orderedTasks.length === 0) {
    els.dayDetail.innerHTML = `
      <div class="day-detail-header">
        <div class="day-detail-title">${escapeHtml(dateLabel)}</div>
        <div class="day-detail-meta">${escapeHtml(meta || "No tasks")}</div>
      </div>
      <div class="day-detail-empty">No tasks assigned.</div>
    `;
    return;
  }

  const items = orderedTasks.map(t => {
    const duration = t.durationMinutes ? minutesToHuman(t.durationMinutes) : "";
    const tagLabel = t.type === "exam" ? "Exam" : t.type === "practice" ? "Practice" : t.type === "buffer" ? "Buffer" : "Learning";
    const tag = `<span class="tag ${t.type || "learning"}">${escapeHtml(tagLabel)}</span>`;
    const note = t.detail ? `<div class="day-detail-note">${escapeHtml(t.detail)}</div>` : "";
    const videos = t.videos && t.videos.length
      ? `<ul class="day-detail-videos">${t.videos.map(v => `<li>${escapeHtml(v)}</li>`).join("")}</ul>`
      : "";

    return `<li class="day-detail-item">
      <div class="day-detail-info">
        <div class="day-detail-title-row">${tag}<span class="day-detail-name">${escapeHtml(t.label)}</span></div>
        ${note}
        ${videos}
      </div>
      <span class="day-detail-minutes">${escapeHtml(duration)}</span>
    </li>`;
  }).join("");

  els.dayDetail.innerHTML = `
    <div class="day-detail-header">
      <div class="day-detail-title">${escapeHtml(dateLabel)}</div>
      <div class="day-detail-meta">${escapeHtml(meta || "")}</div>
    </div>
    <ul class="day-detail-list">${items}</ul>
  `;
}

function renderCalendar(dayMap) {
  if (!els.weeklyCalendar) return;
  if (!dayMap || dayMap.size === 0) {
    els.weeklyCalendar.innerHTML = '<div class="schedule-empty">Generate a plan to see the weekly calendar.</div>';
    if (els.calRange) els.calRange.textContent = "";
    return;
  }

  const days = Array.from(dayMap.values()).sort((a, b) => a.date - b.date);
  const planStart = days[0].date;
  const planEnd = days[days.length - 1].date;
  if (!selectedDayKey || !dayMap.has(selectedDayKey)) {
    selectedDayKey = formatDateKey(planStart);
  }
  if (!calendarWeekStart || calendarWeekStart < startOfWeekSunday(planStart) || calendarWeekStart > startOfWeekSunday(planEnd)) {
    calendarWeekStart = startOfWeekSunday(planStart);
  }

  const weekStart = calendarWeekStart;
  const weekEnd = addDays(weekStart, 6);
  if (els.calRange) els.calRange.textContent = formatWeekRangeLabel(weekStart, weekEnd);

  const dowLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const parts = [];
  parts.push('<div class="calendar-dow-grid">');
  for (const label of dowLabels) parts.push(`<div class="calendar-dow">${escapeHtml(label)}</div>`);
  parts.push('</div>');
  parts.push('<div class="calendar-day-grid">');

  const todayKey = formatDateKey(new Date());
  for (let i = 0; i < 7; i++) {
    const date = addDays(weekStart, i);
    const key = formatDateKey(date);
    const day = dayMap.get(key);
    const cls = ["calendar-cell"];
    if (key === todayKey) cls.push("today");
    if (day?.isBreak) cls.push("break");
    if (key === selectedDayKey) cls.push("selected");

    const dateLabel = date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    const chips = [];
    if (day) {
      const tasks = day.tasks || [];

      const groupMap = new Map();
      for (const t of tasks) {
        const keyPart = `${t.type || "learning"}|${t.calendarLabel || t.label}`;
        if (!groupMap.has(keyPart)) {
          groupMap.set(keyPart, { type: t.type || "learning", label: t.calendarLabel || t.label, entries: [] });
        }
        groupMap.get(keyPart).entries.push(t);
      }

      const grouped = Array.from(groupMap.values());
      for (const g of grouped) {
        const tooltipLines = g.entries.map(entry => {
          const parts = [entry.label];
          if (entry.detail) parts.push(entry.detail);
          if (entry.videos && entry.videos.length) parts.push(entry.videos.join(", "));
          if (entry.durationMinutes) parts.push(minutesToHuman(entry.durationMinutes));
          return parts.filter(Boolean).join(" — ");
        });
        const tooltip = tooltipLines.join("\n");
        const countSuffix = g.entries.length > 1 ? ` ×${g.entries.length}` : "";
        const titleAttr = tooltip ? ` title="${escapeHtml(tooltip)}"` : "";
        chips.push(`<span class="calendar-chip ${g.type}"${titleAttr}>${escapeHtml(g.label + countSuffix)}</span>`);
      }

      // Leave empty when there are no tasks for the day.
    }

    parts.push(`<div class="${cls.join(" ")}" data-day-key="${key}">`);
    parts.push(`<div class="calendar-date">${escapeHtml(dateLabel)}</div>`);
    parts.push('<div class="calendar-events">');
    parts.push(chips.join(""));
    parts.push('</div>');
    parts.push('</div>');
  }

  parts.push('</div>');
  els.weeklyCalendar.innerHTML = parts.join("");

  const cells = els.weeklyCalendar.querySelectorAll('[data-day-key]');
  cells.forEach(cell => {
    cell.addEventListener("click", () => {
      const key = cell.getAttribute("data-day-key");
      if (!key) return;
      selectedDayKey = key;
      renderDayDetail(dayMap);
      renderCalendar(dayMap);
      renderDayNav(dayMap);
    });
  });
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function formatIcsDate(date) {
  return `${date.getFullYear()}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}`;
}

function formatIcsTimestamp(now) {
  return `${now.getUTCFullYear()}${pad2(now.getUTCMonth() + 1)}${pad2(now.getUTCDate())}T${pad2(now.getUTCHours())}${pad2(now.getUTCMinutes())}${pad2(now.getUTCSeconds())}Z`;
}

function icsEscape(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

function buildIcs(dayMap) {
  if (!dayMap || dayMap.size === 0) return "";
  const now = new Date();
  const dtstamp = formatIcsTimestamp(now);
  const lines = [];

  lines.push("BEGIN:VCALENDAR");
  lines.push("VERSION:2.0");
  lines.push("PRODID:-//Step1 Planner//EN");
  lines.push("CALSCALE:GREGORIAN");
  lines.push("METHOD:PUBLISH");
  lines.push("X-WR-CALNAME:Step 1 Study Plan");

  const sorted = Array.from(dayMap.values()).sort((a, b) => a.date - b.date);
  sorted.forEach((day, idx) => {
    const dtstart = formatIcsDate(day.date);
    const dtend = formatIcsDate(addDays(day.date, 1));
    const uid = `step1-${dtstart}-${idx}@planner`;
    const summary = day.isBreak
      ? "Break / Buffer"
      : (day.tasks.length > 0 ? `Study – ${day.tasks.length} task${day.tasks.length === 1 ? "" : "s"}` : "Study placeholder");

    const descLines = [];
    if (day.tasks.length > 0) {
      for (const t of day.tasks) {
        const detail = t.detail ? `: ${t.detail}` : "";
        descLines.push(`- ${t.label}${detail}`);
      }
    } else if (day.isBreak) {
      descLines.push("Buffer / Rest day");
    } else {
      descLines.push("No tasks scheduled");
    }

    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${icsEscape(uid)}`);
    lines.push(`DTSTAMP:${dtstamp}`);
    lines.push(`DTSTART;VALUE=DATE:${dtstart}`);
    lines.push(`DTEND;VALUE=DATE:${dtend}`);
    lines.push(`SUMMARY:${icsEscape(summary)}`);
    if (descLines.length > 0) lines.push(`DESCRIPTION:${icsEscape(descLines.join("\n"))}`);
    lines.push("END:VEVENT");
  });

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

function downloadIcsFile() {
  if (!currentPlan || !currentPlan.dayMap || currentPlan.dayMap.size === 0) {
    resetError("Generate a schedule before downloading the calendar.");
    return;
  }
  const ics = buildIcs(currentPlan.dayMap);
  if (!ics) {
    resetError("Nothing to export. Generate a schedule first.");
    return;
  }
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "step1-study-plan.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function generatePlan() {
  resetError();
  if (!resourcesReady) {
    resetError("Study content is still loading. Please try again in a moment.");
    return;
  }
  const startVal = els.startDate.value;
  const examVal = els.examDate.value;
  if (!startVal || !examVal) {
    resetError("Please set both start and exam dates.");
    return;
  }
  const start = new Date(`${startVal}T00:00:00`);
  const exam = new Date(`${examVal}T00:00:00`);
  if (exam < start) {
    resetError("Exam date must be on or after the start date.");
    return;
  }
  const flags = {
    pathoma: els.pathomaToggle?.checked ?? true,
    bnb: els.bnbToggle?.checked ?? false,
    sketchy: els.sketchyToggle?.checked ?? false,
    anki: els.ankiToggle?.checked ?? true,
    uworld: els.uworldToggle?.checked ?? true,
    amboss: els.ambossToggle?.checked ?? false
  };
  const examSelections = getExamSelections();
  const hasPracticeBanks = flags.uworld || flags.amboss;
  const hasTesting = examSelections.length > 0;
  const hasLearningResources = flags.pathoma || flags.bnb || flags.sketchy || flags.anki;
  const isLearningOnly = hasLearningResources && !hasPracticeBanks && !hasTesting;

  const practiceWindowEnd = exam; // allow practice through the full range; exams will reserve specific days
  const learningWindowEnd = exam; // allow learning through the full range

  const totalDays = Math.floor((exam - start) / (24 * 60 * 60 * 1000)) + 1;
  const breakSet = getBreakDowSet();
  const dayMap = buildDayMap(start, exam, breakSet);

  // Breaks are auto-assigned later; initialize with none.

  // Capture exam selections (place exams before learning/practice)
  const free120Date = addDays(exam, -3);
  const uwsa2Date = addDays(exam, -10);
  const nbme32Date = addDays(exam, -7);
  const lastTenStart = addDays(exam, -10);
  const selected = [...examSelections];

  const examOrder = [
    "uwsa1",
    "nbme26",
    "nbme27",
    "uwsa3",
    "nbme28",
    "nbme29",
    "nbme30",
    "free120old",
    "nbme31",
    "uwsa2",
    "nbme32",
    "free120"
  ];
  const orderIndex = Object.fromEntries(examOrder.map((id, idx) => [id, idx]));
  const orderedSelected = selected
    .slice()
    .sort((a, b) => (orderIndex[a.id] ?? 999) - (orderIndex[b.id] ?? 999));

  const fixedIds = new Set(["free120", "uwsa2", "nbme32"]);
  const fixedDateExams = orderedSelected.filter(e => fixedIds.has(e.id));
  const remainingExams = orderedSelected.filter(e => !fixedIds.has(e.id));

  const placeExamFixed = (desiredDate, label) => {
    const windowStart = lastTenStart;
    const windowEnd = addDays(exam, -1);
    let cur = desiredDate;
    // Try desired date, then shift earlier within last 10 days, then later within window
    const tryPlace = (d) => {
      const key = formatDateKey(d);
      const day = dayMap.get(key);
      if (day && !day.isBreak && !hasExam(day)) {
        day.tasks = [];
        day.usedMinutes = 0;
        addExamTask(day, label);
        return true;
      }
      return false;
    };

    if (tryPlace(cur)) return true;
    // shift earlier first
    cur = addDays(desiredDate, -1);
    while (cur >= windowStart) {
      if (tryPlace(cur)) return true;
      cur = addDays(cur, -1);
    }
    // then shift later
    cur = addDays(desiredDate, 1);
    while (cur <= windowEnd) {
      if (tryPlace(cur)) return true;
      cur = addDays(cur, 1);
    }
    return false;
  };

  for (const examSel of fixedDateExams) {
    if (examSel.id === "free120") placeExamFixed(free120Date, "Free 120 – 3 days out");
    else if (examSel.id === "uwsa2") placeExamFixed(uwsa2Date, "UWSA 2 – 10 days out");
    else if (examSel.id === "nbme32") placeExamFixed(nbme32Date, "NBME 32 – 7 days out");
  }

  // Auto-assign breaks (every 4th day, at least 1/week, day after exams)
  applyAutoBreaks(dayMap, start, exam);

  // Protect the day before the exam as a break if possible
  const dayBeforeExamKey = formatDateKey(addDays(exam, -1));
  const dayBeforeExam = dayMap.get(dayBeforeExamKey);
  const nonExamStudyDays = Array.from(dayMap.values()).filter(d => !hasExam(d)).length;
  if (dayBeforeExam && nonExamStudyDays > 1) markBreakDay(dayBeforeExam);

  const breakDays = Array.from(dayMap.values()).filter(d => d.isBreak).length;
  const studyDayCount = totalDays - breakDays;
  if (studyDayCount <= 0) {
    resetError("All days are breaks. Adjust your dates to allow study days.");
    return;
  }

  const studySlots = getStudyDays(dayMap).filter(d => d.date < learningWindowEnd);
  const studyWindowDays = studySlots.length + examSelections.length;

  if (studySlots.length === 0) {
    setFeasibility("Not feasible (no study days)", "bad");
    resetError("No available study days in the selected window. Extend your dates or relax break days.");
    return;
  }

  const resourceMinutes = (flags.pathoma ? totalMinutesForResource(pathomaData) : 0)
    + (flags.bnb ? totalMinutesForResource(bnbData) : 0)
    + (flags.sketchy ? totalMinutesForResource(sketchyData) : 0);
  const ankiMinutesTotal = flags.anki ? studySlots.length * ANKI_MINUTES : 0;
  const uworldMinutesTotal = flags.uworld ? UWORLD_TOTAL_MINUTES : 0;
  const ambossMinutesTotal = flags.amboss ? AMBOSS_TOTAL_MINUTES : 0;
  const examMinutesTotal = examSelections.length * EXAM_MINUTES;
  const totalHours = (resourceMinutes + ankiMinutesTotal + uworldMinutesTotal + ambossMinutesTotal + examMinutesTotal) / 60;
  const avgPerDay = totalHours / studyWindowDays;

  renderStats({ totalDays, studyDays: studyWindowDays, totalHours, avgPerDay });

  if (avgPerDay > 12) {
    setFeasibility("Not feasible (>12h/day)", "bad");
    resetError("Plan not feasible (>12h/day). Try unchecking 'Boards & Beyond', 'Sketchy', or extending your date range.");
    return;
  }
  setFeasibility("Feasible", "good");

  if (flags.anki) {
    for (const day of studySlots) {
      addTask(day, {
        type: "learning",
        label: "Anki",
        calendarLabel: "Anki",
        durationMinutes: ANKI_MINUTES,
        detail: "Spaced repetition (user-selected decks)"
      });
    }
  }

  const learningQueue = [];
  for (const systemName of SYSTEM_ORDER) {
    const queue = buildSystemQueue(systemName, flags);
    for (const item of queue) learningQueue.push(item);
  }

  const learningDays = [...studySlots]; // already sorted chronologically
  const videoMinutesTotal = learningQueue.reduce((s, t) => s + (t.durationMinutes || 0), 0);
  const learningDayCount = learningDays.length;
  if (learningDayCount === 0) {
    setFeasibility("Not feasible (no learning days)", "bad");
    resetError("No study days available for learning tasks.");
    return;
  }

  const videoTarget = VIDEO_TARGET_MINUTES;

  // Sequentially place learning in order with per-day target; do not reshuffle
  let dayIdx = 0;
  while (learningQueue.length > 0 && dayIdx < learningDays.length) {
    const day = learningDays[dayIdx];
    let remaining = LIMIT_MINUTES_PER_DAY - day.usedMinutes;
    let videoUsed = day.tasks
      .filter(t => (t.videos && t.videos.length) || (t.calendarLabel && ["Pathoma", "BnB", "Sketchy"].includes(t.calendarLabel)))
      .reduce((s, t) => s + (t.durationMinutes || 0), 0);

    while (learningQueue.length > 0) {
      const next = learningQueue[0];
      const isVideo = (next.videos && next.videos.length) || (next.calendarLabel && ["Pathoma", "BnB", "Sketchy"].includes(next.calendarLabel));
      const targetBudget = isVideo ? videoTarget : Infinity;
      const wouldExceedVideoBudget = isVideo && (videoUsed + next.durationMinutes > targetBudget) && videoUsed > 0;

      if (next.durationMinutes <= remaining && (!isVideo || !wouldExceedVideoBudget || videoUsed === 0)) {
        addTask(day, next);
        remaining -= next.durationMinutes;
        if (isVideo) videoUsed += next.durationMinutes;
        learningQueue.shift();
      } else {
        break; // move to the next day to keep order intact and balanced
      }
    }

    dayIdx++;
  }

  if (learningQueue.length > 0) {
    setFeasibility("Not feasible (learning overflow)", "bad");
    resetError("Ran out of study days while scheduling learning. Extend your dates or deselect a resource. Exams and practice are still placed where possible.");
  }

  // Distribute remaining exams weekly (at least one per week if available slots), outside the last-10-day fixed window
  const examEndLimit = addDays(exam, -11); // leave last 10 days to fixed exams
  const weeks = [];
  let cursor = new Date(start);
  while (cursor <= examEndLimit) {
    const weekStart = new Date(cursor);
    const weekEnd = addDays(weekStart, 6);
    weeks.push({ start: weekStart, end: weekEnd });
    cursor = addDays(weekEnd, 1);
  }

  const pickExamDayInWeek = (week) => {
    const sat = saturdayOnOrBefore(week.end);
    const candidates = buildRange(week.start, week.end)
      .map(d => dayMap.get(formatDateKey(d)))
      .filter(Boolean)
      .filter(d => !d.isBreak && !hasExam(d) && d.date <= examEndLimit);
    if (candidates.length === 0) return null;
    const satDay = candidates.find(d => formatDateKey(d.date) === formatDateKey(sat));
    return satDay || candidates[candidates.length - 1];
  };

  const remainingExamsQueue = [...remainingExams];
  for (const week of weeks) {
    if (remainingExamsQueue.length === 0) break;
    const day = pickExamDayInWeek(week);
    if (!day) continue;
    const exam = remainingExamsQueue.shift();
    day.tasks = [];
    day.usedMinutes = 0;
    addExamTask(day, `${exam.label} – Weekend assessment`);
  }

  // If any exams still left, place them on earliest available study days before exam
  if (remainingExamsQueue.length > 0) {
    const spillCandidates = buildRange(start, addDays(exam, -1))
      .map(d => dayMap.get(formatDateKey(d)))
      .filter(Boolean)
      .filter(d => !d.isBreak && !hasExam(d));
    for (const exam of remainingExamsQueue) {
      const target = spillCandidates.shift();
      if (target) {
        target.tasks = [];
        target.usedMinutes = 0;
        addExamTask(target, `${exam.label} – Assessment`);
      }
    }
  }

  const practicePools = [];
  if (flags.uworld) {
    practicePools.push({ id: "uworld", label: "UWorld Block", calendarLabel: "UWorld", duration: UWORLD_BLOCK_MINUTES, blocks: UWORLD_TOTAL_BLOCKS, total: UWORLD_TOTAL_BLOCKS, detail: "40 questions with full review; choose your topic" });
  }
  if (flags.amboss) {
    practicePools.push({ id: "amboss", label: "Amboss Block", calendarLabel: "Amboss", duration: AMBOSS_BLOCK_MINUTES, blocks: AMBOSS_TOTAL_BLOCKS, total: AMBOSS_TOTAL_BLOCKS, detail: "40 questions with full review; choose your topic" });
  }

  const takePracticeBlock = () => {
    const pool = practicePools.find(p => p.blocks > 0);
    if (!pool) return null;
    pool.blocks -= 1;
    const used = pool.total - pool.blocks;
    return {
      label: `${pool.label} ${used}`,
      calendarLabel: pool.calendarLabel,
      durationMinutes: pool.duration,
      detail: pool.detail,
      sourceId: pool.id
    };
  };

  const practiceBlocksRemaining = () => practicePools.reduce((s, p) => s + p.blocks, 0);

  if (practicePools.length > 0) {
    const perDayMax = (day) => (hasVideoLearning(day) ? 1 : MAX_PRACTICE_BLOCKS_PER_DAY);

    // While learning is ongoing, ensure at least one block per study day if available (respect per-day max)
    for (const day of learningDays) {
      if (practiceBlocksRemaining() <= 0) break;
      const practiceCount = countPracticeBlocks(day);
      const dayMax = perDayMax(day);
      const hasCapacity = (LIMIT_MINUTES_PER_DAY - day.usedMinutes) >= UWORLD_BLOCK_MINUTES;
      if (practiceCount < dayMax && hasCapacity) {
        const block = takePracticeBlock();
        if (block) addTask(day, { type: "practice", ...block });
      }
    }

    // Distribute remaining blocks evenly with per-day max rule
    const practiceSlots = getStudyDays(dayMap).filter(d => d.date < practiceWindowEnd);
    while (practiceBlocksRemaining() > 0) {
      const pool = practicePools.find(p => p.blocks > 0);
      if (!pool) break;
      const slots = practiceSlots
        .filter(d => countPracticeBlocks(d) < perDayMax(d))
        .filter(d => (LIMIT_MINUTES_PER_DAY - d.usedMinutes) >= pool.duration)
        .sort((a, b) => {
          const aC = countPracticeBlocks(a);
          const bC = countPracticeBlocks(b);
          if (aC !== bC) return aC - bC;
          if (a.usedMinutes !== b.usedMinutes) return a.usedMinutes - b.usedMinutes;
          return a.date - b.date;
        });
      const targetDay = slots[0];
      if (!targetDay) {
        setFeasibility("Not feasible (practice overflow)", "bad");
        resetError("Ran out of study days for practice blocks. Extend your dates or deselect a practice bank.");
        currentPlan = { dayMap, start, exam };
        renderDayDetail(dayMap);
        renderCalendar(dayMap);
        renderDayNav(dayMap);
        return;
      }
      const block = takePracticeBlock();
      if (!block) break;
      addTask(targetDay, { type: "practice", ...block });
    }
  }

  currentPlan = { dayMap, start, exam };
  calendarWeekStart = calendarWeekStart || startOfWeekSunday(start);
  renderDayDetail(dayMap);
  renderCalendar(dayMap);
  renderDayNav(dayMap);
}

const triggerPlan = async () => {
  try {
    await loadResourceData();
  } catch (err) {
    resetError("Failed to load study content. Refresh the page and try again.");
    return;
  }
  generatePlan();
};

els.generateBtn.addEventListener("click", triggerPlan);
if (els.downloadIcs) els.downloadIcs.addEventListener("click", downloadIcsFile);
if (els.calPrev) els.calPrev.addEventListener("click", () => {
  if (!calendarWeekStart) calendarWeekStart = startOfWeekSunday(new Date());
  calendarWeekStart = addDays(calendarWeekStart, -7);
  renderCalendar(currentPlan?.dayMap);
});
if (els.calNext) els.calNext.addEventListener("click", () => {
  if (!calendarWeekStart) calendarWeekStart = startOfWeekSunday(new Date());
  calendarWeekStart = addDays(calendarWeekStart, 7);
  renderCalendar(currentPlan?.dayMap);
});
if (els.calToday) els.calToday.addEventListener("click", () => {
  calendarWeekStart = startOfWeekSunday(new Date());
  renderCalendar(currentPlan?.dayMap);
});
if (els.dayPrev) els.dayPrev.addEventListener("click", () => moveSelectedDay(currentPlan?.dayMap, -1));
if (els.dayNext) els.dayNext.addEventListener("click", () => moveSelectedDay(currentPlan?.dayMap, 1));
for (const cb of els.breakBoxes) {
  cb.addEventListener("change", () => triggerPlan());
}

if (!els.startDate.value) {
  const today = new Date();
  els.startDate.value = formatDateKey(today);
  els.examDate.value = "";
}

renderDayDetail(new Map());
renderCalendar(new Map());
renderDayNav(new Map());

loadResourceData().finally(() => {
  renderResourceToggles();
});
