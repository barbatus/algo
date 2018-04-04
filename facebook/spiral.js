function spiral(A) {
  const n = A.length;
  const m = A[0].length;
  let lb = 0, rb = m - 1;
  let tb = 0, bb = n - 1;

  let dir = 0;
  let i = tb, j = 1;
  while (lb <= rb) {
    // right
    if (dir === 0) {
      for (j = Math.max(lb - 1, 0); j < rb; j++) {
        console.log(A[i][j]);
      }
      rb -= 1;
      dir = 1;
      continue;
    }

    // down
    if (dir === 1) {
      for (i = tb; i < bb; i++) {
        console.log(A[i][j]);
      }
      tb += 1;
      dir = 2;
      continue;
    }

    // left
    if (dir === 2) {
      for (j = rb + 1; j > lb; j--) {
        console.log(A[i][j]);
      }
      lb += 1;
      dir = 3;
      continue;
    }

    // up
    if (dir === 3) {
      for (i = bb; i > tb; i--) {
        console.log(A[i][j]);
      }
      bb -= 1;
      dir = 0;
      continue;
    }
  }

  console.log(A[i][j]);
}

A = [
  [1, 2, 3, 4, 5, 6, 7, 8],
  [28, 29, 30, 31, 32, 33, 34, 9],
  [27, 48, 49, 50, 51, 52, 35, 10],
  [26, 47, 60, 61, 62, 53, 36, 11],
  [25, 46, 59, 64, 63, 54, 37, 12],
  [24, 45, 58, 57, 56, 55, 38, 13],
  [23, 44, 43, 42, 41, 40, 39, 14],
  [22, 21, 20, 19, 18, 17, 16, 15],
];

spiral(A);
