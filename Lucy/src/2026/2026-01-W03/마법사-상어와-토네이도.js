// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// n 은 홀수
const n = Number(input[0]);
const a = input.slice(1).map((text) => text.split(" ").map(Number));

// 좌 하 우 상 순으로 이동
const direction = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

// 0: 왼쪽, 1: 아래, 2: 오른쪽, 3: 위
const spreadInfo = [
  // 0: 왼쪽 (Left)
  [
    [-1, 1, 0.01],
    [1, 1, 0.01], // 1%
    [-1, 0, 0.07],
    [1, 0, 0.07], // 7%
    [-2, 0, 0.02],
    [2, 0, 0.02], // 2%
    [-1, -1, 0.1],
    [1, -1, 0.1], // 10%
    [0, -2, 0.05], // 5%
  ],
  // 1: 아래 (Down)
  [
    [-1, -1, 0.01],
    [-1, 1, 0.01], // 1%
    [0, -1, 0.07],
    [0, 1, 0.07], // 7%
    [0, -2, 0.02],
    [0, 2, 0.02], // 2%
    [1, -1, 0.1],
    [1, 1, 0.1], // 10%
    [2, 0, 0.05], // 5%
  ],
  // 2: 오른쪽 (Right)
  [
    [-1, -1, 0.01],
    [1, -1, 0.01], // 1%
    [-1, 0, 0.07],
    [1, 0, 0.07], // 7%
    [-2, 0, 0.02],
    [2, 0, 0.02], // 2%
    [-1, 1, 0.1],
    [1, 1, 0.1], // 10%
    [0, 2, 0.05], // 5%
  ],
  // 3: 위 (Up)
  [
    [1, -1, 0.01],
    [1, 1, 0.01], // 1%
    [0, -1, 0.07],
    [0, 1, 0.07], // 7%
    [0, -2, 0.02],
    [0, 2, 0.02], // 2%
    [-1, -1, 0.1],
    [-1, 1, 0.1], // 10%
    [-2, 0, 0.05], // 5%
  ],
];

function spreadSand(a, r, c, dirIdx) {
  // 이동 시켜야할 총 모래 양
  const totalSand = a[r][c];

  // 현재 위치 모래 사라짐
  a[r][c] = 0;

  let movedTotal = 0;
  let outSand = 0;
  const spreads = spreadInfo[dirIdx];

  spreads.forEach(([dr, dc, percent]) => {
    const nr = r + dr;
    const nc = c + dc;
    const movedSand = Math.floor(totalSand * percent);
    movedTotal += movedSand;
    if (nr < 0 || nr >= n || nc < 0 || nc >= n) {
      outSand += movedSand;
    } else {
      a[nr][nc] += movedSand;
    }
  });

  const alphaSand = totalSand - movedTotal;
  const alphaSandR = r + direction[dirIdx][0];
  const alphaSandC = c + direction[dirIdx][1];

  if (alphaSandR < 0 || alphaSandR >= n || alphaSandC < 0 || alphaSandC >= n) {
    outSand += alphaSand;
  } else {
    a[alphaSandR][alphaSandC] += alphaSand;
  }

  return outSand;
}

function solution(n, a) {
  let outSandTotal = 0;

  let [r, c] = [Math.floor(n / 2), Math.floor(n / 2)];
  let dirIdx = 0; // 0: left, 1: down, 2: right, 3: up

  // 토네이도 이동 패턴
  for (let len = 1; len < n; len++) {
    for (let dir = 0; dir < 2; dir++) {
      const [dr, dc] = direction[dirIdx];

      // 실제 이동
      for (let move = 0; move < len; move++) {
        r += dr;
        c += dc;

        outSandTotal += spreadSand(a, r, c, dirIdx);
      }

      dirIdx = (dirIdx + 1) % 4;
    }
  }

  // 마지막 남은 row 이동
  for (let move = 1; move < n; move++) {
    const [dr, dc] = direction[dirIdx];

    r += dr;
    c += dc;

    outSandTotal += spreadSand(a, r, c, dirIdx);
  }

  return outSandTotal;
}

const answer = solution(n, a);
console.log(answer);
