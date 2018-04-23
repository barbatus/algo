// https://leetcode.com/problems/split-array-with-same-average/
// Spit an array into two subarrays with same average

function solve(arr) {
  if (arr.length === 1) return false;

  if (arr.length === 2) return arr[0] === arr[1];

  const n = arr.length;
  const half = Math.floor(n / 2);
  const zero = Math.pow(10, -13);
  const av = arr.reduce((accum, item) => accum + item, 0) / n;
  for (let i = 0; i < n; i++) {
    arr[i] -= av;
    if (arr[i] === 0) return true;
  }

  const left = new Set();
  let sleft = 0;
  for (let i = 0; i < half; i++) {
    const keys = Array.from(left.keys());
    for (let j = 0; j < keys.length; j++) {
      if (Math.abs(arr[i] + keys[j]) <= zero) {
        return true;
      }
      left.add(arr[i] + keys[j]);
    }
    sleft += arr[i];
    left.add(arr[i]);
  }

  const right = new Set();
  let sright = 0;
  for (let i = half; i < n; i++) {
    const keys = Array.from(right.keys());
    for (let j = 0; j < keys.length; j++) {
      if (Math.abs(arr[i] + keys[j]) <= zero) {
        return true;
      }
      right.add(arr[i] + keys[j]);
    }
    sright += arr[i];
    right.add(arr[i]);
  }

  const keys1 = Array.from(left.keys());
  const keys2 = Array.from(right.keys());
  for (let i = 0; i < keys1.length; i++) {
    for (let j = 0; j < keys2.length; j++) {
      if (Math.abs(keys1[i] + keys2[j]) <= zero &&
         (Math.abs(keys1[i] - sleft) > zero || Math.abs(-keys1[i] - sright) > zero)) {
        return true;
      }
    }
  }

  return false;
}

console.log(solve([10,29,13,53,33,48,76,70,5,5]));
console.log(solve([1, 2, 3, 4, 5, 6, 7, 8, 10]));
console.log(solve([4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 5]));
console.log(solve([1, 2, 3]));
console.log(solve([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log(solve([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12]));
