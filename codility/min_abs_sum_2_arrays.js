//https://codility.com/demo/results/trainingWPEFSP-N4T/

function solution(A) {
  if (A.length == 0) return 0;

  if (A.length == 1) return Math.abs(A[i]);

  if (A.length == 2) return Math.abs(A[0] - A[1]);

   var sum = 0;
    for (var i = 0; i < A.length; i++) {
        sum += Math.abs(A[i]);
    }

    var ex = [1];
    for (var i = 0; i < A.length; i++) {
        for (var j = sum; j >= 0 ; j--) {
            if (ex[j] == 1 && (j + Math.abs(A[i])) <= sum) {
                ex[j + Math.abs(A[i])] = 1; 
            }
        }
    }

    var half = Math.floor(sum / 2) + 1;
    var result = sum;
    for (var i = 0; i < half; i++) {
        if (ex[i] == 1) {
            result = Math.min(result, sum - 2 * i);
        }
    }

    return result;
}
