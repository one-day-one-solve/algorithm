function combinationSum(candidates: number[], target: number): number[][] {
  const results: number[][] = [];

  function backtrack(currentIndex: number, currentSum: number, selected: number[]) {
    if (currentSum > target) return;

    if (currentSum === target) {
      results.push([...selected]);
      return;
    }

    for (let i = currentIndex; i < candidates.length; i++) {
      selected.push(candidates[i]);
      backtrack(i, currentSum + candidates[i], selected);
      selected.pop();
    }
  }

  backtrack(0, 0, []);

  return results;
}
