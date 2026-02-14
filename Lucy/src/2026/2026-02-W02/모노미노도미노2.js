// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ===== init input
const BLOCK_TYPE = {
  ONE_BY_ONE: 1,
  ONE_BY_TWO: 2,
  TWO_BY_ONE: 3,
};

const BOARD_TYPE = {
  EMPTY: 0,
  BLOCK: 1,
};

class Block {
  constructor(t, x, y) {
    this.t = t;
    this.x = x;
    this.y = y;
  }
}

const n = Number(input[0]);
const blocks = input
  .slice(1)
  .map((text) => text.split(" ").map(Number))
  .map(([t, x, y]) => new Block(t, x, y));

// ===== functions
function changeBlockType(type) {
  if (type === BLOCK_TYPE.ONE_BY_ONE) return type;

  if (type === BLOCK_TYPE.ONE_BY_TWO) return BLOCK_TYPE.TWO_BY_ONE;

  if (type === BLOCK_TYPE.TWO_BY_ONE) return BLOCK_TYPE.ONE_BY_TWO;
}

function dropBlock(board, type, column) {
  let targetRow = 0;

  for (let row = 0; row < 6; row++) {
    if (isValidPlace(board, type, row, column)) {
      targetRow = row;
    } else {
      break;
    }
  }

  if (type === BLOCK_TYPE.ONE_BY_ONE) {
    board[targetRow][column] = BOARD_TYPE.BLOCK;
  } else if (type === BLOCK_TYPE.ONE_BY_TWO) {
    board[targetRow][column] = BOARD_TYPE.BLOCK;
    board[targetRow][column + 1] = BOARD_TYPE.BLOCK;
  } else if (type === BLOCK_TYPE.TWO_BY_ONE && targetRow > 0) {
    board[targetRow - 1][column] = BOARD_TYPE.BLOCK;
    board[targetRow][column] = BOARD_TYPE.BLOCK;
  }
}

function isValidPlace(board, type, row, column) {
  if (type === BLOCK_TYPE.ONE_BY_ONE) {
    if (board[row][column] === BOARD_TYPE.EMPTY) return true;
  } else if (type === BLOCK_TYPE.ONE_BY_TWO) {
    if (board[row][column] === BOARD_TYPE.EMPTY && board[row][column + 1] === BOARD_TYPE.EMPTY) return true;
  } else if (type === BLOCK_TYPE.TWO_BY_ONE) {
    if (row === 0 && board[row][column] === BOARD_TYPE.EMPTY) return true;
    if (row - 1 >= 0 && board[row][column] === BOARD_TYPE.EMPTY && board[row - 1][column] === BOARD_TYPE.EMPTY) return true;
  }

  return false;
}

function getScore(board) {
  let count = 0;

  for (let row = 5; row >= 0; row--) {
    const isFull = board[row].every((cell) => cell === BOARD_TYPE.BLOCK);
    if (isFull) {
      clearFullRows(board, row);
      count++;
      row++;
    }
  }

  return count;
}

function clearFullRows(board, rowIndex) {
  board.splice(rowIndex, 1);
  board.unshift([0, 0, 0, 0]);
}

function handleLightZone(board) {
  let count = 0;
  for (let row = 0; row < 2; row++) {
    const hasBlock = board[row].some((cell) => cell === BOARD_TYPE.BLOCK);
    if (hasBlock) count++;
  }

  for (let i = 0; i < count; i++) {
    board.pop();
    board.unshift([0, 0, 0, 0]);
  }
}

// ===== solution
function solution(n, blocks) {
  // init board
  const greenBoard = Array.from({ length: 6 }, () => Array(4).fill(0));
  const blueBoard = Array.from({ length: 6 }, () => Array(4).fill(0));

  let score = 0;

  for (const block of blocks) {
    // drop block
    dropBlock(greenBoard, block.t, block.y);
    const changedBlockType = changeBlockType(block.t);
    dropBlock(blueBoard, changedBlockType, block.x);

    // calculate score
    score += getScore(greenBoard);
    score += getScore(blueBoard);

    // handle light row
    handleLightZone(greenBoard);
    handleLightZone(blueBoard);
  }

  let blockCount = 0;
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (greenBoard[row][col] === BOARD_TYPE.BLOCK) {
        blockCount++;
      }
      if (blueBoard[row][col] === BOARD_TYPE.BLOCK) {
        blockCount++;
      }
    }
  }

  return [score, blockCount].join("\n");
}

const answer = solution(n, blocks);
console.log(answer);
