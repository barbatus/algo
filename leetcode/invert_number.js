function solve(n) {
  let log10 = Math.floor(Math.log10(n));
  let div = Math.pow(10, log10);

  let head = 0;
  let tail = 0;
  let count = 0;
  while (div > 1) {
    const digt = Math.floor(n / div);
    const digh = n % 10;

    const pow = Math.pow(10, count);
    head = head + digh * div * pow;
    tail = digt * pow + tail;

    n = Math.floor((n % div) / 10);
    div /= 100;
    count += 1;
  }

  return head + n * Math.pow(10, count) + tail;
}

console.log(solve(1054560001007));
console.log(solve(56748));
