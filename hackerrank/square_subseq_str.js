// https://www.hackerrank.com/challenges/square-subsequences/problem

const mod = 1000000007;

// Find all common subsequences between two strings.
function common(a, b) {
  const dp = [[a[0] === b[0] ? 1 : 0]];
  for (let j = 1; j < b.length; j++) {
    dp[0][j] = (a[0] === b[j] ? 1 : 0) + dp[0][j - 1];
  }

  for (let i = 1; i < a.length; i++) {
    dp[i] = [dp[i - 1][0] + (a[i] === b[0] ? 1 : 0)];
    for (let j = 1; j < b.length; j++) {
      let count = dp[i - 1][j] + dp[i][j - 1] - dp[i - 1][j - 1];
      if (a[i] === b[j]) {
        count += dp[i - 1][j - 1] + 1;
      }
      dp[i][j] = count % mod;
    }
  }

  return dp;
}

function calc(str) {
  if (str.length <= 1) return 0;

  let len = 0;
  for (let i = 1; i < str.length; i++) {
    const a = str.substr(0, i);
    const b = str.substr(i + 1);
    for (let j = 0; j < a.length; j++) {
      if (a[j] === str[i]) len++;
    }
    if (a && b) {
      dp = common(a, b);
      for (let j = 1; j < b.length; j++) {
        if (str[i] === b[j]) {
          len += dp[a.length - 1][j - 1];
        }
      }
    }
  }
  return len % mod;
}

//console.log(calc('aa'));
//console.log(calc('abababa'));
//console.log(calc('asdfg'));
console.log(calc('hgvwujbqxxpitcvograiddvhrrdsycqhkleewhxtembaqwqwpqhsuebnvfgvjwdvjjafqzzxlcxdzncqgjlapopkvxfgvicetcmkbljopgtqvvhbgsdvivhesnkqxmwrqidrvmhlubbryktheyentmrobdeyqcrgluaiihveixwjjr'));
