function collect(node, start, K) {
  if (!node || start > K) return [];

  if (start + 1 === K) {
    return [node.val];
  }

  return collect(node.left, start + 1, K).concat(collect(node.right, start + 1, K));
}

function pushRange(result, nodes) {
  for (let node of nodes) {
    result.push(node);
  }
  return result;
}

function solve(root, target, K, result) {
  if (!root) return null;

  const ld = solve(root.left, target, K, result);
  const rd = solve(root.right, target, K, result);

  if (ld === K) {
    result.push(root.val);
    return null;
  }

  if (rd === K) {
    result.push(root.val);
    return null;
  }

  if (ld) {
    pushRange(result, collect(root.right, ld, K));
    return ld + 1;
  }

  if (rd) {
    pushRange(result, collect(root.left, rd, K));
    return rd + 1;
  }

  if (root.val === target) {
    pushRange(result, collect(root.left, 0, K).concat(collect(root.right, 0, K)));
    return 1;
  }

  return null;
}

var distanceK = function(root, target, K) {
  if (K === 0) return [target.val];
  const result = [];
  solve(root, target, K, result);
  return result;
};

const node1 = {val: 7, left: null, right: null};
const node2 = {val: 4, left: null, right: null};
const node3 = {val: 2, left: node1, right: node2};
const node4 = {val: 6, left: null, right: null};
const node5 = {val: 5, left: node4, right: node3};
const node69 = {val: 9, left: null, right: null};
const node6 = {val: 8, left: null, right: node69};
const node71 = {val: 10, left: null, right: null};
const node7 = {val: 0, left: node71, right: null};
const node8 = {val: 1, left: node7, right: node6};
const node9 = {val: 3, left: node5, right: node8};

console.log(distanceK(node9, 3, 1));
