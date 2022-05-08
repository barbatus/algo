var kthSmallest = function(root, k) {
  let count = 1;
  const stack = [root];
  let next = root;
  while (count < k - 1) {
    count++;
    next = stack.pop();
    if (next.right) {
      next = next.right;
      stack.push(next);
      while (next.left) {
        stack.push(next.left);
        next = next.left;
      }
    }
  }
  return top.val;
};

var solve = function(root, k) {
  if (!root) return [0, null];

  let [l, lkth] = solve(root.left, k);
  if (lkth) return [l, lkth];

  if (++l === k) return [l, root];

  let [r, rkth] = solve(root.right, k);
  if (rkth) return [r, rkth];

  return [l + r, null];
};


var kthSmallest = function(root, k) {
  let [_, kth] = solve(root, k);

  return kth.val;
};
