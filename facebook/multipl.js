function mult(a, b) {
  const res = [];
  const min = a.length < b.length ? a : b;
  const max = a.length < b.length ? b : a;
  const result = [];
  for (let i = 0; i < min.length + max.length + 1; i++) {
    result.push(0);
  }
  const m = min.length - 1;
  const n = max.length - 1;
  for (let i = 0; i <= m; i++) {
    const tmp = [0];
    for (let j = 0; j <= n; j++) {
      const val = min[m - i] * max[n - j] + tmp[j];
      tmp[j] = val % 10;
      tmp[j + 1] = Math.floor(val / 10);
    }

    for (let j = 0; j < tmp.length; j++) {
      const val = result[j + i] + tmp[j];
      result[j + i] = val % 10;
      result[j + i + 1] += Math.floor(val / 10);
    }
  }

  while(result[result.length - 1] === 0) result.pop();

  return result.reverse().join('');
}

console.log(mult('5678', '123'));
