/**
 Do not return anything, modify board in-place instead.
 */
function solve(board: string[][]): void {
  const m = board.length;
  const n = board[0].length;

  const bfs = (row: number, col: number) => {
    const queue: [number, number][] = [];

    if (board[row][col] === "O") {
      board[row][col] = "S";
      queue.push([row, col]);
    }

    while (queue.length > 0) {
      const [cx, cy] = queue.shift()!;

      for (const [dx, dy] of [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ]) {
        const [nx, ny] = [dx + cx, dy + cy];

        if (nx >= 0 && nx < m && ny >= 0 && ny < n && board[nx][ny] === "O") {
          board[nx][ny] = "S";
          queue.push([nx, ny]);
        }
      }
    }
  };

  for (let j = 0; j < n; j++) {
    bfs(0, j);
    bfs(m - 1, j);
  }

  for (let i = 1; i < m - 1; i++) {
    bfs(i, 0);
    bfs(i, n - 1);
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === "O") board[i][j] = "X";
      else if (board[i][j] === "S") board[i][j] = "O";
    }
  }
}
