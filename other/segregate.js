// In a given array of zeros and ones move all zeros to one end.

function segregate(ar) {
  let left = 0;
  let right = ar.length - 1;

  while (true) {
    let i = left;
    while (i < ar.length && ar[i] === 0)
      i++;

    left = i;

    i = right;
    while (i >= 0 && ar[i] === 1)
      i--;

    right = i;

    if (left < right) {
      ar[left] = 0;
      ar[right] = 1;
    } else {
      break;
    }
  }

  return ar;
}

console.log(segregate([0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1]));
