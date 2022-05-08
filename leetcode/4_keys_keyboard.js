var maxA = function(N) {
  const max = [];
  for (let i = 0; i < N; i++) {
    max[i] = i + 1;
    for (let j = 0; j < i - 3; j++) {
      const dist = i - j - 3;
      max[i] = Math.max(max[i], 2 * max[j] + max[j] * dist);
    }
  }
  return max[N - 1];
};

console.log(maxA(22));
