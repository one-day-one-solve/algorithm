// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ----- class
class Shark {
  // r: 행, c: 열, s: 속력, d: 이동 방향, z: 크기
  constructor(r, c, s, d, z) {
    this.r = r;
    this.c = c;
    this.s = s;
    this.d = d;
    this.z = z;
  }
}

// ----- init inputs
const [r, c, m] = input[0].split(" ").map(Number);
const sharks = input.slice(1).map((text) => {
  const [r, c, s, d, z] = text.split(" ").map(Number);

  return new Shark(r - 1, c - 1, s, d, z);
});

// ----- constants
const DIR_TYPE = {
  UP: 1,
  DOWN: 2,
  RIGHT: 3,
  LEFT: 4,
};

const CELL_TYPE = {
  EMPTY: 0,
};

// ----- functions
function getFishingSpot(r, c, sharks) {
  const fishingSpot = Array.from({ length: r }, () => Array(c).fill(CELL_TYPE.EMPTY));

  sharks.forEach((shark) => {
    const [cr, cc] = [shark.r, shark.c];

    fishingSpot[cr][cc] = shark;
  });

  return fishingSpot;
}

function catchShark(king, fishingSpot, sharks) {
  const rowLen = fishingSpot.length;

  for (let r = 0; r < rowLen; r++) {
    if (fishingSpot[r][king]) {
      const currentShark = fishingSpot[r][king];
      fishingSpot[r][king] = CELL_TYPE.EMPTY;

      const idx = sharks.indexOf(currentShark);
      sharks.splice(idx, 1);

      return currentShark.z;
    }
  }

  return 0;
}

function calcSteps(shark, rows, cols) {
  if (shark.d === DIR_TYPE.UP || shark.d === DIR_TYPE.DOWN) {
    return shark.s % (2 * (rows - 1));
  }
  return shark.s % (2 * (cols - 1));
}

function moveOneShark(shark, steps, rows, cols) {
  while (steps-- > 0) {
    let [nr, nd, nc] = [shark.r, shark.d, shark.c];

    if (shark.d === DIR_TYPE.UP) nr--;
    else if (shark.d === DIR_TYPE.DOWN) nr++;
    else if (shark.d === DIR_TYPE.LEFT) nc--;
    else if (shark.d === DIR_TYPE.RIGHT) nc++;

    if (nr < 0) {
      nd = DIR_TYPE.DOWN;
      nr = 1;
    } else if (nr >= rows) {
      nd = DIR_TYPE.UP;
      nr = rows - 2;
    } else if (nc < 0) {
      nd = DIR_TYPE.RIGHT;
      nc = 1;
    } else if (nc >= cols) {
      nd = DIR_TYPE.LEFT;
      nc = cols - 2;
    }

    shark.r = nr;
    shark.c = nc;
    shark.d = nd;
  }
}

function resolveConflicts(sharks, rows, cols) {
  const grid = Array.from({ length: rows }, () => Array(cols).fill(CELL_TYPE.EMPTY));
  const dead = new Set();

  for (const shark of sharks) {
    const cell = grid[shark.r][shark.c];
    if (cell === CELL_TYPE.EMPTY) {
      grid[shark.r][shark.c] = shark;
    } else if (cell.z < shark.z) {
      dead.add(cell);
      grid[shark.r][shark.c] = shark;
    } else {
      dead.add(shark);
    }
  }

  return { grid, survivors: sharks.filter((s) => !dead.has(s)) };
}

function moveShark(fishingSpot, sharks) {
  const [rows, cols] = [fishingSpot.length, fishingSpot[0].length];

  for (const shark of sharks) {
    moveOneShark(shark, calcSteps(shark, rows, cols), rows, cols);
  }

  const { grid, survivors } = resolveConflicts(sharks, rows, cols);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      fishingSpot[i][j] = grid[i][j];
    }
  }

  return survivors;
}

// ----- solution
function solution(r, c, m, sharks) {
  let sumSharks = 0;

  const fishingSpot = getFishingSpot(r, c, sharks);

  for (let king = 0; king < c; king++) {
    sumSharks += catchShark(king, fishingSpot, sharks);
    sharks = moveShark(fishingSpot, sharks);
  }

  return sumSharks;
}

// ----- print output
const answer = solution(r, c, m, sharks);
console.log(answer);
