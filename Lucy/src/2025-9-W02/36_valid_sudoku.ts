function isValidSudoku(board: string[][]): boolean {
  // check sub boxes
  const START_COORDINATES = [
    [0, 0],
    [3, 0],
    [6, 0],
    [0, 3],
    [3, 3],
    [3, 6],
    [0, 6],
    [6, 3],
    [6, 6],
  ];
  for (const [x, y] of START_COORDINATES) {
    const used = new Set<string>();

    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        if (board[i][j] === ".") continue;
        if (used.has(board[i][j])) return false;
        used.add(board[i][j]);
      }
    }
  }

  // check row
  for (let i = 0; i < board.length; i++) {
    const used = new Set<string>();

    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === ".") continue;
      if (used.has(board[i][j])) return false;

      used.add(board[i][j]);
    }
  }
  // check col
  for (let j = 0; j < board[0].length; j++) {
    const used = new Set<string>();

    for (let i = 0; i < board.length; i++) {
      if (board[i][j] === ".") continue;
      if (used.has(board[i][j])) return false;

      used.add(board[i][j]);
    }
  }

  return true;
}
