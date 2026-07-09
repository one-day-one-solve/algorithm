from collections import deque

class Solution:
    def findSafeWalk(self, grid: List[List[int]], health: int) -> bool:
        m, n = len(grid), len(grid[0])
        dist = [[float('inf')] * n for _ in range(m)] # (i, j)에 도달할 때까지 잃는 체력값
        dist[0][0] = grid[0][0]
        
        queue = deque([(0, 0)])
        direction = [(-1, 0), (1, 0), (0, -1), (0, 1)]        
        while queue:
            i, j = queue.popleft()
            
            # 종료 조건. 목적지에 도착했을 때 체력이 남아 있는지 여부 return
            if i == m - 1 and j == n - 1:
                return dist[i][j] < health
            
            for di, dj in direction:
                ni, nj = i + di, j + dj
                
                # 격자 범위 내에 있고, 더 적은 체력 소모로 방문할 수 있는 경로를 찾은 경우
                if 0 <= ni < m and 0 <= nj < n:
                    cost = grid[ni][nj]
                    if dist[ni][nj] > dist[i][j] + cost:
                        dist[ni][nj] = dist[i][j] + cost
                        
                        # 가중치가 0이면 앞쪽으로, 1이면 뒤쪽으로 삽입
                        if cost == 0:
                            queue.appendleft((ni, nj))
                        else:
                            queue.append((ni, nj))
                            
        return dist[m-1][n-1] < health