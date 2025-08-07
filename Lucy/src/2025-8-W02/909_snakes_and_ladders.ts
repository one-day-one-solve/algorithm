function snakesAndLadders(board: number[][]): number {
  const n = board.length;
  const target = n * n;

  const getCoordinates = (square: number): [number, number] => {
    const rowFromBottom = Math.floor((square - 1) / n);
    const row = n - 1 - rowFromBottom;

    if (rowFromBottom % 2 === 0) {
      const col = (square - 1) % n;
      return [row, col];
    } else {
      const col = n - 1 - ((square - 1) % n);
      return [row, col];
    }
  };

  // BFS를 위한 큐. [현재 칸, 주사위 굴린 횟수]
  const queue: [number, number][] = [[1, 0]];

  const visited = new Set<number>();
  visited.add(1);

  while (queue.length > 0) {
    const [currentSquare, moves] = queue.shift()!;

    // 주사위를 1부터 6까지 굴립니다.
    for (let i = 1; i <= 6; i++) {
      let nextSquare = currentSquare + i;

      if (nextSquare > target) {
        break;
      }

      const [row, col] = getCoordinates(nextSquare);

      const destination = board[row][col] === -1 ? nextSquare : board[row][col];

      if (destination === target) {
        return moves + 1;
      }

      if (!visited.has(destination)) {
        visited.add(destination);
        queue.push([destination, moves + 1]);
      }
    }
  }

  return -1;
}
