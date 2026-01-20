/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function isValidBST(root: TreeNode | null): boolean {
  const inOrder = (node: TreeNode | null, lowerBound: number, upperBound: number): boolean => {
    if (node) {
      if (node.val <= lowerBound || node.val >= upperBound) return false;

      return inOrder(node.left, lowerBound, node.val) && inOrder(node.right, node.val, upperBound);
    }

    return true;
  };

  return inOrder(root, -Infinity, Infinity);
}
