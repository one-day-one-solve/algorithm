function generateParenthesis(n: number): string[] {
  const results: string[] = [];

  const backtrack = (path: string[], countOpen: number, countClose: number) => {
    if (path.length === n * 2) {
      results.push(path.join(""));
      return;
    }

    if (countOpen < n) {
      path.push("(");
      backtrack(path, countOpen + 1, countClose);
      path.pop();
    }

    if (countClose < countOpen) {
      path.push(")");
      backtrack(path, countOpen, countClose + 1);
      path.pop();
    }
  };

  backtrack([], 0, 0);

  return results;
}
