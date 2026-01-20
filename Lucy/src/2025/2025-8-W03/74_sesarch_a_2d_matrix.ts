function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix.length;
  const n = matrix[0].length;

  const findRow = (): number => {
    let l = 0;
    let r = m - 1;

    while (l < r) {
      const mid = Math.floor((l + r) / 2);

      if (target >= matrix[mid][0] && target <= matrix[mid][n - 1]) {
        return mid;
      }

      if (target < matrix[mid][0]) {
        r = mid - 1;
      } else if (target > matrix[mid][0]) {
        l = mid + 1;
      }
    }

    return l;
  };

  const isExistTarget = (row: number): boolean => {
    let l = 0;
    let r = n - 1;

    while (l < r) {
      const mid = Math.floor((l + r) / 2);

      if (target === matrix[row][mid]) {
        return true;
      }

      if (target > matrix[row][mid]) {
        l = mid + 1;
      } else if (target < matrix[row][mid]) {
        r = mid - 1;
      }
    }

    if (target === matrix[row][l]) return true;

    return false;
  };

  const findTargetRow = findRow();
  const result = isExistTarget(findTargetRow);

  return result;
}

searchMatrix(
  [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 60],
  ],
  3
); // true
searchMatrix(
  [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 60],
  ],
  13
); // false
searchMatrix([[1]], 1); // true
searchMatrix([[1, 1]], 2); // false
