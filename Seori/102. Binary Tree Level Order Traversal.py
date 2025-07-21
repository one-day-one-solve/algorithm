# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        # 예외 케이스 처리
        if not root:
            return []

        # BFS 탐색 시작
        answer = [[]]
        queue = [(0, root)]
        n = 0
        while queue:
            level, next_tree = queue.pop(0)

            # 깊이가 늘어날 때마다 answer 리스트에 빈 리스트 추가
            if level > n:
                answer.append([])
            
            # 각 깊이별 리스트에 노드의 값 추가
            answer[level].append(next_tree.val)
            n = level

            if next_tree.left:
                queue.append((level + 1, next_tree.left))
            if next_tree.right:
                queue.append((level + 1, next_tree.right))
        
        return answer