// 0ms
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const OBSTACLE = 1;

  if (obstacleGrid[0][0] === OBSTACLE) return 0;

  const m = obstacleGrid.length;

  const dp: number[][] = Array.from({ length: m }, (_, i) => Array(obstacleGrid[i].length).fill(0));
  dp[0][0] = 1; // robot initially located

  // Fill the first row
  for (let i = 1; i < obstacleGrid[0].length; i++) {
    if (obstacleGrid[0][i] === OBSTACLE) {
      continue;
    }
    dp[0][i] += dp[0][i - 1];
  }

  // Fill the first col
  for (let i = 1; i < m; i++) {
    if (obstacleGrid[i][0] === OBSTACLE) {
      continue;
    }
    dp[i][0] += dp[i - 1][0];
  }

  // Fill the rest
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < obstacleGrid[i].length; j++) {
      if (obstacleGrid[i][j] === OBSTACLE) {
        continue;
      }

      dp[i][j] += dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][dp[m - 1].length - 1];
}
