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

/**
 Do not return anything, modify root in-place instead.
 */
function flatten(root: TreeNode | null): void {
  const preOrder = (node: TreeNode | null) => {
    if (!node) return;

    if (node.left) {
      let rightmost = node.left;

      while (rightmost.right) {
        rightmost = rightmost.right;
      }

      rightmost.right = node.right;
      node.right = node.left;
      node.left = null;
    }

    preOrder(node.right);
  };

  preOrder(root);
}
