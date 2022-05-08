function findLo(nums, target, isEqual) {
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (target > nums[mid]) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }

  return hi;
}

function findHi(nums, target, isEqual) {
  let lo = 0, hi = nums.length - 1;
  while ((hi - lo) > 1) {
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] > target) {
      hi = mid - 1;
    } else {
      lo = mid;
    }
  }

  return nums[hi] === target ? hi : lo;
}

var searchRange = function(nums, target) {
  let lo = findLo(nums, target);
  let hi = findHi(nums, target);

  return [nums[lo] === target ? lo : -1, nums[hi] === target ? hi : -1];
};

console.log(searchRange([], 1));
