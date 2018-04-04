function flatten1(root) {
  while (root) {
    if (root.left) {
      const pre = root.left;
      while (pre.right) {
        pre = pre.right;
      }
      pre.right = root.right;
      root.right = root.left;
      root.left = null;
    }
    root = root.right;
  }
}

function flatten2(root) {
  if (!root) return root;

  const right = flatten(root.right);
  const left = flatten(root.left);
  root.right = left;
  if (left) {
    left.right = right;
  }
  return root;
}

function flatten3(root) {
  if (!root) return;

  flatten(root.right);
  flatten(root.left);
  root.right = prev;
  root.left = null;
  prev = root;
}
