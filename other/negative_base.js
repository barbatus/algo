// Represent a positive digit with a negative base.

function base_m3(n) {
  var next = n;
  var str = '';
  while(next != 0) {
    var rem, div;
    if (next > 0) {
      div = -1 * ((next / 3) >> 0); 
      rem = next % 3;
    } else {
      next = Math.abs(next);
      rem = next % 3;
      div = (next / 3) >> 0;
      if (rem) {
        div = div + 1;
        rem = div * 3 - next;
      }
    }
    next = div;
    str = rem + str;
  }

  return str;
}

function m3_p10(m3) {
  var sum = 0;
  for (var i = 0; i < m3.length; i++) {
    sum += (m3[m3.length - 1 - i] - '0') * Math.pow(-3, i);
  }
  return sum;
}

console.log(base_m3(100))

console.log(m3_p10(base_m3(100)));
