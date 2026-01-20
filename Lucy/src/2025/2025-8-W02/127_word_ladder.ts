function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  if (!wordList.includes(endWord)) return 0;

  const queue: [string, number][] = [[beginWord, 1]];
  const visited = new Set<string>();
  visited.add(beginWord);

  const wordListSet = new Set<string>(wordList);

  const getValidWords = (currentStr: string): string[] => {
    const results: string[] = [];

    const alphabets = "abcdefghijklmnopqrstuvwxyz";

    for (const alphabet of alphabets) {
      for (let i = 0; i < currentStr.length; i++) {
        const transformStr = currentStr.substring(0, i) + alphabet + currentStr.substring(i + 1);

        if (!visited.has(transformStr) && wordListSet.has(transformStr)) {
          results.push(transformStr);
        }
      }
    }

    return results;
  };

  while (queue.length > 0) {
    const [currentStr, transformCount] = queue.shift()!;
    if (currentStr === endWord) return transformCount;

    const validWords = getValidWords(currentStr);
    for (const word of validWords) {
      visited.add(word);
      queue.push([word, transformCount + 1]);
    }
  }

  return 0;
}
