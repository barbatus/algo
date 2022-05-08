var generateMatrix = function(n) {
  const matr = Array(n).fill().map(() => Array(n).fill(null));
  let r = 0, c = 0, count = 1;
  while (count <= n * n) {
    while (matr[r][c] === null) matr[r][c++] = count++;
    c--;r++;
    while (matr[r] && !matr[r][c]) matr[r++][c] = count++;
    c--;r--;
    while (matr[r][c] === null) matr[r][c--] = count++;
    c++;r--;
    while (matr[r] && !matr[r][c]) matr[r--][c] = count++;
    c++;r++;
  }
  return matr;
};

console.log(generateMatrix(3));
