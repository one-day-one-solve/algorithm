class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        # 예외 케이스 처리
        if sum(nums) < target:
            return 0
        
        answer = len(nums)
        s, e = 0, 0
        window_sum = 0
        while e <= len(nums):
            # target값 비교하여 최소값 기록할 수 있도록 함
            if window_sum >= target:
                answer = min(answer, e - s)
                window_sum -= nums[s]
                s += 1
                continue

            # while문 종료 조건. 마지막에 index 에러가 발생해서 추가함. 더 깔끔한 방법 없을까 ㅠ
            if e == len(nums):
                break

            # sliding window의 end 늘려줌
            window_sum += nums[e]
            e += 1
        return answer