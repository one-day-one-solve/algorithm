// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ----- init inputs
const [r, c, k] = input[0].split(" ").map(Number);
const room = input.slice(1, 1 + r).map((text) => text.split(" ").map(Number));
const w = Number(input[1 + r]);
const wallInfos = input.slice(1 + r + 1).map((text) => text.split(" ").map(Number)); // [x, y, t][], t가 0: (x, y) - (x - 1, y), t가 1: (x, y) - (x, y + 1)

// ----- constants
const CELL_TYPE = {
  EMPTY: 0,
  RIGHT: 1,
  LEFT: 2,
  UP: 3,
  DOWN: 4,
  TARGET_TEMP: 5,
};

const DEFAULT_TEMPERATURE = 5;

const WIND_SPREAD = {
  [CELL_TYPE.RIGHT]: {
    front: [0, 1],
    diagonals: [
      [-1, 1],
      [1, 1],
    ],
  },
  [CELL_TYPE.LEFT]: {
    front: [0, -1],
    diagonals: [
      [-1, -1],
      [1, -1],
    ],
  },
  [CELL_TYPE.UP]: {
    front: [-1, 0],
    diagonals: [
      [-1, -1],
      [-1, 1],
    ],
  },
  [CELL_TYPE.DOWN]: {
    front: [1, 0],
    diagonals: [
      [1, -1],
      [1, 1],
    ],
  },
};

const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];

// ----- functions
function buildWalls(r, c, wallInfos) {
  const walls = Array.from({ length: r }, () => Array.from({ length: c }, () => ({ left: false, right: false, up: false, down: false })));

  wallInfos.forEach((info) => {
    const [x, y, t] = info;

    if (t === 0) {
      walls[x - 1][y - 1].up = true;
      walls[x - 2][y - 1].down = true;
    } else if (t === 1) {
      walls[x - 1][y - 1].right = true;
      walls[x - 1][y].left = true;
    }
  });

  return walls;
}

function getHeaters(room) {
  const heaters = [];

  room.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell !== CELL_TYPE.EMPTY && cell !== CELL_TYPE.TARGET_TEMP) {
        heaters.push({ r, c, dir: cell });
      }
    });
  });

  return heaters;
}

function hasWall(walls, r, c, dr, dc) {
  if (dc === 1) return walls[r][c].right;
  if (dc === -1) return walls[r][c].left;
  if (dr === -1) return walls[r][c].up;
  if (dr === 1) return walls[r][c].down;
}

function isValid(r, c, rowLen, colLen) {
  return r >= 0 && r < rowLen && c >= 0 && c < colLen;
}

function spreadWind(r, c, dir, temperatures, walls, tempDelta) {
  const { front, diagonals } = WIND_SPREAD[dir];

  const [rowLen, colLen] = [temperatures.length, temperatures[0].length];

  const visited = Array.from({ length: rowLen }, () => Array.from({ length: colLen }).fill(false));
  const queue = [];
  let pointer = 0;

  const isHorizontal = front[0] === 0;

  const [fr, fc] = [r + front[0], c + front[1]];
  if (isValid(fr, fc, rowLen, colLen) && !hasWall(walls, r, c, front[0], front[1])) {
    tempDelta[fr][fc] += DEFAULT_TEMPERATURE;
    visited[fr][fc] = true;
    queue.push([fr, fc, DEFAULT_TEMPERATURE]);
  }

  while (pointer < queue.length) {
    const [cr, cc, ct] = queue[pointer++];
    if (ct <= 1) continue;

    const [gr, gc] = [cr + front[0], cc + front[1]];
    if (isValid(gr, gc, rowLen, colLen) && !hasWall(walls, cr, cc, front[0], front[1]) && !visited[gr][gc]) {
      visited[gr][gc] = true;
      tempDelta[gr][gc] += ct - 1;
      queue.push([gr, gc, ct - 1]);
    }

    diagonals.forEach(([dr, dc]) => {
      const [nr, nc] = [cr + dr, cc + dc];

      if (!isValid(nr, nc, rowLen, colLen) || visited[nr][nc]) return;

      const canMove = isHorizontal
        ? !hasWall(walls, cr, cc, dr, 0) && !hasWall(walls, cr + dr, cc, 0, dc)
        : !hasWall(walls, cr, cc, 0, dc) && !hasWall(walls, cr, cc + dc, dr, 0);

      if (canMove) {
        visited[nr][nc] = true;
        tempDelta[nr][nc] += ct - 1;
        queue.push([nr, nc, ct - 1]);
      }
    });
  }
}

function updateTemperature(temperatures, walls) {
  const delta = Array.from({ length: temperatures.length }, () => Array.from({ length: temperatures[0].length }).fill(0));

  temperatures.forEach((row, cr) => {
    row.forEach((cell, cc) => {
      for (const [dr, dc] of DIRECTIONS) {
        const [nr, nc] = [cr + dr, cc + dc];

        if (isValid(nr, nc, temperatures.length, row.length) && !hasWall(walls, cr, cc, dr, dc) && temperatures[cr][cc] > temperatures[nr][nc]) {
          const calculated = Math.floor((temperatures[cr][cc] - temperatures[nr][nc]) / 4);
          delta[cr][cc] -= calculated;
          delta[nr][nc] += calculated;
        }
      }
    });
  });

  delta.forEach((row, r) => {
    row.forEach((_, c) => {
      temperatures[r][c] += delta[r][c];
    });
  });
}

function decreaseBorderTemp(temperatures) {
  // border row
  for (let c = 0; c < temperatures[0].length; c++) {
    if (temperatures[0][c] > 0) temperatures[0][c]--;
    if (temperatures[temperatures.length - 1][c] > 0) temperatures[temperatures.length - 1][c]--;
  }

  // border col
  for (let r = 1; r < temperatures.length - 1; r++) {
    if (temperatures[r][0] > 0) temperatures[r][0]--;
    if (temperatures[r][temperatures[r].length - 1] > 0) temperatures[r][temperatures[r].length - 1]--;
  }
}

function isAllWarm(targets, temperatures, k) {
  return targets.every(([r, c]) => temperatures[r][c] >= k);
}

// ----- solution
function solution(r, c, k, room, w, wallInfos) {
  let chocolate = 0;

  // 벽 전처리
  const walls = buildWalls(r, c, wallInfos);

  // 온풍기 위치 저장
  const heaters = getHeaters(room);

  // 조사 칸 위치
  const targets = [];
  room.forEach((row, i) =>
    row.forEach((cell, j) => {
      if (cell === CELL_TYPE.TARGET_TEMP) targets.push([i, j]);
    }),
  );

  // 온도 저장 배열
  const temperatures = Array.from({ length: r }, () => Array(c).fill(0));

  // 루프
  while (true) {
    // 온풍기 틀기
    const tempDelta = Array.from({ length: r }, () => Array(c).fill(0));

    heaters.forEach(({ r: hr, c: hc, dir }) => {
      spreadWind(hr, hc, dir, temperatures, walls, tempDelta);
    });

    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        temperatures[i][j] += tempDelta[i][j];
      }
    }

    // 온도 조절
    updateTemperature(temperatures, walls);

    // 가장 바깥쪽 칸 온도 감소
    decreaseBorderTemp(temperatures);

    // 초콜릿 먹기
    chocolate++;
    if (chocolate > 100) return 101;

    // 모든 조사 칸이 k 이상인지 확인
    if (isAllWarm(targets, temperatures, k)) return chocolate;
  }
}

// ----- print output
const answer = solution(r, c, k, room, w, wallInfos);
console.log(answer);
