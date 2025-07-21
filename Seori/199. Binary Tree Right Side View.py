# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        # 예외 케이스 처리
        if not root: return []

        # 왼쪽부터 BFS 탐색하면서 각 level의 가장 오른쪽 노드만 남김
        answer = [0] * 100
        queue = [(0, root)]
        n = 0
        while queue:
            level, next_tree = queue.pop(0)
            if next_tree.left:
                queue.append((level + 1, next_tree.left))
            if next_tree.right:
                queue.append((level + 1, next_tree.right))
            
            answer[level] = next_tree.val
            n = level
        
        return answer[:n+1]