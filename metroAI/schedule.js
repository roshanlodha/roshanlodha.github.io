// Global alias for Luxon
const DateTime = luxon.DateTime;

// --- HiGHS (WASM) Main Thread Integration ---
// Using main thread instead of Web Worker to avoid CORS/file:// issues with static pages

let highs = null;
let highsPromise = null;

function getHighs() {
  if (!highsPromise) {
    highsPromise = Module({
      locateFile: (file) => `vendor/${file}`
    });
  }
  return highsPromise;
}

function buildLp({ students, shifts, conflictPairs, anchorShiftIdxs, minTs, maxTs }) {
  // Build a MILP in LP file format (HiGHS reads this natively).
  // Keep variable names simple/safe: x_<shiftIdx>_<studentIdx>

  const numShifts = shifts.length;
  const numStudents = students.length;

  const varName = (shiftIdx, studentIdx) => `x_${shiftIdx}_${studentIdx}`;

  const lines = [];
  lines.push("Maximize");

  // Objective: maximize total assignments, tiny tie-break toward earlier shifts.
  // coef = 1 + earlyBonus*0.001, where earlyBonus in [0,1]
  const objTerms = [];
  const denom = (maxTs - minTs + 1);

  for (let shiftIdx = 0; shiftIdx < numShifts; shiftIdx++) {
    const s = shifts[shiftIdx];
    const earlyBonus = (maxTs - s.ts) / denom;
    const coef = 1 + earlyBonus * 0.001;

    // Emit per-student objective terms.
    for (let studentIdx = 0; studentIdx < numStudents; studentIdx++) {
      objTerms.push(`${coef.toFixed(6)} ${varName(shiftIdx, studentIdx)}`);
    }
  }

  // Avoid a single extremely long line; chunk objective terms.
  const OBJ_CHUNK = 200;
  if (objTerms.length === 0) {
    lines.push(" obj: 0");
  } else {
    for (let i = 0; i < objTerms.length; i += OBJ_CHUNK) {
      const chunk = objTerms.slice(i, i + OBJ_CHUNK);
      if (i === 0) lines.push(` obj: ${chunk.join(" + ")}`);
      else lines.push(`  + ${chunk.join(" + ")}`);
    }
  }
  lines.push("Subject To");

  // A) Shift capacity: for each shift, sum_students x <= 1
  for (let shiftIdx = 0; shiftIdx < numShifts; shiftIdx++) {
    const terms = [];
    for (let studentIdx = 0; studentIdx < numStudents; studentIdx++) {
      terms.push(varName(shiftIdx, studentIdx));
    }
    lines.push(` cap_${shiftIdx}: ${terms.join(" + ")} <= 1`);
  }

  // B) Student requirements
  // These match the existing JS rules.
  for (let studentIdx = 0; studentIdx < numStudents; studentIdx++) {
    const studPrefix = `s${studentIdx}`;

    const colsAll = [];
    const colsOvernight = [];
    const colsTrauma = [];
    const colsCcf = [];
    const colsCommunity = [];
    const colsMlf = [];
    const colsE18 = [];
    const colsAcute = [];
    const colsWest = [];

    for (let shiftIdx = 0; shiftIdx < numShifts; shiftIdx++) {
      const s = shifts[shiftIdx];
      const v = varName(shiftIdx, studentIdx);

      colsAll.push(v);
      if (s.category === "overnight") colsOvernight.push(v);
      if (s.category === "trauma") colsTrauma.push(v);
      if (s.category === "ccf") colsCcf.push(v);
      if (s.category === "community") colsCommunity.push(v);
      if (s.category === "mlf") colsMlf.push(v);
      if (s.name === "E18") colsE18.push(v);
      if (s.category === "acute") colsAcute.push(v);
      if (s.category === "west") colsWest.push(v);
    }

    const sum = (vars) => (vars.length ? vars.join(" + ") : "0");

    lines.push(` ${studPrefix}_overnight: ${sum(colsOvernight)} = 1`);
    lines.push(` ${studPrefix}_trauma: ${sum(colsTrauma)} = 2`);
    lines.push(` ${studPrefix}_ccf: ${sum(colsCcf)} = 3`);
    lines.push(` ${studPrefix}_community: ${sum(colsCommunity)} = 1`);
    lines.push(` ${studPrefix}_mlf: ${sum(colsMlf)} = 1`);
    lines.push(` ${studPrefix}_total: ${sum(colsAll)} = 13`);

    lines.push(` ${studPrefix}_e18: ${sum(colsE18)} <= 1`);
    lines.push(` ${studPrefix}_acute: ${sum(colsAcute)} >= 2`);
    lines.push(` ${studPrefix}_west: ${sum(colsWest)} >= 1`);
  }

  // C) Conflict rows: x(shiftA, stud) + x(shiftB, stud) <= 1
  // conflictPairs is list of [shiftIdxA, shiftIdxB]
  for (let pairIdx = 0; pairIdx < conflictPairs.length; pairIdx++) {
    const [a, b] = conflictPairs[pairIdx];
    for (let studentIdx = 0; studentIdx < numStudents; studentIdx++) {
      const v1 = varName(a, studentIdx);
      const v2 = varName(b, studentIdx);
      lines.push(` conf_${pairIdx}_${studentIdx}: ${v1} + ${v2} <= 1`);
    }
  }

  // D) Symmetry breaking anchors: x(anchor, i) - x(anchor, i+1) >= 0
  for (let aIdx = 0; aIdx < anchorShiftIdxs.length; aIdx++) {
    const shiftIdx = anchorShiftIdxs[aIdx];
    for (let studentIdx = 0; studentIdx < numStudents - 1; studentIdx++) {
      const vA = varName(shiftIdx, studentIdx);
      const vB = varName(shiftIdx, studentIdx + 1);
      lines.push(` sym_${aIdx}_${studentIdx}: ${vA} - ${vB} >= 0`);
    }
  }

  // Binary declarations
  lines.push("Binary");
  for (let shiftIdx = 0; shiftIdx < numShifts; shiftIdx++) {
    const row = [];
    for (let studentIdx = 0; studentIdx < numStudents; studentIdx++) {
      row.push(varName(shiftIdx, studentIdx));
      // Keep lines from getting too long.
      if (row.length >= 30) {
        lines.push(` ${row.join(" ")}`);
        row.length = 0;
      }
    }
    if (row.length) lines.push(` ${row.join(" ")}`);
  }

  lines.push("End");
  return lines.join("\n");
}

