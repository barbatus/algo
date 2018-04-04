var Cookie = function(diam) {
  this.diam = diam;
  this.left = null;
  this.right = null;
  this.height = 0;
  this.size = 0;

  this.rotateRight = function() {
    var left = this.left;
  
    this.left = left.right;
    left.right = this;
  
    this.updateHeight();
    this.updateSize();
  
    left.updateHeight();
    left.updateSize();
    return left;
  };
  
  this.rotateRightLeft = function() {
    this.right = this.right.rotateRight();
    this.updateSize();
    return this.rotateLeft();
  }
  
  this.rotateLeft = function() {
    var right = this.right;
  
    this.right = right.left;
    right.left = this;
  
    this.updateHeight();
    this.updateSize();
  
    right.updateHeight();
    right.updateSize();
    return right;
  };
  
  this.rotateLeftRight = function() {
    this.left = this.left.rotateLeft();
    this.updateSize();
    return this.rotateRight();
  }
  
  this.leftHeight = function() {
    if (!this.left) {
      return -1;
    }
    return this.left.height;
  };
  
  this.rightHeight = function() {
    if (!this.right) {
      return -1;
    }
    return this.right.height;
  };
  
  this.leftSize = function() {
    if (!this.left) {
      return 0;
    }
    return this.left.size;
  };

  this.index = function() {
    if (!this.left) {
      return 0;
    }
    return this.leftSize() + 1;
  };

  this.rightSize = function() {
    if (!this.right) {
      return 0;
    }
    return this.right.size;
  };
  
  this.updateSize = function() {
    this.size = (this.left ? (this.leftSize() + 1) : 0) + 
                (this.right ? (this.rightSize() + 1) : 0);
  }
  
  this.updateHeight = function() {
    this.height = Math.max(this.leftHeight(), this.rightHeight()) + 1;
  }
}

var AVL = function() {
  this.root = null;
}

AVL.prototype.compare = function(a, b) {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
}

AVL.prototype.add = function(diam) {
  this.root = this._add(diam, this.root);
};

AVL.prototype._add = function(diam, node) {
  if (node === null) {
    return new Cookie(diam);
  }

  if (this.compare(diam, node.diam) < 0) {
    node.left = this._add(diam, node.left);
  } else if (this.compare(diam, node.diam) >= 0) {
    node.right = this._add(diam, node.right);
  }

  return this.rotateAfterAdd(diam, node);
};

AVL.prototype.rotateAfterAdd = function(diam, node) {
  node.updateHeight();
  node.updateSize();

  var state = node.leftHeight() - node.rightHeight();
  if (state === 2) {
    if (this.compare(diam, node.left.diam) < 0) {
      node = node.rotateRight();
    } else {
      return node.rotateLeftRight();
    }
  }

  if (state === -2) {
    if (this.compare(diam, node.right.diam) >= 0) {
      node = node.rotateLeft();
    } else {
      return node.rotateRightLeft();
    }
  }

  return node;
}

AVL.prototype.findDelMedian = function() {
  var diff = this.root.leftSize() - this.root.rightSize();
  diff += (this.root.left ? 1 : 0) - (this.root.right ? 1 : 0);

  if (diff === 0 || diff === 1) {
    var median = this.root.diam;
    this.root = this._del(median, this.root);
    return median;
  }

  if (diff < 0) {
    var index = Math.floor((Math.abs(diff) - 1) / 2);
    var node = this.findMedian(this.root.right, index);
    var median = node.diam;
    this.root = this._del(median, this.root);
    return median;
  }

  var index = this.root.rightSize() + Math.ceil(diff / 2) + 1;
  var node = this.findMedian(this.root.left, index);
  var median = node.diam;
  this.root = this._del(median, this.root);
  return median;
};

AVL.prototype._del = function(diam, node) {
  if (this.compare(diam, node.diam) < 0) {
    node.left = this._del(diam, node.left);
  } else if (this.compare(diam, node.diam) > 0) {
    node.right = this._del(diam, node.right);
  } else {
    if (!node.left && !node.right) {
      return null;
    } else if (!node.left && node.right) {
      node = node.right;
    } else if (node.left && !node.right) {
      node = node.left;
    } else {
      var leftMost = this.findLeftMost(node.right);
      node.diam = leftMost.diam;
      node.right = this._del(leftMost.diam, node.right);
    }
  }

  return this.rotateAfterDel(node);
}

AVL.prototype.rotateAfterDel = function(node) {
  node.updateHeight();
  node.updateSize();

  var state = node.leftHeight() - node.rightHeight();
  if (state === 2) {
    var leftState = node.left.leftHeight() - node.left.rightHeight();
    if (leftState === 0 || leftState === 1) {
      return node.rotateRight();
    }
    if (leftState === -1) {
      return node.rotateLeftRight();
    }
  }

  if (state === -2) {
    var rightState = node.right.leftHeight() - node.right.rightHeight();
    if (rightState === 0 || rightState === -1) {
      return node.rotateLeft();
    }
    if (rightState === 1) {
      return node.rotateRightLeft();
    }
  }

  return node;
}

AVL.prototype.findMedian = function(node, index) {
  var nodeInd = node.index();
  if (index > nodeInd) {
    return this.findMedian(node.right, index - nodeInd - 1);
  }
  if (index < nodeInd) {
    return this.findMedian(node.left, index);
  }
  return node;
}

AVL.prototype.findLeftMost = function(node) {
  var next = node;
  while (next.left) {
    next = next.left;
  }
  return next;
}

AVL.prototype.findRightMost = function(node) {
  var next = node;
  while (next.right) {
    next = next.right;
  }
  return next;
}

var heap = new AVL();

function print(value) {
  console.log(value);
}

var line = 0;
function readline() {
  return input[line++];
}

var res = [];
// while (next = readline()) {
//   if (next === '#') {
//     var median = heap.findDelMedian();
//     res.push(median);
//     continue;
//   }
//   var diam = parseInt(next);
//   heap.add(diam);
// }
// print(res.join('\n'));

exports.default = function(lines) {
  heap.root = null;
  res.length = 0;
  for (var i = 0; i < lines.length; i++) {
    var next = lines[i];
    if (next === '#') {
      var median = heap.findDelMedian();
      res.push(median);
      continue;
    }
    var diam = parseInt(next);
    heap.add(diam);
  }
  return res;
}
