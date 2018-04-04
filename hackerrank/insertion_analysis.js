// https://en.wikipedia.org/wiki/Fenwick_tree
// https://www.hackerrank.com/challenges/insertion-sort

function check_bit(arr) {
  const bit = [];
  for (let i = 0; i < 10000001; i++) {
    bit.push(0);
  }

  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    let idx = arr[i];
    while (idx) {
      sum -= bit[idx];
      idx -= (idx & -idx);
    }

    idx = arr[i];
    while (idx < 10000001) {
      bit[idx] += 1;
      idx += (idx & -idx);
    }

    sum += i;
  }

  return sum;
}

function find(arr) {
  return check_bit(arr);
}

console.log(find([2, 1, 3, 1, 10, 6, 2]));
