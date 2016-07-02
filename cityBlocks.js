/////////////////////////////////////////////////////////////
// City Blocks
// --------------------------
// Citizens are spread out over a 2d city grid represented by a 2d matrix.
// Find the point on the grid that will require the least distance moved if
// they were to all meet (movement is per citizen, so 2 people moving one block
// is considered as covering a distance of 2).
//
/////////////////////////////////////////////////////////////

var getOptimalMeetingPoint = function (matrix) {
  var medianRow = 0;
  var medianCol = 0;
  var people = 0;

  for (var row = 0; row < matrix.length; row++) {
    for (var col = 0; col < matrix[0].length; col++) {
      if (matrix[row][col] !== 0) {
        medianRow += row * matrix[row][col];
        medianCol += col * matrix[row][col];
        people += matrix[row][col];
      }
    }
  }
  matrix[Math.round(medianRow / people)][math.round(medianCol / people)] = 'X';
  return matrix;
};


/////////////////////////////////////////////////////////////
// HELPERS
/////////////////////////////////////////////////////////////
// Take these!
/////////////////////////////////////////////////////////////

var cityBlockTestCases = range(10, 0)
  .map(function () {
    return buildMatrix(9, 15);
  });


//////////////////////////////////////////////////
// MATRIX BUILDER
//////////////////////////////////////////////////

// Returns an array of rowSize length, populated with elm
function range (rowSize, elm) {
  var result = [];
  for (var i = 0; i < rowSize; i++) {
    if (Array.isArray(elm)) {
      result.push(elm.slice());
    } else {
      result.push(elm);
    }
  }
  return result;
}

// randomize takes a matrix, it's size, number of random elms and elms
function randomize (matrix, size, num) {
  if (num === 0) {
    return matrix;
  } else if (num > size * size) {
    return "Number exceeds size of matrix";
  }

  // generate random row and col
  var row = Math.floor(Math.random() * (size - 1));
  var col = Math.floor(Math.random() * (size - 1));
  // generate random number of citizens on square
  var elm = Math.floor(Math.random() * 5);

  // If we haven't placed a person at that coord, set a person on that coord,
  // decrement num, then recurse up.
  if (matrix[row][col] !== 0) {
    return randomize(matrix.slice(), size, num);
  } else {
    matrix[row][col] = elm;
    return randomize(matrix.slice(), size, num - 1);
  }
};

// builds 2d array where num is the number of random pieces on the board
function buildMatrix (size, num) {
  return randomize(range(size, range(size, 0)).slice(), size, num);
};
