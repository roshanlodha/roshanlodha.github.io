const ROTATION_LABELS = ["Option 1", "Option 2", "Option 3", "Option 4"];
const ROTATION_TO_ORDER = {
  "Option 1": "LAB – TBC2 – TBC3 – TBC1",
  "Option 2": "TBC2 – LAB – TBC1 – TBC3",
  "Option 3": "TBC3 – TBC1 – LAB – TBC2",
  "Option 4": "TBC1 – TBC3 – TBC2 – LAB",
};
const ROTATION_ORDERS = Object.values(ROTATION_TO_ORDER);
const DEFAULT_BEANS = 24;
const FORCE_SHUFFLE = true;
const MIN_STUDENTS_PER_ROTATION = 20;
let currentPerformance = [];
let currentSourceFields = [];
let currentCaseIdField = "";
let currentSourceByCaseId = new Map();

function $(selector) {
  return document.querySelector(selector);
}

function setStatus(message, isError = false) {
  const el = $("#status");
  if (!el) return;
  el.textContent = message;
  el.style.color = isError ? "#b42318" : "var(--muted)";
}

function resetOutputs() {
  $("#summary-card").classList.add("hidden");
  $("#results-card").classList.add("hidden");
  $("#results-table thead").innerHTML = "";
  $("#results-table tbody").innerHTML = "";
  currentPerformance = [];
  currentSourceFields = [];
  currentCaseIdField = "";
  currentSourceByCaseId = new Map();
}

document.addEventListener("DOMContentLoaded", () => {
  const form = $("#preference-form");
  const downloadBtn = $("#download-btn");
  form.addEventListener("submit", handleSubmit);
  downloadBtn.addEventListener("click", handleDownload);
});

async function handleSubmit(event) {
  event.preventDefault();
  resetOutputs();
  const fileInput = $("#file-input");
  const file = fileInput.files[0];
  if (!file) {
    setStatus("Please choose a CSV file first.", true);
    return;
  }
  const beans = DEFAULT_BEANS;
  setStatus("Parsing CSV (shuffling cohort)...");
  try {
    const { rows, fields } = await parseCsv(file);
    const { preferences, caseIdField, sourceFields, sourceByCaseId, duplicateCaseIds } = normalizePreferences(rows, fields, {
      shuffle: FORCE_SHUFFLE,
    });
    currentSourceFields = sourceFields;
    currentCaseIdField = caseIdField;
    currentSourceByCaseId = sourceByCaseId;
    if (!preferences.length) {
      throw new Error("No valid student rows were found in the CSV.");
    }
    const duplicateWarning = duplicateCaseIds.length
      ? ` (warning: ${duplicateCaseIds.length} duplicate ${caseIdField} values; download uses the first match)`
      : "";
    setStatus(`Running optimizer...${duplicateWarning}`);
    const { performance, summary } = assignRotations(preferences, beans, { caseIdField });
    currentPerformance = performance;
    renderSummary(summary);
    renderTable(performance, { caseIdField });
    setStatus(`Generated assignments for ${performance.length} students.${duplicateWarning}`);
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Unable to process this file.", true);
  }
}

function parseCsv(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve({ rows: results.data, fields: results.meta.fields || [] });
      },
      error: (err) => reject(err),
    });
  });
}

function getCaseId(row, caseIdField, fallbackId) {
  const raw = caseIdField ? row?.[caseIdField] : undefined;
  const trimmed = raw === null || raw === undefined ? "" : String(raw).trim();
  return trimmed !== "" ? trimmed : fallbackId;
}

function normalizeCaseIdKey(value) {
  return String(value ?? "").trim().toLowerCase();
}

