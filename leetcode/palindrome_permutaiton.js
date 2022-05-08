const solve = function(str, map, mid, size) {
  if (str.length === size) {
    return [str + mid + str.split('').reverse().join('')];
  }

  let result = [];
  for (let char of Object.keys(map)) {
    if (map[char]) {
      map[char]--;
      result = result.concat(solve(str + char, map, mid, size));
      map[char]++;
    }
  }

  return result;
}

var generatePalindromes = function(s) {
  const map = {};
  for (let char of s) {
    map[char] = map[char] ? map[char] + 1 : 1;
  }
  let oddChar = '';
  for (let char of Object.keys(map)) {
    if (map[char] % 2) {
      if (oddChar) return [];
      oddChar = char;
    }
    map[char] = Math.floor(map[char] / 2);
  }
  return solve('', map, oddChar, Math.floor(s.length / 2));
};

console.log(generatePalindromes(""));
