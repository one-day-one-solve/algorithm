// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ===== init input
const [n, l] = input[0].split(" ").map(Number);
const map = input.slice(1).map((text) => text.split(" ").map(Number));

// ===== functions
function isPass(line, l) {
  const n = line.length;
  const used = new Array(n).fill(false);

  for (let i = 0; i < n - 1; i++) {
    if (line[i] === line[i + 1]) continue;
    if (Math.abs(line[i] - line[i + 1]) > 1) return false;

    if (line[i] + 1 === line[i + 1]) {
      if (i + 1 < l) return false;

      for (let j = 0; j < l; j++) {
        if (line[i - j] === line[i] && !used[i - j]) {
          used[i - j] = true;
        } else {
          return false;
        }
      }
    } else if (line[i] === line[i + 1] + 1) {
      if (i + l >= n) return false;

      for (let j = i + 1; j < i + 1 + l; j++) {
        if (line[j] === line[i + 1] && !used[j]) {
          used[j] = true;
        } else {
          return false;
        }
      }

      i = i + l - 1;
    }
  }

  return true;
}

// ===== solution
function solution(n, l, map) {
  let path = 0;

  // check row
  for (let i = 0; i < n; i++) {
    if (isPass(map[i], l)) path++;
  }

  // check col
  for (let j = 0; j < n; j++) {
    const col = [];
    for (let i = 0; i < n; i++) {
      col.push(map[i][j]);
    }
    if (isPass(col, l)) path++;
  }

  return path;
}

const answer = solution(n, l, map);
console.log(answer);
