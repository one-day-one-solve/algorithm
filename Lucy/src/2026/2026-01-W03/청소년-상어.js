// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

const SPACE_TYPE = {
  EMPTY: 0,
  SHARK: -1,
};

class Space {
  constructor(no, direction) {
    this.no = no;
    this.direction = direction;
  }

  getNo() {
    return this.no;
  }

  setNo(no) {
    this.no = no;
  }

  getDirection() {
    return this.direction;
  }

  setDirection(direction) {
    this.direction = direction;
  }
}

const spaces = input.map((text) => {
  const row = text.split(" ").map(Number);

  const newSpace = [];
  for (let j = 0; j < Math.floor(row.length / 2); j++) {
    const fish = new Space(row[2 * j], row[2 * j + 1]);
    newSpace.push(fish);
  }

  return newSpace;
});

const directions = [
  [],
  [-1, 0], // 상
  [-1, -1], // 좌상 대각선
  [0, -1], // 좌
  [1, -1], // 좌하 대각선
  [1, 0], // 하
  [1, 1], // 우하 대각선
  [0, 1], // 우
  [-1, 1], // 우상 대각선
];

// spaces의 각 원소가 Space 객체라서 new 연산자를 통해 다시 생성해서 만들어야 하나?
function copySpaces(spaces) {
  const copiedSpaces = spaces.map((space) => {
    const newSpace = space.map((space) => new Space(space.getNo(), space.getDirection()));
    return newSpace;
  });

  return copiedSpaces;
}

function moveFishes(spaces, fishPositions, sharkPosition) {
  for (let i = 1; i <= 16; i++) {
    if (!fishPositions.has(i)) continue;

    const { r, c } = fishPositions.get(i);

    let fishDirection = spaces[r][c].getDirection();
    let originDirection = fishDirection;

    for (let turn = 0; turn < 8; turn++) {
      const nr = r + directions[fishDirection][0];
      const nc = c + directions[fishDirection][1];

      if (nr < 0 || nr >= spaces.length || nc < 0 || nc >= spaces.length || (nr === sharkPosition.r && nc === sharkPosition.c)) {
        // 방향 바꾸기
        fishDirection = (fishDirection % 8) + 1;

        continue;
      }

      // swap
      spaces[r][c].setDirection(fishDirection);

      const targetFish = spaces[nr][nc];
      const currentFish = spaces[r][c];

      spaces[nr][nc] = currentFish;
      spaces[r][c] = targetFish;

      fishPositions.set(currentFish.getNo(), { r: nr, c: nc });

      if (targetFish.getNo() > SPACE_TYPE.EMPTY) {
        fishPositions.set(targetFish.getNo(), { r, c });
      }

      break;
    }
  }
}

function solution(spaces, sr, sc) {
  // 1. 물고기들의 현재 위치를 저장해두는 fishPositions Map 객체 생성
  const fishPositions = new Map();

  for (let i = 0; i < spaces.length; i++) {
    for (let j = 0; j < spaces.length; j++) {
      const currentFish = spaces[i][j];

      if (!fishPositions.has(currentFish.getNo())) {
        fishPositions.set(currentFish.getNo(), { r: i, c: j });
      }
    }
  }

  // 2. (0, 0) 위치로 청소년 상어가 들어옴
  let maxScore = 0;

  const eatenFish = spaces[sr][sc];
  const initialScore = eatenFish.getNo();
  maxScore += initialScore;

  spaces[sr][sc].setNo(SPACE_TYPE.SHARK);
  spaces[sr][sc].setDirection(eatenFish.getDirection());
  fishPositions.delete(initialScore);

  // 3. dfs
  const dfs = (spaces, fishPositions, currentScore, sharkPosition) => {
    maxScore = Math.max(maxScore, currentScore);

    const nextSpaces = copySpaces(spaces);
    const nextFishPositions = new Map(fishPositions);

    moveFishes(nextSpaces, nextFishPositions, sharkPosition);

    const sharkDirection = nextSpaces[sharkPosition.r][sharkPosition.c].getDirection();

    for (let step = 1; step <= 3; step++) {
      const nr = sharkPosition.r + directions[sharkDirection][0] * step;
      const nc = sharkPosition.c + directions[sharkDirection][1] * step;

      if (nr < 0 || nr >= nextSpaces.length || nc < 0 || nc >= nextSpaces.length) continue;

      if (nextSpaces[nr][nc].getNo() > SPACE_TYPE.EMPTY) {
        const nextStepSpaces = copySpaces(nextSpaces);
        const nextStepFishPositions = new Map(nextFishPositions);

        const eatenFishNo = nextStepSpaces[nr][nc].getNo();
        nextStepSpaces[sharkPosition.r][sharkPosition.c].setNo(SPACE_TYPE.EMPTY);
        nextStepSpaces[nr][nc].setNo(SPACE_TYPE.SHARK);

        nextStepFishPositions.delete(eatenFishNo);

        const nextSharkPosition = { r: nr, c: nc };
        dfs(nextStepSpaces, nextStepFishPositions, currentScore + eatenFishNo, nextSharkPosition);
      }
    }
  };

  dfs(spaces, fishPositions, initialScore, { r: sr, c: sc });

  return maxScore;
}

const answer = solution(spaces, 0, 0);
console.log(answer);
