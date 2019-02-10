
// https://leetcode.com/problems/knight-probability-in-chessboard

// DFS brutforce
var knightProbability2 = function(N, K, r, c) {
  const moveP = 1 / 8;
  const moves = [{ r, c, p: 1, k: 0 }];
  const dC = [-1,  1,  2, 2, 1, -1, -2, -2];
  const dR = [-2, -2, -1, 1, 2,  2,  1, -1];

  const seen = {};
  let p = 0;
  while (moves.length) {
    const top = moves.pop();
    for (let d = 0; d < 8; d++) {
      const nR = top.r + dR[d];
      const nC = top.c + dC[d];
      if (isValid(N, nR, nC)) {
        if (top.k + 1 == K) {
          p += top.p * moveP;
        } else {
          moves.push({ r: nR, c: nC, p: top.p * moveP, k: top.k + 1 });
        }
      }
    }
  }
  return p;
};

// simple DP
var knightProbability = function(N, K, r, c) {
  const moveP = 1 / 8;
  let moves = [];
  for (let r = 0; r < N; r++) {
    moves.push([]);
    for (let c = 0; c < N; c++) {
      moves[r][c] = Array(K + 1).fill(0);
    }
  }
  moves[r][c][0] = 1;
  const dC = [-1,  1,  2, 2, 1, -1, -2, -2];
  const dR = [-2, -2, -1, 1, 2,  2,  1, -1];

  let p = 0;
  for (let i = 1; i <= K; i++) {
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        for (let d = 0; d < 8; d++) {
          const nR = r + dR[d];
          const nC = c + dC[d];
          if (isValid(N, nR, nC)) {
            moves[r][c][i] += moves[nR][nC][i - 1] * moveP;
          }
        }
        if (i === K) {
          p += moves[r][c][K];
        }
      }
    }
  }
  return p;
};

function isValid(N, r, c) {
  if (r < 0 || c < 0) return false;
  if (r >= N || c >= N) return false;
  return true;
}

console.log(knightProbability(3, 2, 0, 0));
