function permute(nums: number[]): number[][] {
  const numsLen = nums.length;

  const results: number[][] = [];
  const visited: boolean[] = new Array(numsLen).fill(false);

  function backtrack(selected: number[]) {
    if (selected.length === numsLen) {
      results.push([...selected]);
      return;
    }

    for (let i = 0; i < numsLen; i++) {
      if (visited[i]) {
        continue;
      }

      visited[i] = true;
      selected.push(nums[i]);

      backtrack(selected);

      selected.pop();
      visited[i] = false;
    }
  }

  backtrack([]);

  return results;
}
