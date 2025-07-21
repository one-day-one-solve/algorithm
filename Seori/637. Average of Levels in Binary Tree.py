# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def averageOfLevels(self, root: Optional[TreeNode]) -> List[float]:
        # BFS 탐색 시작
        answer = [[0, 0]]
        queue = [(0, root)]
        n = 0
        while queue:
            level, next_tree = queue.pop(0)

            # 깊이가 늘어날 때마다 answer 리스트에 count와 sum을 담는 리스트 추가
            if level > n:
                answer.append([0, 0]) # count, sum
            
            # 각 깊이의 count와 sum을 갱신
            answer[level][0] += 1
            answer[level][1] += next_tree.val
            n = level

            if next_tree.left:
                queue.append((level + 1, next_tree.left))
            if next_tree.right:
                queue.append((level + 1, next_tree.right))
                    
        # 각 깊이의 평균을 계산
        for i in range(len(answer)):
            count, sum = answer[i]
            answer[i] = sum/count

        return answer