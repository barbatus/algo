// 0001 -> 1
// 0010 -> 3
// 0011 -> 0
// 0100 -> 4
// 0101 -> 1
// 0110 -> 7
// 0111 -> 0
// 1000 -> 8

function bitxor2(M, N) {

  function bitxor1(a) {
    var div = (a / 4) >> 0;
    var rem = a % 4;

    if (rem == 0) {
      return div * 2;
    }

    if (rem == 1) {
      return 1;
    }

    if (rem == 2) {
      return Math.max((div - 1), 0) + 3;
    }

    if (rem == 3) {
      return 0;
    }
  }

  var bit1 = bitxor1(M - 1);
  var bit2 = bitxor1(N);

  return bit1 ^ bit2;
}
