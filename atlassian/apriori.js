function getItemsToCheck(subset, items) {
  const last = subset[subset.length - 1];
  for (let i = 0; i < items.length; i++) {
    if (items[i] > last) return items.slice(i);
  }
  return [];
}

function countAppearance(trans, subset) {
  let count = 0;
  for (let i = 0; i < trans.length; i++) {
    const tran = trans[i];
    let exist = true;
    for (let j = 0; j < subset.length; j++) {
      const item = subset[j];
      exist &= tran.indexOf(item) !== -1;
    }
    if (exist) {
      count += 1;
    }
  }
  return count;
}

function findSubsets(trans) {
  const freqs = {};
  const items = [];
  for (let i = 0; i < trans.length; i++) {
    const tran = trans[i];
    const tranItems = tran.split(',');
    for (let j = 0; j < tranItems.length; j++) {
      const item = tranItems[j];
      if (!freqs[item]) {
        freqs[item] = 0;
        items.push(item);
      }
      freqs[item] += 1;
    }
  }

  items.sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });
  let subsets = items.map((item) => [item]);
  while (subsets.length) {
    const nextSubsets = [];
    for (let i = 0; i < subsets.length; i++) {
      const subset = subsets[i];
      const nextItems = getItemsToCheck(subset, items);
      for (let j = 0; j < nextItems.length; j++) {
        const nextSubset = subset.concat(nextItems[j]);
        const count = countAppearance(trans, nextSubset);
        if (count) {
          const str = nextSubset.join(',');
          freqs[str] = count;
          nextSubsets.push(nextSubset);
        }
      }
    }
    subsets = nextSubsets;
  }

  return Object.keys(freqs).reduce((accum, key) => accum += (key + ': ' + freqs[key] + '\n'), '');
}

console.log(findSubsets([
  'apple,banana,lemon',
  'banana,berry,lemon,orange',
  'banana,berry,lemon',
]));
