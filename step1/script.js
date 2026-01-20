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

const pathomaData = [
  {
    system: "Fundamentals",
    chapters: [
      { id: 1, title: "Growth Adaptations", duration: 29, videos: ["1.1 Growth Adaptations", "1.2 Cellular Injury", "1.3 Cell Death", "1.4 Free Radical Injury", "1.5 Apoptosis"] },
      { id: 2, title: "Inflammation", duration: 45, videos: ["2.1 Acute Inflammation", "2.2 Chronic Inflammation", "2.3 Wound Healing"] },
      { id: 3, title: "Neoplasia", duration: 39, videos: ["3.1 Neoplasia Basics", "3.2 Carcinogenesis", "3.3 Tumor Progression"] }
    ]
  },
  { system: "Biochemistry/Genetics", chapters: [] },
  { system: "Immunology", chapters: [] },
  { system: "Microbiology", chapters: [] },
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
    system: "Renal",
    chapters: [
      { id: 12, title: "Renal Pathology", duration: 50, videos: ["12.1 Acute Renal Failure", "12.2 Nephrotic Syndrome", "12.3 Nephritic Syndrome"] }
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
  },
  { system: "Psychiatry", chapters: [] },
  { system: "Public Health/Ethics", chapters: [] }
];

const bnbData = [
  {
    system: "Fundamentals",
    sections: [
      { name: "Basic Pharmacology", duration: 86, videos: ["Enzymes (14m)", "Enzyme Inhibitors (8m)", "Dose-Response (21m)", "Drug Elimination (17m)", "Pharmacokinetics (27m)"] },
      { name: "Pathology - General", duration: 182, videos: ["Cellular Adaptations (18m)", "Cell Injury (11m)", "Free Radicals (18m)", "Apoptosis (16m)", "Necrosis (12m)", "Inflammation Principles (25m)", "Wound Healing (24m)", "Neoplasia (25m)"] }
    ]
  },
  {
    system: "Biochemistry/Genetics",
    sections: [
      { name: "Molecular Biochem", duration: 54, videos: ["DNA Structure (13m)", "Purine Metabolism (19m)", "Pyrimidines (22m)"] },
      { name: "Metabolism", duration: 252, videos: ["Glycolysis (31m)", "Gluconeogenesis (17m)", "TCA Cycle (14m)", "ETC (21m)", "Fatty Acids (27m)"] },
      { name: "Genetics", duration: 146, videos: ["Genetic Principles (24m)", "Hardy-Weinberg (12m)", "Pedigrees (18m)", "Down Syndrome (14m)"] },
      { name: "Cell Biology", duration: 200, videos: ["DNA Replication (17m)", "Transcription (23m)", "Translation (20m)", "Cell Cycle (14m)"] }
    ]
  },
  {
    system: "Cardiovascular",
    sections: [
      { name: "Anatomy/Physio", duration: 136, videos: ["Cardiac Phys (19m)", "PV Loops (16m)", "Wiggers (9m)", "Starling Curve (16m)"] },
      { name: "Pathology", duration: 380, videos: ["Ischemia (30m)", "STEMI (12m)", "Heart Failure Basics (22m)", "Cardiomyopathy (12m)", "Hypertension (12m)", "Valve Disease (26m)", "Shock (21m)"] }
    ]
  },
  {
    system: "Endocrine",
    sections: [
      { name: "Thyroid/Adrenal", duration: 145, videos: ["Thyroid Gland (28m)", "Thyroid Disorders (34m)", "Adrenal Glands (22m)", "Cushing Syndrome (33m)"] },
      { name: "Pancreas/Diabetes", duration: 87, videos: ["Diabetes (33m)", "Insulin (9m)", "Treatment (22m)"] }
    ]
  },
  {
    system: "Gastrointestinal",
    sections: [
      { name: "Anatomy/Physio", duration: 217, videos: ["GI Hormones (24m)", "Bilirubin (29m)", "Exocrine Pancreas (15m)"] },
      { name: "Pathology", duration: 314, videos: ["Esophageal Disorders (23m)", "Cirrhosis (23m)", "Gallstones (20m)", "IBD (20m)", "Colon Cancer (24m)"] }
    ]
  },
  {
    system: "Hematology",
    sections: [
      { name: "Red Blood Cells", duration: 168, videos: ["Microcytic Anemia (33m)", "Thalassemia (21m)", "Sickle Cell (23m)"] },
      { name: "White Blood Cells & Coag", duration: 251, videos: ["Coagulation (29m)", "Platelet Disorders (24m)", "Leukemia (18m)", "Lymphoma (9m)"] }
    ]
  },
  {
    system: "Immunology",
    sections: [
      { name: "Basic & Clinical", duration: 317, videos: ["Innate Immunity (36m)", "T-Cells (30m)", "Hypersensitivity (21m)", "Immune Deficiency (36m)", "SLE & RA (32m)"] }
    ]
  },
  {
    system: "Microbiology",
    sections: [
      { name: "Bacteriology", duration: 300, videos: ["Staph (18m)", "Strep (21m)", "Gram Negatives (30m)", "Mycobacteria (11m)"] },
      { name: "Virology/Fungi/Parasites", duration: 336, videos: ["DNA Viruses (18m)", "RNA Viruses (43m)", "HIV (19m)", "Fungal Pneumonias (16m)", "Malaria (14m)"] }
    ]
  },
  {
    system: "Musculoskeletal/Derm",
    sections: [
      { name: "Dermatology", duration: 151, videos: ["Skin Disorders (20m)", "Skin Cancer (18m)"] },
      { name: "Musculoskeletal", duration: 339, videos: ["Knee/Shoulder Anatomy (32m)", "Bone Tumors (24m)", "Osteoarthritis/Gout (29m)"] }
    ]
  },
  {
    system: "Neurology",
    sections: [
      { name: "Neurology", duration: 678, videos: ["Stroke Syndromes (19m)", "Cranial Nerves (18m)", "Parkinson's (20m)", "Seizures (22m)", "The Eye (14m)"] }
    ]
  },
  {
    system: "Psychiatry",
    sections: [
      { name: "Psych", duration: 286, videos: ["Mood Disorders (21m)", "Anxiety (15m)", "Substance Abuse (52m)", "Antidepressants (20m)"] }
    ]
  },
  {
    system: "Respiratory",
    sections: [
      { name: "Pulmonary", duration: 413, videos: ["Pulmonary Phys (32m)", "V/Q Mismatch (30m)", "COPD (26m)", "Pneumonia (26m)", "PE (14m)"] }
    ]
  },
  {
    system: "Renal",
    sections: [
      { name: "Physiology", duration: 267, videos: ["Nephron Phys (38m)", "Acid-Base (30m)", "Electrolytes (23m)"] },
      { name: "Pathology", duration: 165, videos: ["Nephritic Syndrome (21m)", "Nephrotic Syndrome (18m)", "Renal Failure (21m)"] }
    ]
  },
  {
    system: "Reproductive",
    sections: [
      { name: "Repro", duration: 437, videos: ["Pregnancy (14m)", "PCOS/Endometriosis (22m)", "Breast Cancer (17m)", "Testicular Cancer (14m)"] }
    ]
  },
  {
    system: "Public Health/Ethics",
    sections: [
      { name: "Epi/Biostats", duration: 186, videos: ["Study Designs (17m)", "Bias (19m)", "Sensitivity/Specificity (22m)"] },
      { name: "Ethics", duration: 130, videos: ["Informed Consent (17m)", "Quality & Safety (30m)"] }
    ]
  }
];

