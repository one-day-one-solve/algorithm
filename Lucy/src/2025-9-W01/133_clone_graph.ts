/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     neighbors: _Node[]
 *
 *     constructor(val?: number, neighbors?: _Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.neighbors = (neighbors===undefined ? [] : neighbors)
 *     }
 * }
 *
 */

function cloneGraph(node: _Node | null): _Node | null {
  if (!node) return null;

  const result: _Node | null = null;

  const cloneMap = new Map<number, _Node>();
  const queue: _Node[] = [];

  const startClone = new _Node(node.val);
  cloneMap.set(node.val, startClone);
  queue.push(node);

  while (queue.length > 0) {
    const currentOriginal = queue.shift()!;
    const currentClone = cloneMap.get(currentOriginal.val)!;

    for (const originalNeighbor of currentOriginal.neighbors) {
      if (!cloneMap.has(originalNeighbor.val)) {
        const newClone = new _Node(originalNeighbor.val);

        cloneMap.set(originalNeighbor.val, newClone);

        queue.push(originalNeighbor);
      }

      const neighborClone = cloneMap.get(originalNeighbor.val);

      currentClone.neighbors.push(neighborClone);
    }
  }

  return startClone;
}
