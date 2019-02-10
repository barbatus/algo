// https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/

function solve(matr, k) {
  const n = matr.length;
  const m = matr[0].length;

  if (k < m) return matr[0][k - 1];

  let lo = matr[0][0];
  let hi = matr[n - 1][m - 1];
  let mid;
  while (lo < hi) {
    mid = lo + Math.floor((hi - lo) / 2);
    let count = 0;
    for (let i = 0; i < matr.length; i++) {
      let j = 0;
      while (j < m && matr[i][j++] <= mid) count++;
    }
    if (count < k) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo;
}

console.log(solve([[1,  5,  9], [10, 11, 13], [12, 13, 15], [13, 14, 16]], 10));