const sketchyData = [
  {
    system: "Microbiology",
    sections: [
      { name: "Gram Positive Cocci", duration: 51, videos: ["Staph Aureus (11m)", "Staph Epidermidis (7m)", "Strep Pyogenes (15m)", "Strep Agalactiae (5m)", "Strep Pneumo (9m)", "Enterococcus (4m)"] },
      { name: "Gram Positive Bacilli", duration: 50, videos: ["Bacillus (10m)", "C. Tetani (7m)", "C. Botulinum (8m)", "C. Difficile (8m)", "C. Perfringens (6m)", "Corynebacterium (7m)", "Listeria (4m)"] },
      { name: "Gram-Pos Branching", duration: 10, videos: ["Actinomyces (3m)", "Nocardia (7m)"] },
      { name: "Gram Negative Cocci", duration: 22, videos: ["Neisseria Overview (5m)", "N. Meningitidis (9m)", "N. Gonorrheae (8m)"] },
      { name: "Gram Negative Bacilli (Enteric)", duration: 67, videos: ["Klebsiella/Enterobacter (8m)", "Proteus (3m)", "Salmonella (6m)", "Shigella (6m)", "E. Coli (9m)", "Yersinia (8m)", "Campylobacter (6m)", "Vibrio (6m)", "Helicobacter (5m)", "Pseudomonas (10m)"] },
      { name: "Gram Negative Bacilli (Respiratory)", duration: 24, videos: ["Bordatella (8m)", "Haemophilus (9m)", "Legionella (7m)"] },
      { name: "Gram Negative Zoonotics", duration: 17, videos: ["Bartonella (4m)", "Brucella (5m)", "Francisella (4m)", "Pasteurella (4m)"] },
      { name: "Mycobacteria", duration: 26, videos: ["M. Tuberculosis (17m)", "M. Leprae (9m)"] },
      { name: "Spirochetes", duration: 25, videos: ["Borrelia (8m)", "Leptospirosis (4m)", "Treponema (13m)"] },
      { name: "Gram-Indeterminate", duration: 44, videos: ["Chlamydia (15m)", "Coxiella (5m)", "Gardnerella (6m)", "Mycoplasma (6m)", "Rickettsia Overview (4m)", "R. Prowazekii (4m)", "R. Rickettsii (4m)"] },
      { name: "Fungi - Systemic", duration: 28, videos: ["Histoplasmosis (10m)", "Blastomycosis (6m)", "Coccidioidomycosis (7m)", "Paracoccidioidomycosis (5m)"] },
      { name: "Fungi - Cutaneous", duration: 15, videos: ["Malassezia (5m)", "Dermatophytes (6m)", "Sporothrix (4m)"] },
      { name: "Fungi - Opportunistic", duration: 45, videos: ["Candida (13m)", "Aspergillus (11m)", "Cryptococcus (9m)", "Mucormycosis (6m)", "Pneumocystis (6m)"] },
      { name: "Parasites - Intestinal", duration: 18, videos: ["Giardia (5m)", "Entamoeba (8m)", "Cryptosporidium (5m)"] },
      { name: "Parasites - CNS", duration: 21, videos: ["Toxoplasmosis (10m)", "Trypanosoma Brucei (5m)", "Naegleria (6m)"] },
      { name: "Parasites - Blood", duration: 33, videos: ["Trypanosoma Cruzi (6m)", "Babesia (7m)", "Plasmodium (14m)", "Leishmaniasis (6m)"] },
      { name: "Parasites - Other", duration: 6, videos: ["Trichomoniasis (6m)"] },
      { name: "Helminths", duration: 45, videos: ["Nematodes Intestinal (13m)", "Nematodes Tissue (11m)", "Cestodes (10m)", "Trematodes (11m)"] },
      { name: "RNA Viruses (+)", duration: 89, videos: ["Picorna Overview (11m)", "Polio (7m)", "Coxsackie (5m)", "Rhino (5m)", "Hep A (7m)", "Calici (5m)", "Flavi (8m)", "Hep C (10m)", "Toga (11m)", "Corona (4m)", "HIV (16m)"] },
      { name: "RNA Viruses (-)", duration: 66, videos: ["Orthomyxo (18m)", "Paramyxo (16m)", "Rhabdo (9m)", "Filo (5m)", "Bunya (6m)", "Arena (5m)", "Reo (7m)"] },
      { name: "DNA Viruses", duration: 120, videos: ["HSV 1&2 (11m)", "Adeno (5m)", "Pox (8m)", "Hep B (19m)", "EBV (13m)", "CMV (12m)", "VZV (12m)", "HHV-6 (5m)", "HHV-8 (7m)", "Polyoma (7m)", "Papilloma (14m)", "Parvo (7m)"] }
    ]
  }
];

