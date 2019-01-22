// When only one edit possible.
function solve1(a, b) {
  if (Math.abs(a.length - b.length) >= 2) return false;

  let count = 0;
  const max = a.length < b.length ? b : a;
  const min = a.length < b.length ? a : b;
  for (let i = 0, j = 0; i < min.length, j < max.length, count <= 1; i++, j++) {
    if (min[i] !== max[j]) {
      i += (max.length !== min.length ? -1 : 0);
      count++;
    }
  }

  return count <= 1;
}

// console.log(solve1('ccf', 'acc'));

function solve2(a, b) {
  const n = a.length;
  const m = b.length;

  const dp = [[a[0] === b[0] ? 0 : 1]];
  for (let i = 1; i < n; i++) {
    dp.push([]);
  }
  for (let j = 1; j < m; j++) {
    dp[0][j] = a[0] === b[j] ? j : dp[0][j - 1] + 1;
  }
  for (let i = 1; i < n; i++) {
    dp[i][0] = a[i] === b[0] ? i : dp[i - 1][0] + 1;
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      if (a[i] === b[j]) {
        dp[i][j] = dp[i - 1][j - 1];
        continue;
      }

      dp[i][j] = 1 + Math.min(Math.min(dp[i - 1][j - 1], dp[i - 1][j]), dp[i][j - 1]);
    }
  }
  console.log(dp);

  return dp[n - 1][m - 1];
}

console.log(solve2('ccf', 'acc'));

// with O(n) space
function solve3(a, b) {
  const n = a.length;
  const m = b.length;

  const diff = [a[0] === b[0] ? 0 : 1];
  for (let j = 1; j < m; j++) {
    diff[j] = a[0] === b[j] ? j : (diff[j - 1] + 1);
  }

  for (let i = 1; i < n; i++) {
    const prev = a[i] === b[0] ? i : (diff[0] + 1);
    for (let j = 1; j < m; j++) {
      if (a[i] === b[j]) {
        curr = diff[j - 1];
      } else {
        curr = Math.min(Math.min(diff[j - 1], diff[j]), prev) + 1;
      }
      diff[j - 1] = prev;
      prev = curr;
    }
    diff[m - 1] = prev;
  }

  return diff[m - 1];
}
