// https://leetcode.com/problems/interleaving-string

var isInterleave = function(s1, s2, s3) {
  if (s1.length + s2.length !== s3.length) return false;

  let dp = [[true]];
  for (let i = 1; i < s1.length + 1; i++) {
    dp.push([dp[i - 1][0] && s1[i - 1] === s3[i - 1]]);
  }

  for (let j = 1; j < s2.length + 1; j++) {
    dp[0][j] = dp[0][j - 1] && s2[j - 1] === s3[j - 1];
  }

  for(let i = 1; i < s1.length + 1; i++) {
    for(let j = 1; j < s2.length + 1; j++) {
      dp[i][j] = (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1])
        || (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]);
    }
  }
  return dp[s1.length][s2.length];
};

console.log(isInterleave('aabc', 'abad', 'aabacbad'));

console.log(isInterleave('aambcc', 'mbkl', 'aambmbkccl'));
console.log(isInterleave('aazcc', 'mbkl', 'aambzkccl'));

console.log(isInterleave('aabcc', 'dbbca', 'aadbbcbcac'));
console.log(isInterleave('aabcc', 'dbbca', 'aadbbbaccc'));

console.log(isInterleave('abbbbbbcabbacaacccababaabcccabcacbcaabbbacccaaaaaababbbacbb', 'ccaacabbacaccacababbbbabbcacccacccccaabaababacbbacabbbbabc', 'cacbabbacbbbabcbaacbbaccacaacaacccabababbbababcccbabcabbaccabcccacccaabbcbcaccccaaaaabaaaaababbbbacbbabacbbacabbbbabc'));