const practiceExamCatalog = [
  { id: "nbme25", label: "NBME 25", mandatory: false, defaultChecked: false, kind: "nbme", order: 25, group: "practice" },
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
  bnbToggle: null,
  sketchyToggle: null,
  ankiToggle: null,
  uworldToggle: null
};

const LIMIT_MINUTES_PER_DAY = 12 * 60;
const UWORLD_TOTAL_Q = 4000;
const UWORLD_MIN_PER_Q = (200 * 60) / UWORLD_TOTAL_Q; // 3 minutes per question
const EXAM_MINUTES = 8 * 60;
const ANKI_MINUTES = 60;

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
    uworld: els.uworldToggle?.checked ?? true
  };

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
  learningGroup.appendChild(makePill("pathomaToggle", "Pathoma", previous.pathoma));
  learningGroup.appendChild(makePill("bnbToggle", "Boards & Beyond", previous.bnb));
  learningGroup.appendChild(makePill("sketchyToggle", "Sketchy Micro", previous.sketchy));
  learningGroup.appendChild(makePill("ankiToggle", "Anki (daily)", previous.anki));

  // Practice
  practiceGroup.appendChild(makePill("uworldToggle", "UWorld Qbank", previous.uworld));
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
  els.bnbToggle = document.getElementById("bnbToggle");
  els.sketchyToggle = document.getElementById("sketchyToggle");
  els.ankiToggle = document.getElementById("ankiToggle");
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

