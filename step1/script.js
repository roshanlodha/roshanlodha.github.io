const pathomaData = [
  {
    system: "Fundamentals",
    chapters: [
      { id: 1, title: "Growth Adaptations", duration: 29, videos: ["1.1 Growth Adaptations", "1.2 Cellular Injury", "1.3 Cell Death", "1.4 Free Radical Injury", "1.5 Apoptosis"] },
      { id: 2, title: "Inflammation", duration: 45, videos: ["2.1 Acute Inflammation", "2.2 Chronic Inflammation", "2.3 Wound Healing"] },
      { id: 3, title: "Neoplasia", duration: 39, videos: ["3.1 Neoplasia Basics", "3.2 Carcinogenesis", "3.3 Tumor Progression"] }
    ]
  },
  {
    system: "Hematology",
    chapters: [
      { id: 4, title: "Hemostasis", duration: 30, videos: ["4.1 Primary Hemostasis", "4.2 Secondary Hemostasis"] },
      { id: 5, title: "Red Blood Cell Disorders", duration: 55, videos: ["5.1 Anemia Basics", "5.2 Microcytic Anemias", "5.3 Macrocytic Anemias", "5.4 Normocytic Anemias"] },
      { id: 6, title: "White Blood Cell Disorders", duration: 40, videos: ["6.1 Leukopenia", "6.2 Leukocytosis", "6.3 Acute Leukemia"] }
    ]
  },
  {
    system: "Cardiovascular",
    chapters: [
      { id: 7, title: "Vascular Pathology", duration: 35, videos: ["7.1 Vasculitis", "7.2 Hypertension", "7.3 Arteriosclerosis"] },
      { id: 8, title: "Cardiac Pathology", duration: 50, videos: ["8.1 Ischemic Heart Disease", "8.2 Congestive Heart Failure", "8.3 Valvular Disorders"] }
    ]
  },
  {
    system: "Respiratory",
    chapters: [
      { id: 9, title: "Respiratory Pathology", duration: 45, videos: ["9.1 Nasopharynx", "9.2 Larynx", "9.3 Pneumonia", "9.4 COPD", "9.5 Restrictive Lung Disease"] }
    ]
  },
  {
    system: "Gastrointestinal",
    chapters: [
      { id: 10, title: "GI Pathology", duration: 60, videos: ["10.1 Oral Cavity", "10.2 Esophagus", "10.3 Stomach", "10.4 Small Bowel"] },
      { id: 11, title: "Exocrine Pancreas, Gallbladder, Liver", duration: 55, videos: ["11.1 Pancreas", "11.2 Gallbladder", "11.3 Liver Hepatitis"] }
    ]
  },
  {
    system: "Renal",
    chapters: [
      { id: 12, title: "Renal Pathology", duration: 50, videos: ["12.1 Acute Renal Failure", "12.2 Nephrotic Syndrome", "12.3 Nephritic Syndrome"] }
    ]
  },
  {
    system: "Reproductive",
    chapters: [
      { id: 13, title: "Female Genital System", duration: 45, videos: ["13.1 Vulva/Vagina", "13.2 Cervix", "13.3 Uterus"] },
      { id: 14, title: "Male Genital System", duration: 30, videos: ["14.1 Penis", "14.2 Testicle", "14.3 Prostate"] },
      { id: 16, title: "Breast", duration: 25, videos: ["16.1 Breast Imaging", "16.2 Inflammatory Conditions", "16.3 Carcinoma"] }
    ]
  },
  {
    system: "Endocrine",
    chapters: [
      { id: 15, title: "Endocrine Pathology", duration: 40, videos: ["15.1 Pituitary", "15.2 Thyroid", "15.3 Adrenal Cortex"] }
    ]
  },
  {
    system: "Neurology",
    chapters: [
      { id: 17, title: "CNS Pathology", duration: 50, videos: ["17.1 Developmental Anomalies", "17.2 Trauma", "17.3 Cerebrovascular Disease"] }
    ]
  },
  {
    system: "Musculoskeletal/Derm",
    chapters: [
      { id: 18, title: "Musculoskeletal Pathology", duration: 35, videos: ["18.1 Skeletal Muscle", "18.2 Bone Structure", "18.3 Bone Tumors"] },
      { id: 19, title: "Dermatopathology", duration: 30, videos: ["19.1 Skin Inflammatory", "19.2 Blistering Disorders", "19.3 Skin Tumors"] }
    ]
  }
];

