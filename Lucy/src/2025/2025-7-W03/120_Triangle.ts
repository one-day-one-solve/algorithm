// 6ms
function minimumTotal(triangle: number[][]): number {
  const row = triangle.length;
  if (row === 0) return 0;

  const dp: number[][] = Array.from({ length: row }, (_, i) => Array(i + 1).fill(0));

  dp[0][0] = triangle[0][0];

  for (let i = 1; i < row; i++) {
    for (let j = 0; j < triangle[i].length; j++) {
      if (j === 0) {
        dp[i][j] = dp[i - 1][j] + triangle[i][j];
      } else if (j === i) {
        dp[i][j] = dp[i - 1][j - 1] + triangle[i][j];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1]) + triangle[i][j];
      }
    }
  }

  return Math.min(...dp[row - 1]);
}
