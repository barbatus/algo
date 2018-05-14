// Invert binary tree

function solve(root) {
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    const right = node.right;
    node.right = node.left;
    node.left = right;

    if (node.left) {
      stack.push(node.left);
    }
    if (node.right) {
      stack.push(node.right);
    }
  }
}
