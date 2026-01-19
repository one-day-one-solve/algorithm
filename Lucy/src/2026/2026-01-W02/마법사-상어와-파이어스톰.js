// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// input
const [n, q] = input[0].split(" ").map(Number);
let a = input.slice(1, 2 ** n + 1).map((text) => text.split(" ").map(Number));
const l = input
  .slice(2 ** n + 1)[0]
  .split(" ")
  .map(Number);

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function rotate(l, a, size) {
  const subSize = 2 ** l;

  // [0, 0] 일 때, [i, j] -> [j, subSize - 1 - i]
  // [0, 0] -> [0, 1]
  // [0, 1] -> [1, 1]
  // [1, 0] -> [0, 0]
  // [1, 1] -> [1, 0]
  const newA = Array.from({ length: size }, () => Array(size).fill(0));
  for (let r = 0; r < size; r += subSize) {
    for (let c = 0; c < size; c += subSize) {
      for (let i = 0; i < subSize; i++) {
        for (let j = 0; j < subSize; j++) {
          newA[r + j][c + (subSize - 1 - i)] = a[r + i][c + j];
        }
      }
    }
  }
  a = newA;

  return a;
}

function getMelting(size, a) {
  const melting = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (a[r][c] === 0) continue;

      let iceCount = 0;
      for (const [dr, dc] of directions) {
        const [nr, nc] = [r + dr, c + dc];

        if (nr >= 0 && nr < size && nc >= 0 && nc < size && a[nr][nc] > 0) {
          iceCount++;
        }
      }

      if (iceCount < 3) {
        melting.push([r, c]);
      }
    }
  }

  return melting;
}

function bfs(startR, startC, a, size, visited) {
  const queue = [[startR, startC]];
  visited[startR][startC] = true;

  let pointer = 0;

  let count = 1;

  while (pointer < queue.length) {
    const [cr, cc] = queue[pointer++];

    for (const [dr, dc] of directions) {
      const [nr, nc] = [cr + dr, cc + dc];

      if (nr >= 0 && nr < size && nc >= 0 && nc < size && !visited[nr][nc] && a[nr][nc] > 0) {
        visited[nr][nc] = true;
        queue.push([nr, nc]);
        count++;
      }
    }
  }

  return count;
}

function solution(n, q, a, l) {
  const size = 2 ** n;

  // 회전
  for (const currentL of l) {
    a = rotate(currentL, a, size);

    // 얼음 녹이기
    const melting = getMelting(size, a);

    for (const [r, c] of melting) {
      if (a[r][c] > 0) a[r][c]--;
    }
  }

  // 총 얼음의 양 + 얼음 덩어리 구하기
  let totalIce = 0;
  let maxChunk = 0;
  const visited = Array.from({ length: size }, () => new Array(size).fill(false));

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      totalIce += a[r][c];

      if (a[r][c] > 0 && !visited[r][c]) {
        const currentChunkSize = bfs(r, c, a, size, visited);
        maxChunk = Math.max(maxChunk, currentChunkSize);
      }
    }
  }

  return [totalIce, maxChunk].join("\n");
}

// output
const answer = solution(n, q, a, l);
console.log(answer);
