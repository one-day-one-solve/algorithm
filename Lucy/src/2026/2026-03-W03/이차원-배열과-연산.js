// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ----- init inputs
const [r, c, k] = input[0].split(" ").map(Number);
const a = input.slice(1).map((text) => text.split(" ").map(Number));

// ----- constants

// ----- functions
function transformLine(line) {
  const countMap = new Map();

  for (const num of line) {
    if (num === 0) continue;
    countMap.set(num, (countMap.get(num) ?? 0) + 1);
  }

  const pairs = [...countMap.entries()];
  pairs.sort((a, b) => a[1] - b[1] || a[0] - b[0]);

  return pairs.flat().slice(0, 100);
}

function operateR(board) {
  const newBoard = [];
  let maximumRow = 0;

  for (const row of board) {
    const newRow = transformLine(row);
    newBoard.push(newRow);

    maximumRow = Math.max(maximumRow, newRow.length);
  }

  for (const row of newBoard) {
    while (row.length < maximumRow) {
      row.push(0);
    }
  }

  return newBoard;
}

function transpose(board) {
  const [rowLen, colLen] = [board.length, board[0].length];

  const result = Array.from({ length: colLen }, () => Array(rowLen).fill(0));

  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      result[c][r] = board[r][c];
    }
  }

  return result;
}

function operateC(board) {
  return transpose(operateR(transpose(board)));
}

// ----- solutions
function solution(r, c, k, a) {
  let time = 0;
  let board = a;

  while (time <= 100) {
    if (r >= 0 && r < board.length && c >= 0 && c < board[0].length && board[r][c] === k) return time;

    let [rowCount, colCount] = [board.length, board[0].length];

    if (rowCount >= colCount) {
      board = operateR(board);
    } else {
      board = operateC(board);
    }

    time++;
  }

  return -1;
}

// ----- answer
const answer = solution(r - 1, c - 1, k, a);
console.log(answer);
