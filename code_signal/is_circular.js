function isCircular(arr) {
  function check(sign) {
    const n = arr.length;
    let p = arr[0];
    let i = 0;
    while (i < arr.length && ((p + n) % n || n) === arr[i]) {
      p = p + sign;
      i++;
    }
    return i === arr.length;
  }
  return check(1) || check(-1);
}

console.log(isCircular([2,3,4,5,1]));
console.log(isCircular([2,1,5,4,3]));
