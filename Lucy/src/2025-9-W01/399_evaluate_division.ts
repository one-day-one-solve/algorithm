function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
  const results: number[] = [];

  const graph = new Map<string, Map<string, number>>();

  for (let i = 0; i < equations.length; i++) {
    const [startNode, endNode] = equations[i];
    const weight = values[i];

    if (!graph.has(startNode)) graph.set(startNode, new Map<string, number>());
    if (!graph.has(endNode)) graph.set(endNode, new Map<string, number>());

    graph.get(startNode)!.set(endNode, weight);
    graph.get(endNode)!.set(startNode, 1 / weight);
  }

  for (let i = 0; i < queries.length; i++) {
    const [startNode, endNode] = queries[i];

    if (!graph.has(startNode) || !graph.has(endNode)) {
      results.push(-1.0);
      continue;
    }

    const visited = new Set<string>();

    // [node, weight][]
    const queue: [string, number][] = [];
    queue.push([startNode, 1]);
    visited.add(startNode);

    let isFound = false;
    while (queue.length > 0) {
      const [currentNode, currentWeight] = queue.shift()!;

      if (currentNode === endNode) {
        results.push(currentWeight);
        isFound = true;
        break;
      }

      const neighbors = graph.get(currentNode)!;
      for (const [neighborNode, weight] of neighbors) {
        if (!visited.has(neighborNode)) {
          visited.add(neighborNode);

          const newWeight = currentWeight * weight;
          queue.push([neighborNode, newWeight]);
        }
      }
    }

    if (!isFound) {
      results.push(-1.0);
    }
  }

  return results;
}