const practiceExamCatalog = [
  { id: "nbme25", label: "NBME 25", mandatory: false, defaultChecked: true, kind: "nbme", order: 25, group: "practice" },
  { id: "uwsa1", label: "UWSA 1", mandatory: false, defaultChecked: false, kind: "uwsa", order: 1, group: "practice" },
  { id: "uwsa2", label: "UWSA 2", mandatory: false, defaultChecked: false, kind: "uwsa", order: 2, group: "practice" },
  { id: "uwsa3", label: "UWSA 3", mandatory: false, defaultChecked: false, kind: "uwsa", order: 3, group: "practice" },
  { id: "nbme26", label: "NBME 26", mandatory: true, defaultChecked: true, kind: "nbme", order: 26, group: "testing" },
  { id: "nbme27", label: "NBME 27", mandatory: true, defaultChecked: true, kind: "nbme", order: 27, group: "testing" },
  { id: "nbme28", label: "NBME 28", mandatory: true, defaultChecked: true, kind: "nbme", order: 28, group: "testing" },
  { id: "nbme29", label: "NBME 29", mandatory: true, defaultChecked: true, kind: "nbme", order: 29, group: "testing" },
  { id: "nbme30", label: "NBME 30", mandatory: true, defaultChecked: true, kind: "nbme", order: 30, group: "testing" },
  { id: "nbme31", label: "NBME 31", mandatory: true, defaultChecked: true, kind: "nbme", order: 31, group: "testing" },
  { id: "free120", label: "Free 120", mandatory: true, defaultChecked: true, kind: "free", order: 120, group: "testing" }
];

const els = {
  startDate: document.getElementById("startDate"),
  examDate: document.getElementById("examDate"),
  generateBtn: document.getElementById("generateBtn"),
  errorBox: document.getElementById("errorBox"),
  overview: document.getElementById("overviewStats"),
  feasibilityChip: document.getElementById("feasibilityChip"),
  quickFill: document.getElementById("quickFill"),
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
  pathomaToggle: null,
  uworldToggle: null
};

const LIMIT_MINUTES_PER_DAY = 12 * 60;
const UWORLD_TOTAL_Q = 4000;
const UWORLD_MIN_PER_Q = (200 * 60) / UWORLD_TOTAL_Q; // 3 minutes per question
const EXAM_MINUTES = 8 * 60;
const PATHOMA_TOTAL_HOURS = 35;

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

function renderExamToggles() {
  const { learningGroup, practiceGroup, testingGroup } = els;
  if (!learningGroup || !practiceGroup || !testingGroup) return;

  learningGroup.innerHTML = "";
  practiceGroup.innerHTML = "";
  testingGroup.innerHTML = "";

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
  const pathomaPill = makePill("pathomaToggle", "Pathoma", true, false);
  learningGroup.appendChild(pathomaPill);

  // Practice
  const uworldPill = makePill("uworldToggle", "UWorld Qbank", true, false);
  practiceGroup.appendChild(uworldPill);
  for (const exam of practiceExamCatalog.filter(e => e.group === "practice")) {
    const pill = makePill(`exam-${exam.id}`, exam.label, exam.defaultChecked, false);
    practiceGroup.appendChild(pill);
  }

  // Testing
  for (const exam of practiceExamCatalog.filter(e => e.group === "testing")) {
    const pill = makePill(`exam-${exam.id}`, exam.label, exam.defaultChecked, false);
    testingGroup.appendChild(pill);
  }

  els.pathomaToggle = document.getElementById("pathomaToggle");
  els.uworldToggle = document.getElementById("uworldToggle");
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
  els.feasibilityChip.textContent = status;
  els.feasibilityChip.style.color = tone === "bad" ? "#ffd7d7" : "#c8ffe0";
  els.feasibilityChip.style.borderColor = tone === "bad" ? "#ff6b6b" : "#58d68d";
}

