// Length of max increasing subsequence.

function maxIndex(seq, l, r, key) {
  let ll = l;
  let rr = r;
  while (rr - ll > 1) {
    const mid = ll + Math.floor((rr - ll) / 2);
    if (key > seq[mid]) {
      ll = mid;
      continue;
    }
    rr = mid;
  }

  return ll + 1;
}

function findSeq(arr) {
  let length = 1;
  const seq = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    if (seq[0] > arr[i]) {
      seq[0] = arr[i];
      continue;
    }

    if (arr[i] > seq[length - 1]) {
      seq[length++] = arr[i];
      continue;
    }

    seq[maxIndex(seq, 0, length - 1, arr[i])] = arr[i];
  }

  return length;
}

console.log(findSeq([2, 5, 3, 7, 11, 8, 10, 11, 9, 13, 6]));
