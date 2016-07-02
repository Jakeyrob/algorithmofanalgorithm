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

var waterBlocks = function(blocks) {
  var count = 0;
  var start = 0;
  var end = blocks.length - 1;
  var maxLeft = blocks[start];
  var maxRight = blocks[end];

  while(start !== end) {
    if (maxLeft < maxRight) {
      start++;
      if (blocks[start] < maxLeft) {
        count += maxLeft - blocks[start];
      }
      maxLeft = Math.max(maxLeft, blocks[start]);
    } else {
      end--;
      if (blocks[end] < maxRight) {
        count += maxRight - blocks[end];
      }
      maxRight = Math.max(maxRight, blocks[end]);
    }
  }
  return count;
};

//////////////////////////////////////////////////
// TEST CASES
//////////////////////////////////////////////////

console.log('Pass? ', waterBlocks([1,5,2,3,5,6]) === 5);
