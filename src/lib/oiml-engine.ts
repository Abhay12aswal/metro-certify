import {
  AccuracyClass,
  CalculatedTestPoint,
  InstrumentData,
  RawTestPointInput,
  TestMatrixSummary,
  VerificationType,
} from '../types/metrology';

/**
 * Precision rounding helper to eliminate IEEE-754 floating-point arithmetic jitter.
 */
export function roundTo(val: number, decimals: number = 6): number {
  const factor = Math.pow(10, decimals);
  return Math.round((val + Number.EPSILON) * factor) / factor;
}

/**
 * Calculates the indication before rounding using the turning point method (OIML R 76-1 Clause A.4.4.3)
 * Formula: P = I + 0.5 * d - ΔL
 *
 * @param indication - Instrument display value (I)
 * @param actualDivision - Scale division (d)
 * @param addedLoad - Small weights added until display increments by 1d (ΔL)
 */
export function calculateTurningPointP(
  indication: number,
  actualDivision: number,
  addedLoad: number
): number {
  return roundTo(indication + 0.5 * actualDivision - addedLoad);
}

/**
 * Computes True Error (E)
 * Formula: E = P - L
 */
export function calculateTrueError(turningPointP: number, appliedLoad: number): number {
  return roundTo(turningPointP - appliedLoad);
}

/**
 * Computes Corrected Error (Ec)
 * Formula: Ec = E - E0
 * where E0 is the true error at zero applied load
 */
export function calculateCorrectedError(trueErrorE: number, zeroErrorE0: number): number {
  return roundTo(trueErrorE - zeroErrorE0);
}

/**
 * Returns Maximum Permissible Error (MPE) in units of verification scale intervals (e)
 * Strictly adheres to OIML R 76-1 Section 3.5.1 (Table 6) and Section 3.5.2 (In-Service).
 *
 * @param accuracyClass - Class I, II, III, IIII
 * @param loadInDivisions - Applied load in multiples of e (m / e)
 * @param verificationType - 'initial' or 'in_service' (service doubles the MPE)
 */
export function getMPEInDivisions(
  accuracyClass: AccuracyClass,
  loadInDivisions: number,
  verificationType: VerificationType = 'initial'
): number {
  const m = Math.abs(loadInDivisions);
  let baseMpe = 1.5;

  switch (accuracyClass) {
    case 'class_I':
      // Class I: Special Accuracy
      if (m <= 50000) {
        baseMpe = 0.5;
      } else if (m <= 200000) {
        baseMpe = 1.0;
      } else {
        baseMpe = 1.5;
      }
      break;

    case 'class_II':
      // Class II: High Accuracy
      if (m <= 5000) {
        baseMpe = 0.5;
      } else if (m <= 20000) {
        baseMpe = 1.0;
      } else {
        baseMpe = 1.5;
      }
      break;

    case 'class_III':
      // Class III: Medium Accuracy (Typical Commercial Scales)
      if (m <= 500) {
        baseMpe = 0.5;
      } else if (m <= 2000) {
        baseMpe = 1.0;
      } else {
        baseMpe = 1.5;
      }
      break;

    case 'class_IIII':
      // Class IIII: Ordinary Accuracy
      if (m <= 50) {
        baseMpe = 0.5;
      } else if (m <= 200) {
        baseMpe = 1.0;
      } else {
        baseMpe = 1.5;
      }
      break;

    default:
      baseMpe = 1.0;
  }

  // OIML R 76-1 Clause 3.5.2: Maximum permissible errors in service shall be twice initial verification MPE
  const multiplier = verificationType === 'in_service' ? 2 : 1;
  return roundTo(baseMpe * multiplier, 2);
}

/**
 * Evaluates whether an error complies with the permissible MPE limit.
 * Condition: |Ec| <= |MPE| (with 1e-7 float epsilon guard)
 */
export function checkCompliance(
  correctedErrorInDivisionsEc: number,
  mpeDivisions: number
): boolean {
  return Math.abs(correctedErrorInDivisionsEc) <= mpeDivisions + 1e-7;
}

/**
 * Generates an array of official standard test load values for an instrument.
 * Standard OIML recommended points: 0, Min, 500e, 1000e, 2000e, 50% Max, Max (and descending sequence).
 */
export function generateStandardTestLoads(instrument: InstrumentData): {
  ascending: { label: string; load: number }[];
  descending: { label: string; load: number }[];
} {
  const { maxCapacity, minCapacity, verificationInterval, accuracyClass } = instrument;
  const e = verificationInterval;

  // Key MPE transition thresholds in divisions for this class
  let step1Div = 500;
  let step2Div = 2000;

  if (accuracyClass === 'class_I') {
    step1Div = 50000;
    step2Div = 200000;
  } else if (accuracyClass === 'class_II') {
    step1Div = 5000;
    step2Div = 20000;
  } else if (accuracyClass === 'class_IIII') {
    step1Div = 50;
    step2Div = 200;
  }

  const rawPoints = new Set<number>();
  rawPoints.add(0);
  if (minCapacity > 0 && minCapacity < maxCapacity) {
    rawPoints.add(minCapacity);
  }

  // First MPE boundary
  const p1 = step1Div * e;
  if (p1 > minCapacity && p1 < maxCapacity) {
    rawPoints.add(p1);
  }

  // Half max
  const halfMax = roundTo(maxCapacity / 2);
  if (halfMax > minCapacity && halfMax < maxCapacity) {
    rawPoints.add(halfMax);
  }

  // Second MPE boundary
  const p2 = step2Div * e;
  if (p2 > minCapacity && p2 < maxCapacity) {
    rawPoints.add(p2);
  }

  // Max capacity
  rawPoints.add(maxCapacity);

  const sortedLoads = Array.from(rawPoints).sort((a, b) => a - b);

  const ascending = sortedLoads.map((load) => {
    let label = `${load}${instrument.unit}`;
    if (load === 0) label = 'Zero (0)';
    else if (load === minCapacity) label = `Min (${load}${instrument.unit})`;
    else if (load === maxCapacity) label = `Max (${load}${instrument.unit})`;
    else if (load === p1) label = `${step1Div}e (${load}${instrument.unit})`;
    else if (load === p2) label = `${step2Div}e (${load}${instrument.unit})`;
    else if (load === halfMax) label = `50% Max (${load}${instrument.unit})`;

    return { label, load };
  });

  const descending = [...sortedLoads].reverse().map((load) => {
    let label = `${load}${instrument.unit} (Unload)`;
    if (load === maxCapacity) label = `Max (${load}${instrument.unit})`;
    else if (load === 0) label = 'Zero Return (0)';
    return { label, load };
  });

  return { ascending, descending };
}

