class Solution:
    def snakesAndLadders(self, board: List[List[int]]) -> int:
        # [1] 보드판 설정
        n = len(board)
        board.reverse()
        for i in range(n):
            if i % 2:
                board[i].reverse()
                
        goal = n ** 2
        visited = [0] * goal
        queue = [0]
        while queue:
            now = queue.pop(0)
            now_count = visited[now]
            for move in range(1, 7):
                next = now + move
                if next >= goal: continue
                next_i, next_j = next // n, next % n
                if board[next_i][next_j] != -1:
                    next = board[next_i][next_j] - 1
                if visited[next]: continue
                visited[next] = now_count + 1
                queue.append(next)

        return visited[-1] if visited[-1] else -1