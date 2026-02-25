// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// class
class Fireball {
  // r: 행, c: 열, m: 질량, s: 속력, d: 방향
  constructor(r, c, m, s, d) {
    this.r = r;
    this.c = c;
    this.m = m;
    this.s = s;
    this.d = d;
  }
}

// init input
const [n, m, k] = input[0].split(" ").map(Number);
const fireballs = input.slice(1).map((text) => {
  const [r, c, m, s, d] = text.split(" ").map(Number);
  return new Fireball(r - 1, c - 1, m, s, d);
}); // [r, c, m, s, d][]

const DIRECTIONS = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];

function getNextPosition(r, c, d, s, n) {
  const [dr, dc] = DIRECTIONS[d];
  const nr = (r + ((dr * s) % n) + n) % n;
  const nc = (c + ((dc * s) % n) + n) % n;

  return [nr, nc];
}

function splitFireballs(r, c, fireballsAtCell) {
  const count = fireballsAtCell.length;
  if (count === 1) return [fireballsAtCell[0]];

  const sumM = fireballsAtCell.reduce((sum, f) => sum + f.m, 0);
  const sumS = fireballsAtCell.reduce((sum, f) => sum + f.s, 0);

  const newM = Math.floor(sumM / 5);
  if (newM === 0) return [];

  const newS = Math.floor(sumS / count);

  const isAllSameParity = fireballsAtCell.every((f) => f.d % 2 === 0) || fireballsAtCell.every((f) => f.d % 2 === 1);

  const newDirs = isAllSameParity ? [0, 2, 4, 6] : [1, 3, 5, 7];

  return newDirs.map((d) => new Fireball(r, c, newM, newS, d));
}

// solution
function solution(n, m, k, fireballs) {
  let currentFireballs = fireballs;

  for (let i = 0; i < k; i++) {
    const board = Array.from({ length: n }, () => Array.from({ length: n }, () => []));

    // move
    for (const fireball of currentFireballs) {
      const [nr, nc] = getNextPosition(fireball.r, fireball.c, fireball.d, fireball.s, n);

      fireball.r = nr;
      fireball.c = nc;

      board[nr][nc].push(fireball);
    }

    // split
    const nextFireballs = [];
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (board[r][c].length > 0) {
          const processed = splitFireballs(r, c, board[r][c]);
          nextFireballs.push(...processed);
        }
      }
    }

    currentFireballs = nextFireballs;
  }

  let totalM = currentFireballs.reduce((prev, fireball) => prev + fireball.m, 0);

  return totalM;
}

// output
const answer = solution(n, m, k, fireballs);
console.log(answer);
