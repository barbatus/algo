function quick(arr, l, h) {
  if (h <= l) return;

  const mid = split(arr, l, h);

  quick(arr, l, mid - 1);
  quick(arr, mid + 1, h);
}

function split(arr, l, h) {
  const pivot = arr[l];
  let i = l, j = l;
  while (++j <= h) {
    const next = arr[j]
    if (next < pivot) {
      arr[i++] = arr[j];
      arr[j] = arr[i];
    }
  }
  arr[i] = pivot;
  return i;
}

module.exports = quick;

function test(n) {
  const arr = Array(n).fill().map(() => Math.floor(Math.random() * 100));
  quick(arr, 0, arr.length - 1);
  return arr;
}

// console.log(test(50));