function normalizePreferences(rows, fields, options) {
  // 3rd column (index 2) is CaseID
  // Last 4 columns are Bean counts
  const idIndex = 2;
  const caseIdField = fields[idIndex];
  if (!caseIdField) {
    throw new Error("Unable to find CaseID column (expected 3rd column).");
  }
  const beanIndices = [fields.length - 4, fields.length - 3, fields.length - 2, fields.length - 1];

  const sourceFields = fields.slice();
  const sourceByCaseId = new Map();
  const duplicateCaseIds = [];
  rows.forEach((row, idx) => {
    const caseId = getCaseId(row, caseIdField, `student_${idx + 1}`);
    const caseIdKey = normalizeCaseIdKey(caseId);
    const normalizedRow = { ...(row || {}) };
    if (String(normalizedRow[caseIdField] ?? "").trim() === "") {
      normalizedRow[caseIdField] = caseId;
    }
    if (sourceByCaseId.has(caseIdKey)) {
      duplicateCaseIds.push(caseId);
      return;
    }
    sourceByCaseId.set(caseIdKey, normalizedRow);
  });

  const cleaned = rows
    .map((row, idx) => {
      const caseId = getCaseId(row, caseIdField, `student_${idx + 1}`);
      
      const beans = beanIndices.map((i) => {
        const val = fields[i] ? row[fields[i]] : 0;
        const num = Number(val);
        return Number.isFinite(num) ? num : 0;
      });

      // Simple validation: check if at least one bean is non-zero
      if (beans.every((b) => b === 0)) return null;

      return { caseId, beans };
    })
    .filter(Boolean);

  if (options.shuffle) {
    shuffleInPlace(cleaned);
  }
  return { preferences: cleaned, caseIdField, sourceFields, sourceByCaseId, duplicateCaseIds };
}

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function assignRotations(preferences, nBeans, { caseIdField }) {
  if (typeof Munkres === "undefined") {
    throw new Error("Munkres library failed to load. Please refresh and try again.");
  }
  const { matrix, phantom } = buildCostMatrix(preferences, nBeans);
  const munkres = new Munkres();
  const assignments = munkres.compute(matrix);
  const rotations = new Array(matrix.length).fill("Option 1");
  let totalError = 0;
  assignments.forEach(([rowIdx, colIdx]) => {
    totalError += matrix[rowIdx][colIdx];
    const rotationIdx = colIdx % ROTATION_LABELS.length;
    rotations[rowIdx] = ROTATION_LABELS[rotationIdx];
  });
  totalError -= phantom * nBeans;
  const trimmedRotations = phantom ? rotations.slice(0, rotations.length - phantom) : rotations;
  const performance = trimmedRotations.map((rotation, idx) => {
    const pref = preferences[idx];
    const baseRow = { [caseIdField]: pref.caseId };
    ROTATION_ORDERS.forEach((orderName, orderIdx) => {
      baseRow[orderName] = pref.beans[orderIdx] ?? 0;
    });
    baseRow.optimal_rotation = rotation;
    baseRow.rotation_order = ROTATION_TO_ORDER[rotation];
    return baseRow;
  });
  const nStudents = performance.length;
  const averageError = nStudents ? totalError / (nStudents * nBeans) : 0;
  const perStudentPenalty = nStudents ? totalError / nStudents : 0;
  const pctFirstChoice = computeFirstChoiceRate(performance, preferences);
  const pctTopTwo = computeTopTwoRate(performance, preferences);
  return {
    performance,
    summary: {
      totalError,
      averageError,
      perStudentPenalty,
      pctFirstChoice,
      pctTopTwo,
    },
  };
}

function buildCostMatrix(preferences, nBeans) {
  const matrix = preferences.map((pref) => {
    const total = pref.beans.reduce((sum, val) => sum + (Number.isFinite(val) ? val : 0), 0);
    const normalized = total > 0 ? pref.beans.map((val) => (val / total) * nBeans) : pref.beans.map(() => 0);
    const rowSum = normalized.reduce((sum, val) => sum + val, 0);
    return normalized.map((val) => rowSum - val);
  });

  const nStudents = matrix.length;
  const slotsPerRotation = Math.max(
    Math.ceil(nStudents / ROTATION_LABELS.length),
    MIN_STUDENTS_PER_ROTATION,
  );
  const totalSlots = slotsPerRotation * ROTATION_LABELS.length;

  const padded = matrix.map((row) => row.slice());
  let phantom = 0;
  while (padded.length < totalSlots) {
    padded.push(new Array(ROTATION_LABELS.length).fill(nBeans));
    phantom += 1;
  }

  const repeatFactor = slotsPerRotation;
  const tiled = padded.map((row) => {
    const expanded = [];
    for (let i = 0; i < repeatFactor; i += 1) {
      expanded.push(...row);
    }
    return expanded;
  });
  return { matrix: tiled, phantom };
}

