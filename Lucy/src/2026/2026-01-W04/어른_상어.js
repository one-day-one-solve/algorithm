// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// init input
const [n, m, k] = input[0].split(" ").map(Number);
const rawGrid = input.slice(1, 1 + n).map((text) => text.split(" ").map(Number));
const sharksCurrentDir = input[n + 1].split(" ").map(Number);
const sharksPriorityDirs = [];

const sharksPriorityText = input.slice(n + 2);
for (let i = 0; i < m; i++) {
  const startIdx = i * 4;
  const endIdx = startIdx + 4;
  const currentDirs = sharksPriorityText.slice(startIdx, endIdx);

  sharksPriorityDirs.push(currentDirs.map((text) => text.split(" ").map(Number)));
}

// === Constants & Types ===
const DIRECTIONS = [
  [],
  [-1, 0], // up
  [1, 0], // down
  [0, -1], // left
  [0, 1], // right
];

const EMPTY = 0;

// === Classes ===
class Space {
  constructor(sharkNo = EMPTY, timeLeft = EMPTY) {
    this.sharkNo = sharkNo;
    this.timeLeft = timeLeft;
  }

  isEmpty() {
    return this.timeLeft === EMPTY;
  }

  isOwnedBy(sharkNo) {
    return this.sharkNo === sharkNo;
  }

  decreaseTime() {
    if (this.timeLeft > 0) {
      this.timeLeft -= 1;
      if (this.timeLeft === 0) this.sharkNo = EMPTY;
    }
  }

  setSmell(sharkNo, k) {
    this.sharkNo = sharkNo;
    this.timeLeft = k;
  }
}

class Shark {
  constructor(sharkNo, r, c, direction) {
    this.sharkNo = sharkNo;
    this.r = r;
    this.c = c;
    this.direction = direction;
  }
}

// === Logic Functions ===

/**
 * 상어의 다음 이동 위치와 방향을 결정합니다.
 */
function getNextMove(shark, grid, priorityDirs, N) {
  const myPriorities = priorityDirs[shark.sharkNo - 1][shark.direction - 1];

  // 1. 냄새가 없는 칸 탐색
  for (const nd of myPriorities) {
    const [dr, dc] = DIRECTIONS[nd];
    const nr = shark.r + dr;
    const nc = shark.c + dc;

    if (nr >= 0 && nr < N && nc >= 0 && nc < N && grid[nr][nc].isEmpty()) {
      return { nr, nc, nd };
    }
  }

  // 2. 자신의 냄새가 있는 칸 탐색
  for (const nd of myPriorities) {
    const [dr, dc] = DIRECTIONS[nd];
    const nr = shark.r + dr;
    const nc = shark.c + dc;

    if (nr >= 0 && nr < N && nc >= 0 && nc < N && grid[nr][nc].isOwnedBy(shark.sharkNo)) {
      return { nr, nc, nd };
    }
  }

  // (이론상 도달 불가)
  return { nr: shark.r, nc: shark.c, nd: shark.direction };
}

/**
 * 모든 상어의 이동 계획을 세웁니다.
 */
function planMoves(sharksMap, grid, priorityDirs, N) {
  const moves = new Map();
  for (const shark of sharksMap.values()) {
    moves.set(shark.sharkNo, getNextMove(shark, grid, priorityDirs, N));
  }
  return moves;
}

/**
 * 이동 계획대로 상어들을 이동시키고 위치별로 그룹화합니다.
 * 반환값: Map<positionKey, Shark[]>
 */
function moveSharks(moves) {
  const sharksAtPosition = new Map(); // Key: "r,c", Value: Shark[]

  for (const [sharkNo, move] of moves) {
    const { nr, nc, nd } = move;
    const posKey = `${nr},${nc}`;

    if (!sharksAtPosition.has(posKey)) {
      sharksAtPosition.set(posKey, []);
    }
    sharksAtPosition.get(posKey).push(new Shark(sharkNo, nr, nc, nd));
  }

  return sharksAtPosition;
}

/**
 * 각 위치에서 충돌을 해결하고 살아남은 상어들을 반환합니다.
 * 반환값: Map<sharkNo, Shark>
 */
function resolveCollisions(sharksAtPosition) {
  const survivors = new Map();

  for (const sharks of sharksAtPosition.values()) {
    // 해당 위치에 상어가 한 마리라면 바로 생존
    if (sharks.length === 1) {
      const shark = sharks[0];
      survivors.set(shark.sharkNo, shark);
      continue;
    }

    // 여러 마리라면 번호가 가장 작은 상어만 생존
    // (상어 번호 오름차순 정렬 -> 첫 번째가 승자)
    sharks.sort((a, b) => a.sharkNo - b.sharkNo);
    const winner = sharks[0];
    survivors.set(winner.sharkNo, winner);
  }

  return survivors;
}

/**
 * 격자의 모든 냄새 시간을 1 줄입니다.
 */
function decreaseSmells(grid, N) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      grid[i][j].decreaseTime();
    }
  }
}

/**
 * 현재 상어들의 위치에 새로운 냄새를 뿌립니다.
 */
function spreadSmells(grid, sharksMap, k) {
  for (const shark of sharksMap.values()) {
    grid[shark.r][shark.c].setSmell(shark.sharkNo, k);
  }
}

/**
 * 게임 초기 상태를 설정합니다.
 */
function initializeGame(N, rawGrid, k, currentDirs) {
  const grid = [];
  const sharks = new Map();

  for (let i = 0; i < N; i++) {
    const row = [];
    for (let j = 0; j < N; j++) {
      const val = rawGrid[i][j];
      if (val !== EMPTY) {
        // 상어가 있는 자리: 상어 생성 + 냄새 생성
        sharks.set(val, new Shark(val, i, j, currentDirs[val - 1]));
        row.push(new Space(val, k));
      } else {
        // 빈 자리
        row.push(new Space());
      }
    }
    grid.push(row);
  }
  return { grid, sharks };
}

// === Main Solution ===

function solution(n, m, k, rawGrid, sharksCurrentDir, sharksPriorityDirs) {
  // 1. 초기화
  let { grid, sharks } = initializeGame(n, rawGrid, k, sharksCurrentDir);

  let time = 0;
  while (time < 1000) {
    time++;

    // 2. 이동 계획 수립
    const nextMoves = planMoves(sharks, grid, sharksPriorityDirs, n);

    // 3. 이동 실행 (위치별 그룹화)
    const sharksAtPosition = moveSharks(nextMoves);

    // 4. 충돌 해결 (생존자 선정)
    sharks = resolveCollisions(sharksAtPosition);

    // 5. 냄새 시간 감소
    decreaseSmells(grid, n);

    // 6. 새 냄새 추가
    spreadSmells(grid, sharks, k);

    // 7. 종료 조건 확인
    if (sharks.size === 1 && sharks.has(1)) {
      return time;
    }
  }

  return -1;
}

const answer = solution(n, m, k, rawGrid, sharksCurrentDir, sharksPriorityDirs);
console.log(answer);
