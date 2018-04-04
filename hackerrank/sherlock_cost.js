// https://www.hackerrank.com/challenges/sherlock-and-cost/problem

function solve(b) {
  const bLen = b.length - 1;
  const l = [0];
  const h = [0];
  for (let i = 1; i <= bLen; i++) {
    l[i] = Math.max(l[i - 1], h[i - 1] + Math.abs(b[i - 1] - 1));
    h[i] = Math.max(l[i - 1] + Math.abs(1 - b[i]),
      h[i - 1] + Math.abs(b[i] - b[i - 1]));
  }
  return Math.max(l[bLen], h[bLen]);
}

console.log(solve([10, 1, 10, 1, 10]));