async function solveWithHighs(payload) {
  const highs = await getHighs();
  const lp = buildLp(payload);

  // Use HiGHS defaults (MIP will run when binaries exist).
  const sol = highs.solve(lp);

  // HiGHS returns { Status, Columns, ObjectiveValue, Rows }
  const status = sol?.Status || "Unknown";
  if (status !== "Optimal" && status !== "Feasible" && status !== "Time limit reached") {
    throw new Error(`HiGHS status: ${status}`);
  }

  const chosen = [];
  const columns = sol.Columns || {};

  // Variable names are x_<shiftIdx>_<studentIdx>
  for (const [name, col] of Object.entries(columns)) {
    if (!name.startsWith("x_")) continue;
    if (!col || typeof col.Primal !== "number") continue;
    if (col.Primal <= 0.5) continue;

    const parts = name.split("_");
    if (parts.length !== 3) continue;
    const shiftIdx = Number(parts[1]);
    const studentIdx = Number(parts[2]);
    if (Number.isNaN(shiftIdx) || Number.isNaN(studentIdx)) continue;

    chosen.push([shiftIdx, studentIdx]);
  }

  return {
    ok: true,
    status,
    objective: sol.ObjectiveValue,
    chosen
  };
}

// --- Configuration & Constants ---

const SHIFT_DEFS = {
  "West": 7, "Acute": 7, "Trauma": 14,
  "E12": 7, "E18": 10,
  "Metro Night": 21, "CCF Night": 21,
  "Com Parma": 7, "Com Breckville": 7,
  "MLF Wayne": 7, "MLF Lorain": 7,
};

