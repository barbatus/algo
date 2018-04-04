
function findBin(seq, ind1, ind2, el) {
  if (ind2 < 0) return 0;

  if (ind2 - ind1 <= 1) {
    if (seq[ind1] === el) {
      return ind1;
    }
    if (seq[ind1] > el) {
      return ind1;
    }
    if (seq[ind2] < el) {
      return ind2 + 1;
    }
    return ind2;
  }
  const medInd = (ind2 - ind1) / 2 << 0;
  if (el >= seq[ind1 + medInd]) {
    return findBin(seq, ind1 + medInd, ind2, el);
  }
  if (el < seq[ind1 + medInd]) {
    return findBin(seq, ind1, ind1 + medInd, el);
  }
}

function solve(arr, d) {
  if (arr.length <= d) return 0;

  const seq = arr.slice(0, d);
  seq.sort((a, b) => {
    if (a > b) return 1;
    if (a === b) return 0;
    if (a < b) return -1;
  });

  let count = 0;
  const medInd = d / 2 << 0;
  for (let i = d; i < arr.length; i++) {
    let med = seq[medInd];
    if (d % 2 === 0) {
      med += seq[medInd - 1];
      med /= 2;
    }
    if (arr[i] >= med * 2) {
      count++;
    }
    const ind1 = findBin(seq, 0, d - 1, arr[i - d]);
    seq.splice(ind1, 1);
    const ind2 = findBin(seq, 0, d - 2, arr[i]);
    seq.splice(ind2, 0, arr[i]);
  }

  return count;
}

console.log(solve([2, 3, 4, 2, 3, 6, 8, 4, 5, 10], 7));
