var backspaceCompare = function(S, T) {
  const findNext = (str, ind) => {
    let count = 0;
    while (ind >= 0 && (str[ind] === '#' || count > 0)) {
      count += (str[ind] === '#' ? 1 : -1);
      ind--;
    }
    return ind;
  }

  let i = S.length - 1, j = T.length - 1;
  while (i >= -1 && j >= -1) {
    i = findNext(S, i);
    j = findNext(T, j);

    if (S[i] !== T[j]) return false;

    i--; j--;
  }

  return i === j;
};

console.log(backspaceCompare('ab##cd#', 'cd#'));
console.log(backspaceCompare('ab##', 'c#d#'));
console.log(backspaceCompare('a#b#c', ''));
console.log(backspaceCompare('abbbb####b#ccc#d#', 'acc'));
