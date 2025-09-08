/**
 Do not return anything, modify board in-place instead.
 */
function gameOfLife(board: number[][]): void {
  const m = board.length;
  const n = board[0].length;

  const TO_DEAD = -1;
  const TO_LIVE = 2;

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let neighbor = 0;
      for (const [dx, dy] of directions) {
        const [nx, ny] = [dx + i, dy + j];
        if (nx >= 0 && nx < m && ny >= 0 && ny < n && board[nx][ny] !== TO_LIVE) {
          neighbor += board[nx][ny] === TO_DEAD ? 1 : board[nx][ny];
        }
      }

      if (board[i][j] === 1) {
        if (neighbor <= 1 || neighbor >= 4) {
          board[i][j] = TO_DEAD;
        }
      } else if (board[i][j] === 0) {
        if (neighbor === 3) {
          board[i][j] = TO_LIVE;
        }
      }
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === TO_DEAD) {
        board[i][j] = 0;
      } else if (board[i][j] === TO_LIVE) {
        board[i][j] = 1;
      }
    }
  }
}
