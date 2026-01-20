function findSubstring(s: string, words: string[]): number[] {
  if (words.length === 0) return [];

  const result: number[] = [];

  const wordLen = words[0].length;
  const totalWordsLen = wordLen * words.length;

  if (s.length < totalWordsLen) return [];

  const countWord = new Map<string, number>();
  for (const word of words) {
    countWord.set(word, (countWord.get(word) || 0) + 1);
  }

  const checkFn = (window: string, wordLen: number) => {
    const countWindow = new Map<string, number>();
    for (let i = 0; i < window.length; i += wordLen) {
      const currentStr = window.substring(i, i + wordLen);
      countWindow.set(currentStr, (countWindow.get(currentStr) || 0) + 1);
    }

    if (countWindow.size !== countWord.size) return false;

    for (const [k, v] of countWindow) {
      if (!countWord.has(k) || countWord.get(k) !== v) {
        return false;
      }
    }

    return true;
  };

  for (let i = 0; i <= s.length - totalWordsLen; i++) {
    const window = s.substring(i, i + totalWordsLen);
    if (checkFn(window, wordLen)) result.push(i);
  }

  return result;
}
