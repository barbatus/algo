// Lowest common ancestor in a binary tree
// Resursive

function solve(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = solve2(root.left, p, q);
  const right = solve2(root.right, p, q);
  return !left ? right : !right ? left : root;
}
