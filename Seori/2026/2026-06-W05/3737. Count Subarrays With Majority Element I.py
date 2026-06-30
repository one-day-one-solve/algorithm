class Solution:
    def countMajoritySubarrays(self, nums: List[int], target: int) -> int:
        n = len(nums)
        answer = 0
        # [1] i 인덱스를 subarray의 시작점으로 한다.
        for i in range(n):
            score = 0

            # [2] j 인덱스를 subarray의 끝점으로 하여 모든 subarray를 탐색한다.
            for j in range(i, n):
                if nums[j] == target:
                    score += 1
                else:
                    score -= 1

            # [3] score가 0보다 크면 majority element가 존재하는 subarray이다.
            if score > 0:
                answer += 1

        return answer