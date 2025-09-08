/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
  const n = matrix.length;

  for (let layer = 0; layer < Math.floor(n / 2); layer++) {
    for (let i = layer; i < n - 1 - layer; i++) {
      let temp = matrix[n - 1 - i][layer];
      matrix[n - 1 - i][layer] = matrix[n - 1 - layer][n - 1 - i];
      matrix[n - 1 - layer][n - 1 - i] = matrix[i][n - 1 - layer];
      matrix[i][n - 1 - layer] = matrix[layer][i];
      matrix[layer][i] = temp;
    }
  }
}
