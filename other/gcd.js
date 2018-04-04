// greatest common divider for array of numbers

function gcd(a, b) {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function ngcd(arr) {
  let res = arr[0];
  for (let i = 1; i < arr.length; i++) {
    res = gcd(res, arr[i]);
  }
  return res;
}

console.log(ngcd([18, 9, 27]));
