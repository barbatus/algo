function solve(nums) {
  let pos = 0, nPos = 0;
  let neg = 0, nNeg = 0;
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < 0) {
      nPos = nums[i] * neg;
      nNeg = Math.min(nums[i], nums[i] * pos);
    }
    if (nums[i] > 0) {
      nPos = Math.max(nums[i], nums[i] * pos);
      nNeg = nums[i] * neg;
    }

    if (nums[i] === 0) {
      nPos = 0;
      nNeg = 0;
    }

    pos = nPos;
    neg = nNeg;
    max = Math.max(pos, max);
  }

  return max;
}

console.log(solve([-2, 0, -1]));

