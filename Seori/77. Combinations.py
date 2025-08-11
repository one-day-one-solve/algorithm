class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        arr = [i for i in range(1, n+1)] # [1, 2, 3, 4]
        num_list = []
        visited = [0] * len(arr)
        answer = []
        def backtracking(idx, start):
            if idx == k:
                answer.append(num_list[:]) # list는 복사해서 넣어주지 않으면, 기존 주소값을 복사하기 때문에 답이 달라진다.
                return
            
            # 순열과 다르게 조합은 순서에 상관이 있으므로 start부터 인덱스를 세어준다.
            for i in range(start, n):
                if not visited[i]:
                    visited[i] = 1
                    num_list.append(arr[i])
                    backtracking(idx+1, i)
                    num_list.pop()
                    visited[i] = 0

        backtracking(0, 0)
        return answer