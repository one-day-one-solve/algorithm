function canCompleteCircuit(gas: number[], cost: number[]): number {
  const n = gas.length;

  const sumOfGas = gas.reduce((acc, curr) => acc + curr, 0);
  const sumOfCost = cost.reduce((acc, curr) => acc + curr, 0);

  if (sumOfCost > sumOfGas) return -1;

  let start = 0;
  let currentTank = 0;

  for (let i = 0; i < n; i++) {
    currentTank = currentTank + (gas[i] - cost[i]);

    if (currentTank < 0) {
      currentTank = 0;
      start = i + 1;
    }
  }

  return start;
}