function hasExam(day) {
  return day.tasks.some(t => t.type === "exam");
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
  day.tasks.push(task);
  day.usedMinutes += task.durationMinutes || 0;
}

function addExamTask(day, label) {
  addTask(day, { type: "exam", label, durationMinutes: EXAM_MINUTES, detail: "Full-length practice exam" });
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

function collectPathomaQueue() {
  const queue = [];
  for (const system of pathomaData) {
    for (const ch of system.chapters) {
      queue.push({ system: system.system, title: ch.title, minutes: ch.duration, videos: ch.videos });
    }
  }
  return queue;
}

function distributePathomaAcrossFirstWeeks(dayMap, queue, start, horizonDays = 21) {
  const horizonEnd = addDays(start, horizonDays - 1);
  const candidates = Array.from(dayMap.values())
    .filter(d => d.date >= start && d.date <= horizonEnd && !d.isBreak && !hasExam(d))
    .sort((a, b) => a.date - b.date);
  if (candidates.length === 0 || queue.length === 0) return queue;

  let idx = 0;
  let safety = 0;
  const maxAttempts = queue.length * candidates.length * 3;
  while (queue.length > 0 && safety < maxAttempts) {
    const day = candidates[idx % candidates.length];
    const remaining = LIMIT_MINUTES_PER_DAY - day.usedMinutes;
    const next = queue[0];
    if (next.minutes <= remaining) {
      addTask(day, {
        type: "learning",
        label: `Pathoma – ${next.title}`,
        durationMinutes: next.minutes,
        detail: `${next.system} • ${next.videos.join(", ")}`,
        system: next.system
      });
      queue.shift();
    }
    idx++;
    safety++;
  }
  return queue;
}

function countAvailableStudyDays(days, until) {
  let count = 0;
  for (const d of days) {
    if (d.date > until) continue;
    if (d.isBreak || hasExam(d)) continue;
    count++;
  }
  return count;
}

function ensureCapacity(beforeDeadlineDays, systemMinutesNeeded) {
  const minutesAvailable = beforeDeadlineDays * LIMIT_MINUTES_PER_DAY;
  return minutesAvailable >= systemMinutesNeeded;
}

function getBreakDowSet() {
  const set = new Set();
  for (const cb of els.breakBoxes) {
    const dow = Number.parseInt(cb.dataset.dow || "", 10);
    if (cb.checked && Number.isFinite(dow)) set.add(dow);
  }
  return set;
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

  if (!day.tasks || day.tasks.length === 0) {
    els.dayDetail.innerHTML = `
      <div class="day-detail-header">
        <div class="day-detail-title">${escapeHtml(dateLabel)}</div>
        <div class="day-detail-meta">${escapeHtml(meta || "No tasks")}</div>
      </div>
      <div class="day-detail-empty">No tasks assigned.</div>
    `;
    return;
  }

  const items = day.tasks.map(t => {
    const duration = t.durationMinutes ? minutesToHuman(t.durationMinutes) : "";
    return `<li class="day-detail-item">
      <span class="day-detail-name">${escapeHtml(t.label)}</span>
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
  const MAX_CHIPS = 3;
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
      if (day.isBreak) chips.push('<span class="calendar-chip buffer">Break</span>');
      for (let j = 0; j < tasks.length && j < MAX_CHIPS; j++) {
        const t = tasks[j];
        const type = t.type || "learning";
        const chipLabel = escapeHtml(t.label);
        chips.push(`<span class="calendar-chip ${type}">${chipLabel}</span>`);
      }
      if (tasks.length > MAX_CHIPS) {
        chips.push(`<span class="calendar-chip more">+${tasks.length - MAX_CHIPS} more</span>`);
      }
      if (chips.length === 0) chips.push('<span class="calendar-chip more">No tasks</span>');
    } else {
      chips.push('<span class="calendar-chip more">Out of range</span>');
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

  const pathomaEnabled = els.pathomaToggle.checked;
  const uworldEnabled = els.uworldToggle.checked;
  const examSelections = getExamSelections();

  const totalDays = Math.floor((exam - start) / (24 * 60 * 60 * 1000)) + 1;
  const totalHours = (pathomaEnabled ? PATHOMA_TOTAL_HOURS : 0) + (uworldEnabled ? 200 : 0) + (examSelections.length * 8);
  const avgPerDay = totalHours / totalDays;
  if (pathomaEnabled && totalDays < 21) {
    setFeasibility("Not feasible (<3 weeks)", "bad");
    resetError("A schedule could not be feasibly created. We recommend extending your study period or reducing the number of resources.");
    return;
  }
  if (avgPerDay > 12) {
    setFeasibility("Not feasible (>12h/day)", "bad");
    resetError("A schedule could not be feasibly created. We recommend extending your study period.");
    return;
  }
  setFeasibility("Feasible", "good");

  const breakSet = getBreakDowSet();
  const dayMap = buildDayMap(start, exam, breakSet);
  for (const day of dayMap.values()) {
    if (day.isBreak) addTask(day, { type: "buffer", label: "Buffer / Rest (Break Day)", durationMinutes: 0, detail: "Keep this day open for recovery." });
  }
  const breakDays = Array.from(dayMap.values()).filter(d => d.isBreak).length;
  const studyDays = totalDays - breakDays;
  renderStats({ totalDays, studyDays, totalHours, avgPerDay });
  if (studyDays <= 0 && totalHours > 0) {
    resetError("All days are breaks. Please select at least one study day.");
    return;
  }

  let pathomaQueue = pathomaEnabled ? collectPathomaQueue() : [];
  pathomaQueue = distributePathomaAcrossFirstWeeks(dayMap, pathomaQueue, start, 21);

  // Anchors
  const qbDeadline = addDays(exam, -14) < start ? start : addDays(exam, -14);
  const free120 = addDays(exam, -3);
  const uwsa2Date = addDays(exam, -7);

  const selected = [...examSelections];
  const nbmeList = selected.filter(e => e.kind === "nbme").sort((a, b) => a.order - b.order);
  const baselineExam = nbmeList[0];
  if (baselineExam) {
    const weekEnd = addDays(start, 6);
    let baselineDate = nextSaturdayOnOrAfter(start);
    if (baselineDate > weekEnd) baselineDate = weekEnd;
    const baseDay = dayMap.get(formatDateKey(baselineDate));
    if (baseDay) addExamTask(baseDay, `${baselineExam.label} – Baseline`);
  }

  const usedExamIds = new Set();
  if (baselineExam) usedExamIds.add(baselineExam.id);

  for (const examItem of selected) {
    const isFree = examItem.id === "free120";
    const isUwsa2 = examItem.id === "uwsa2";
    if (isFree) usedExamIds.add(examItem.id);
    if (isUwsa2) usedExamIds.add(examItem.id);
  }

  if (selected.some(e => e.id === "free120")) {
    const d = dayMap.get(formatDateKey(free120));
    if (d) addExamTask(d, "Free 120 – 3 days out");
  }

  if (selected.some(e => e.id === "uwsa2")) {
    const d = dayMap.get(formatDateKey(uwsa2Date));
    if (d) addExamTask(d, "UWSA 2 – 1 week out");
  }

  const remainingExams = selected.filter(e => !usedExamIds.has(e.id));
  let ptr = qbDeadline;
  const placedIds = new Set();
  for (let i = remainingExams.length - 1; i >= 0; i--) {
    let target = saturdayOnOrBefore(ptr);
    while (target >= start) {
      const key = formatDateKey(target);
      const day = dayMap.get(key);
      if (day && !hasExam(day)) {
        addExamTask(day, `${remainingExams[i].label} – Weekend assessment`);
        placedIds.add(remainingExams[i].id);
        break;
      }
      target = addDays(target, -7);
    }
    ptr = addDays(ptr, -7);
  }

  const systemDays = Array.from(dayMap.values()).filter(d => d.date <= qbDeadline);
  const dedicatedDays = Array.from(dayMap.values()).filter(d => d.date > qbDeadline);

  // Systems block
  let systemQuestionsRemaining = uworldEnabled ? Math.round(UWORLD_TOTAL_Q * 0.6) : 0;
  const systemMinutesNeeded = (pathomaQueue.reduce((acc, c) => acc + c.minutes, 0) * (pathomaEnabled ? 1 : 0)) + (systemQuestionsRemaining * UWORLD_MIN_PER_Q);
  const studyDaysBeforeDeadline = countAvailableStudyDays(systemDays, qbDeadline);
  if (!ensureCapacity(studyDaysBeforeDeadline, systemMinutesNeeded)) {
    resetError("Not enough capacity before the UWorld deadline. Extend the runway or uncheck resources.");
  }

  for (const day of systemDays) {
    if (day.isBreak || hasExam(day)) continue;
    let remaining = LIMIT_MINUTES_PER_DAY - day.usedMinutes;
    if (remaining <= 0) continue;

    let daySystem = pathomaQueue[0]?.system || null;
    while (pathomaQueue.length > 0) {
      const chapter = pathomaQueue[0];
      if (chapter.minutes > remaining) break;
      addTask(day, {
        type: "learning",
        label: `Pathoma – ${chapter.title}`,
        durationMinutes: chapter.minutes,
        detail: `${chapter.system} • ${chapter.videos.join(", ")}`,
        system: chapter.system
      });
      daySystem = chapter.system;
      remaining -= chapter.minutes;
      pathomaQueue.shift();
    }

    if (uworldEnabled && systemQuestionsRemaining > 0 && remaining > 0) {
      const daysLeft = countAvailableStudyDays(systemDays.filter(d => d.date >= day.date), qbDeadline);
      let qTarget = Math.ceil(systemQuestionsRemaining / Math.max(1, daysLeft));
      qTarget = Math.max(80, qTarget);
      const cardioMode = daySystem === "Cardiovascular" || (pathomaQueue[0]?.system === "Cardiovascular");
      const minutesNeeded = qTarget * UWORLD_MIN_PER_Q;
      if (minutesNeeded > remaining) {
        qTarget = Math.floor(remaining / UWORLD_MIN_PER_Q);
      }
      if (qTarget > 0) {
        const label = cardioMode
          ? "UWorld: 2 Blocks (80 Qs) – Cardiovascular only (Tutor Mode)"
          : `UWorld: ${qTarget} Qs – System-focused (Tutor Mode)`;
        addTask(day, { type: "practice", label, durationMinutes: qTarget * UWORLD_MIN_PER_Q, detail: cardioMode ? "Stay within cardio question pool." : "Target the current system." });
        systemQuestionsRemaining -= qTarget;
        remaining -= qTarget * UWORLD_MIN_PER_Q;
      }
    }
  }

  // Catch any leftover Pathoma chapters inside the dedicated block
  if (pathomaQueue.length > 0) {
    for (const day of dedicatedDays) {
      if (day.isBreak || hasExam(day)) continue;
      let remaining = LIMIT_MINUTES_PER_DAY - day.usedMinutes;
      if (remaining <= 0) continue;
      while (pathomaQueue.length > 0 && pathomaQueue[0].minutes <= remaining) {
        const chapter = pathomaQueue.shift();
        addTask(day, {
          type: "learning",
          label: `Pathoma – ${chapter.title}`,
          durationMinutes: chapter.minutes,
          detail: `${chapter.system} • ${chapter.videos.join(", ")}`,
          system: chapter.system
        });
        remaining -= chapter.minutes;
      }
      if (pathomaQueue.length === 0) break;
    }
  }

  // Dedicated block
  const systemTarget = uworldEnabled ? Math.round(UWORLD_TOTAL_Q * 0.6) : 0;
  const systemCompleted = Math.max(0, systemTarget - systemQuestionsRemaining);
  let dedicatedQuestionsRemaining = uworldEnabled ? UWORLD_TOTAL_Q - systemCompleted : 0;
  for (const day of dedicatedDays) {
    if (day.isBreak || hasExam(day)) continue;
    let remaining = LIMIT_MINUTES_PER_DAY - day.usedMinutes;
    if (remaining <= 0) continue;

    if (uworldEnabled && dedicatedQuestionsRemaining > 0) {
      const daysLeft = countAvailableStudyDays(dedicatedDays.filter(d => d.date >= day.date), exam);
      let qTarget = Math.max(80, Math.ceil(dedicatedQuestionsRemaining / Math.max(1, daysLeft)));
      qTarget = Math.min(dedicatedQuestionsRemaining, qTarget);
      const minutesNeeded = qTarget * UWORLD_MIN_PER_Q;
      if (minutesNeeded > remaining) {
        qTarget = Math.floor(remaining / UWORLD_MIN_PER_Q);
      }
      if (qTarget > 0) {
        addTask(day, { type: "practice", label: `UWorld: Random, Timed Mode (${qTarget} Qs)`, durationMinutes: qTarget * UWORLD_MIN_PER_Q, detail: "Prioritize weak topics and pacing." });
        dedicatedQuestionsRemaining -= qTarget;
        remaining -= qTarget * UWORLD_MIN_PER_Q;
      }
    }
  }

  // Final Pathoma review (last four available days before exam)
  const reviewChapters = pathomaData[0].chapters.slice(0, 3); // Fundamentals 1-3
  const reviewTasks = reviewChapters.map(ch => ({
    label: `Pathoma quick review – ${ch.title} (2x speed)`,
    minutes: Math.ceil(ch.duration / 2),
    detail: ch.videos.join(", ")
  }));
  reviewTasks.push({ label: "Integration drills – sketchy notes + flashcards", minutes: 30, detail: "Keep it light and active recall." });

  const candidateReviewDays = Array.from(dayMap.values())
    .filter(d => d.date < exam && !d.isBreak && !hasExam(d))
    .sort((a, b) => b.date - a.date)
    .slice(0, 4);

  for (let i = 0; i < candidateReviewDays.length && i < reviewTasks.length; i++) {
    const day = candidateReviewDays[i];
    if (day.usedMinutes + reviewTasks[i].minutes > LIMIT_MINUTES_PER_DAY) continue;
    addTask(day, { type: "learning", label: reviewTasks[i].label, durationMinutes: reviewTasks[i].minutes, detail: reviewTasks[i].detail });
  }

  currentPlan = { dayMap, start, exam };
  calendarWeekStart = calendarWeekStart || startOfWeekSunday(start);
  renderDayDetail(dayMap);
  renderCalendar(dayMap);
}

function quickFillExample() {
  const today = new Date();
  const start = formatDateKey(today);
  const exam = formatDateKey(addDays(today, 70));
  els.startDate.value = start;
  els.examDate.value = exam;
  els.pathomaToggle.checked = true;
  els.uworldToggle.checked = true;
  renderExamToggles();
  generatePlan();
}

renderExamToggles();
els.generateBtn.addEventListener("click", generatePlan);
els.quickFill.addEventListener("click", quickFillExample);
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
for (const cb of els.breakBoxes) {
  cb.addEventListener("change", () => generatePlan());
}

if (!els.startDate.value) {
  const today = new Date();
  els.startDate.value = formatDateKey(today);
  els.examDate.value = formatDateKey(addDays(today, 60));
}

renderDayDetail(new Map());
renderCalendar(new Map());
