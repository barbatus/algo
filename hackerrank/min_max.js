// https://www.hackerrank.com/challenges/angry-children/problem

function find(ar, k) {
  const sorted = ar.sort((a, b) => a - b);
  let min = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i <= sorted.length - k; i++) {
    min = Math.min(sorted[i + k - 1] - sorted[i], min);
  }

  return min;
}

console.log(find([
  4504, 1520, 5857, 4094, 4157, 3902, 822, 6643, 2422,
  7288, 8245, 9948, 2822, 1784, 7802, 3142, 9739, 5629,
  5413, 7232,
], 5));

console.log(find([10, 100, 300, 200, 1000, 20, 30], 3));
