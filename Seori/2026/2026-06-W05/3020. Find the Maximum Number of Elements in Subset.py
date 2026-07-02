from collections import Counter
class Solution:
    def maximumLength(self, nums: List[int]) -> int:
        counter = Counter(nums)
        max_len = 1
        
        # [1] 숫자 1의 개수 확인
        if 1 in counter:
            count_1 = counter[1]
            
            # [1-1] 1은 홀수 개일 때 대칭을 이룬다
            if count_1 % 2 == 0:
                max_len = max(max_len, count_1 - 1)
            else:
                max_len = max(max_len, count_1)
                
        # [2] 2 이상의 숫자들에 대해 제곱 탐색
        for x in counter:
            # [2-1] 숫자 개수가 1개면 대칭을 이룰 수 없음
            if x == 1:
                continue
                
            # [2-2] 숫자 개수가 2개 이상이면 제곱하며 탐색함
            current_len = 0
            curr = x
            while counter[curr] >= 2:
                current_len += 2
                curr = curr * curr
                
            # [2-3] 가장 큰 제곱수가 1개 있으면 길이에 1을 더한다.
            if counter[curr] == 1:
                current_len += 1
            # [2-4] 가장 큰 제곱수가 없다면 그 직전의 curr가 가장 큰 제곱수가 된다.
            else:
                current_len -= 1
                
            max_len = max(max_len, current_len)
            
        return max_len