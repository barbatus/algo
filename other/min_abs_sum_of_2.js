// Find two elements in array sum of which equals zero.
// Caterpillar method

function sum2(arr) {
  const sarr = arr.sort((a, b) => a - b);

  let back = 0;
  let front = sarr.length - 1;
  let min = Number.MAX_SAFE_INTEGER;
  while (back < front) {
    let sum = Math.abs(sarr[back] + sarr[front]);
    while (back < front && sum >= Math.abs(sarr[back] + sarr[front])) {
      sum = Math.abs(sarr[back] + sarr[front]);
      back++;
    }
    min = Math.min(min, sum);
    back--;
    front--;
    sum = Math.abs(sarr[back] + sarr[front]);

    while (back < front && sum >= Math.abs(sarr[back] + sarr[front])) {
      sum = Math.abs(sarr[back] + sarr[front]);
      front--;
    }
    min = Math.min(min, sum);
    front++;
    back++;
  }

  return min;
}

console.log(sum2([-1, 10, -5, -2, 100, 60, 61, -6, -7]));
