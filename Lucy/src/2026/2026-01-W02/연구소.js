// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

const LAB_TYPE = {
  EMPTY: 0,
  WALL: 1,
  VIRUS: 2,
};

const [N, M] = input[0].split(" ").map(Number);
const lab = [];

input.slice(1).forEach((text) => {
  lab.push(text.split(" ").map(Number));
});

function solution(n, m, lab) {
  const getEmptySpaces = () => {
    const results = [];

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < m; c++) {
        if (lab[r][c] === LAB_TYPE.EMPTY) {
          results.push([r, c]);
        }
      }
    }

    return results;
  };

  const getWallCombinations = (emptySpaces) => {
    const results = [];

    const backtrack = (start, currentWalls) => {
      if (currentWalls.length === 3) {
        results.push([...currentWalls]);
        return;
      }

      for (let i = start; i < emptySpaces.length; i++) {
        currentWalls.push(emptySpaces[i]);
        backtrack(i + 1, currentWalls);
        currentWalls.pop();
      }
    };

    backtrack(0, []);

    return results;
  };

  // 1. 연구소의 빈 칸 위치 파악
  const emptySpaces = getEmptySpaces();

  // 2. 연구소의 빈 칸 위치를 가지고 backtracking 알고리즘을 사용하여 벽을 세울 3개의 위치 찾기
  const wallCombinations = getWallCombinations(emptySpaces);

  // 3. 바이러스 전파 시뮬레이션
  let maxSafeArea = -Infinity;
  wallCombinations.forEach((walls) => {
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    // 3-1. 연구소 복사
    const copiedLab = lab.map((row) => [...row]);

    // 3-2. 벽 세우기
    walls.forEach(([r, c]) => {
      copiedLab[r][c] = LAB_TYPE.WALL;
    });

    // 3-3. 바이러스 퍼트리기
    const queue = [];
    let pointer = 0;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < m; c++) {
        if (copiedLab[r][c] === LAB_TYPE.VIRUS) {
          queue.push([r, c]);
        }
      }
    }

    while (pointer < queue.length) {
      const [cr, cc] = queue[pointer++];

      for (const [dr, dc] of directions) {
        const [nr, nc] = [cr + dr, cc + dc];

        if (nr >= 0 && nr < n && nc >= 0 && nc < m && copiedLab[nr][nc] === LAB_TYPE.EMPTY) {
          queue.push([nr, nc]);
          copiedLab[nr][nc] = LAB_TYPE.VIRUS;
        }
      }
    }

    // 3-4. 안전한 영역 세기
    let currentSafeArea = 0;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < m; c++) {
        if (copiedLab[r][c] === LAB_TYPE.EMPTY) {
          currentSafeArea++;
        }
      }
    }
    maxSafeArea = Math.max(maxSafeArea, currentSafeArea);
  });

  return maxSafeArea;
}

const answer = solution(N, M, lab);
console.log(answer);
