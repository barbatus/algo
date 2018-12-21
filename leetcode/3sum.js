function solve(arr) {
  const sorted = arr.sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < sorted.length; i++) {
    let left = 0;
    let right = sorted.length - 1;

    if (sorted[i] === sorted[i - 1]) continue;

    while (left < i && right > i) {
      const value = sorted[left] + sorted[i] + sorted[right];
      if (value === 0) {
        result.push([sorted[left], sorted[i], sorted[right]])
      }

      if (value <= 0) {
        left++;
        while (sorted[left - 1] === sorted[left]) left++;
      }

      if (value > 0) {
        right--;
        while (sorted[right + 1] === sorted[right]) right--;
      }
    }
  }

  return result;
}

console.log(solve([-1, 10, -9, 20, 30, -25, 10, 15]))
