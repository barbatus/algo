// Union find for sentence similarity

var areSentencesSimilarTwo = function(words1, words2, pairs) {
  const parent = {};
  for (const [w1, w2] of pairs) {
    const p1 = find(parent, w1);
    const p2 = find(parent, w2);
    parent[p2] = p1;
  }

  for (let i = 0; i < words1.length; i++) {
    const w1 = words1[i];
    const w2 = words2[i];
    if (w1 === w2 || find(parent, w1) === find(parent, w2)) {
      continue;
    }
    return false;
  }
  return true;
};

function find(parent, w) {
  if (parent[w] === w || !parent[w]) {
    parent[w] = w;
    return w;
  }
  parent[w] = find(parent, parent[w]);
  return parent[w];
}

console.log(areSentencesSimilarTwo(
  ["great", "acting", "skills"],
  ["fine", "drama", "talent"],
  [["great", "good"], ["fine", "good"], ["acting","drama"], ["skills","talent"]],
));

