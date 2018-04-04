var MinMaxHeap = function() {
  this.minHeap = [];
  this.minSize = 0;
  this.maxHeap = [];
  this.maxSize = 0;
  this.root = null;

  this.parent = (node) => Math.floor((node - 1) / 2);
  this.childLeft = (node) => 2 * node + 1;
  this.childRight = (node) => 2 * node + 2;

  this.compare = (a, b, inMin) => {
    return inMin ? this.minHeap[a] - this.minHeap[b]
      : this.maxHeap[b] - this.maxHeap[a];
  };

  this.exchange = (a, b, inMin) => {
    var heap = inMin ? this.minHeap : this.maxHeap;
    var cookie = heap[a];
    heap[a] = heap[b];
    heap[b] = cookie;
  };

  this.getChild = (node, inMin) => {
    var l = this.childLeft(node);
    var r = this.childRight(node);
    var size = inMin ? this.minSize : this.maxSize;
    if (l < size && r < size) {
      return this.compare(l, r, inMin) > 0 ? r : l;
    }
    return r < size ? r : l;
  };

  this.moveUp = (node, inMin) => {
    var p = this.parent(node);
    while (p >= 0 && this.compare(node, p, inMin) < 0) {
      this.exchange(node, p, inMin);
      node = p;
      p = this.parent(p);
    }
  };

  this.moveDown = (node, inMin) => {
    var p = node;
    var size = inMin ? this.minSize : this.maxSize;
    while (p < size) {
      var c = this.getChild(p, inMin);
      if (c < size && this.compare(p, c, inMin) > 0) {
        this.exchange(p, c, inMin);
        p = c;
        continue;
      }
      break;
    }
  };

  this.extractRoot = (inMin) => {
    var root = null;
    if (inMin && this.minSize) {
      root = this.minHeap[0];
      this.exchange(0, this.minSize - 1, inMin);
      this.minSize--;
      this.moveDown(0, true);
    } else if (this.maxSize) {
      root = this.maxHeap[0];
      this.exchange(0, this.maxSize - 1, inMin);
      this.maxSize--;
      this.moveDown(0, false);
    }
    return root;
  };

  this.addToHeap = (cookie, inMin) => {
    if (inMin) {
      this.minHeap[this.minSize] = cookie;
      this.moveUp(this.minSize, true);
      this.minSize++;
    } else {
      this.maxHeap[this.maxSize] = cookie;
      this.moveUp(this.maxSize, false);
      this.maxSize++;
    }
  }

  this.insert = (cookie) => {
    if (this.root === null) {
      this.root = cookie;
      return;
    }

    var diff = this.minSize - this.maxSize;
    switch (diff) {
      case 1:
        if (cookie >= this.root) {
          this.addToHeap(cookie, true);
          this.addToHeap(this.root, false);
          this.root = this.extractRoot(true);
        } else {
          this.addToHeap(cookie, false);
        }
        break;
      case 0:
        if (cookie >= this.root) {
          this.addToHeap(cookie, true);
        } else {
          this.addToHeap(cookie, false);
        }
        break;
      case -1:
        if (cookie >= this.root) {
          this.addToHeap(cookie, true);
        } else {
          this.addToHeap(cookie, false);
          this.addToHeap(this.root, true);
          this.root = this.extractRoot(false);
        }
        break;
    }
  };

  this.getMedian = () => {
    var diff = this.minSize - this.maxSize;
    switch (diff) {
      case 1:
        return this.extractRoot(true);
      case 0: {
        var median = this.root;
        this.root = this.extractRoot(true);
        return median;
      }
      case -1: {
        var median = this.root;
        this.root = this.extractRoot(false);
        return median;
      }
    }
  };
}

var minMax = new MinMaxHeap();

// function print(value) {
//   console.log(value);
// }

// var line = 0;
// function readline() {
//   return input[line++];
// }

var res = [];
// while (next = readline()) {
//   if (next === '#') {
//     var median = minMax.getMedian();
//     res.push(median);
//     continue;
//   }
//   var diam = parseInt(next);
//   minMax.insert(diam);
// }
// print(res.join('\n'));

exports.default = function(lines) {
  minMax = new MinMaxHeap();
  for (var i = 0; i < lines.length; i++) {
    var next = lines[i];
    if (next === '#') {
      var median = minMax.getMedian();
      res.push(median);
      continue;
    }
    var diam = parseInt(next);
    minMax.insert(diam);
  }
  return res;
}
