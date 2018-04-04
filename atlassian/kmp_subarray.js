// KMP to find a given subarray's index in a given array.

function getTable(s) {
  const table = [-1];

  let index = 0;
  for(let i = 1; i < s.length; i++) {
    if(s[index] == s[i]) {
      table[i] = table[index];
      index++;
    } else {
      table[i] = index;

      index = table[index];

      while(index >= 0 && s[index] != s[i]) {
        index = table[index];
      }

      index++;
    }
  }

  return table;
}

function find(s1, s2) {
  const t = getTable(s2);
  let i = 0;
  let j = 0;
  while (i < s1.length) {
    if (s1[i] === s2[j]) {
      i++; j++;
      if (j === s2.length) {
        return i - j;
      }
      continue;
    }
    j = t[j];
    if (j < 0) {
      i++; j++;
    }
  }
  return -1;
}

console.log(find([10, 20, 3, 4, 100, 5, 90, 7, 7, 45], [5, 90, 7]));
