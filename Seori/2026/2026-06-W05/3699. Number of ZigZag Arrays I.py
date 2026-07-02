class Solution:
    def zigZagArrays(self, n: int, l: int, r: int) -> int:
        MOD =  10 ** 9 + 7
        M = r - l

        # [1] dp 배열 정의. 
        # dp[v] = 현재 자리수에 값 v를 택할 때 만들 수 있는 M자 지그재그의 수
        # 계산의 편의를 위해 [l, r] -> [0, M(=r - l)]로 변환
        dp = [1] * (M + 1)
        
        # [2] 누적합을 통한 경우의 수 dp 배열 완성
        for i in range(1, n):
            next_dp = [0] * (M + 1)
            
            # M자 지그재그 -> 홀수 인덱스에서는 앞보다 큰 수
            if i % 2 == 1:
                # 앞에서부터 누적합 더하기
                running_sum = 0
                for v in range(M + 1):
                    next_dp[v] = running_sum
                    running_sum = (running_sum + dp[v]) % MOD

            # 짝수 인덱스에서는 앞보다 작은 수
            else:
                # 뒤에서부터 누적합 더하기
                running_sum = 0
                for v in range(M, -1, -1):
                    next_dp[v] = running_sum
                    running_sum = (running_sum + dp[v]) % MOD
                    
            dp = next_dp
            
        # [3] 모든 가능한 가짓수를 더하고, M자 W자 지그재그는 대칭관계이므로 *2하여 정답
        return sum(dp) * 2 % MOD