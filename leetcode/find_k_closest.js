var findClosestElements = function(arr, k, x) {
  let lo = 0, hi = arr.length - 1;
  while (lo < hi) {
    const mid = Math.floor((hi + lo) / 2);
    if (x > arr[mid]) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }

  lo = hi - 1;
  const his = [], los = [];
  while ((his.length + los.length) < k && (hi < arr.length || lo >= 0)) {
    if (hi >= arr.length) {
      los.push(arr[lo--]);
      continue;
    }

    if (lo < 0) {
      his.push(arr[hi++]);
      continue;
    }

    if (Math.abs(x - arr[lo]) > Math.abs(x - arr[hi])) {
      his.push(arr[hi++]);
    } else {
      los.push(arr[lo--]);
    }
  }

  return los.reverse().concat(his);
};

console.log(findClosestElements([1,12,23,33,44,55,60], 2, 13));
