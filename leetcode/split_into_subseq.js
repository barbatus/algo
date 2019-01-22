// https://leetcode.com/problems/split-array-into-consecutive-subsequences

function solve(arr) {
  if (!arr.length) return false;

  const count = {};
  for (let i = 0; i < arr.length; i++) {
    count[arr[i]] = count[arr[i]] ? count[arr[i]] + 1 : 1;
  }

  const candidates = {};
  for (let i = 0; i < arr.length; i++) {
    if (!count[arr[i]]) continue;
    if (candidates[arr[i]] > 0) {
      candidates[arr[i]] -= 1;
      candidates[arr[i] + 1] = candidates[arr[i] + 1] ? candidates[arr[i] + 1] + 1 : 1;
    } else {
      if (count[arr[i] + 1] && count[arr[i] + 2]) {
        count[arr[i] + 1] -= 1;
        count[arr[i] + 2] -= 1;
        candidates[arr[i] + 3] = candidates[arr[i] + 3] ? candidates[arr[i] + 3] + 1 : 1;
      } else {
        return false;
      }
    }
    count[arr[i]] -= 1;
  }
  return true;
}

// console.log(solve3([1,2,3,3,3,4,4,5,5,5,6,7]));
// console.log(solve3([2, 3,4]));
console.log(solve2([1,2,3,3,4,4,5,5]));
