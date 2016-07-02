/////////////////////////////////////////////////////////////
// Find Median of unsorted integer stream
/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
//
// Given a stream of unordered integers, Find the median of the stream
// any time we want it. We will be asked to find the median multiple times.
//
// For instance:
// var mStream = new MedianStream();
// mStream.insert(1);
// mStream.insert(3);
// mStream.insert(2);
// mStream.getMedian(); // => 2
// mStream.insert(5);
// mStream.insert(4);
// mStream.getMedian(); // => 3
//
/////////////////////////////////////////////////////////////


var MedianStream = function () {
  this.minHeap = new BinaryHeap(function(child, parent){
    return child >= parent;
  });

  this.maxHeap = new BinaryHeap(function(child, parent) {
    return child <= parent;
  });
};

MedianStream.prototype = {
  insert: function (element) {
    // If even number of elements
    if (this.size() % 2 === 0) {
      this.maxHeap.push(element);
      if (!this.minHeap.content.length) {
        return;
      }
      // If maxHeap root is greater than minHeap root, swap
      if (this.maxHeap.content[0] > this.minHeap.content[0]) {
        var toMax = this.minHeap.pop();
        var toMin = this.maxHeap.pop();
        this.minHeap.push(toMin);
        this.maxHeap.push(toMax);
      } 
    } else {
      // If odd number of elements, push onto maxHeap
      this.maxHeap.push(element);
      // Pop max off maxHeap
      var toMin = this.maxHeap.pop();
      // Push it onto the minHeap
      this.minHeap.push(toMin);
    }
  },

  getMedian: function () {
    if (this.size() % 2 === 0) {
      // If size is even, average minHeap root and maxHeap root
      return (this.minHeap.content[0] + this.maxHeap.content[0]) / 2;
    } else {
      return this.maxHeap.content[0];
    }
  },

  size: function () {
    return this.minHeap.size() + this.maxHeap.size();
  }
};


/////////////////////////////////////////////////////////////
// HELPERS
/////////////////////////////////////////////////////////////

function BinaryHeap(compareFunction) {
  this.content = [];
  this.compareFunction = compareFunction;
}

BinaryHeap.prototype = {
  push: function(element) {
    // Add element to the heap
    this.content.push(element);
    // Bubble it into the correct order
    this.bubbleUp(this.content.length -1);
  },

  pop: function() {
    var result = this.content[0];
    var end = this.content.pop();
    
    // If removed element was not the only element in heap
    if (this.content.length) {
      // Set last element to first position
      this.content[0] = end;
      // Sink it into the correct order
      this.sinkDown(0);
    }
    return result;
  },

  remove: function(node) {
    var length = this.content.length;

    // Iterate over heap
    for (var i = 0; i < length; i++) {
      // If element is not the node we're looking for, continue to next node
      if (this.content[i] !== node) {
        continue;
      }

      // Remove last element from heap
      var end = this.content.pop();

      // If current element is at the end of the heap, end loop
      if (i === length - 1) {
        break;
      }

      // Otherwise, place last element in current element's position
      this.content[i] = end;
      // Bubble/Sink as needed
      this.bubbleUp(i);
      this.sinkDown(i);
      // End loop
      break;
    }
  },
  
  size: function() {
    return this.content.length;
  },

  bubbleUp: function(n) {
    var element = this.content[n];

    while (n > 0) {
      var parentN = Math.floor((n + 1) / 2) - 1;
      var parent = this.content[parentN];

      // If current order meets heap's conditions, end loop
      if (this.compareFunction(element, parent)) {
        break;
      }

      // Otherwise, swap
      this.content[n] = parent;
      this.content[parentN] = element;

      // Continue loop from element's new position
      n = parentN;
    }

  },

  sinkDown: function(n) {
    var length = this.content.length;
    var element = this.content[n];

    while (true) {
      var child2N = Math.floor((n + 1) * 2);
      var child1N = child2N - 1;
      var swap = null;

      // If element has a first child
      if (child1N < length) {
        var child1 = this.content[child1N];
        // If element is out of order compared to child1, begin swap procedure
        if (!this.compareFunction(child1, element)) {
          swap = child1N;
        }
      }
      if (child2N < length) {
        var child2 = this.content[child2N];
        // If element is out of order compared to child2, begin swap procedure
        if (!this.compareFunction(child2, (swap === null ? element : child1))) {
          swap = child2N
        }
      }

      // If there were no swaps, break loop
      if (swap === null) {
        break;
      }
      this.content[n] = this.content[swap];
      this.content[swap] = element;
      n = swap;
    }
  }
}


/////////////////////////////////////////////////////////////
// TESTS
/////////////////////////////////////////////////////////////

var mStream = new MedianStream();

[1,5,2,3,41,2,5,234,56,3,2,1,2,3].forEach(function (num) {
  mStream.insert(num);
});

console.log('Median === 3? ', mStream.getMedian() === 3);