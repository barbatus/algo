var intervalIntersection = function(A, B) {
  let a = 0, b = 0;
  const result = [];
  while (a < A.length && b < B.length) {
    if (Math.max(A[a][0], B[b][0]) <= Math.min(A[a][1], B[b][1])) {
      result.push([Math.max(A[a][0], B[b][0]), Math.min(A[a][1], B[b][1])]);
    }
    if (B[b][1] > A[a][1]) {
      a++;
    } else {
      b++;
    }
  }
  return result;
};

console.log(intervalIntersection([[0,2],[9,10]], [[1,5],[8,12],[15,24],[25,26]]));
