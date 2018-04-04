
// https://www.hackerrank.com/challenges/sam-and-substrings

const MOD = Math.pow(10, 9) + 7;

function solve(nums) {
  if (nums.length === 1) return nums[0];

  let sum1 = nums[0] * 10 + nums[1];
  let sum2 = nums[0] + nums[0] * 10 + 2 * nums[1];
  for (let i = 2; i < nums.length; i++) {
    // Calc next sum from prev.
    sum1 = (sum1 * 10 + nums[i] * (i - 1) + nums[i - 1] * 10 + nums[i]) % MOD;
    sum2 += (sum1 + nums[i]) % MOD;
  }

  return sum2;
}

console.log(solve([1, 4, 5, 6, 9]));