/**
 * Calculates complete metrological outputs for all test rows in a batch.
 */
export function calculateTestMatrix(
  rawPoints: RawTestPointInput[],
  instrument: InstrumentData,
  verificationType: VerificationType = 'initial'
): {
  calculatedPoints: CalculatedTestPoint[];
  summary: TestMatrixSummary;
} {
  const d = instrument.actualDivision || instrument.verificationInterval;
  const e = instrument.verificationInterval;

  // Determine E0 from the zero load point in ascending sequence (or the first point with L = 0)
  const zeroPoint = rawPoints.find(
    (p) => p.appliedLoad === 0 && p.sequence === 'ascending'
  ) || rawPoints.find((p) => p.appliedLoad === 0);

  let zeroErrorE0 = 0;
  if (zeroPoint) {
    const p0 = calculateTurningPointP(zeroPoint.indication, d, zeroPoint.addedLoad);
    zeroErrorE0 = calculateTrueError(p0, 0);
  }

  const zeroErrorInDivisionsE0 = e > 0 ? roundTo(zeroErrorE0 / e, 3) : 0;

  let passedCount = 0;
  let failedCount = 0;
  let maxAbsErrorEc = 0;
  let maxMpe = 0;

  const calculatedPoints: CalculatedTestPoint[] = rawPoints.map((pt) => {
    const loadInDivisions = e > 0 ? roundTo(pt.appliedLoad / e, 2) : 0;
    const turningPointP = calculateTurningPointP(pt.indication, d, pt.addedLoad);
    const trueErrorE = calculateTrueError(turningPointP, pt.appliedLoad);
    const trueErrorInDivisionsE = e > 0 ? roundTo(trueErrorE / e, 3) : 0;
    const correctedErrorEc = calculateCorrectedError(trueErrorE, zeroErrorE0);
    const correctedErrorInDivisionsEc =
      e > 0 ? roundTo(correctedErrorEc / e, 3) : 0;

    const mpeDivisions = getMPEInDivisions(
      instrument.accuracyClass,
      loadInDivisions,
      verificationType
    );
    const mpeMass = roundTo(mpeDivisions * e, 5);

    const isCompliant = checkCompliance(
      correctedErrorInDivisionsEc,
      mpeDivisions
    );

    if (isCompliant) {
      passedCount++;
    } else {
      failedCount++;
    }

    const absEc = Math.abs(correctedErrorInDivisionsEc);
    if (absEc > maxAbsErrorEc) {
      maxAbsErrorEc = absEc;
    }
    if (mpeDivisions > maxMpe) {
      maxMpe = mpeDivisions;
    }

    return {
      ...pt,
      loadInDivisions,
      turningPointP,
      trueErrorE,
      trueErrorInDivisionsE,
      correctedErrorEc,
      correctedErrorInDivisionsEc,
      mpeDivisions,
      mpeMass,
      isCompliant,
    };
  });

  const overallStatus =
    failedCount === 0 && rawPoints.length > 0 ? 'PASS' : 'FAIL';

  // Digital certificate hash generation (SHA-256 style fingerprint string)
  const rawFingerprint = [
    instrument.serialNumber,
    instrument.manufacturer,
    instrument.accuracyClass,
    instrument.maxCapacity,
    instrument.verificationInterval,
    rawPoints.length,
    passedCount,
    overallStatus,
    maxAbsErrorEc,
  ].join('|');

  const certificateHash = generateSimpleHash(rawFingerprint);

  const summary: TestMatrixSummary = {
    totalPoints: rawPoints.length,
    passedPoints: passedCount,
    failedPoints: failedCount,
    zeroErrorE0,
    zeroErrorInDivisionsE0,
    maxAbsoluteErrorEc: maxAbsErrorEc,
    maxPermissibleLimit: maxMpe,
    overallStatus,
    certificateHash,
  };

  return { calculatedPoints, summary };
}

/**
 * Deterministic hash generator for offline tamper-evident certificate verification.
 */
function generateSimpleHash(input: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  const hexPart1 = (hash >>> 0).toString(16).padStart(8, '0');
  
  // Secondary pass for 16-hex length string
  let hash2 = 0x55555555;
  for (let i = input.length - 1; i >= 0; i--) {
    hash2 ^= input.charCodeAt(i);
    hash2 = Math.imul(hash2, 0x1000193);
  }
  const hexPart2 = (hash2 >>> 0).toString(16).padStart(8, '0');

  return `OIML-R76-${hexPart1.toUpperCase()}-${hexPart2.toUpperCase()}`;
}
