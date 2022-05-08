function dfs(board, i, j) {
  const oo = [[i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1]]
    .filter(([r, c]) => board[r] && board[r][c] === 'O');

  board[i][j] = 'S';
  for (let [r, c] of oo) {
    board[r][c] = 'S';
    dfs(board, r, c);
  }
}

var solve = function(board) {
  const n = board.length;
  if (!n) return [];

  const m = board[0].length;
  for (let j = 0; j < m; j++) {
    if (board[0][j] === 'O') {
      dfs(board, 0, j);
    }
    if (board[n - 1][j] === 'O') {
      dfs(board, n - 1, j);
    }
  }

  for (let i = 0; i < n; i++) {
    if (board[i][0] === 'O') {
      dfs(board, i, 0);
    }
    if (board[i][m - 1] === 'O') {
      dfs(board, i, m - 1);
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === 'O') {
        board[i][j] = 'X';
      }
      if (board[i][j] === 'S') {
        board[i][j] = 'O';
      }
    }
  }
  return board;
};

console.log(solve([["X","X","X","X","X","O"],["X","O","O","X","O","X"],["X","X","O","X","O","X"],["X","O","X","X","X","X"]]));
