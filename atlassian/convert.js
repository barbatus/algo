const alpha = '0123456789abcdefghijklmnopqrstuvwxyz';

function convert(a, base1, base2) {
  let dec = 0;
  const len = a.length - 1;
  for (let i = len; i >= 0; i--) {
    const val = alpha.indexOf(a[i]);
    dec += val * Math.pow(base1, len - i);
  }
  let next = dec;
  const b = [];
  while (next) {
    const rem = next % base2;
    next = Math.floor(next / base2);
    b.push(alpha[rem]);
  }
  return b.reverse().join('');
}

console.log(convert('124', 5, 8));
