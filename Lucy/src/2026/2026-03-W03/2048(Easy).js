// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ----- init inputs
const n = Number(input[0]);
const board = input.slice(1).map((text) => text.split(" ").map(Number));

// ----- constants
const EMPTY_CELL = 0;
const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

// ----- functions
function mergeLine(line) {
  const filtered = line.filter((num) => num !== 0);

  const merged = [];

  for (let i = 0; i < filtered.length; i++) {
    if (filtered[i] === filtered[i + 1]) {
      merged.push(filtered[i] * 2);
      i++;
    } else {
      merged.push(filtered[i]);
    }
  }

  while (merged.length < n) {
    merged.push(0);
  }

  return merged;
}

function moveLeft(board) {
  return board.map((row) => mergeLine(row));
}

function moveRight(board) {
  return board.map((row) => mergeLine([...row].reverse()).reverse());
}

function moveUp(board) {
  const newBoard = Array.from({ length: n }, () => Array(n).fill(0));

  for (let col = 0; col < n; col++) {
    const line = [];

    for (let row = 0; row < n; row++) {
      line.push(board[row][col]);
    }

    const merged = mergeLine(line);

    for (let row = 0; row < n; row++) {
      newBoard[row][col] = merged[row];
    }
  }

  return newBoard;
}

function moveDown(board) {
  const newBoard = Array.from({ length: n }, () => Array(n).fill(0));

  for (let col = 0; col < n; col++) {
    const line = [];

    for (let row = n - 1; row >= 0; row--) {
      line.push(board[row][col]);
    }

    const merged = mergeLine(line);

    for (let row = 0; row < n; row++) {
      newBoard[n - 1 - row][col] = merged[row];
    }
  }

  return newBoard;
}

// ----- solutions
function solution(n, board) {
  let maxBlock = 0;

  const dfs = (board, depth) => {
    if (depth === 5) {
      for (const row of board) {
        for (const value of row) {
          maxBlock = Math.max(maxBlock, value);
        }
      }

      return;
    }

    dfs(moveLeft(board), depth + 1);
    dfs(moveRight(board), depth + 1);
    dfs(moveUp(board), depth + 1);
    dfs(moveDown(board), depth + 1);
  };

  dfs(board, 0);

  return maxBlock;
}

// ----- answer
const answer = solution(n, board);
console.log(answer);
