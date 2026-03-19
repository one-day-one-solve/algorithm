// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ----- init input
const [n, l, r] = input[0].split(" ").map(Number);
const a = input.slice(1).map((text) => text.split(" ").map(Number));

// ----- solution
function solution(n, l, r, a) {
  const bfs = (i, j, visited) => {
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    const queue = [[i, j]];
    let pointer = 0;
    let totalPopulation = 0;

    while (pointer < queue.length) {
      const [cr, cc] = queue[pointer++];

      totalPopulation += a[cr][cc];

      for (const [dr, dc] of directions) {
        const [nr, nc] = [cr + dr, cc + dc];

        if (
          nr >= 0 &&
          nr < n &&
          nc >= 0 &&
          nc < n &&
          !visited[nr][nc] &&
          l <= Math.abs(a[cr][cc] - a[nr][nc]) &&
          Math.abs(a[cr][cc] - a[nr][nc]) <= r
        ) {
          queue.push([nr, nc]);
          visited[nr][nc] = true;
        }
      }
    }

    // 인구 재분배
    const calculatedPopulation = Math.floor(totalPopulation / queue.length);
    for (const [i, j] of queue) {
      a[i][j] = calculatedPopulation;
    }

    return queue.length >= 2;
  };

  let day = 0;

  while (day < 2000) {
    const visited = Array.from({ length: n }, () => new Array(n).fill(false));

    let isMove = false;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (!visited[i][j]) {
          visited[i][j] = true;
          isMove = bfs(i, j, visited) || isMove;
        }
      }
    }

    if (!isMove) break;

    day++;
  }

  return day;
}

// ----- answer
const answer = solution(n, l, r, a);
console.log(answer);
