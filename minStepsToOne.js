/////////////////////////////////////////////////////////////
// Min Steps To One:
// -------------------------------
// On a positive int, you can perform 3 steps:
// 1. Subtract 1 from it
// 2. if it's divisible by 2, divide by 2
// 3. if it's divisible by 3, divide by 3
//
// Return the minimum number of steps to 1
//
// EX:
// 10 -> 9 -> 3 -> 1
// 5 -> 4 -> 2 -> 1
/////////////////////////////////////////////////////////////

function range(n) {
  var result = [];
  for (var i = 0; i < n + 1; i++) {
    result.push(0);
  }
  return result;
}

//if n === 5
//[0,0,1,1,2,3]

function getMinSteps(n) {
  var results = range(n + 1);

  for (var i = 2; i < results.length; i++) {
    // Increase by 1 step
    results[i] = results[i-1] + 1;
    if (i % 2 === 0) {
      // If divisible by 2, reset results[i] to be min of 
      // results[i - 1] + 1 or results[i / 2 + 1]
      results[i] = Math.min(results[i - 1] +1, results[i / 2] + 1);
    } else if (i % 3 === 0) {
      results[i] = Math.min(results[i -1] +1, results[i / 3] + 1);
    }
  }
  return results[n];
}

/////////////////////////////////////////////////////////////
// TESTS
/////////////////////////////////////////////////////////////

console.log('Pass? ', getMinSteps(10) === 3);
