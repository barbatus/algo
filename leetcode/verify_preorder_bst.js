var solve = function(preorder, start, end, parent = null) {
  if (end <= start) return true;

  const root = preorder[start];
  for (var i = start + 1; i <= end && root >= preorder[i]; i++) {
    if (parent !== null && parent > preorder[i]) {
      return false;
    }
  }

  return solve(preorder, start + 1, i - 1) && solve(preorder, i, end, preorder[start]);
};

var verifyPreorder = function(preorder) {
  return solve(preorder, 0, preorder.length - 1);
};

console.log(verifyPreorder([3,3,3,3,3,3,3,8]));
