// https://codility.com/demo/results/training2C7VHS-YMK/
// Simple DP problem

function solution(A) {   
  var max = [A[0]];

  for (var i = 1; i < A.length; i++) {
    var value = max[i - 1];
    for (var j = i - 1; j >= Math.max(i - 6, 0); j--) {
      value = Math.max(max[j], value);
    }
    max[i] = A[i] + value;
  }

  return max[max.length - 1];
}
