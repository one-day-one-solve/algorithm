// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ----- init input
const [m, s] = input[0].split(" ").map(Number);
const fishes = input.slice(1, 1 + m).map((text) => text.split(" ").map(Number)); // [x, y, dir][]

const [sharkX, sharkY] = input
  .slice(1 + m)[0]
  .split(" ")
  .map(Number);

// ----- constants
const SHARK_DIRECTIONS = [
  [-1, 0], // up
  [0, -1], // left
  [1, 0], // down
  [0, 1], // right
];
const FISH_DIRECTIONS = [
  [],
  [0, -1], // left
  [-1, -1], // left up
  [-1, 0], // up
  [-1, 1], // right up
  [0, 1], // right
  [1, 1], // right down
  [1, 0], // down
  [1, -1], // left down
];

// functions
function moveFishes(currentFishBoard, sharkPos, smellBoard) {
  const newBoard = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => []));
  const [sx, sy] = sharkPos;

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      for (const dir of currentFishBoard[i][j]) {
        let moved = false;
        let nd = dir;

        for (let k = 0; k < 8; k++) {
          const [nx, ny] = [i + FISH_DIRECTIONS[nd][0], j + FISH_DIRECTIONS[nd][1]];

          if (nx >= 0 && nx < 4 && ny >= 0 && ny < 4) {
            if (nx !== sx || ny !== sy) {
              if (smellBoard[nx][ny] === 0) {
                newBoard[nx][ny].push(nd);
                moved = true;
                break;
              }
            }
          }

          nd = nd - 1;
          if (nd === 0) nd = 8;
        }

        if (!moved) {
          newBoard[i][j].push(dir);
        }
      }
    }
  }

  return newBoard;
}

function moveShark(fishBoard, startSharkPos) {
  let maxFish = -1;
  let bestPath = [];

  const findBestPath = (x, y, depth, currentFishCount, path, visited) => {
    if (depth === 3) {
      if (currentFishCount > maxFish) {
        maxFish = currentFishCount;
        bestPath = [...path];
      }

      return;
    }

    for (let d = 0; d < 4; d++) {
      const [nx, ny] = [x + SHARK_DIRECTIONS[d][0], y + SHARK_DIRECTIONS[d][1]];

      if (nx >= 0 && nx < 4 && ny >= 0 && ny < 4) {
        const posKey = `${nx},${ny}`;
        const isVisited = visited.has(posKey);

        let fishEat = 0;
        if (!isVisited) {
          fishEat = fishBoard[nx][ny].length;
          visited.add(posKey);
        }

        findBestPath(nx, ny, depth + 1, currentFishCount + fishEat, [...path, d], visited);

        if (!isVisited) {
          visited.delete(posKey);
        }
      }
    }
  };

  findBestPath(startSharkPos[0], startSharkPos[1], 0, 0, [], new Set());

  return bestPath;
}

// ----- solution
function solution(m, s, fishes, sharkX, sharkY) {
  let fishBoard = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => []));
  let smellBoard = Array.from({ length: 4 }, () => Array(4).fill(0));
  let [sr, sc] = [sharkX - 1, sharkY - 1];

  for (const [r, c, d] of fishes) {
    fishBoard[r - 1][c - 1].push(d);
  }

  for (let turn = 0; turn < s; turn++) {
    const copyFishes = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        for (const d of fishBoard[r][c]) {
          copyFishes.push([r, c, d]);
        }
      }
    }
    fishBoard = moveFishes(fishBoard, [sr, sc], smellBoard);

    const bestPath = moveShark(fishBoard, [sr, sc]);

    for (const d of bestPath) {
      sr += SHARK_DIRECTIONS[d][0];
      sc += SHARK_DIRECTIONS[d][1];

      if (fishBoard[sr][sc].length > 0) {
        fishBoard[sr][sc] = [];
        smellBoard[sr][sc] = 3;
      }
    }

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (smellBoard[r][c] > 0) {
          smellBoard[r][c]--;
        }
      }
    }

    for (const [r, c, d] of copyFishes) {
      fishBoard[r][c].push(d);
    }
  }

  let countFish = 0;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      countFish += fishBoard[r][c].length;
    }
  }

  return countFish;
}

const answer = solution(m, s, fishes, sharkX, sharkY);
console.log(answer);
