// https://www.hackerrank.com/challenges/kingdom-division/problem

// Not solved fully
function evalNode(n, diff, same, mod) {
  for (let i = 0; i < n.child.length; i++) {
    evalNode(n.child[i], diff, same, mod);
  }

  diff[n.ind] = [1, 1];
  for (let i = 0; i < n.child.length; i++) {
    diff[n.ind][0] = diff[n.ind][0] * (same[n.child[i].ind][1]) % mod;
    diff[n.ind][1] = diff[n.ind][1] * (same[n.child[i].ind][0]) % mod;
  }

  same[n.ind] = [1, 1];
  for (let i = 0; i < n.child.length; i++) {
    same[n.ind][0] = same[n.ind][0] * (
      diff[n.child[i].ind][0] + same[n.child[i].ind][0] + same[n.child[i].ind][1]) % mod;
    same[n.ind][1] = same[n.ind][1] * (
      diff[n.child[i].ind][1] + same[n.child[i].ind][1] + same[n.child[i].ind][0]) % mod;
  }

  same[n.ind][0] = (same[n.ind][0] - diff[n.ind][0] + 1) % mod;
  same[n.ind][1] = (same[n.ind][1] - diff[n.ind][1] + 1) % mod;

  return same[n.ind][0] + same[n.ind][1];
}

function solve() {
  
}
