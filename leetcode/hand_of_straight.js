// https://leetcode.com/problems/hand-of-straights

function solve(seq, W) {
  if (seq.length < W) return false;
  if (seq.length % W) return false;
  
  const map = {};
  for (let i = 0; i < seq.length; i++) {
    if (!map[seq[i]]) {
      map[seq[i]] = 1;
    } else {
      map[seq[i]]++;
    }
  }
  const hands = Object.keys(map);
  for (let i = 0; i < hands.length; i++) {
    if (map[hands[i]] <= 0) continue;
    let count = 1;
    let hand = Number(hands[i]) + 1;
    let value = map[hands[i]];
    while (count < W) {
      if (map[hand] && (map[hand] - value) >= 0) {
        map[hand] = map[hand] - value;
        hand++;
        count++;
        continue;
      }
      return false;
    }
  }
  return true;
}

console.log(solve([60, 61, 63, 62], 4));
