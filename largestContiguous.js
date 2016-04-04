/////////////////////////////////////////////////////////////
// LARGEST CONTIGUOUS SUM
// -----------------------------------------
// What is the largest contiguous (row of numbers) sum of an array of digits?
//
// EX:
// [1, 2, 3] => 6
// [1, 2,-2, 3] => 4
// [1, 2,-4, 1, 2, 3] => 6
//
/////////////////////////////////////////////////////////////


var largestContiguousSum = function (array) {
  // store highestSum
  var highestSum = 0;

  // store currentSum
  var currentSum = 0;

  // iterate over array
  for (var i = 0; i < array.length; i++) {
    
    // if current >= 0, add to sum
    if (array[i] >= 0) {
      currentSum += array[i];
    } else {

      // if currentSum + current < 0, currentSum = 0
      if (currentSum + array[i] < 0) {
        currentSum = 0;
      } else {
        // currentSum += current
        currentSum += array[i];
      }
    }

    // if currentSum > highestSum, highestSum = currentSum
    if (currentSum > highestSum) {
      highestSum = currentSum;
    }
  }

  // return highestSum
  return highestSum;
};


var array = [10,22,3,4,-5,23,-100,5];
console.log('Pass? ', largestContiguousSum(array) === 57);
