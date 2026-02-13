// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// init input
const n = Number(input[0]);
const dragonCurve = input.slice(1, 1 + n).map((text) => text.split(" ").map(Number)); // [x, y, d, g][]

// constants
const DIRECTIONS = [
  [0, 1], // right
  [-1, 0], // up
  [0, -1], // left
  [1, 0], // down
];

// solution
function solution(n, dragonCurve) {
  const visited = Array.from({ length: 101 }, () => Array(101).fill(false));

  for (const [sx, sy, d, g] of dragonCurve) {
    const directions = [d];
    for (let i = 0; i < g; i++) {
      // 지금까지 적힌 걸 거꾸로 읽으면서, 시계방향으로 돌리기!
      for (let j = directions.length - 1; j >= 0; j--) {
        directions.push((directions[j] + 1) % 4);
      }
    }

    let x = sx;
    let y = sy;
    visited[y][x] = true;

    for (const dir of directions) {
      const [dy, dx] = DIRECTIONS[dir];
      const [nx, ny] = [dx + x, dy + y];

      if (nx >= 0 && nx < 101 && ny >= 0 && ny < 101) {
        visited[ny][nx] = true;

        x = nx;
        y = ny;
      }
    }
  }

  let count = 0;
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      if (visited[i][j] && visited[i + 1][j] && visited[i][j + 1] && visited[i + 1][j + 1]) {
        count++;
      }
    }
  }

  return count;
}

const answer = solution(n, dragonCurve);
console.log(answer);
