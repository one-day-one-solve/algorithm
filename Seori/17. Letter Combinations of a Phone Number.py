class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        letters = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
        answer = []
        def backtracking(index, arr, string):
            if index == len(arr):
                answer.append(string)
                return

            for letter in letters[arr[index]]:
                backtracking(index+1, arr, string+letter)
            
        if digits == '': return []
        arr = [int(num) for num in digits]
        n = len(arr)
        backtracking(0, arr, '')
        return answer
