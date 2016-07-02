/////////////////////////////////////////////////////////////
// Alphabetical Words
// ----------------------------------------------------------
// I have an array of words that are mostly alphabetical,
// except they start somewhere in the middle of the alphabet,
// reach the end, and then start from the beginning of the
// alphabet.
//
// In other words, this is an alphabetically ordered array
// that has been "rotated." For example:
// ['dog','eagle','falcon', /*PIVOT*/ 'apple','bear','cat']
//
// Write a function that returns the index of the 'pivot'
//
/////////////////////////////////////////////////////////////

var findPivotedWord = function (array, start, end) {
  start = start || 0;
  end = end || array.length - 1;

  var mid = Math.floor((end - start) / 2) + start;

  // If we're down the the last 2 elements of a pivot, the element
  // at start should be greater than the element at end
  if (start === mid) {
    return array[start] > array[end] ? start : null;
  }

  if (array[start] < array[mid]) {
    return findPivotedWord(array, mid, end);
  } else {
    return findPivotedWord(array, start, mid);
  }
};

/////////////////////////////////////////////////////////////
// TEST CASES
/////////////////////////////////////////////////////////////

var tests = [{
  inputs: ['cat','dog','eagle','falcon','goat','apple','bear'],
  expected: 4
}, {
  inputs: ['dog','eagle','falcon','goat','hope','apple','bear','cat'],
  expected: 4
}, {
  inputs: ['dog','eagle','falcon','goat','hope'],
  expected: null
}, {
  inputs: ['indigo','dog','eagle','falcon','goat','hope'],
  expected: 0
}, {
  inputs: ['dog','eagle','falcon','apple','bear','cat'],
  expected: 2
}];

var tester = function (testCase, functionToTest) {
  var testResult = functionToTest(testCase.inputs);
  return expectToBeEqual(testResult, testCase.expected);
};

var expectToBeEqual = function (a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
};

tests.forEach(function (test, i) {
  console.log('Test #' + i + ' PASS? ', tester(test, findPivotedWord));
});
