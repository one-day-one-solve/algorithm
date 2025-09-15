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

function kthSmallest(root: TreeNode | null, k: number): number {
  const nodes: number[] = [];
  const inOrder = (node: TreeNode | null) => {
    if (node) {
      inOrder(node.left);
      nodes.push(node.val);
      inOrder(node.right);
    }
  };

  inOrder(root);

  return nodes[k - 1];
}
