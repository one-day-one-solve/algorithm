from collections import deque
from typing import List

class Solution:
    def snakesAndLadders(self, board: List[List[int]]) -> int:
        n = len(board)
        def get_pos(s):
            quot, rem = divmod(s, n)
            row = n - 1 - quot
            col = rem if quot % 2 == 0 else n - 1 - rem
            return row, col

        visited = [False] * (n * n + 1)
        queue = deque()
        queue.append((1, 0))  # (칸 번호, 이동 횟수)
        visited[1] = True

        while queue:
            s, moves = queue.popleft()
            if s == n * n:
                return moves
            for i in range(1, 7):
                next_s = s + i
                if next_s > n * n:
                    continue
                r, c = get_pos(next_s - 1)
                if board[r][c] != -1:
                    next_s = board[r][c]
                if not visited[next_s]:
                    visited[next_s] = True
                    queue.append((next_s, moves + 1))
        return -1