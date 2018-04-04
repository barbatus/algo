// From this challenge https://www.hackerrank.com/contests/gs-codesprint/challenges/currencies
// Seems not solvable in JS due to overflow.

function gcd(a, b) {
  while (b) {
    const m = a % b;
    a = b;
    b = m;
  }
  return a;
}

const pow = 1000000007;

function pw(x, n) {
  let res = 1;
  while (n > 0) {
      if (n & 1) { res = res * x % pow; }
      x = x * x % pow;
      n >>= 1;
  }
  return res;
}

function expmod(base, exp, mod) {
  if (exp == 0) return 1;
  if (exp % 2 == 0) {
    const sq = expmod( base, (exp / 2), mod);
    return sq * sq % mod;
  } else {
    return (base * expmod( base, (exp - 1), mod)) % mod;
  }
}

function solve(x, s, f, m, conv) {
  const n = conv.length;
  const res = [[]];
  let ggcd = x * conv[s][0];
  for (let i = 0; i < n; i++) {
    ggcd = gcd(x * conv[s][i], ggcd);
  }
  for (let i = 0; i < n; i++) {
    res[0].push((x * conv[s][i]) / ggcd);
  }

  const gdcs = [];
  const rows = [];
  for (let i = 1; i < m; i++) {
    res.push([]);
    let tgcd = 0;
    for (let j = 0; j < n; j++) {
      let max = 0;
      for (let k = 0; k < n; k++) {
        max = Math.max(max, res[i - 1][k] * conv[k][j]);
      }
      res[i].push(max);
      tgcd = tgcd ? gcd(max, tgcd) : max;
    }
    for (let j = 0; j < n; j++) {
      res[i][j] = res[i][j] / tgcd;
    }
    ggcd = ggcd * tgcd % pow;
    gdcs.push(tgcd);
    const str = res[i].join(',') + ',' + tgcd;
    const index = rows.indexOf(str);
    if (index !== -1) {
      tgcd = ggcd;
      const p = index + 1;
      const rem = (m - i - 1) % (i - p);
      const div = Math.floor((m - i - 1) / (i - p));
      for (let l = p; l < i; l++) {
        const togo = div + (l - p < rem ? 1 : 0);
        for (let c = 0; c < togo; c++) {
          tgcd = gdcs[l]* tgcd % pow;
        }
      }
      return tgcd  * res[p + rem][f] % pow;
    }
    rows.push(str);
  }

  return res[m - 1][f] * ggcd % pow;
}

//console.log(solve(973, 3, 1, 65,  [[0, 3, 1, 9, 2], [7, 0, 4, 2, 2], [7, 1, 0, 6, 3], [1, 1, 5,  0, 9], [3, 5,  1, 6, 0]]));
// console.log(solve(
//   847, 4, 12, 35872267, [
//   [0, 9, 5, 4, 9, 4, 4, 1, 1, 7, 5, 2, 4, 8, 5, 2, 7],
//   [1, 0, 4, 7, 3, 1, 4, 5, 4, 5, 2, 6, 5, 6, 9, 1, 1],
//   [8, 3, 0, 5, 7, 3, 3, 10, 2, 9, 2, 4, 3, 2, 6, 2, 4],
//   [1, 6, 4, 0, 4, 8, 8, 9, 3, 10, 8, 2, 2, 5, 3, 2, 7],
//   [5,  2, 5, 4, 0, 9, 2, 3, 5, 4, 5, 3, 6, 9, 2, 3, 7],
//   [1, 2, 5, 1, 3, 0, 3, 1, 1, 3, 2, 7, 4, 1, 5, 3, 3],
//   [9, 5, 6, 1, 1, 5, 0, 4, 5, 3, 7, 1, 2, 3, 1, 3, 6],
//   [4, 3, 2, 3, 6, 2, 3, 0, 2, 1, 4, 1, 5, 3, 7, 4, 8],
//   [2, 9, 7, 2, 3, 2, 6, 3, 0, 5, 10, 5, 4, 3, 8, 4, 2],
//   [7, 1, 9, 5, 3, 10, 5, 6, 2, 0, 4, 9, 4, 4, 7, 2, 3],
//   [2, 1, 1, 4, 2, 1, 2, 2, 5, 6, 0, 6, 6, 3, 7, 6, 1],
//   [1, 6, 7, 2, 7, 8, 3, 2, 2, 1, 1, 0, 7, 2, 2, 7, 7],
//   [6, 2, 2, 3, 8, 1, 1, 5, 7, 6, 8, 6, 0, 2, 7, 2, 3],
//   [7, 7, 3, 7, 10, 8, 4, 3, 5, 6, 2, 1, 1, 0, 3, 8, 3],
//   [8, 9, 1, 2, 4, 3, 2, 10, 6, 1, 4, 1, 10, 5, 0, 10, 3],
//   [7, 5, 9, 4, 6, 1, 7, 7, 5, 8, 5, 1, 7, 7, 4, 0, 3],
//   [7, 3, 7, 2, 6, 10, 6, 4, 4, 3, 1, 6, 3, 3, 3, 1, 0],
// ]));

console.log(solve(
  186, 4, 13, 107616654, [
  [0, 4, 3, 5, 7, 1, 1, 4, 5, 5, 1, 1, 8, 4, 1, 2, 4, 7],
  [6, 0, 5, 8, 7, 3, 9, 2, 9, 1, 3, 2, 4, 5, 2, 1, 4, 2],
  [7, 3, 0, 6, 9, 1, 5, 3, 1, 7, 3, 2, 1, 2, 2, 1, 7, 1],
  [1, 1, 3, 0, 4, 1, 3, 3, 8, 1, 5, 3, 1, 10, 8, 1, 2, 3],
  [2, 6, 6, 7, 0, 4, 9, 4, 6, 5, 4, 9, 6, 6, 2, 1, 5, 4],
  [2, 9, 2, 5, 7, 0, 1, 3, 1, 1, 8, 9, 8, 7, 3, 2, 7, 7],
  [10, 3, 1, 2, 3, 1, 0, 7, 6, 3, 7, 3, 1, 2, 4, 3, 4, 3],
  [5, 1, 1, 5, 3, 6, 3, 0, 6, 4, 1, 4, 6, 7, 1, 5, 8, 8],
  [2, 5, 5, 2, 5, 6, 3, 7, 0, 3, 1, 9, 8, 5, 3, 4, 3, 2],
  [6, 2, 7, 1, 4, 4, 4, 4, 8, 0, 1, 3, 1, 4, 6, 5, 2, 3],
  [2, 6, 8, 2, 10, 2, 5, 7, 8, 4, 0, 3, 7, 7, 4, 9, 3, 3],
  [2, 3, 1, 6, 5, 1, 1, 5, 7, 5, 1, 0, 7, 8, 3, 2, 5, 2],
  [1, 7, 4, 1, 6, 8, 1, 2, 5, 10, 1, 5, 0, 1, 4, 3, 4, 1],
  [3, 2, 1, 5, 5, 5, 7, 5, 1, 5, 5, 1, 1, 0, 2, 2, 1, 4],
  [4, 1, 7, 3, 4, 4, 9, 3, 10, 1, 8, 1, 6, 1, 0, 4, 2, 8],
  [8, 9, 4, 4, 3, 2, 5, 3, 4, 2, 3, 2, 5, 6, 7, 0, 3, 3],
  [1, 2, 6, 4, 8, 6, 1, 2, 5, 4, 8, 4, 3, 4, 1, 7, 0, 1],
  [2, 2, 4, 10, 1, 8, 2, 1, 9, 2, 4, 2, 3, 2, 1, 4, 3, 0],
]));
