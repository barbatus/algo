// Longest subsequence w/o repeating symbols.

function solve(str) {
  const map = {};
  let count = 0;
  let max = 0;
  let len, si, ei;
  for (let i = 0; i < str.length; i++) {
    const symb = str[i];
    if (map[symb] !== undefined) {
      len = i - map[symb];
    } else {
      len++;
    }

    if (len > max) {
      max = len;
      ei = i;
      si = map[symb] ? (map[symb] + 1) : si;
    }

    map[symb] = i;
  }

  return str.substr(si, ei);
}

console.log(solve('abcabcbb'));

