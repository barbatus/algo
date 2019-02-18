var maxProduct = function(nums) {
  let min = max = maxx = nums[0] || 0;
  for (let i = 1; i < nums.length; i++) {
    const xmax = max;
    max = Math.max(Math.max(min * nums[i], xmax * nums[i]), nums[i]);
    min = Math.min(Math.min(min * nums[i], xmax * nums[i]), nums[i]);
    maxx = Math.max(maxx, max);
  }
  return maxx;
};

console.log(maxProduct([-1,0,4,5]));
