function solve(root) {
  if (!root) return 0;

  if (root.left || root.right) {
    return Math.max(solve(root.left), solve(root.right)) + 1;
  }

  return 0;
}
