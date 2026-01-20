// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);

let [rr, rc, rd] = input[1].split(" ").map(Number);

const spaces = input.slice(2).map((text) => text.split(" ").map(Number));

const directions = [
  [-1, 0], // north
  [0, 1], // east
  [1, 0], // south
  [0, -1], // west
];

const SPACE_TYPE = {
  EMPTY: 0,
  WALL: 1,
  CLEAN: 2,
};

const isValid = (r, c, n, m) => r >= 0 && r < n && c >= 0 && c < m;

function solution(n, m, spaces, rr, rc, rd) {
  let cnt = 0;
  let r = rr;
  let c = rc;
  let d = rd;

  while (true) {
    // 현재 칸 청소
    if (spaces[r][c] === SPACE_TYPE.EMPTY) {
      spaces[r][c] = SPACE_TYPE.CLEAN;
      cnt++;
    }

    // 주변 4칸 중 청소되지 않은 빈 칸이 있는지 확인
    let hasDirty = false;
    for (let i = 0; i < directions.length; i++) {
      const [dr, dc] = directions[i];
      const [nr, nc] = [r + dr, c + dc];

      if (isValid(nr, nc, n, m) && spaces[nr][nc] === SPACE_TYPE.EMPTY) {
        hasDirty = true;
        break;
      }
    }

    if (hasDirty) {
      // 빈 칸이 있는 경우: 반시계 90도 회전 후 전진
      d = (d + 3) % 4;

      const [dr, dc] = directions[d];
      const [nr, nc] = [r + dr, c + dc];

      if (isValid(nr, nc, n, m) && spaces[nr][nc] === SPACE_TYPE.EMPTY) {
        r = nr;
        c = nc;
      }
    } else {
      // 빈 칸이 없는 경우: 후진
      const [dr, dc] = directions[d];
      const [br, bc] = [r - dr, c - dc];

      if (isValid(br, bc, n, m) && spaces[br][bc] !== SPACE_TYPE.WALL) {
        r = br;
        c = bc;
      } else {
        break;
      }
    }
  }

  return cnt;
}

const answer = solution(n, m, spaces, rr, rc, rd);
console.log(answer);
