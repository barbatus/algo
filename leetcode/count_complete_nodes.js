// https://leetcode.com/problems/count-complete-tree-nodes

function findEdgeK(root, k) {
  if (!root.left && !root.right) return k;

  if (!root.right) return -k;

  const left = findEdgeK(root.left, k * 2 + 1);
  const right = findEdgeK(root.right, k * 2 + 2);

  return Math.min(left, right);
}

function solve(root) {
  const k = findEdgeK(root, 0);
  if (k === 0) return root.left ? 2 : 1;
  if (k < 0) return 2 * Math.abs(k) + 2;
  return 2 * k + 1;
}

const node1 = { left: null, right: null };
const node2 = { left: null, right: null };
const node3 = { left: null, right: null };
const node4 = { left: null, right: null };
const node5 = { left: null, right: null };
const node6 = { left: null, right: null };
const node7 = { left: null, right: null };
const node8 = { left: null, right: null };

node1.left = node2;

console.log(solve(node1));
