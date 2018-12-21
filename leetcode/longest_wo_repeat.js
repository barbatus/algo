// Longest subsequence w/o repeating symbols.

function solve(str) {
  const map = {};
  let max = 0;
  let s, e;
  for (let i = 0, j = 0; i < str.length; i++) {
    const symb = str[i];
    if (map[symb] !== undefined) {
      j = Math.max(j, map[symb] + 1);
    }
    if (max < (i - j + 1)) {
      max = i - j + 1;
      s = j;
      e = i;
    }
    map[symb] = i; 
  }

  return str.substr(s, max);
}

console.log(solve('abcadcbb'));
console.log(solve('ccccccc'));
