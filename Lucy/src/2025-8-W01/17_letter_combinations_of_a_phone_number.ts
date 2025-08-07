function letterCombinations(digits: string): string[] {
  if (digits.length === 0) return [];

  const results: string[] = [];

  const digitMap = new Map<string, string>();
  const letters = ["abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
  for (let i = 0; i < letters.length; i++) {
    digitMap.set((i + 2).toString(), letters[i]);
  }

  function backtrack(letters: string, currentIndex: number) {
    if (letters.length === digits.length) {
      results.push(letters);
      return;
    }

    const currentNumber = digits[currentIndex];

    for (const ch of digitMap.get(currentNumber) || "") {
      backtrack(letters + ch, currentIndex + 1);
    }
  }

  backtrack("", 0);

  return results;
}
