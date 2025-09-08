function spiralOrder(matrix: number[][]): number[] {
  const result: number[] = [];

  const m = matrix.length;
  const n = matrix[0].length;

  // right > bottom > left > top
  let [top, bottom, left, right] = [0, m - 1, 0, n - 1];
  while (result.length < m * n) {
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }
    top++;

    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--;

    if (top > bottom) break;

    for (let i = right; i >= left; i--) {
      result.push(matrix[bottom][i]);
    }
    bottom--;

    if (left > right) break;

    for (let i = bottom; i >= top; i--) {
      result.push(matrix[i][left]);
    }
    left++;
  }

  return result;
}
