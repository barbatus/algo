// https://leetcode.com/problems/number-of-islands

function solve(matr) {
  if (!matr.length) return 0;

  const n = matr.length;
  const m = matr[0].length;

  const dr = [0, 0, -1, 1];
  const dc = [-1, 1, 0, 0];
  let islands = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matr[i][j] === '0') continue;
      const stack = [[i, j]];
      islands++;

      while (stack.length) {
        const node = stack.pop();

        matr[node[0]][node[1]] = '0';
        for (let d = 0; d < 4; d++) {
          const r = node[0] + dr[d];
          const c = node[1] + dc[d];

          if (r < 0 || c < 0 || r >= n || c >= m || matr[r][c] === '0') continue;
          stack.push([r, c]);
        }
      }
    }
  }

  return islands;
}

console.log(solve(['1', '1', '0', '1']));
