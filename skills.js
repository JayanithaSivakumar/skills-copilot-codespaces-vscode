// ===== INEFFICIENT CODE EXAMPLES (BEFORE OPTIMIZATION) =====

// 1. Inefficient: Using multiple loops where one would suffice
function processArraysInefficient(arr1, arr2) {
    let doubled = [];
    for (let i = 0; i < arr1.length; i++) {
        doubled.push(arr1[i] * 2);
    }
    
    let result = [];
    for (let i = 0; i < doubled.length; i++) {
        if (doubled[i] > 10) {
            result.push(doubled[i]);
        }
    }
    
    let sum = 0;
    for (let i = 0; i < result.length; i++) {
        sum += result[i];
    }
    
    return sum;
}

// 2. Inefficient: String concatenation in loop
function buildStringInefficient(words) {
    let sentence = '';
    for (let i = 0; i < words.length; i++) {
        sentence = sentence + words[i] + ' '; // Creates new string each iteration
    }
    return sentence.trim();
}

// 3. Inefficient: Unnecessary array operations
function findUserInefficient(users, id) {
    const userArray = users.filter(user => user.id === id); // Returns array
    if (userArray.length > 0) {
        return userArray[0]; // Only need first match
    }
    return null;
}

// 4. Inefficient: Not caching expensive calculations
function calculateExpensiveInefficient(data) {
    const results = [];
    for (let i = 0; i < data.length; i++) {
        // Recalculating same value multiple times
        const baseValue = Math.sqrt(data[i]) * Math.PI;
        results.push({
            value: data[i],
            calculated: baseValue,
            doubled: baseValue * 2,
            tripled: baseValue * 3
        });
    }
    return results;
}

// 5. Inefficient: Searching array multiple times
function getMultipleItemsInefficient(items, ids) {
    const results = [];
    for (let i = 0; i < ids.length; i++) {
        for (let j = 0; j < items.length; j++) {
            if (items[j].id === ids[i]) {
                results.push(items[j]);
                break;
            }
        }
    }
    return results;
}

// ===== OPTIMIZED CODE EXAMPLES (AFTER IMPROVEMENTS) =====

// 1. OPTIMIZED: Single loop with chaining
function processArraysOptimized(arr1, arr2) {
    // Use reduce for single-pass processing
    return arr1.reduce((sum, num) => {
        const doubled = num * 2;
        return doubled > 10 ? sum + doubled : sum;
    }, 0);
}

// 2. OPTIMIZED: Array join for string building
function buildStringOptimized(words) {
    // Join is much faster than repeated concatenation
    return words.join(' ');
}

// 3. OPTIMIZED: Use find() instead of filter()
function findUserOptimized(users, id) {
    // find() stops at first match, doesn't create intermediate array
    return users.find(user => user.id === id) || null;
}

// 4. OPTIMIZED: Cache expensive calculations
function calculateExpensiveOptimized(data) {
    // Calculate once, reuse multiple times
    return data.map(value => {
        const baseValue = Math.sqrt(value) * Math.PI;
        return {
            value: value,
            calculated: baseValue,
            doubled: baseValue * 2,
            tripled: baseValue * 3
        };
    });
}

// 5. OPTIMIZED: Use Map for O(1) lookups instead of O(n)
function getMultipleItemsOptimized(items, ids) {
    // Create a Map for O(1) lookups - O(n) time instead of O(n*m)
    const itemMap = new Map(items.map(item => [item.id, item]));
    return ids.map(id => itemMap.get(id)).filter(item => item !== undefined);
}

// ===== PERFORMANCE COMPARISON UTILITIES =====

// Helper function to measure execution time
function measurePerformance(fn, ...args) {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    return {
        result: result,
        time: end - start
    };
}

// Example usage and comparison
function demonstrateImprovements() {
    console.log('=== Performance Improvements Demo ===\n');
    
    // Test data
    const testArray = Array.from({ length: 1000 }, (_, i) => i + 1);
    const testWords = Array.from({ length: 1000 }, (_, i) => `word${i}`);
    const testUsers = Array.from({ length: 1000 }, (_, i) => ({ id: i, name: `User${i}` }));
    const testIds = [10, 50, 100, 500, 999];
    
    // Test 1: Array processing
    const test1Inefficient = measurePerformance(processArraysInefficient, testArray);
    const test1Optimized = measurePerformance(processArraysOptimized, testArray);
    console.log(`Array Processing:`);
    console.log(`  Inefficient: ${test1Inefficient.time.toFixed(3)}ms`);
    console.log(`  Optimized: ${test1Optimized.time.toFixed(3)}ms`);
    console.log(`  Improvement: ${((test1Inefficient.time / test1Optimized.time) * 100 - 100).toFixed(1)}% faster\n`);
    
    // Test 2: String building
    const test2Inefficient = measurePerformance(buildStringInefficient, testWords);
    const test2Optimized = measurePerformance(buildStringOptimized, testWords);
    console.log(`String Building:`);
    console.log(`  Inefficient: ${test2Inefficient.time.toFixed(3)}ms`);
    console.log(`  Optimized: ${test2Optimized.time.toFixed(3)}ms`);
    console.log(`  Improvement: ${((test2Inefficient.time / test2Optimized.time) * 100 - 100).toFixed(1)}% faster\n`);
    
    // Test 3: User lookup
    const test3Inefficient = measurePerformance(getMultipleItemsInefficient, testUsers, testIds);
    const test3Optimized = measurePerformance(getMultipleItemsOptimized, testUsers, testIds);
    console.log(`Multiple Item Lookup:`);
    console.log(`  Inefficient: ${test3Inefficient.time.toFixed(3)}ms`);
    console.log(`  Optimized: ${test3Optimized.time.toFixed(3)}ms`);
    console.log(`  Improvement: ${((test3Inefficient.time / test3Optimized.time) * 100 - 100).toFixed(1)}% faster\n`);
}

// Keep original function for backward compatibility
function calculateNumbers(var1, var2) {
    return var1 + var2;
}

// Export functions for use in other modules (if using Node.js modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Inefficient versions
        processArraysInefficient,
        buildStringInefficient,
        findUserInefficient,
        calculateExpensiveInefficient,
        getMultipleItemsInefficient,
        // Optimized versions
        processArraysOptimized,
        buildStringOptimized,
        findUserOptimized,
        calculateExpensiveOptimized,
        getMultipleItemsOptimized,
        // Utilities
        measurePerformance,
        demonstrateImprovements,
        calculateNumbers
    };
}