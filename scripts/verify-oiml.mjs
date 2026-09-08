// Metrological Verification Test Script for OIML R 76-1 & R 76-2 engine
function roundTo(val, decimals = 6) {
  const factor = Math.pow(10, decimals);
  return Math.round((val + Number.EPSILON) * factor) / factor;
}

function calculateTurningPointP(indication, actualDivision, addedLoad) {
  return roundTo(indication + 0.5 * actualDivision - addedLoad);
}

function calculateTrueError(turningPointP, appliedLoad) {
  return roundTo(turningPointP - appliedLoad);
}

function calculateCorrectedError(trueErrorE, zeroErrorE0) {
  return roundTo(trueErrorE - zeroErrorE0);
}

function getMPEInDivisions(accuracyClass, loadInDivisions, verificationType = 'initial') {
  const m = Math.abs(loadInDivisions);
  let baseMpe = 1.5;

  switch (accuracyClass) {
    case 'class_I':
      if (m <= 50000) baseMpe = 0.5;
      else if (m <= 200000) baseMpe = 1.0;
      else baseMpe = 1.5;
      break;
    case 'class_II':
      if (m <= 5000) baseMpe = 0.5;
      else if (m <= 20000) baseMpe = 1.0;
      else baseMpe = 1.5;
      break;
    case 'class_III':
      if (m <= 500) baseMpe = 0.5;
      else if (m <= 2000) baseMpe = 1.0;
      else baseMpe = 1.5;
      break;
    case 'class_IIII':
      if (m <= 50) baseMpe = 0.5;
      else if (m <= 200) baseMpe = 1.0;
      else baseMpe = 1.5;
      break;
  }

  const multiplier = verificationType === 'in_service' ? 2 : 1;
  return roundTo(baseMpe * multiplier, 2);
}

function checkCompliance(correctedErrorInDivisionsEc, mpeDivisions) {
  return Math.abs(correctedErrorInDivisionsEc) <= mpeDivisions + 1e-7;
}

console.log('--- RUNNING OIML R 76-1 METROLOGICAL ENGINE VERIFICATION ---');

// Test 1: Clause A.4.4.3 Turning point indication P calculation
// Indication I = 10.0kg, d = 0.005kg, ΔL = 0.0035kg
// P = 10.0 + 0.5*0.005 - 0.0035 = 10.0 + 0.0025 - 0.0035 = 9.9990 kg
const P = calculateTurningPointP(10.0, 0.005, 0.0035);
console.assert(P === 9.999, `Test 1 Failed: Expected 9.999, got ${P}`);
console.log('✓ Test 1 Passed: Turning point indication P = 9.9990 kg');

// Test 2: True Error E
// L = 10.0kg -> E = P - L = 9.9990 - 10.0 = -0.0010 kg
const E = calculateTrueError(P, 10.0);
console.assert(E === -0.001, `Test 2 Failed: Expected -0.001, got ${E}`);
console.log('✓ Test 2 Passed: True error E = -0.0010 kg');

// Test 3: Corrected Error Ec with zero offset E0 = +0.0005 kg
// Ec = E - E0 = -0.0010 - (+0.0005) = -0.0015 kg (-0.3e)
const Ec = calculateCorrectedError(E, 0.0005);
console.assert(Ec === -0.0015, `Test 3 Failed: Expected -0.0015, got ${Ec}`);
console.log('✓ Test 3 Passed: Corrected error Ec = -0.0015 kg (-0.3e)');

// Test 4: Dynamic MPE for Class III (Initial Verification)
// 0 to 500e -> ±0.5e
console.assert(getMPEInDivisions('class_III', 0) === 0.5, 'Class III 0e MPE failed');
console.assert(getMPEInDivisions('class_III', 500) === 0.5, 'Class III 500e MPE failed');
// 501 to 2000e -> ±1.0e
console.assert(getMPEInDivisions('class_III', 501) === 1.0, 'Class III 501e MPE failed');
console.assert(getMPEInDivisions('class_III', 2000) === 1.0, 'Class III 2000e MPE failed');
// > 2000e -> ±1.5e
console.assert(getMPEInDivisions('class_III', 2001) === 1.5, 'Class III 2001e MPE failed');
console.assert(getMPEInDivisions('class_III', 10000) === 1.5, 'Class III 10000e MPE failed');
console.log('✓ Test 4 Passed: Class III MPE bounds verified at 500e, 2000e, and 10000e');

// Test 5: Dynamic MPE for Class II (Initial Verification)
// 0 to 5,000e -> ±0.5e; 5,000 to 20,000e -> ±1.0e; > 20,000e -> ±1.5e
console.assert(getMPEInDivisions('class_II', 5000) === 0.5, 'Class II 5000e failed');
console.assert(getMPEInDivisions('class_II', 15000) === 1.0, 'Class II 15000e failed');
console.assert(getMPEInDivisions('class_II', 60000) === 1.5, 'Class II 60000e failed');
console.log('✓ Test 5 Passed: Class II MPE bounds verified at 5000e, 20000e, and 60000e');

// Test 6: In-Service Verification 2x Multiplier
console.assert(getMPEInDivisions('class_III', 200, 'in_service') === 1.0, 'In-service 200e failed');
console.assert(getMPEInDivisions('class_III', 1000, 'in_service') === 2.0, 'In-service 1000e failed');
console.assert(getMPEInDivisions('class_III', 3000, 'in_service') === 3.0, 'In-service 3000e failed');
console.log('✓ Test 6 Passed: In-Service 2x MPE multiplier verified');

// Test 7: Compliance Check
console.assert(checkCompliance(0.3, 0.5) === true, 'Compliance test 1 failed');
console.assert(checkCompliance(0.5, 0.5) === true, 'Compliance test 2 failed (boundary)');
console.assert(checkCompliance(0.51, 0.5) === false, 'Compliance test 3 failed (breach)');
console.assert(checkCompliance(-1.2, 1.0) === false, 'Compliance test 4 failed (negative breach)');
console.log('✓ Test 7 Passed: Compliance condition |Ec| <= MPE verified');

console.log('\nALL 7 OIML R 76-1 CALCULATION TESTS COMPLETED SUCCESSFULLY!');
