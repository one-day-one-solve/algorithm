// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// --- class
class Piece {
  constructor(no, r, c, d) {
    this.no = no;
    this.r = r;
    this.c = c;
    this.d = d;
  }
}

// --- init input
const [n, k] = input[0].split(" ").map(Number);
const chessBoard = input.slice(1, 1 + n).map((text) => text.split(" ").map(Number));
const chessPieces = input
  .slice(1 + n)
  .map((text) => text.split(" ").map(Number))
  .map(([r, c, d], i) => new Piece(i + 1, r - 1, c - 1, d));

// --- constants
const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];

const CELL_TYPE = {
  WHITE: 0,
  RED: 1,
  BLUE: 2,
};

// --- functions
function reverseDirection(dir) {
  switch (dir) {
    case 1:
      return 2;
    case 2:
      return 1;
    case 3:
      return 4;
    case 4:
      return 3;
  }
  return dir;
}

function isInvalid(n, r, c) {
  return r < 0 || r >= n || c < 0 || c >= n;
}

function isValid(n, r, c) {
  return r >= 0 && r < n && c >= 0 && c < n;
}

// --- solution
function solution(n, k, chessBoard, chessPieces) {
  const board = Array.from({ length: n }, () => Array.from({ length: n }, () => []));
  for (const piece of chessPieces) {
    board[piece.r][piece.c].push(piece);
  }

  let turn = 1;

  while (turn <= 1000) {
    for (const piece of chessPieces) {
      const pieceIndex = board[piece.r][piece.c].findIndex((p) => p.no === piece.no);

      let [dr, dc] = DIRECTIONS[piece.d - 1];
      let [nr, nc] = [piece.r + dr, piece.c + dc];

      // blue
      if (isInvalid(n, nr, nc) || chessBoard[nr][nc] === CELL_TYPE.BLUE) {
        piece.d = reverseDirection(piece.d);
        [dr, dc] = DIRECTIONS[piece.d - 1];
        [nr, nc] = [piece.r + dr, piece.c + dc];

        if (isInvalid(n, nr, nc) || chessBoard[nr][nc] === CELL_TYPE.BLUE) {
          continue;
        }
      }

      // white, red
      const sliced = board[piece.r][piece.c].splice(pieceIndex);
      sliced.forEach((p) => {
        p.r = nr;
        p.c = nc;
      });

      if (chessBoard[nr][nc] === CELL_TYPE.RED) {
        sliced.reverse();
      }

      board[nr][nc].push(...sliced);

      if (board[nr][nc].length >= 4) {
        return turn;
      }
    }
    turn++;
  }

  return turn > 1000 ? -1 : turn;
}

// --- answer
const answer = solution(n, k, chessBoard, chessPieces);
console.log(answer);
