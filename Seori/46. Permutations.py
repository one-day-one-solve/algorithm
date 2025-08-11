class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        n = len(nums)
        visited = [0] * n
        answer = []
        def backtracking(idx, num_list):
            if idx == n:
                answer.append(num_list[:])
                return
            
            # 순열은 순서에 상관이 없으므로 i의 인덱스를 0부터 세어준다.
            for i in range(len(nums)):
                if not visited[i]:
                    visited[i] = 1
                    num_list.append(nums[i])
                    backtracking(idx+1, num_list)
                    num_list.pop()
                    visited[i] = 0
            
        backtracking(0, [])
        return answer