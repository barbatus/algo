const dc = [1, -1, 0,  0];
const dr = [0,  0, 1, -1];
const def = ['r', 'l', 'd', 'u'];

function visitIsland(grid, i, j, point) {
  grid[i][j] = 0;
  const n = grid.length;
  const m = grid[0].length;
  let str = point;
  for (let dir = 0; dir < 4; dir++) {
    const r = i + dr[dir];
    const c = j + dc[dir];
    if (r >= 0 && c >= 0 && r < n && c < m && grid[r][c]) {
      str += visitIsland(grid, r, c, def[dir]);
    }
  }
  return str + '+';
}

var numDistinctIslands = function(grid) {
  const islands = {};
  const n = grid.length;
  const m = grid[0].length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j]) {
        const island = visitIsland(grid, i, j, 's');
        console.log(island);
        islands[island] = 1;
      }
    }
  }
  return Object.keys(islands).length;
};

console.log(
  numDistinctIslands([
    [0,0,1,0,1,0,1,1,1,0,0,0,0,1,0,0,1,0,0,1,1,1,0,1,1,1,0,0,0,1,1,0,1,1,0,1,0,1,0,1,0,0,0,0,0,1,1,1,1,0],
    [0,0,1,0,0,1,1,1,0,0,1,0,1,0,0,1,1,0,0,1,0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,1,0,1,1,0,1,0,0,0],
    [0,1,0,1,0,1,1,1,0,0,1,1,0,0,0,0,1,0,1,0,1,1,1,0,1,1,1,0,0,0,1,0,1,0,1,0,0,0,1,1,1,1,1,0,0,1,0,0,1,0],
    [1,0,1,0,0,1,0,1,0,0,1,0,0,1,1,1,0,1,0,0,0,0,1,0,1,0,0,1,0,1,1,1,0,1,0,0,0,1,1,1,0,0,0,0,1,1,1,1,1,1]
  ])
);
