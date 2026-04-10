// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ----- init inputs
const [n, m] = input[0].split(" ").map(Number);
const labs = input.slice(1).map((text) => text.split(" ").map(Number));

// ----- constatns
const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const CELL_TYPE = {
  EMPTY: 0,
  WALL: 1,
  VIRUS: 2,
};

// ----- functions
function parseMap(labs) {
  let emptyCnt = 0;
  const viruses = [];

  labs.forEach((lab, r) => {
    lab.forEach((cell, c) => {
      if (cell === CELL_TYPE.EMPTY) {
        emptyCnt++;
      } else if (cell === CELL_TYPE.VIRUS) {
        viruses.push([r, c]);
      }
    });
  });

  return { emptyCnt, viruses };
}

function getVirusCombination(viruses, m) {
  const results = [];

  const backtrack = (start, count, currentViruses) => {
    if (count === m) {
      results.push([...currentViruses]);
      return;
    }

    for (let i = start; i < viruses.length; i++) {
      currentViruses.push(viruses[i]);
      backtrack(i + 1, count + 1, currentViruses);
      currentViruses.pop();
    }
  };

  backtrack(0, 0, []);

  return results;
}

function bfs(labs, activeViruses, emptyCnt) {
  let currentEmptyCnt = emptyCnt;

  const queue = [];
  let pointer = 0;

  const visited = new Set(); // 'r,c'

  activeViruses.forEach(([r, c]) => {
    queue.push([r, c, 0]);
    visited.add(`${r},${c}`);
  });

  let time = 0;

  while (pointer < queue.length) {
    const [cr, cc, ct] = queue[pointer++];

    for (const [dr, dc] of DIRECTIONS) {
      const [nr, nc] = [cr + dr, cc + dc];

      if (nr >= 0 && nr < labs.length && nc >= 0 && nc < labs[0].length && !visited.has(`${nr},${nc}`) && labs[nr][nc] !== CELL_TYPE.WALL) {
        queue.push([nr, nc, ct + 1]);
        visited.add(`${nr},${nc}`);

        if (labs[nr][nc] === CELL_TYPE.EMPTY) {
          currentEmptyCnt--;
          time = ct + 1;
        }
      }
    }
  }

  if (currentEmptyCnt !== 0) return -1;

  return time;
}

// ----- solution
function solution(n, m, labs) {
  let minTime = Infinity;

  const { emptyCnt, viruses } = parseMap(labs);

  const virusCombination = getVirusCombination(viruses, m);

  for (const activeViruses of virusCombination) {
    let currentTime = bfs(labs, activeViruses, emptyCnt);
    if (currentTime !== -1) {
      minTime = Math.min(minTime, currentTime);
    }
  }

  return Number.isFinite(minTime) ? minTime : -1;
}

// ----- print output
const answer = solution(n, m, labs);
console.log(answer);
