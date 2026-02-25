// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// init input
const [n, m] = input[0].split(" ").map(Number);
const board = input.slice(1).map((text) => text.split(" ").map(Number));

// solution function
function solution(n, m, board) {
  let maxSum = -Infinity;

  const visited = Array.from({ length: n }, () => Array(m).fill(false));
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const dfs = (r, c, depth, currentSum) => {
    if (depth === 4) {
      maxSum = Math.max(maxSum, currentSum);
      return;
    }

    for (const [dr, dc] of directions) {
      const [nr, nc] = [r + dr, c + dc];

      if (nr >= 0 && nr < n && nc >= 0 && nc < m && !visited[nr][nc]) {
        visited[nr][nc] = true;
        dfs(nr, nc, depth + 1, currentSum + board[nr][nc]);
        visited[nr][nc] = false;
      }
    }
  };
  const checkSpecial = (r, c) => {
    let count = 0;
    let sum = board[r][c];
    let minVal = Infinity;

    for (const [dr, dc] of directions) {
      const [nr, nc] = [r + dr, c + dc];

      if (nr >= 0 && nr < n && nc >= 0 && nc < m) {
        count++;

        const val = board[nr][nc];
        sum += val;
        minVal = Math.min(minVal, val);
      }
    }

    if (count === 4) {
      maxSum = Math.max(maxSum, sum - minVal);
    } else if (count === 3) {
      maxSum = Math.max(maxSum, sum);
    }
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      visited[i][j] = true;
      dfs(i, j, 1, board[i][j]);
      visited[i][j] = false;

      checkSpecial(i, j);
    }
  }

  return maxSum;
}

// console answer
const answer = solution(n, m, board);
console.log(answer);
