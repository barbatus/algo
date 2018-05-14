function solve(n, str, open, close) {
  if (!str) {
    return solve(n, '(', 1, 0);
  }

  const len = str.length;
  if (len === 2 * n) {
    return [str];
  }

  let result = [];
  if (open + 1 <= n) {
    result = result.concat(solve(n, str + '(', open + 1, close));
  }
  if (open >= close + 1) {
    result = result.concat(solve(n, str + ')', open, close + 1));
  }

  return result;
}

console.log(solve(3));
