/////////////////////////////////////////////////////////////
// Water Blocks
// ---------------------------------------------------------
// You are given an input array whose each element represents
// the height of a line towers. The width of every tower is 1.
// It starts raining. How much water is collected between the towers?
//
// Ex.
//
// Water blocks:
// Input: [3,2,5,2,1,3]
// Output: 4
// Visualization:
// 	 #
// 	 #
// #-#--#
// ####-#
// ######
//
// '-' is water
// '#' is a block
/////////////////////////////////////////////////////////////

var waterBlocks = function (blocks) {
  // deduct number of blocks in current row from smallest on left or right

  // Store water count
  var water = 0;

  // Store highest tower left
  var highestLeft = 0;

  // store highest tower right
  var highestRight = 0;

  // Iterate over array
  for (var i = 0; i < blocks.length; i++) {

    // if current larger than highest, replace highest
    if (blocks[i] > highestLeft) {
      highestLeft = blocks[i];

    // if current is less than highest, iterate over remaining blocks to check if any are higher
    } else if (blocks[i] < highestLeft) {
      for (var j = i; j < blocks.length; j++) {
        if (blocks[j] > highestRight && blocks[j] > highestLeft) {
          highestRight = blocks[j];
          console.log("highestRight changed: ", highestRight);
          break;
        }
        else if (blocks[j] > highestRight) {
          highestRight = blocks[j];
          console.log("highestRight changed: ", highestRight);
        }
      }
      var newWater = Math.min(highestLeft, highestRight) - blocks[i];
      console.log("newWater is: ", newWater);
      water += newWater;
      highestRight = 0;
    }
  }

  return water;
};

//////////////////////////////////////////////////
// TEST CASES
//////////////////////////////////////////////////

console.log('Pass? ', waterBlocks([1,5,2,3,5,6]) === 5);
