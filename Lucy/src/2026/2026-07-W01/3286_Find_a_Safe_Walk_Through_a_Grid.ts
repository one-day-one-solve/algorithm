function findSafeWalk(grid: number[][], health: number): boolean {
  const DIRECTIONS = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const [m, n] = [grid.length, grid[0].length];

  const startHealth = health - grid[0][0];
  if (startHealth <= 0) return false;

  const queue: [number, number, number][] = [[0, 0, startHealth]];
  let pointer = 0;

  const visited: number[][] = Array.from({ length: m }, () => Array(n).fill(0));
  visited[0][0] = startHealth;

  while (pointer < queue.length) {
    const [cx, cy, currHealth] = queue[pointer++];

    if (cx === m - 1 && cy === n - 1) {
      return true;
    }

    for (const [dx, dy] of DIRECTIONS) {
      const [nx, ny] = [cx + dx, cy + dy];

      if (nx >= 0 && nx < m && ny >= 0 && ny < n) {
        const nextHealth = currHealth - grid[nx][ny];

        if (nextHealth > 0 && visited[nx][ny] < nextHealth) {
          queue.push([nx, ny, nextHealth]);
          visited[nx][ny] = nextHealth;
        }
      }
    }
  }

  return false;
}
