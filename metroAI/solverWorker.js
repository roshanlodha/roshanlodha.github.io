/* global Module */

// Load HiGHS runtime in worker scope ASAP.
try {
  importScripts("./vendor/highs.js");
} catch (e) {
  // Surface import failures to the main thread.
  self.postMessage({
    type: "fatal",
    ok: false,
    error: `Failed to import HiGHS runtime: ${e instanceof Error ? e.message : String(e)}`
  });
  throw e;
}

self.addEventListener("error", (evt) => {
  // Forward uncaught errors to the main thread.
  try {
    self.postMessage({
      type: "fatal",
      ok: false,
      error: evt?.message || "Worker error",
      filename: evt?.filename,
      lineno: evt?.lineno,
      colno: evt?.colno
    });
  } catch (_) {
    // ignore
  }
});

self.addEventListener("unhandledrejection", (evt) => {
  // Forward promise rejections (common if WASM fetch/instantiate fails).
  const reason = evt?.reason;
  try {
    self.postMessage({
      type: "fatal",
      ok: false,
      error: reason instanceof Error ? reason.message : String(reason)
    });
  } catch (_) {
    // ignore
  }
});

let highsPromise = null;

function getHighs() {
  if (!highsPromise) {
    highsPromise = Module({
      locateFile: (file) => new URL(`vendor/${file}`, self.location.href).toString()
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

async function solve(payload) {
  const highs = await getHighs();
  const lp = buildLp(payload);

  // Use HiGHS defaults (MIP will run when binaries exist).
  const sol = highs.solve(lp);

  return sol;
}

self.onmessage = async (evt) => {
  const msg = evt.data;
  if (!msg || msg.type !== "solve") return;
  const requestId = msg.id;

  try {
    const sol = await solve(msg.payload);

    // HiGHS returns { Status, Columns, ObjectiveValue, Rows }
    const status = sol?.Status || "Unknown";
    if (status !== "Optimal" && status !== "Feasible" && status !== "Time limit reached") {
      self.postMessage({
        type: "result",
        id: requestId,
        ok: false,
        error: `HiGHS status: ${status}`
      });
      return;
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

    self.postMessage({
      type: "result",
      id: requestId,
      ok: true,
      status,
      objective: sol.ObjectiveValue,
      chosen
    });
  } catch (err) {
    self.postMessage({
      type: "result",
      id: requestId,
      ok: false,
      error: err instanceof Error ? err.message : String(err)
    });
  }
};

// Let the main thread know the worker initialized.
self.postMessage({ type: "ready", ok: true });
