// https://leetcode.com/problems/burst-balloons/description/

function find(nums) {
  const temp = [1].concat(nums);
  temp.push(1);

  const dp = [];
  for (let i = 0; i < temp.length; i++) {
    dp[i] = [];
    for (let j = 0; j < temp.length; j++) {
      dp[i][j] = 0;
    }
  }

  const n = temp.length;
  for (let k = 1; k < n; k++) {
    for (let left = 1; left < n - k; left++) {
      let right = left + k - 1;
      for (let i = left; i <= right; i++) {
        dp[left][right] = Math.max(dp[left][right], 
          temp[left - 1] * temp[i] * temp[right + 1] + dp[left][i - 1] + dp[i + 1][right]);
      }
    }
  }
  return dp[1][n - 2];
}

console.log(find([3, 1, 5, 8]));
