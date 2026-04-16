// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ----- init inputs
const n = Number(input[0]);
const k = Number(input[1]);
const apples = input.slice(2, 2 + k).map((text) => text.split(" ").map(Number));
const l = Number(input[2 + k]);
const snakeDirections = input.slice(2 + k + 1).map((text) => {
  const [num, cmd] = text.split(" ");

  return [Number(num), cmd];
}); // [X, C][]

// ----- constants
const CELL_TYPE = {
  APPLE: "A",
  SNAKE: "S",
  EMPTY: 0,
};

const CMD_TYPE = {
  LEFT: "L",
  RIGHT: "D",
};

const SNAKE_DIR_TYPE = {
  RIGHT: 0,
  DOWN: 1,
  LEFT: 2,
  UP: 3,
};

const DIRECTIONS = [
  [0, 1], // R
  [1, 0], // D
  [0, -1], // L
  [-1, 0], // U
];

// ----- class
class Snake {
  constructor() {
    this.body = [[0, 0]]; // 뱀이 board에 남아 있는 좌표
    this.dir = SNAKE_DIR_TYPE.RIGHT;
  }

  move(board) {
    const [dr, dc] = DIRECTIONS[this.dir];
    const [hr, hc] = this.body[0];
    const [nr, nc] = [hr + dr, hc + dc];

    // 벽과 충돌
    if (nr < 0 || nr >= n || nc < 0 || nc >= n) return false;

    // 자기 몸과 충돌
    if (board[nr][nc] === CELL_TYPE.SNAKE) return false;

    // 사과 먹기
    if (board[nr][nc] === CELL_TYPE.APPLE) {
      board[nr][nc] = CELL_TYPE.SNAKE;
      this.body.unshift([nr, nc]);
    } else {
      const [tr, tc] = this.body.pop();
      board[tr][tc] = CELL_TYPE.EMPTY;
      this.body.unshift([nr, nc]);
      board[nr][nc] = CELL_TYPE.SNAKE;
    }

    return true;
  }

  updateDir(cmd) {
    if (cmd === CMD_TYPE.LEFT) {
      this.dir = (this.dir + 4 - 1) % 4;
    } else if (cmd === CMD_TYPE.RIGHT) {
      this.dir = (this.dir + 1) % 4;
    }
  }
}

// ----- functions
function getBoard(n, k, apples) {
  const board = Array.from({ length: n }, () => Array(n).fill(0));

  apples.forEach(([r, c]) => {
    board[r - 1][c - 1] = CELL_TYPE.APPLE;
  });

  return board;
}

// ----- functions
function playGame(board, snake, snakeDirections) {
  let time = 0;
  let i = 0;
  let [cmdTime, cmd] = snakeDirections[i++];

  while (true) {
    if (time === cmdTime) {
      snake.updateDir(cmd);
      if (i < snakeDirections.length) [cmdTime, cmd] = snakeDirections[i++];
    }

    const result = snake.move(board);
    time++;

    if (!result) break;
  }

  return time;
}

// ----- solution
function solution(n, k, apples, l, snakeDirections) {
  const board = getBoard(n, k, apples);

  const snake = new Snake(0, 0, 0, 0);
  board[0][0] = CELL_TYPE.SNAKE;

  return playGame(board, snake, snakeDirections);
}

// ----- print output
const answer = solution(n, k, apples, l, snakeDirections);
console.log(answer);
