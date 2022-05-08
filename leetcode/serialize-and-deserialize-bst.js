var preorder = function(root) {
  if (!root) return [];

  const stack = [root];
  let result = [];
  while (stack.length) {
    let top = stack.pop();
    result.push(top.val);
    if (top.right) {
      stack.push(top.right);
    }
    if (top.left) {
      stack.push(top.left);
    }
  }
  return result;
};

var serialize = function(root) {
  const arr = preorder(root);
  return arr.join(',');
};

Array.prototype.peek = function() {
  return this.length ? this[this.length - 1] : null;
}

var deserialize = function(data) {
  if (!data) return [];

  const arr = data.split(',');
  const root = {val: parseInt(arr[0]), right: null, left: null};
  const stack = [root];
  let count = 1;
  for (let i = 1; i < arr.length; i++) {
    let val = parseInt(arr[i]);
    let top = stack.peek();
    while (stack.length && stack.peek().val < val) {
      top = stack.pop();
    }
    if (top.val < val) {
      top.right = {val, left: null, right: null};
      stack.push(top.right);
    } else {
      top.left = {val, left: null, right: null};
      stack.push(top.left);
    }
  }

  return root;
};


const node1 = {val: 22, left: null, right: null};
const node2 = {val: 24, left: null, right: null};
const node3 = {val: 23, left: node1, right: node2};
const node4 = {val: 29, left: null, right: null};
const node5 = {val: 25, left: node3, right: node4};
const node69 = {val: 9, left: null, right: null};
const node6 = {val: 8, left: null, right: node69};
const node71 = {val: 1, left: null, right: null};
const node7 = {val: 4, left: node71, right: null};
const node8 = {val: 5, left: node7, right: node6};
const root = {val: 20, left: node8, right: node5};

console.log(serialize(root));

console.log(serialize(deserialize(serialize(root))));
