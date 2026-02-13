// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// init input
const [n, m, t] = input[0].split(" ").map(Number);
const circleNumbers = input.slice(1, 1 + n).map((text) => text.split(" ").map(Number));
const rotations = input.slice(1 + n).map((text) => text.split(" ").map(Number));

// constants

// solution
function solution(n, m, t, circleNumbers, rotations) {
  for (const [x, d, k] of rotations) {
    for (let i = x - 1; i < n; i += x) {
      const row = circleNumbers[i];

      for (let count = 0; count < k; count++) {
        if (d === 0) {
          row.unshift(row.pop());
        } else if (d === 1) {
          row.push(row.shift());
        }
      }
    }

    let isRemoved = false;
    const toRemove = [];

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (circleNumbers[i][j] === 0) continue;

        const current = circleNumbers[i][j];

        // 가로 (원형) 확인
        const nextCircle = (j + 1) % m;
        if (circleNumbers[i][nextCircle] === current) {
          toRemove.push([i, j]);
          toRemove.push([i, nextCircle]);
        }

        // 세로 (아래쪽) 확인
        if (i + 1 < n && circleNumbers[i + 1][j] === current) {
          toRemove.push([i, j]);
          toRemove.push([i + 1, j]);
        }
      }
    }

    if (toRemove.length > 0) {
      isRemoved = true;
      for (const [r, c] of toRemove) {
        circleNumbers[r][c] = 0;
      }
    }

    if (!isRemoved) {
      let sum = 0;
      let count = 0;

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          if (circleNumbers[i][j] !== 0) {
            sum += circleNumbers[i][j];
            count++;
          }
        }
      }

      if (count > 0) {
        const avg = sum / count;

        for (let i = 0; i < n; i++) {
          for (let j = 0; j < m; j++) {
            if (circleNumbers[i][j] !== 0) {
              if (circleNumbers[i][j] > avg) circleNumbers[i][j]--;
              else if (circleNumbers[i][j] < avg) circleNumbers[i][j]++;
            }
          }
        }
      }
    }
  }

  let totalSum = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      totalSum += circleNumbers[i][j];
    }
  }
  return totalSum;
}

// answer
const answer = solution(n, m, t, circleNumbers, rotations);
console.log(answer);
