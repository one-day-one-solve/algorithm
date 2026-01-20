function totalNQueens(n: number): number {
  const board: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  let count = 0;

  const canPlaceQueen = (row: number, col: number): boolean => {
    // 이전 행에 queen을 이미 놓았다는 것을 가정하여 행은 비교하지 않음

    // 같은 열에 있는지 확인
    for (let i = 0; i < row; i++) {
      if (board[i][col]) return false;
    }

    // 대각선 방향에 있는지 확인
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] === 1 && Math.abs(i - row) === Math.abs(j - col)) return false;
      }
    }

    return true;
  };

  const backtrack = (row: number) => {
    if (row === n) {
      count += 1;
      return;
    }

    for (let col = 0; col < n; col++) {
      if (canPlaceQueen(row, col)) {
        board[row][col] = 1;
        backtrack(row + 1);
        board[row][col] = 0;
      }
    }
  };

  backtrack(0);

  return count;
}
