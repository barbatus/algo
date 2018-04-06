function find(arr, l, r, k) {
  let mid = Math.floor((l + r) / 2);
  mid = swap(arr, mid, l, r);

  if (r - l <= 1) return arr[l === k - 1 ? l : r];

  if (mid === k - 1) return arr[mid];

  if (mid < k - 1) {
    return find(arr, mid + 1, r, k);
  }

  return find(arr, l, mid - 1, k);
}

function swap(arr, mid, l, r) {
  const c = arr[mid];
  arr[mid] = arr[r];
  arr[r] = c;

  let i = l;
  let j = r - 1;
  while (true) {
    while (arr[i] <= c && i <= r - 1) i++;

    while (arr[j] > c) j--;

    if (i < j) {
      const d = arr[i];
      arr[i] = arr[j];
      arr[j] = d;
      continue;
    }
    break;
  }

  if (i < r) {
    const d = arr[i];
    arr[i] = c;
    arr[r] = d;
  }

  return i;
}

console.log(find([30, 6, 7, 2, 4, 100], 0, 5, 3));
