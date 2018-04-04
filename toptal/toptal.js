// Total online coding interview

// Calc sum of all digits in all numbers till N
function sum(N) {
  if (N <= 9) {
    return N * (N + 1) / 2;
  }

  var sum1 = 45;
  for (var i = 10; i <= N; i++) {
    var next = i;
    while (next) {
      if (next % 10 == 0) {
        next = (next / 10);
        continue;
      }
      sum1 += (next % 10);
      next = (next / 10) >> 0;
    }
  }

  return sum1;
}

var result = [];
function flat(A) {
  for (var i = 0; i < A.length; i++) {
    if (typeof A[i] == 'number') {
      result.push(A[i]);
      continue;
    }
    flat(A[i]);
  }
}

//flat([1,2,[3],[4,[5,6]],[[7]], 8, [10, 10, [100, 100, [111], [200, 300, [400, [500]]]]]]);
flat([[1, 2, [3], [4, [5, 6], 5, 6], [[7], [8, [9]]],10,[[[11], 12]]]]);
console.log(result);

//console.log(sum(11));

//console.log(sum(6));
