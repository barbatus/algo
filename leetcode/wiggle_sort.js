function findMed(arr, l, r, k) {
  while (true) {
    var mid = Math.floor((l + r) / 2);
    mid = swapMid(arr, mid, l, r);
    if (r - l <= 1) return arr[l === k ? l : r];

    if (mid === k) return arr[mid];

    if (mid < k) {
      l = mid + 1;
      continue;
    }
    r = mid - 1;
  }
}

function swapMid(arr, mid, l, r) {
  var c = arr[mid];
  arr[mid] = arr[r];
  arr[r] = c;

  var i = l;
  var j = r - 1;
  while (true) {
    while (arr[i] <= c && i <= r - 1) i++;

    while (arr[j] > c) j--;

    if (i < j) {
      var d = arr[i];
      arr[i] = arr[j];
      arr[j] = d;
      continue;
    }
    break;
  }

  if (i < r) {
    var d = arr[i];
    arr[i] = c;
    arr[r] = d;
  }

  return i;
}

function swap(nums, i, j) {
  var val = nums[i];
  nums[i] = nums[j];
  nums[j] = val;
}

function solve(nums) {
  var n = nums.length | 1;
  var median = findMed(nums, 0, nums.length - 1,  Math.ceil(nums.length / 2) - 1);
  var ind = (i) => (2 * i + 1) % n;
  var mid = 0; var first = 0; var last = nums.length - 1;
  while (mid <= last) {
    if (nums[ind(mid)] > median) {
      swap(nums, ind(mid), ind(first));
      first++;
      mid++;
    } else {
      if (nums[ind(mid)] < median) {
        swap(nums, ind(mid), ind(last));
        last--;
      } else {
        mid++;
      }
    }
  }
  return nums;
}

console.log(solve([4, 5, 5, 6]));

