// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// --- Constants  ---
const INITIAL_NUTRIENT = 5;
const REPRODUCTION_AGE = 5;
const DEAD_NUTRIENT_DIVISOR = 2;
const NEWBORN_TREE_AGE = 1;
const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

// --- Functions ---
const isValidRange = (r, c, n) => r >= 0 && r < n && c >= 0 && c < n;

function processSpringAndSummer(n, land, treeBoard) {
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (treeBoard[r][c].length === 0) continue;

      const aliveTrees = [];
      let deadEnergy = 0;

      // 봄: 나이가 어린 나무부터 양분 섭취
      for (const age of treeBoard[r][c]) {
        if (land[r][c] >= age) {
          land[r][c] -= age;
          aliveTrees.push(age + 1);
        } else {
          // 여름: 죽은 나무가 양분으로 변함
          deadEnergy += Math.floor(age / DEAD_NUTRIENT_DIVISOR);
        }
      }

      treeBoard[r][c] = aliveTrees;
      land[r][c] += deadEnergy;
    }
  }
}

function processAutumn(n, treeBoard) {
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      for (const age of treeBoard[r][c]) {
        if (age % REPRODUCTION_AGE === 0) {
          for (const [dr, dc] of DIRECTIONS) {
            const nr = r + dr;
            const nc = c + dc;

            if (isValidRange(nr, nc, n)) {
              treeBoard[nr][nc].unshift(NEWBORN_TREE_AGE);
            }
          }
        }
      }
    }
  }
}

function processWinter(n, land, extraNutrients) {
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      land[r][c] += extraNutrients[r][c];
    }
  }
}

function countTotalTrees(treeBoard) {
  return treeBoard.reduce((total, row) => total + row.reduce((rowTotal, trees) => rowTotal + trees.length, 0), 0);
}

// --- Main Solution ---
function solution(n, m, k, extraNutrients, initialTrees) {
  const land = Array.from({ length: n }, () => Array(n).fill(INITIAL_NUTRIENT));
  const treeBoard = Array.from({ length: n }, () => Array.from({ length: n }, () => []));

  // 초기 나무 배치 및 정렬
  initialTrees.forEach(([x, y, age]) => {
    treeBoard[x - 1][y - 1].push(age);
  });

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      treeBoard[r][c].sort((a, b) => a - b);
    }
  }

  // K년 동안 시뮬레이션 수행
  for (let year = 0; year < k; year++) {
    processSpringAndSummer(n, land, treeBoard);
    processAutumn(n, treeBoard);
    processWinter(n, land, extraNutrients);
  }

  return countTotalTrees(treeBoard);
}

// 실행
const [N, M, K] = input[0].split(" ").map(Number);
const extraNutrients = input.slice(1, 1 + N).map((line) => line.split(" ").map(Number));
const initialTrees = input.slice(1 + N).map((line) => line.split(" ").map(Number));

const answer = solution(N, M, K, extraNutrients, initialTrees);
console.log(answer);
