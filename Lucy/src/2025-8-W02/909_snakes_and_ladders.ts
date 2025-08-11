function snakesAndLadders(board: number[][]): number {
  const n = board.length;
  const target = n * n;

  const getCoordinates = (square: number): [number, number] => {
    // calculate row
    const rowFromBottom = Math.floor((square - 1) / n);
    const row = n - 1 - rowFromBottom;

    // calculate col
    if (row % 2 === (n - 1) % 2) {
      const col = (square - 1) % n;
      return [row, col];
    } else {
      const col = n - 1 - ((square - 1) % n);
      return [row, col];
    }
  };

  // [currSquare, moveCount]
  const queue: [number, number][] = [[1, 0]];

  const visited = new Set<number>();
  visited.add(1);

  while (queue.length > 0) {
    const [currSquare, moveCount] = queue.shift()!;

    for (let i = 1; i <= 6; i++) {
      const nextSquare = currSquare + i;

      if (nextSquare > target) break;

      const [nextRow, nextCol] = getCoordinates(nextSquare);
      const destination = board[nextRow][nextCol] === -1 ? nextSquare : board[nextRow][nextCol];

      if (destination === target) return moveCount + 1;

      if (!visited.has(destination)) {
        visited.add(destination);
        queue.push([destination, moveCount + 1]);
      }
    }
  }

  return -1;
}
