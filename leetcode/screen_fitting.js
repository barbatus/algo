var wordsTyping = function(sentence, rows, cols) {
  const tmp = sentence.join(' ') + ' ';
  const len = tmp.length;
  let start = 0;
  for (let i = 0; i < rows; i++) {
    start += cols;
    while (start >= 0 && tmp[start % len] !== ' ') {
      start--;
    }
    start++;
  }

  return Math.floor(start / len);
};

console.log(wordsTyping(["a", "bcd", "e"], 3, 6));
console.log(wordsTyping(["hello", "world"], 2, 8));
console.log(wordsTyping(["hello"], 10000, 5));
