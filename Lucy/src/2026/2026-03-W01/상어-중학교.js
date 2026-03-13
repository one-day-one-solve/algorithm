// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// --- init input
const [n, m] = input[0].trim().split(/\s+/).map(Number);
let board = input.slice(1).map((text) => text.trim().split(/\s+/).map(Number));

// --- constants
const BLOCK_TYPE = {
  BLACK: -1,
  RAINBOW: 0,
  NORMAL: m,
  EMPTY: -2,
};

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// --- solution
function solution(n, m, board) {}

// --- answer
const answer = solution(n, m, board);
console.log(answer);
