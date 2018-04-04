// https://www.hackerrank.com/challenges/common-child
// https://en.wikipedia.org/wiki/Longest_common_subsequence_problem
function find(a, b) {
  let matx = [];
  for (let i = 0; i < a.length + 1; i++) {
    matx[i] = [];
    for (let j = 0; j < b.length + 1; j++) {
      matx[i][j] = 0;
    }
  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matx[i][j] = matx[i - 1][j - 1] + 1;
      } else {
        matx[i][j] = Math.max(matx[i - 1][j], matx[i][j - 1]);
      }
    }
  }
  return matx[a.length][b.length];
}

console.log(find('AA', 'BB'));
