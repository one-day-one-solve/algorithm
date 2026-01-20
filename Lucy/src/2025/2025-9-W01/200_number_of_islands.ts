function numIslands(grid: string[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  // [row, col]
  const queue: [number, number][] = [];

  const visited: boolean[][] = Array.from({ length: m }, () => Array(n).fill(false));

  let islandCount = 0;

  const isValid = (i: number, j: number): boolean => {
    return i >= 0 && i < m && j >= 0 && j < n && !visited[i][j] && grid[i][j] === "1";
  };

  const bfs = (i: number, j: number) => {
    visited[i][j] = true;
    queue.push([i, j]);

    while (queue.length > 0) {
      const [cx, cy] = queue.shift()!;

      for (const [dx, dy] of [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ]) {
        const [nx, ny] = [cx + dx, cy + dy];

        if (isValid(nx, ny)) {
          visited[nx][ny] = true;
          queue.push([nx, ny]);
        }
      }
    }
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1" && !visited[i][j]) {
        islandCount++;
        bfs(i, j);
      }
    }
  }

  return islandCount;
}
