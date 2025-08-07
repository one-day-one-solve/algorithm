function minMutation(startGene: string, endGene: string, bank: string[]): number {
  if (!bank.includes(endGene)) return -1;

  const queue: [string, number][] = [[startGene, 0]];

  const visited = new Set<string>();
  visited.add(startGene);

  while (queue.length > 0) {
    const [currentGene, count] = queue.shift()!;

    if (currentGene === endGene) return count;

    for (const validGene of bank) {
      const mutationCount = Array.from(validGene).filter((ch, i) => ch !== currentGene[i]).length;
      if (mutationCount === 1 && !visited.has(validGene)) {
        visited.add(currentGene);

        queue.push([validGene, count + 1]);
      }
    }
  }

  return -1;
}
