// Simple DP https://leetcode.com/problems/word-break-ii

var wordBreak = function(s, wordDict) {
  const dp = { 0: [] };
  for (let i = 1; i < s.length + 1; i++) {
    for (let j = 1; j <= i; j++) {
      const str = s.substr(j - 1, i - j + 1);
      const ind = wordDict.indexOf(str);
      if (ind !== -1 && dp[j - 1]) {
        dp[i] = dp[i] ? dp[i] : [];
        dp[i].push(ind);
      }
    }
  }

  const traverse = (tmp, ind) => {
    if (ind === 0) {
      return tmp.reverse().join(' ');
    }

    let result = [];
    for (let i = 0; i < dp[ind].length; i++) {
      const win = dp[ind][i];
      result = result.concat(traverse(tmp.concat(wordDict[win]), ind - wordDict[win].length));
    }

    return result;
  }

  return dp[s.length] ? traverse([], s.length) : [];
};

console.log(wordBreak("a", ["a"]));

console.log(wordBreak("catsandog", ["cats","dog","sand","and","cat"]));

console.log(wordBreak("pineapplepenapple", ["apple", "pen", "applepen", "pine", "pineapple"]));