function computeFirstChoiceRate(performance, preferences) {
  if (!performance.length) {
    return 0;
  }
  let matches = 0;
  performance.forEach((row, idx) => {
    const beans = preferences[idx].beans;
    let bestIdx = 0;
    beans.forEach((value, candidateIdx) => {
      if (value > beans[bestIdx]) {
        bestIdx = candidateIdx;
      }
    });
    const preferredOrder = ROTATION_TO_ORDER[ROTATION_LABELS[bestIdx]];
    if (preferredOrder === row.rotation_order) {
      matches += 1;
    }
  });
  return matches / performance.length;
}

function computeTopTwoRate(performance, preferences) {
  if (!performance.length) {
    return 0;
  }
  let hits = 0;
  performance.forEach((row, idx) => {
    const beans = preferences[idx].beans || [];
    const scored = beans
      .map((value, orderIdx) => ({ value, orderIdx }))
      .sort((a, b) => b.value - a.value);
    const cutoffIdx = Math.min(1, scored.length - 1);
    const cutoffValue = scored[cutoffIdx]?.value ?? 0;
    const allowedOrders = new Set();
    scored.forEach((entry, position) => {
      if (position <= 1 || entry.value === cutoffValue) {
        const rotationLabel = ROTATION_LABELS[entry.orderIdx];
        allowedOrders.add(ROTATION_TO_ORDER[rotationLabel]);
      }
    });
    if (allowedOrders.has(row.rotation_order)) {
      hits += 1;
    }
  });
  return hits / performance.length;
}

function renderSummary(summary) {
  $("#summary-card").classList.remove("hidden");
  $("#total-error").textContent = summary.totalError.toFixed(2);
  $("#avg-error").textContent = summary.averageError.toFixed(4);
  $("#top-two").textContent = `${(summary.pctTopTwo * 100).toFixed(1)}%`;
  $("#first-choice").textContent = `${(summary.pctFirstChoice * 100).toFixed(1)}%`;
}

function renderTable(performance, { caseIdField }) {
  if (!performance.length) {
    return;
  }
  $("#results-card").classList.remove("hidden");
  const headers = [caseIdField, ...ROTATION_ORDERS, "optimal_rotation", "rotation_order"];
  const thead = $("#results-table thead");
  const tbody = $("#results-table tbody");
  thead.innerHTML = `<tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr>`;
  tbody.innerHTML = performance
    .map((row) => {
      const cells = headers.map((key) => `<td>${escapeHtml(row[key])}</td>`);
      return `<tr>${cells.join("")}</tr>`;
    })
    .join("");
}

function escapeHtml(value) {
  if (value === null || value === undefined) {
    return "";
  }
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function handleDownload() {
  if (!currentPerformance.length) {
    setStatus("Run the optimizer before downloading.", true);
    return;
  }
  if (!currentCaseIdField || !currentSourceFields.length || !currentSourceByCaseId.size) {
    setStatus("Missing source table for join; re-run the optimizer with a CSV file.", true);
    return;
  }

  const computedHeaders = [currentCaseIdField, ...ROTATION_ORDERS, "optimal_rotation", "rotation_order"];
  const outputHeaders = [...currentSourceFields];

  // Append computed columns that do not already exist in the original table.
  computedHeaders.forEach((key) => {
    if (!outputHeaders.includes(key)) {
      outputHeaders.push(key);
    }
  });

  let missingJoinCount = 0;
  const joinedRows = currentPerformance.map((perfRow) => {
    const caseId = getCaseId(perfRow, currentCaseIdField, "");
    const caseIdKey = normalizeCaseIdKey(caseId);
    const sourceRow = caseIdKey ? currentSourceByCaseId.get(caseIdKey) : undefined;
    if (!sourceRow) {
      missingJoinCount += 1;
    }
    const merged = { ...(sourceRow || {}) };
    merged[currentCaseIdField] = caseId;
    computedHeaders.forEach((key) => {
      if (key === currentCaseIdField) return;
      if (key in merged) {
        merged[`nrma_${key}`] = perfRow[key];
        if (!outputHeaders.includes(`nrma_${key}`)) {
          outputHeaders.push(`nrma_${key}`);
        }
      } else {
        merged[key] = perfRow[key];
      }
    });
    return merged;
  });

  const rows = joinedRows.map((row) => outputHeaders.map((key) => toCsvValue(row[key])).join(","));
  const csvContent = [outputHeaders.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "assignment.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  const warning = missingJoinCount ? ` (${missingJoinCount} rows missing source join)` : "";
  setStatus(`Downloaded assignment.csv${warning}.`);
}

function toCsvValue(value) {
  if (value === null || value === undefined) {
    return "";
  }
  const str = String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}
