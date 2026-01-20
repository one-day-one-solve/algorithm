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

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function zigzagLevelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];

  const result: number[][] = [];
  let queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const currentLevel = queue.length;
    const currentNodes: number[] = [];
    const newQueue: TreeNode[] = [];

    for (let i = 0; i < currentLevel; i++) {
      const node = queue.shift();

      if (!node) continue;

      currentNodes.push(node.val);

      if (node.left) newQueue.push(node.left);
      if (node.right) newQueue.push(node.right);
    }

    queue = [...newQueue];
    result.push(result.length % 2 === 0 ? currentNodes : currentNodes.reverse());
  }

  return result;
}
