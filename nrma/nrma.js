const ROTATION_LABELS = ["Option 1", "Option 2", "Option 3", "Option 4"];
const ROTATION_TO_ORDER = {
  "Option 1": "LAB – TBC2 – TBC3 – TBC1",
  "Option 2": "TBC2 – LAB – TBC1 – TBC3",
  "Option 3": "TBC3 – TBC1 – LAB – TBC2",
  "Option 4": "TBC1 – TBC3 – TBC2 – LAB",
};
const ROTATION_ORDERS = Object.values(ROTATION_TO_ORDER);
let currentPerformance = [];

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
  const beansInput = $("#beans-input");
  const shuffleInput = $("#shuffle-input");
  const dropInput = $("#drop-identifiers-input");
  const file = fileInput.files[0];
  if (!file) {
    setStatus("Please choose a CSV file first.", true);
    return;
  }
  const beans = Math.max(4, parseInt(beansInput.value, 10) || 24);
  setStatus("Parsing CSV...");
  try {
    const { rows, fields } = await parseCsv(file);
    const preferences = normalizePreferences(rows, fields, {
      dropIdentifiers: dropInput.checked,
      shuffle: shuffleInput.checked,
    });
    if (!preferences.length) {
      throw new Error("No valid student rows were found in the CSV.");
    }
    setStatus("Running optimizer...");
    const { performance, summary } = assignRotations(preferences, beans);
    currentPerformance = performance;
    renderSummary(summary);
    renderTable(performance);
    setStatus(`Generated assignments for ${performance.length} students.`);
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

function normalizePreferences(rows, fields, options) {
  const dropIndices = options.dropIdentifiers ? new Set([1, 2]) : new Set();
  const effectiveFields = fields.filter((_, idx) => !dropIndices.has(idx));
  const requiredColumns = 1 + ROTATION_ORDERS.length;
  if (effectiveFields.length < requiredColumns) {
    throw new Error("Preference file is missing rotation columns.");
  }
  const usedFields = effectiveFields.slice(0, requiredColumns);
  const cleaned = rows
    .map((row, idx) => {
      const ordered = usedFields.map((field) => row[field]);
      const hasValues = ordered.some((value) => value !== undefined && `${value}`.trim() !== "");
      if (!hasValues) {
        return null;
      }
      const studentId = ordered[0] && `${ordered[0]}`.trim() !== "" ? `${ordered[0]}`.trim() : `student_${idx + 1}`;
      const beans = ordered.slice(1).map((value) => {
        const num = Number(value);
        return Number.isFinite(num) ? num : 0;
      });
      return { studentId, beans };
    })
    .filter(Boolean);
  if (options.shuffle) {
    shuffleInPlace(cleaned);
  }
  return cleaned;
}

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function assignRotations(preferences, nBeans) {
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
    const baseRow = { studentID: pref.studentId };
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
  return {
    performance,
    summary: {
      totalError,
      averageError,
      perStudentPenalty,
      pctFirstChoice,
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
  const padded = matrix.map((row) => row.slice());
  let phantom = 0;
  while (padded.length % ROTATION_LABELS.length !== 0) {
    padded.push(new Array(ROTATION_LABELS.length).fill(nBeans));
    phantom += 1;
  }
  const repeatFactor = padded.length / ROTATION_LABELS.length;
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

function renderSummary(summary) {
  $("#summary-card").classList.remove("hidden");
  $("#total-error").textContent = summary.totalError.toFixed(2);
  $("#avg-error").textContent = summary.averageError.toFixed(4);
  $("#penalty").textContent = summary.perStudentPenalty.toFixed(2);
  $("#first-choice").textContent = `${(summary.pctFirstChoice * 100).toFixed(1)}%`;
}

function renderTable(performance) {
  if (!performance.length) {
    return;
  }
  $("#results-card").classList.remove("hidden");
  const headers = ["studentID", ...ROTATION_ORDERS, "optimal_rotation", "rotation_order"];
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
  const headers = ["studentID", ...ROTATION_ORDERS, "optimal_rotation", "rotation_order"];
  const rows = currentPerformance.map((row) => headers.map((key) => toCsvValue(row[key])).join(","));
  const csvContent = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "assignment.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
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
