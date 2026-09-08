export type AccuracyClass = 'class_I' | 'class_II' | 'class_III' | 'class_IIII';

export type VerificationType = 'initial' | 'in_service';

export type WeightUnit = 'g' | 'kg';

export type LoadSequence = 'ascending' | 'descending';

export interface InstrumentData {
  manufacturer: string;
  model: string;
  serialNumber: string;
  accuracyClass: AccuracyClass;
  maxCapacity: number; // Max
  minCapacity: number; // Min
  verificationInterval: number; // e
  actualDivision: number; // d
  unit: WeightUnit;
  scaleIntervalCount: number; // n = Max / e
  deviceType?: string;
}

export interface EnvironmentalConditions {
  temperature: number; // °C
  humidity: number; // % RH
  pressure: number; // hPa
  voltage: number; // V
}

export interface InspectionMetadata {
  labName: string;
  labLocation: string;
  officerName: string;
  officerDesignation: string;
  approverName: string;
  approverDesignation: string;
  certificateNumber: string;
  testDate: string;
  verificationType: VerificationType;
}

export interface RawTestPointInput {
  id: string;
  sequence: LoadSequence;
  stepLabel: string;
  appliedLoad: number; // L
  indication: number; // I
  addedLoad: number; // ΔL
  notes?: string;
}

export interface CalculatedTestPoint extends RawTestPointInput {
  loadInDivisions: number; // m / e
  turningPointP: number; // P = I + 0.5d - ΔL
  trueErrorE: number; // E = P - L
  trueErrorInDivisionsE: number; // E / e
  correctedErrorEc: number; // Ec = E - E0
  correctedErrorInDivisionsEc: number; // Ec / e
  mpeDivisions: number; // ± MPE in e
  mpeMass: number; // ± MPE in mass unit
  isCompliant: boolean; // |Ec| <= MPE
}

export interface TestMatrixSummary {
  totalPoints: number;
  passedPoints: number;
  failedPoints: number;
  zeroErrorE0: number; // in mass units
  zeroErrorInDivisionsE0: number; // in e
  maxAbsoluteErrorEc: number; // in e
  maxPermissibleLimit: number; // in e
  overallStatus: 'PASS' | 'FAIL';
  certificateHash: string;
}

export interface MetroCertifyState {
  instrument: InstrumentData;
  environment: EnvironmentalConditions;
  inspection: InspectionMetadata;
  testPoints: RawTestPointInput[];
}
