// Manacher algorithms

// https://www.hackerrank.com/challenges/circular-palindromes/problem

function findMaxPali(s) {
  const sh = '#' + s.split('').join('#') + '#';
  const lens = [];

  let bound = 0;
  let center = 0;
  let max = 1;
  for (let i = 0; i < sh.length; i++) {
    if (bound > i) {
      lens[i] = Math.min(lens[2 * center - i], bound - i);
    } else {
      lens[i] = 1;
    }

    while ((i - lens[i]) >= 0 &&
           (i + lens[i]) < sh.length &&
           sh[i - lens[i]] === sh[i + lens[i]])
      lens[i] = lens[i] + 1;

    if (bound < lens[i] + i) {
      center = i;
      bound = lens[i] + i;
      max = Math.max(max, lens[i] - 1);
    }
  }

  return max;
}

function findMaxBrut(s, start, end) {
  if ((end - start + 1) <= 3) {
    if (s[start] === s[end]) {
      return end - start + 1;
    }
    if (s[start] === s[start + 1] ||
        s[end] === s[end - 1]) {
      return 2;
    }
    return 0;
  }

  const size = (end - start + 1) / 2 >> 0;
  let i = 0;
  for (; i < size; i++) {
    if (s[start + i] === s[end - i]) {
      continue;
    } else {
      return Math.max(findMaxBrut(s, start + 1, end), findMaxBrut(s, start, end - 1));
    }
  }
  return end - start + 1;
}

function processData(input) {
  if (!input.length) console.log(0);

  let substr = input;
  console.log(findMaxPali(substr));
  for (let i = 0; i < input.length - 1; i++) {
      substr += input[i];
      const circled = substr.substring(i + 1, substr.length);
      console.log(findMaxPali(circled));
  }
}

//processData('aaaaabbbbaaaa');
