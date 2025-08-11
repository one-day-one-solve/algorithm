class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        answer = []
        num_list = []
        def backtracking(sum, start):
            if sum >= target:
                if sum == target:
                    answer.append(num_list[:])
                return
            
            # 조합이므로 start 인덱스에 신경써준다. 그리고 중복해서 숫자를 사용할 수 있으므로 visited 처리는 하지 않는다.
            for i in range(start, len(candidates)):
                num_list.append(candidates[i])
                backtracking(sum + candidates[i], i)
                num_list.pop()

        backtracking(0, 0)
        return answer