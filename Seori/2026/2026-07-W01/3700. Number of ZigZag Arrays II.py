class Solution:
    def zigZagArrays(self, n: int, l: int, r: int) -> int:
        MOD = 10 ** 9 + 7
        M = r - l + 1
        
        # 1. 두 행렬의 곱셈 함수 정의
        def multiply(A, B):
            C = [[0] * M for _ in range(M)]
            for i in range(M):
                for k in range(M):
                    if A[i][k] == 0: continue
                    for j in range(M):
                        C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD

            return C

        # 2. 행렬 거듭제곱 함수 정의
        def power(matrix, p):
            # 단위 행렬(Identity Matrix)로 초기화
            res = [[0] * M for _ in range(M)]
            for i in range(M):
                res[i][i] = 1
                
            base = matrix
            while p > 0:
                if p % 2 == 1:
                    res = multiply(res, base)
                base = multiply(base, base)
                p //= 2
            return res

        # 3. 전이 행렬 T 설계
        # T[i][j]: 이전 값이 j일 때 다음 값으로 i가 올 수 있는가?
        T = [[0] * M for _ in range(M)]
        for j in range(M):
            # 대칭 관계 및 조건식에 맞는 인덱스 매핑 규칙 적용
            for i in range(M - j, M):
                T[i][j] = 1
                
        # 4. T^(n-1) 계산
        final_matrix = power(T, n - 1)
        
        # 5. 모든 가능한 시작점과 끝점 조합의 수 합산
        total_ways = 0
        for i in range(M):
            for j in range(M):
                total_ways = (total_ways + final_matrix[i][j]) % MOD
                
        # Up-Down 패턴과 Down-Up 패턴 두 가지의 대칭 가짓수가 존재하므로 곱하기 2
        return (total_ways * 2) % MOD