function totalMinutesForResource(resource) {
  return resource.reduce((sum, entry) => {
    if (entry.chapters) {
      return sum + entry.chapters.reduce((s, ch) => s + ch.duration, 0);
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
        queue.push({
          type: "learning",
          label: `Pathoma – ${ch.title}`,
          durationMinutes: ch.duration,
          detail: `${systemName} • ${ch.videos.join(", ")}`,
          system: systemName
        });
      }
    }
  }
  if (flags.bnb) {
    const sys = findSystemBlock(bnbData, systemName);
    if (sys) {
      for (const sec of sys.sections || []) {
        queue.push({
          type: "learning",
          label: `Boards & Beyond – ${sec.name}`,
          durationMinutes: sec.duration,
          detail: `${systemName} • ${sec.videos.join(", ")}`,
          system: systemName
        });
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
          durationMinutes: sec.duration,
          detail: `${systemName} • ${sec.videos.join(", ")}`,
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
  const flags = {
    pathoma: els.pathomaToggle?.checked ?? true,
    bnb: els.bnbToggle?.checked ?? false,
    sketchy: els.sketchyToggle?.checked ?? false,
    anki: els.ankiToggle?.checked ?? true,
    uworld: els.uworldToggle?.checked ?? true
  };
  const examSelections = getExamSelections();

  const totalDays = Math.floor((exam - start) / (24 * 60 * 60 * 1000)) + 1;
  const breakSet = getBreakDowSet();
  const dayMap = buildDayMap(start, exam, breakSet);

  for (const day of dayMap.values()) {
    if (day.isBreak) addTask(day, { type: "buffer", label: "Buffer / Rest (Break Day)", durationMinutes: 0, detail: "Keep this day open for recovery." });
  }

  const dayBeforeExamKey = formatDateKey(addDays(exam, -1));
  const dayBeforeExam = dayMap.get(dayBeforeExamKey);
  if (dayBeforeExam) {
    dayBeforeExam.tasks = [];
    dayBeforeExam.usedMinutes = 0;
    dayBeforeExam.isBreak = true;
    addTask(dayBeforeExam, { type: "buffer", label: "Buffer / Rest (Break Day)", durationMinutes: 0, detail: "Protect the day before your exam." });
  }

  const breakDays = Array.from(dayMap.values()).filter(d => d.isBreak).length;
  const studyDayCount = totalDays - breakDays;
  if (studyDayCount <= 0) {
    resetError("All days are breaks. Please select at least one study day.");
    return;
  }

  const resourceMinutes = (flags.pathoma ? totalMinutesForResource(pathomaData) : 0)
    + (flags.bnb ? totalMinutesForResource(bnbData) : 0)
    + (flags.sketchy ? totalMinutesForResource(sketchyData) : 0);
  const ankiDayCount = Math.max(0, studyDayCount - examSelections.length);
  const ankiMinutesTotal = flags.anki ? ankiDayCount * ANKI_MINUTES : 0;
  const uworldMinutesTotal = flags.uworld ? UWORLD_TOTAL_Q * UWORLD_MIN_PER_Q : 0;
  const examMinutesTotal = examSelections.length * EXAM_MINUTES;
  const totalHours = (resourceMinutes + ankiMinutesTotal + uworldMinutesTotal + examMinutesTotal) / 60;
  const avgPerDay = totalHours / studyDayCount;

  renderStats({ totalDays, studyDays: studyDayCount, totalHours, avgPerDay });

  if (avgPerDay > 12) {
    setFeasibility("Not feasible (>12h/day)", "bad");
    resetError("Plan not feasible (>12h/day). Try unchecking 'Boards & Beyond' or extending your date.");
    return;
  }
  setFeasibility("Feasible", "good");

  // Practice exam placement
  const free120Date = addDays(exam, -3);
  const uwsa2Date = addDays(exam, -7);
  const selected = [...examSelections];
  const nbmeList = selected.filter(e => e.kind === "nbme").sort((a, b) => a.order - b.order);
  const baselineExam = nbmeList[0];
  if (baselineExam) {
    const weekEnd = addDays(start, 6);
    let baselineDate = nextSaturdayOnOrAfter(start);
    if (baselineDate > weekEnd) baselineDate = weekEnd;
    const baseDay = dayMap.get(formatDateKey(baselineDate));
    if (baseDay && !baseDay.isBreak) addExamTask(baseDay, `${baselineExam.label} – Baseline`);
  }

  const usedExamIds = new Set();
  if (baselineExam) usedExamIds.add(baselineExam.id);
  if (selected.some(e => e.id === "free120")) usedExamIds.add("free120");
  if (selected.some(e => e.id === "uwsa2")) usedExamIds.add("uwsa2");

  if (selected.some(e => e.id === "free120")) {
    const d = dayMap.get(formatDateKey(free120Date));
    if (d && !d.isBreak) addExamTask(d, "Free 120 – 3 days out");
  }

  if (selected.some(e => e.id === "uwsa2")) {
    const d = dayMap.get(formatDateKey(uwsa2Date));
    if (d && !d.isBreak) addExamTask(d, "UWSA 2 – 1 week out");
  }

  const remainingExams = selected.filter(e => !usedExamIds.has(e.id));
  let ptr = addDays(exam, -14) < start ? start : addDays(exam, -14);
  for (let i = remainingExams.length - 1; i >= 0; i--) {
    let target = saturdayOnOrBefore(ptr);
    while (target >= start) {
      const key = formatDateKey(target);
      const day = dayMap.get(key);
      if (day && !hasExam(day) && !day.isBreak) {
        addExamTask(day, `${remainingExams[i].label} – Weekend assessment`);
        break;
      }
      target = addDays(target, -7);
    }
    ptr = addDays(ptr, -7);
  }

  // Study slots after exam placement
  const studySlots = getStudyDays(dayMap);

  if (flags.anki) {
    for (const day of studySlots) {
      addTask(day, { type: "practice", label: "Anki Reviews (Daily Maintenance)", durationMinutes: ANKI_MINUTES, detail: "Keep reviews tight and active recall." });
    }
  }

  let slotIndex = 0;
  let uworldMinutesRemaining = flags.uworld ? uworldMinutesTotal : 0;

  for (const systemName of SYSTEM_ORDER) {
    const queue = buildSystemQueue(systemName, flags);
    if (queue.length === 0) continue;

    while (queue.length > 0) {
      if (slotIndex >= studySlots.length) {
        resetError(`Ran out of study days while scheduling ${systemName}. Extend your dates or deselect a resource.`);
        currentPlan = { dayMap, start, exam };
        renderDayDetail(dayMap);
        renderCalendar(dayMap);
        return;
      }
      const day = studySlots[slotIndex];
      let remaining = LIMIT_MINUTES_PER_DAY - day.usedMinutes;
      if (remaining <= 0) {
        slotIndex++;
        continue;
      }

      const next = queue[0];
      if (next.durationMinutes <= remaining) {
        addTask(day, next);
        remaining -= next.durationMinutes;
        queue.shift();
      } else {
        slotIndex++;
        continue;
      }

      if (remaining > 30 && flags.uworld && uworldMinutesRemaining > 0) {
        const block = Math.min(uworldMinutesRemaining, Math.min(180, remaining));
        if (block >= 45) {
          addTask(day, { type: "practice", label: `UWorld: Subject - ${systemName}`, durationMinutes: block, detail: `Focus on ${systemName}` });
          uworldMinutesRemaining -= block;
          remaining -= block;
        }
      }

      if (remaining < 30) slotIndex++;
    }

    if (slotIndex < studySlots.length && studySlots[slotIndex].usedMinutes >= LIMIT_MINUTES_PER_DAY - 30) {
      slotIndex++;
    }
  }

  // Fill remaining UWorld time with mixed blocks
  for (let i = slotIndex; i < studySlots.length && uworldMinutesRemaining > 0; i++) {
    const day = studySlots[i];
    let remaining = LIMIT_MINUTES_PER_DAY - day.usedMinutes;
    if (remaining <= 0) continue;
    const block = Math.min(uworldMinutesRemaining, Math.min(180, remaining));
    if (block >= 45) {
      addTask(day, { type: "practice", label: "UWorld: Mixed Blocks", durationMinutes: block, detail: "Finish QBank and review explanations." });
      uworldMinutesRemaining -= block;
    }
  }

  currentPlan = { dayMap, start, exam };
  calendarWeekStart = calendarWeekStart || startOfWeekSunday(start);
  renderDayDetail(dayMap);
  renderCalendar(dayMap);
}

function quickFillExample() {
  const today = new Date();
  const start = formatDateKey(today);
  const exam = formatDateKey(addDays(today, 84));
  els.startDate.value = start;
  els.examDate.value = exam;
  renderResourceToggles();
  els.pathomaToggle.checked = true;
  els.bnbToggle.checked = false;
  els.sketchyToggle.checked = false;
  els.ankiToggle.checked = true;
  els.uworldToggle.checked = true;
  generatePlan();
}

renderResourceToggles();
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
  els.examDate.value = "";
}

renderDayDetail(new Map());
renderCalendar(new Map());
