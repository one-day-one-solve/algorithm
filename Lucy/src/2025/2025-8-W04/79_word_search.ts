function exist(board: string[][], word: string): boolean {
  const m = board.length;
  const n = board[0].length;
  const direction = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const visited: boolean[][] = Array.from({ length: m }, () => Array(n).fill(false));

  const backtrack = (row: number, col: number, wordIndex: number): boolean => {
    if (board[row][col] !== word[wordIndex]) return false;

    if (wordIndex === word.length - 1) {
      return true;
    }

    visited[row][col] = true;

    for (const [dx, dy] of direction) {
      const [nx, ny] = [row + dx, col + dy];

      if (nx >= 0 && nx < m && ny >= 0 && ny < n && !visited[nx][ny]) {
        if (backtrack(nx, ny, wordIndex + 1)) {
          return true;
        }
      }
    }

    visited[row][col] = false;

    return false;
  };

  // find word[0] 의 cell coordinates
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === word[0]) {
        if (backtrack(i, j, 0)) {
          return true;
        }
      }
    }
  }

  return false;
}
