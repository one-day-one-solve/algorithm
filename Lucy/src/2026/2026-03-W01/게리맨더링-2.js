// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// --- input
const n = Number(input[0]);
let totalPopulation = 0;

const a = [new Array(n + 1).fill(0)];
for (let i = 1; i <= n; i++) {
  const row = [0, ...input[i].trim().split(" ").map(Number)];
  a.push(row);
  for (let j = 0; j <= n; j++) {
    totalPopulation += row[j];
  }
}

// --- functions
function calculateDiff(x, y, d1, d2) {
  const map = Array.from({ length: n + 1 }, () => Array.from({ length: n + 1 }).fill(0));

  for (let i = 0; i <= d1; i++) {
    map[x + i][y - i] = 5;
    map[x + d2 + i][y + d2 - i] = 5;
  }
  for (let i = 0; i <= d2; i++) {
    map[x + i][y + i] = 5;
    map[x + d1 + i][y - d1 + i] = 5;
  }

  const pop = new Array(6).fill(0); // 1-indexed 사용을 위해
  // 1번 선거구
  for (let r = 1; r < x + d1; r++) {
    for (let c = 1; c <= y; c++) {
      if (map[r][c] === 5) break;
      pop[1] += a[r][c];
    }
  }

  // 2번 선거구
  for (let r = 1; r <= x + d2; r++) {
    for (let c = n; c > y; c--) {
      if (map[r][c] === 5) break;
      pop[2] += a[r][c];
    }
  }

  // 3번 선거구
  for (let r = x + d1; r <= n; r++) {
    for (let c = 1; c < y - d1 + d2; c++) {
      if (map[r][c] === 5) break;
      pop[3] += a[r][c];
    }
  }

  // 4번 선거구
  for (let r = x + d2 + 1; r <= n; r++) {
    for (let c = n; c >= y - d1 + d2; c--) {
      if (map[r][c] === 5) break;
      pop[4] += a[r][c];
    }
  }

  pop[5] = totalPopulation - pop.slice(1, 5).reduce((prev, curr) => prev + curr, 0);

  const validPop = pop.slice(1);

  return Math.abs(Math.max(...validPop) - Math.min(...validPop));
}

// --- solution
function solution(n, a) {
  let min = Infinity;

  // x, y 는 다이아몬드의 맨 위 꼭짓점
  for (let x = 1; x <= n; x++) {
    for (let y = 1; y <= n; y++) {
      for (let d1 = 1; d1 <= n; d1++) {
        for (let d2 = 1; d2 <= n; d2++) {
          if (x + d1 + d2 <= n && 1 <= y - d1 && y + d2 <= n) {
            const diff = calculateDiff(x, y, d1, d2);
            min = Math.min(min, diff);
          }
        }
      }
    }
  }

  return min;
}

// --- answer
const answer = solution(n, a);
console.log(answer);
