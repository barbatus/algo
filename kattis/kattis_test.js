
function checkCar(sym) {
  return sym === 'X' ? 1 : 0;
}

function checkBuild(sym) {
  return sym === '#' ? 1 : 0;
}

function calc(map) {
  const n = map.length;
  const m = map[0].length;
  const set = {'0': 0, '1': 0, '2': 0, '3': 0, '4': 0};
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < m - 1; j++) {
      if (checkBuild(map[i][j]) ||
          checkBuild(map[i + 1][j]) ||
          checkBuild(map[i][j + 1]) ||
          checkBuild(map[i + 1][j + 1])) {
        continue;
      }

      const count =
        checkCar(map[i][j]) +
        checkCar(map[i + 1][j]) +
        checkCar(map[i][j + 1]) +
        checkCar(map[i + 1][j + 1]);
      set[count] += 1;
    }
  }

  const result = [];
  for (let i = 0; i < 5; i++) {
    result.push(set[i]);
  }
  return result;
}

const test = [
  '..XX.',
  '.#XX.',
  '..#..',
  '.....'
];

console.log(calc(test).join('\n'));
