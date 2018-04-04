function find(str) {
  let map = {};
  let max = 0;
  for (let i = 0, j = 0; i < str.length; i++) {
    if (map[str[i]] !== undefined) {
      j = map[str[i]] + 1;
      map = {};
    }
    max = Math.max(max, i - j + 1);
    map[str[i]] = i;
  }
  return max;
}

console.log(find('cfaaabccfecd'));
