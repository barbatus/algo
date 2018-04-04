// Find all anagrams in a given string using sliding window method.

function find(s, p) {
  const map = {};
  for (let i = 0; i < p.length; i++) {
    map[p[i]] = 0;
  }
  for (let i = 0; i < p.length; i++) {
    map[p[i]] += 1;
  }

  let count = p.length;
  let left = 0;
  let right = 0;
  let res = [];
  while (right < s.length) {
    if (map[s[right]] >= 1) {
      count -= 1;
    }
    map[s[right]] -= 1;
    right += 1;

    if (count === 0) res.push(left);

    if (right - left === p.length) {
      if (map[s[left]] >= 0) {
        count += 1;
      }
      map[s[left]] += 1;
      left += 1;
    }
  }

  return res;
}

console.log(find('ggohteglf', 'gel'));
