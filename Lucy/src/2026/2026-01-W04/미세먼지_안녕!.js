// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

const [r, c, t] = input[0].split(" ").map(Number);
// r * c size
const a = input.slice(1).map((text) => text.split(" ").map(Number));

const AIR_CLEANER = -1;
const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function spreadDust(a) {
  const [row, col] = [a.length, a[0].length];

  const newA = Array.from({ length: row }, () => Array(col).fill(0));

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (a[i][j] !== AIR_CLEANER) {
        let spreadAmount = Math.floor(a[i][j] / 5);
        let spreadCount = 0;

        for (const [dr, dc] of DIRECTIONS) {
          const [nr, nc] = [i + dr, j + dc];

          if (nr >= 0 && nr < row && nc >= 0 && nc < col && a[nr][nc] !== AIR_CLEANER) {
            newA[nr][nc] += spreadAmount;
            spreadCount++;
          }
        }

        newA[i][j] += a[i][j] - spreadAmount * spreadCount;
      } else {
        newA[i][j] = AIR_CLEANER;
      }
    }
  }

  return newA;
}

function operateAirCleaner(a) {
  const [row, col] = [a.length, a[0].length];

  let top = 0;
  let bottom = 0;

  for (let i = 0; i < row; i++) {
    if (a[i][0] === AIR_CLEANER) {
      top = i;
      bottom = i + 1;
      break;
    }
  }

  // 위쪽 공기청정기 작동
  for (let i = top - 1; i > 0; i--) {
    a[i][0] = a[i - 1][0];
  }

  for (let i = 0; i < col - 1; i++) {
    a[0][i] = a[0][i + 1];
  }

  for (let i = 0; i < top; i++) {
    a[i][col - 1] = a[i + 1][col - 1];
  }

  for (let i = col - 1; i > 1; i--) {
    a[top][i] = a[top][i - 1];
  }

  a[top][1] = 0;

  // 아래쪽 공기 청정기
  for (let i = bottom + 1; i < row - 1; i++) {
    a[i][0] = a[i + 1][0];
  }

  for (let i = 0; i < col - 1; i++) {
    a[row - 1][i] = a[row - 1][i + 1];
  }

  for (let i = row - 1; i > bottom; i--) {
    a[i][col - 1] = a[i - 1][col - 1];
  }

  for (let i = col - 1; i > 1; i--) {
    a[bottom][i] = a[bottom][i - 1];
  }
  a[bottom][1] = 0;

  return a;
}

function getTotalDust(a) {
  const [row, col] = [a.length, a[0].length];

  let totalDust = 0;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (a[i][j] !== AIR_CLEANER) {
        totalDust += a[i][j];
      }
    }
  }

  return totalDust;
}

// t초가 지난 후, 구사과의 방에서 남아있는 미세먼지의 양을 구하라
function solution(t, a) {
  let currentTime = t;

  while (currentTime > 0) {
    a = spreadDust(a);

    operateAirCleaner(a);

    currentTime--;
  }

  const totalDust = getTotalDust(a);

  return totalDust;
}

const answer = solution(t, a);
console.log(answer);
