
var subsearch = function(nums, target, l, h) {
  let low = l;
  let high = h;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    if (target === nums[mid]) return mid;

    if ((target > nums[mid] && (nums[mid] > nums[high] || target <= nums[high])) ||
        (nums[mid] > nums[high] && target <= nums[high])) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return false;
};

var search = function(nums, target) {
  return subsearch(nums, target, 0, nums.length - 1);
};

console.log(search([4,5,6,10,0,0,1,1,1,1,1,1,2,3], 1));
