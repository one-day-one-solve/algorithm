// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ----- init input
const [n, m] = input[0].split(" ").map(Number);
const board = input.slice(1).map((text) => text.split(" ").map(Number));

// ----- constants
const BLOCK_TYPE = {
  BLACK: -1,
  RAINBOW: 0,
};

const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

// ----- solution
function solution(n, m, board) {
  const findGroup = (r, c, color) => {
    const queue = [[r, c]];
    let pointer = 0;

    const visited = Array.from({ length: n }, () => Array(n).fill(false));
    visited[r][c] = true;

    const cells = [];
    let rainbowCount = 0;
    let standard = [r, c];

    while (pointer < queue.length) {
      const [cr, cc] = queue[pointer++];
      cells.push([cr, cc]);

      if (board[cr][cc] === BLOCK_TYPE.RAINBOW) {
        rainbowCount++;
      } else {
        // 기준 블록: 무지개가 아닌 블록 중 행이 작은 것, 같으면 열이 작은 것
        if (cr < standard[0] || (cr === standard[0] && cc < standard[1])) {
          standard = [cr, cc];
        }
      }

      for (const [dr, dc] of DIRECTIONS) {
        const [nr, nc] = [cr + dr, cc + dc];

        if (0 <= nr && nr < n && 0 <= nc && nc < n && !visited[nr][nc] && (board[nr][nc] === color || board[nr][nc] === BLOCK_TYPE.RAINBOW)) {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }

    return { cells, rainbowCount, standard };
  };

  const rotate = () => {
    const next = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        next[n - 1 - j][i] = board[i][j];
      }
    }
    board = next;
  };

  const gravity = () => {
    for (let j = 0; j < n; j++) {
      let empty = n - 1;
      for (let i = n - 1; i >= 0; i--) {
        if (board[i][j] === -1) {
          empty = i - 1; // 검은 블록 윗칸으로 리셋
          continue;
        }
        if (board[i][j] !== null) {
          const dest = empty--; // 목적지, 한 칸 위
          board[dest][j] = board[i][j];
          if (empty + 1 !== i) board[i][j] = null; // 원래 자리 비우기
        }
      }
    }
  };

  const isBetter = (curr, best) => {
    if (curr.cells.length !== best.cells.length) return curr.cells.length > best.cells.length;
    if (curr.rainbowCount !== best.rainbowCount) return curr.rainbowCount > best.rainbowCount;
    if (curr.standard[0] !== best.standard[0]) return curr.standard[0] > best.standard[0];

    return curr.standard[1] > best.standard[1];
  };

  let score = 0;

  while (true) {
    let bestGroup = null;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] <= 0) continue; // 검은색 혹은 무지개 블록은 기준이 될 수 없음

        const group = findGroup(i, j, board[i][j]);

        if (group.cells.length < 2) continue; // 크기 2 미만 제외

        if (!bestGroup || isBetter(group, bestGroup)) {
          bestGroup = group;
        }
      }
    }

    if (!bestGroup) break;

    // 제거 + 점수
    for (const [r, c] of bestGroup.cells) board[r][c] = null;
    score += bestGroup.cells.length ** 2;

    // gravity -> rotate -> gravity
    gravity();
    rotate();
    gravity();
  }

  return score;
}

// ----- answer
const answer = solution(n, m, board);
console.log(answer);
