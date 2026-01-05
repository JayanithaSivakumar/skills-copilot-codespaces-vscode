// Test file for skills.js performance improvements
// This file validates that optimized functions produce correct results

// Load the skills module (works in Node.js environment)
const skills = require('./skills.js');

// Test data
const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const testWords = ['Hello', 'World', 'JavaScript', 'Performance'];
const testUsers = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'Diana' }
];
const testIds = [2, 4];

// Test utilities
let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`✓ ${message}`);
        testsPassed++;
    } else {
        console.error(`✗ ${message}`);
        testsFailed++;
    }
}

function assertEqual(actual, expected, message) {
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
        console.log(`✓ ${message}`);
        testsPassed++;
    } else {
        console.error(`✗ ${message}`);
        console.error(`  Expected: ${JSON.stringify(expected)}`);
        console.error(`  Actual: ${JSON.stringify(actual)}`);
        testsFailed++;
    }
}

console.log('=== Running Performance Improvement Tests ===\n');

// Test 1: Array Processing
console.log('Test 1: Array Processing');
const result1Inefficient = skills.processArraysInefficient(testArray);
const result1Optimized = skills.processArraysOptimized(testArray);
assertEqual(result1Optimized, result1Inefficient, 'Optimized array processing produces same result as inefficient version');

// Test 2: String Building
console.log('\nTest 2: String Building');
const result2Inefficient = skills.buildStringInefficient(testWords);
const result2Optimized = skills.buildStringOptimized(testWords);
assertEqual(result2Optimized, result2Inefficient, 'Optimized string building produces same result as inefficient version');

// Test 3: Finding User
console.log('\nTest 3: Finding User');
const result3Inefficient = skills.findUserInefficient(testUsers, 2);
const result3Optimized = skills.findUserOptimized(testUsers, 2);
assertEqual(result3Optimized, result3Inefficient, 'Optimized user find produces same result as inefficient version');

const result3NullInefficient = skills.findUserInefficient(testUsers, 999);
const result3NullOptimized = skills.findUserOptimized(testUsers, 999);
assertEqual(result3NullOptimized, result3NullInefficient, 'Optimized user find returns null for non-existent ID');

// Test 4: Expensive Calculations
console.log('\nTest 4: Expensive Calculations');
const result4Inefficient = skills.calculateExpensiveInefficient(testArray);
const result4Optimized = skills.calculateExpensiveOptimized(testArray);
assertEqual(result4Optimized.length, result4Inefficient.length, 'Optimized calculation produces same number of results');
assert(
    Math.abs(result4Optimized[0].calculated - result4Inefficient[0].calculated) < 0.0001,
    'Optimized calculation produces same values'
);

// Test 5: Multiple Item Lookup
console.log('\nTest 5: Multiple Item Lookup');
const result5Inefficient = skills.getMultipleItemsInefficient(testUsers, testIds);
const result5Optimized = skills.getMultipleItemsOptimized(testUsers, testIds);
assertEqual(result5Optimized, result5Inefficient, 'Optimized multiple item lookup produces same result as inefficient version');

// Test 6: Original function still works
console.log('\nTest 6: Backward Compatibility');
const result6 = skills.calculateNumbers(5, 10);
assertEqual(result6, 15, 'Original calculateNumbers function still works');

// Test 7: Performance measurement utility
console.log('\nTest 7: Performance Measurement');
const perfResult = skills.measurePerformance(skills.calculateNumbers, 5, 10);
assert(perfResult.result === 15, 'Performance measurement returns correct result');
assert(typeof perfResult.time === 'number', 'Performance measurement returns execution time');
assert(perfResult.time >= 0, 'Performance measurement time is non-negative');

// Summary
console.log('\n=== Test Summary ===');
console.log(`Tests Passed: ${testsPassed}`);
console.log(`Tests Failed: ${testsFailed}`);

if (testsFailed === 0) {
    console.log('\n✓ All tests passed! Code improvements maintain correctness.');
    process.exit(0);
} else {
    console.log('\n✗ Some tests failed. Please review the code.');
    process.exit(1);
}
