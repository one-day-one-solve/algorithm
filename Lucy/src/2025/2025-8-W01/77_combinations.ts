function combine(n: number, k: number): number[][] {
  const results: number[][] = [];

  function backtrack(currentNumber: number, selected: number[]) {
    if (selected.length === k) {
      results.push([...selected]);
      return;
    }

    for (let i = currentNumber; i <= n; i++) {
      selected.push(i);
      backtrack(i + 1, selected);
      selected.pop();
    }
  }

  backtrack(1, []);

  return results;
}