const CATEGORIES = {
  west: ["West", "WestAM", "WestPM"],
  acute: ["Acute", "A1", "A2", "C1", "C2", "E1", "E2"],
  trauma: ["Trauma"],
  ccf: ["E12", "E18"],
  overnight: ["Metro Night", "CCF Night"],
  community: ["Com Parma", "Com Breckville"],
  mlf: ["MLF Wayne", "MLF Lorain"]
};

function getCategory(name) {
  for (const [cat, names] of Object.entries(CATEGORIES)) {
    if (names.includes(name)) return cat;
  }
  return "unknown";
}

function getSite(name, category) {
  if (category === "overnight") return name === "CCF Night" ? "CCF" : "Metro";
  if (category === "community") return name.replace("Com ", "").replace(" ", "");
  if (category === "mlf") return name.replace("MLF ", "").replace(" ", "");
  if (category === "ccf") return "CCF";
  return "Metro";
}

// --- Main Logic ---

function runScheduler() {
  const btn = document.getElementById("solveBtn");
  const status = document.getElementById("status");
  const output = document.getElementById("output");

  btn.disabled = true;
  output.innerHTML = "";
  status.innerHTML = '<span class="loading">Generating optimized model...</span>';

  setTimeout(() => {
    try {
      executeSolver(status, output);
    } catch (e) {
      console.error(e);
      status.innerHTML = `<span class="error">Error: ${e.message}</span>`;
      btn.disabled = false;
    }
  }, 50);
}

