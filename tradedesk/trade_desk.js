// Split a coin into smaller denominations, i.e.
// least possible number of them

function split(value, denoms) {
  const lens = [];
  for (let i = 0; i <= value; i++) {
    lens[i] = [Number.MAX_SAFE_INTEGER, []];
  }

  lens[0][0] = 0;
  for (let i = 1; i <= value; i++) {
    let min = Number.MAX_SAFE_INTEGER;
    let index = -1;
    for (let j = 0; j < denoms.length; j++) {
      if (i >= denoms[j] && min > lens[i - denoms[j]][0]) {
        min = lens[i - denoms[j]][0];
        index = j;
      }
    }

    if (index !== -1) {
      lens[i][0] = min + 1;
      lens[i][1] = lens[i - denoms[index]][1].concat(denoms[index]);
    }
  }

  return lens[value][1];
}

console.log(split(23, [14, 5, 4, 3, 1]));
