// https://leetcode.com/problems/number-of-squareful-arrays

var numSquarefulPerms = function(A) {
  if (A.length === 1) {
    const sqrt = Math.sqrt(A[0]);
    return sqrt << 0 === sqrt ? 1 : 0;
  }

  const digits = {};
  for (let i = 0; i < A.length; i++) {
    digits[i] = [];
  }

  for (let i = 0; i < A.length; i++) {
    for (let j =  i + 1; j < A.length; j++) {
      const value = A[i] + A[j];
      const sqrt = Math.sqrt(value);
      if (sqrt << 0 === sqrt) {
        digits[i].push(j);
        digits[j].push(i);
      }
    }
  }

  let seen = {};
  const traserve = (index, level) => {
    if (level === A.length - 1) return 1;
    let count = 0;
    const used = {};
    for (let i = 0; i < digits[index].length; i++) {
      const next = digits[index][i];
      const elem = A[next];
      if (!used[elem] && !seen[next]) {
        seen[next] = true;
        used[elem] = true;
        count += traserve(next, level + 1);
        seen[next] = false;
      }
    }
    return count;
  }

  let used = {};
  let count = 0;
  for (let i = 0; i < A.length; i++) {
    if (!used[A[i]]) {
      used[A[i]] = true;
      seen[i] = true;
      count += traserve(i, 0);
      seen[i] = false;
    }
  }

  return count;
};

// console.log(numSquarefulPerms([25]));

console.log(numSquarefulPerms([1,17,8,8,8,1]));
// console.log(numSquarefulPerms([1,17,8]));
console.log(numSquarefulPerms([2,2,2]));
console.log(numSquarefulPerms([2,2,2,7,9]));
