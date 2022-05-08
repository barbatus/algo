var sortedSquares = function(A) {
  const result = [];
  let lo = 0, hi = A.length - 1;
  while (lo <= hi) {
    if (Math.abs(A[lo]) > Math.abs(A[hi])) {
      result.push(A[lo] * A[lo++]);
    } else {
      result.push(A[hi] * A[hi--]);
    }
  }
  return result.reverse();
};

console.log(sortedSquares([-7,-3,0,2,3,11]));
