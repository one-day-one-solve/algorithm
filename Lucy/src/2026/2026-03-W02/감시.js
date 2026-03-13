// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ----- init input
const [n, m] = input[0].split(" ").map(Number);
const office = input.slice(1).map((text) => text.split(" ").map(Number));

// ----- constants
const CELL_TYPE = {
  EMPTY: 0,
  WALL: 6,
  WATCH: -1,
};

const DIR = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1],
};

const CCTV_DIRECTIONS = {
  1: [[DIR.R], [DIR.D], [DIR.L], [DIR.U]],
  2: [
    [DIR.L, DIR.R],
    [DIR.U, DIR.D],
    [DIR.L, DIR.R],
    [DIR.U, DIR.D],
  ],
  3: [
    [DIR.U, DIR.R],
    [DIR.R, DIR.D],
    [DIR.D, DIR.L],
    [DIR.L, DIR.U],
  ],
  4: [
    [DIR.U, DIR.L, DIR.R],
    [DIR.U, DIR.R, DIR.D],
    [DIR.D, DIR.L, DIR.R],
    [DIR.U, DIR.D, DIR.L],
  ],
  5: [
    [DIR.U, DIR.D, DIR.L, DIR.R],
    [DIR.U, DIR.D, DIR.L, DIR.R],
    [DIR.U, DIR.D, DIR.L, DIR.R],
    [DIR.U, DIR.D, DIR.L, DIR.R],
  ],
};

// ----- solution
function mark(board, row, col, dir) {
  let r = row + dir[0];
  let c = col + dir[1];

  while (r >= 0 && r < n && c >= 0 && c < m) {
    if (board[r][c] === CELL_TYPE.WALL) break;

    if (board[r][c] === CELL_TYPE.EMPTY) {
      board[r][c] = CELL_TYPE.WATCH;
    }

    r += dir[0];
    c += dir[1];
  }
}

function solution(n, m, office) {
  let minBlindSpot = Infinity;

  const cctvs = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (office[i][j] !== CELL_TYPE.EMPTY && office[i][j] !== CELL_TYPE.WALL) {
        cctvs.push({ type: office[i][j], row: i, col: j });
      }
    }
  }

  function backtrack(index, currentDirections) {
    if (index === cctvs.length) {
      const copiedOffice = office.map((row) => [...row]);

      // 이 부분 아직 이해안감
      for (let i = 0; i < cctvs.length; i++) {
        const cctv = cctvs[i];
        const dirs = currentDirections[i];

        for (const dir of dirs) {
          mark(copiedOffice, cctv.row, cctv.col, dir);
        }
      }

      let countBlindSpot = 0;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          if (copiedOffice[i][j] === CELL_TYPE.EMPTY) {
            countBlindSpot++;
          }
        }
      }

      minBlindSpot = Math.min(minBlindSpot, countBlindSpot);
      return;
    }

    const cctv = cctvs[index];
    const directions = CCTV_DIRECTIONS[cctv.type];

    for (let i = 0; i < directions.length; i++) {
      currentDirections.push(directions[i]);
      backtrack(index + 1, currentDirections);
      currentDirections.pop();
    }
  }

  backtrack(0, []);

  return minBlindSpot;
}

// ----- answer
const answer = solution(n, m, office);
console.log(answer);
