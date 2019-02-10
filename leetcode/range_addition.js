function solve(length, range) {
  const result = [];
  for (let i = 0; i < length; i++) {
    result[i] = 0;
  }

  for (let i = 0; i < range.length; i++) {
    const [start, end, inc] = range[i];
    result[start] = result[start] ? (result[start] + inc) : inc;
    result[end + 1] = result[end + 1] ? (result[end + 1] - inc) : -inc;
  }

  let sum = 0;
  for (let i = 0; i < result.length; i++) {
    sum += result[i];
    result[i] = sum;
  }
  return result.slice(0, length);
}

console.log(solve(5, [[1,3,2],[2,4,3],[0,2,-2]]));