function executeSolver(statusDiv, outputDiv) {
  const btn = document.getElementById("solveBtn");
  
  // 1. Get Inputs
  const startDateStr = document.getElementById("startDate").value;
  const endDateStr = document.getElementById("endDate").value;
  const studentInput = document.getElementById("studentList").value;

  if (!startDateStr || !endDateStr) throw new Error("Please select valid dates.");

  const students = studentInput
    .split(/[\n,]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  if (students.length === 0) throw new Error("No students provided.");

  const start = DateTime.fromISO(startDateStr);
  const end = DateTime.fromISO(endDateStr);

  // 2. Generate Shifts
  const allShifts = [];
  let current = start;
  let safetyCounter = 0;

  while (current <= end && safetyCounter < 365) {
    safetyCounter++;

    if (current.weekday !== 3) { // Skip Wed
      for (const [name, hour] of Object.entries(SHIFT_DEFS)) {
        const category = getCategory(name);
        const isOvernight = category === "overnight";

        if (isOvernight && (current.weekday === 2 || current.weekday === 3)) continue;

        const startDt = current.set({ hour: hour, minute: 0 });
        let durationHours = 10;
        if (isOvernight) durationHours = 48;
        else if (["West", "Com Parma", "Com Brecksville", "E18"].includes(name)) durationHours = 8;

        const endDt = startDt.plus({ hours: durationHours });

        allShifts.push({
          idx: allShifts.length,
          id: `${name}_${startDt.toFormat("yyyyMMddHH")}`,
          start: startDt,
          end: endDt,
          name: name,
          category: category,
          site: getSite(name, category),
          isOvernight: isOvernight,
          ts: startDt.toMillis(),
          endTs: endDt.toMillis()
        });
      }
    }

    current = current.plus({ days: 1 });
  }

  console.log(`Generated ${allShifts.length} potential shifts.`);

  if (allShifts.length === 0) throw new Error("No shifts in selected date range.");

  const minTs = Math.min(...allShifts.map(s => s.ts));
  const maxTs = Math.max(...allShifts.map(s => s.ts));

  // 3. Exact conflict constraints via sweep-line
  // Handles:
  // - Overlap: cannot be on two shifts that overlap in time
  // - Rest: for non-overnights, start times must be >= 20 hours apart
  const REST_MS = 20 * 60 * 60 * 1000;

  const shiftsSorted = allShifts.slice().sort((a, b) => a.ts - b.ts);

  // Build list of conflicting shift pairs (i < j, by start time)
  // For each s1, only scan forward until no conflict window possible.
  const conflictPairs = [];
  for (let i = 0; i < shiftsSorted.length; i++) {
    const s1 = shiftsSorted[i];

    // Past this time, no later start can overlap s1, and no later start can violate rest (if applicable).
    const horizonEnd = s1.isOvernight
      ? s1.endTs
      : Math.max(s1.endTs, s1.ts + REST_MS);

    for (let j = i + 1; j < shiftsSorted.length; j++) {
      const s2 = shiftsSorted[j];
      if (s2.ts >= horizonEnd) break;

      const overlap = s2.ts < s1.endTs; // s2 starts before s1 ends (s2 starts after s1)
      const restViolation = (!s1.isOvernight && !s2.isOvernight && (s2.ts - s1.ts) < REST_MS);

      if (overlap || restViolation) {
        conflictPairs.push([s1.idx, s2.idx]);
      }
    }
  }

  // 4. Symmetry breaking (anchors)
  // Students are interchangeable. This reduces equivalent permutations.
  // Enforce: for a few early shifts, x(anchor, stud[i]) >= x(anchor, stud[i+1])
  const anchors = shiftsSorted.slice(0, Math.min(10, shiftsSorted.length));

  // 5. Solve using HiGHS (main thread)
  statusDiv.innerHTML = '<span class="loading">Solving with HiGHS (WASM)...</span>';

  const shiftsPayload = allShifts.map(s => ({
    idx: s.idx,
    id: s.id,
    ts: s.ts,
    endTs: s.endTs,
    name: s.name,
    category: s.category,
    site: s.site,
    isOvernight: s.isOvernight
  }));

  const payload = {
    students,
    shifts: shiftsPayload,
    conflictPairs,
    anchorShiftIdxs: anchors.map(s => s.idx),
    minTs,
    maxTs
  };

  solveWithHighs(payload)
    .then((res) => {
      console.log("HiGHS status:", res.status, "objective:", res.objective);
      statusDiv.innerHTML = '<span class="success">Solution Found!</span>';
      renderResultsFromChosen(res.chosen, allShifts, students, outputDiv);
    })
    .catch((err) => {
      console.error(err);
      statusDiv.innerHTML = `<span class="error">No feasible solution found (or solver error). ${err.message}</span>`;
    })
    .finally(() => {
      btn.disabled = false;
    });
}

function renderResultsFromChosen(chosenPairs, allShifts, students, container) {
  const schedule = {};
  for (const s of students) schedule[s] = [];

  for (const [shiftIdx, studentIdx] of chosenPairs) {
    const shiftObj = allShifts[shiftIdx];
    const student = students[studentIdx];
    if (shiftObj && schedule[student]) schedule[student].push(shiftObj);
  }

  for (const s of students) schedule[s].sort((a, b) => a.ts - b.ts);

  let html =
    '<table><thead><tr><th style="width:15%">Student</th><th style="width:5%">Count</th><th>Assigned Shifts</th></tr></thead><tbody>';

  for (const student of students) {
    const myShifts = schedule[student];

    const shiftHtml = myShifts
      .map(s => {
        const startDt = s.start || DateTime.fromMillis(s.ts);
        const endDt = s.end || DateTime.fromMillis(s.endTs);

        const dateStr = startDt.toFormat("MMM dd (EEE)");
        const timeStr = startDt.toFormat("HH:mm") + "-" + endDt.toFormat("HH:mm");
        let color = "#333";
        if (s.isOvernight) color = "#d35400";
        else if (s.category === "ccf") color = "#2980b9";
        else if (s.category === "trauma") color = "#c0392b";

        return `<div class="shift-cell" style="color:${color}">
            <span class="shift-time">${dateStr}</span>
            <b>${s.name}</b>
            <span class="shift-detail">[${timeStr}] @ ${s.site}</span>
        </div>`;
      })
      .join("");

    html += `<tr>
        <td style="vertical-align: top; font-weight: bold;">${student}</td>
        <td style="vertical-align: top; text-align: center;">${myShifts.length}</td>
        <td style="vertical-align: top;">${shiftHtml}</td>
      </tr>`;
  }

  html += "</tbody></table>";
  container.innerHTML = html;
}