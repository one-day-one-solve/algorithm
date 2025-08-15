class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        n = len(wordList[0])
        wordList = set(wordList)
        word_set = [set() for _ in range(n)]
        for word in wordList:
            for i in range(n):
                word_set[i].add(word[i])

        visited = set(beginWord)
        queue = [(beginWord, 1)]
        while queue:
            nowWord, count = queue.pop(0)
            if nowWord == endWord:
                return count

            for i in range(n):
                for trans_letter in word_set[i]:
                    if nowWord[i] == trans_letter: continue
                    nextWord = nowWord[:i] + trans_letter + nowWord[i+1:]
                    if nextWord in wordList and nextWord not in visited:
                        queue.append((nextWord, count+1))
                        visited.add(nextWord)
            

        return 0