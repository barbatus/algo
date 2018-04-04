// https://www.hackerrank.com/challenges/play-game/problem

function solve(bricks) {
  bricks = bricks.reverse();
  const sum = [bricks[0]];
  for (let i = 1; i < bricks.length; i++) {
    sum[i] = sum[i - 1] + bricks[i];
  }

  if (bricks.length < 3) return sum[sum.length - 1];

  const dp = [sum[0], sum[1], sum[2]];
  for (let i = 3; i < bricks.length; i++) {
    dp.push(Math.max(
      Math.max(
        bricks[i] + sum[i - 1] - dp[i - 1],
        bricks[i] + bricks[i - 1] + sum[i - 2] - dp[i - 2]
      ),
      bricks[i] + bricks[i - 1] + bricks[i - 2] + sum[i - 3] - dp[i - 3]
    ));
  }

  return dp[dp.length - 1];
}

console.log(solve([0, 1, 1, 1, 999]));
