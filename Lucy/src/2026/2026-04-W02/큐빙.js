// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ----- init inputs
const t = Number(input[0]);
const cmds = [];
let idx = 1;
for (let i = 0; i < t; i++) {
  const n = Number(input[idx]);
  const command = input[idx + 1].split(" ");
  cmds.push({ n, command });

  idx += 2;
}

// ----- constants
const CUBE_TYPE = {
  UP: "U",
  DOWN: "D",
  FRONT: "F",
  BACK: "B",
  LEFT: "L",
  RIGHT: "R",
};

const COLOR_TYPE = {
  WHITE: "w",
  YELLOW: "y",
  RED: "r",
  ORANGE: "o",
  GREEN: "g",
  BLUE: "b",
};

const ROTATION_TYPE = {
  CLOCKWISE: "+",
  ANTI_CLOCKWISE: "-",
};

// ----- functions
function initCube() {
  return {
    [CUBE_TYPE.UP]: Array.from({ length: 3 }, () => Array(3).fill(COLOR_TYPE.WHITE)),
    [CUBE_TYPE.DOWN]: Array.from({ length: 3 }, () => Array(3).fill(COLOR_TYPE.YELLOW)),
    [CUBE_TYPE.FRONT]: Array.from({ length: 3 }, () => Array(3).fill(COLOR_TYPE.RED)),
    [CUBE_TYPE.BACK]: Array.from({ length: 3 }, () => Array(3).fill(COLOR_TYPE.ORANGE)),
    [CUBE_TYPE.LEFT]: Array.from({ length: 3 }, () => Array(3).fill(COLOR_TYPE.GREEN)),
    [CUBE_TYPE.RIGHT]: Array.from({ length: 3 }, () => Array(3).fill(COLOR_TYPE.BLUE)),
  };
}

// ----- functions (구현 필요)
function rotateFaceMatrix(face) {
  const newFace = Array.from({ length: 3 }, () => Array(3).fill(0));

  // 3x3 배열을 시계방향 90도 회전
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      newFace[c][2 - r] = face[r][c];
    }
  }

  return newFace;
}

function shiftAdjacentEdges(cube, face) {
  // 해당 face 회전 시 인접한 4개 면의 가장자리를 연쇄적으로 밀기

  let temp = null;
  switch (face) {
    case CUBE_TYPE.UP:
      temp = [...cube[CUBE_TYPE.FRONT][0]];
      cube[CUBE_TYPE.FRONT][0] = [...cube[CUBE_TYPE.RIGHT][0]];
      cube[CUBE_TYPE.RIGHT][0] = [...cube[CUBE_TYPE.BACK][0]];
      cube[CUBE_TYPE.BACK][0] = [...cube[CUBE_TYPE.LEFT][0]];
      cube[CUBE_TYPE.LEFT][0] = temp;

      break;
    case CUBE_TYPE.DOWN:
      temp = [...cube[CUBE_TYPE.FRONT][2]];
      cube[CUBE_TYPE.FRONT][2] = [...cube[CUBE_TYPE.LEFT][2]];
      cube[CUBE_TYPE.LEFT][2] = [...cube[CUBE_TYPE.BACK][2]];
      cube[CUBE_TYPE.BACK][2] = [...cube[CUBE_TYPE.RIGHT][2]];
      cube[CUBE_TYPE.RIGHT][2] = temp;

      break;
    case CUBE_TYPE.FRONT:
      temp = [cube[CUBE_TYPE.UP][2][0], cube[CUBE_TYPE.UP][2][1], cube[CUBE_TYPE.UP][2][2]];
      cube[CUBE_TYPE.UP][2][0] = cube[CUBE_TYPE.LEFT][2][2];
      cube[CUBE_TYPE.UP][2][1] = cube[CUBE_TYPE.LEFT][1][2];
      cube[CUBE_TYPE.UP][2][2] = cube[CUBE_TYPE.LEFT][0][2];

      cube[CUBE_TYPE.LEFT][0][2] = cube[CUBE_TYPE.DOWN][0][0];
      cube[CUBE_TYPE.LEFT][1][2] = cube[CUBE_TYPE.DOWN][0][1];
      cube[CUBE_TYPE.LEFT][2][2] = cube[CUBE_TYPE.DOWN][0][2];

      cube[CUBE_TYPE.DOWN][0][0] = cube[CUBE_TYPE.RIGHT][2][0];
      cube[CUBE_TYPE.DOWN][0][1] = cube[CUBE_TYPE.RIGHT][1][0];
      cube[CUBE_TYPE.DOWN][0][2] = cube[CUBE_TYPE.RIGHT][0][0];

      cube[CUBE_TYPE.RIGHT][0][0] = temp[0];
      cube[CUBE_TYPE.RIGHT][1][0] = temp[1];
      cube[CUBE_TYPE.RIGHT][2][0] = temp[2];

      break;
    case CUBE_TYPE.BACK:
      temp = [...cube[CUBE_TYPE.UP][0]];
      cube[CUBE_TYPE.UP][0][0] = cube[CUBE_TYPE.RIGHT][0][2];
      cube[CUBE_TYPE.UP][0][1] = cube[CUBE_TYPE.RIGHT][1][2];
      cube[CUBE_TYPE.UP][0][2] = cube[CUBE_TYPE.RIGHT][2][2];

      cube[CUBE_TYPE.RIGHT][0][2] = cube[CUBE_TYPE.DOWN][2][2];
      cube[CUBE_TYPE.RIGHT][1][2] = cube[CUBE_TYPE.DOWN][2][1];
      cube[CUBE_TYPE.RIGHT][2][2] = cube[CUBE_TYPE.DOWN][2][0];

      cube[CUBE_TYPE.DOWN][2][0] = cube[CUBE_TYPE.LEFT][0][0];
      cube[CUBE_TYPE.DOWN][2][1] = cube[CUBE_TYPE.LEFT][1][0];
      cube[CUBE_TYPE.DOWN][2][2] = cube[CUBE_TYPE.LEFT][2][0];

      cube[CUBE_TYPE.LEFT][0][0] = temp[2];
      cube[CUBE_TYPE.LEFT][1][0] = temp[1];
      cube[CUBE_TYPE.LEFT][2][0] = temp[0];

      break;
    case CUBE_TYPE.LEFT:
      temp = [cube[CUBE_TYPE.UP][0][0], cube[CUBE_TYPE.UP][1][0], cube[CUBE_TYPE.UP][2][0]];
      cube[CUBE_TYPE.UP][0][0] = cube[CUBE_TYPE.BACK][2][2];
      cube[CUBE_TYPE.UP][1][0] = cube[CUBE_TYPE.BACK][1][2];
      cube[CUBE_TYPE.UP][2][0] = cube[CUBE_TYPE.BACK][0][2];

      cube[CUBE_TYPE.BACK][0][2] = cube[CUBE_TYPE.DOWN][2][0];
      cube[CUBE_TYPE.BACK][1][2] = cube[CUBE_TYPE.DOWN][1][0];
      cube[CUBE_TYPE.BACK][2][2] = cube[CUBE_TYPE.DOWN][0][0];

      cube[CUBE_TYPE.DOWN][0][0] = cube[CUBE_TYPE.FRONT][0][0];
      cube[CUBE_TYPE.DOWN][1][0] = cube[CUBE_TYPE.FRONT][1][0];
      cube[CUBE_TYPE.DOWN][2][0] = cube[CUBE_TYPE.FRONT][2][0];

      cube[CUBE_TYPE.FRONT][0][0] = temp[0];
      cube[CUBE_TYPE.FRONT][1][0] = temp[1];
      cube[CUBE_TYPE.FRONT][2][0] = temp[2];
      break;
    case CUBE_TYPE.RIGHT:
      temp = [cube[CUBE_TYPE.UP][0][2], cube[CUBE_TYPE.UP][1][2], cube[CUBE_TYPE.UP][2][2]];
      cube[CUBE_TYPE.UP][0][2] = cube[CUBE_TYPE.FRONT][0][2];
      cube[CUBE_TYPE.UP][1][2] = cube[CUBE_TYPE.FRONT][1][2];
      cube[CUBE_TYPE.UP][2][2] = cube[CUBE_TYPE.FRONT][2][2];

      cube[CUBE_TYPE.FRONT][0][2] = cube[CUBE_TYPE.DOWN][0][2];
      cube[CUBE_TYPE.FRONT][1][2] = cube[CUBE_TYPE.DOWN][1][2];
      cube[CUBE_TYPE.FRONT][2][2] = cube[CUBE_TYPE.DOWN][2][2];

      cube[CUBE_TYPE.DOWN][0][2] = cube[CUBE_TYPE.BACK][2][0];
      cube[CUBE_TYPE.DOWN][1][2] = cube[CUBE_TYPE.BACK][1][0];
      cube[CUBE_TYPE.DOWN][2][2] = cube[CUBE_TYPE.BACK][0][0];

      cube[CUBE_TYPE.BACK][0][0] = temp[2];
      cube[CUBE_TYPE.BACK][1][0] = temp[1];
      cube[CUBE_TYPE.BACK][2][0] = temp[0];
      break;
  }
}

function rotateFace(cube, face, dir) {
  // dir: "+" → 시계방향 1회, "-" → 시계방향 3회 (반시계 = 시계 x3)
  const times = dir === ROTATION_TYPE.CLOCKWISE ? 1 : 3;

  for (let i = 0; i < times; i++) {
    const newFace = rotateFaceMatrix(cube[face]);
    cube[face] = newFace;

    shiftAdjacentEdges(cube, face);
  }
}

function getTopFaceResult(cube) {
  // U 면 3x3을 3줄짜리 문자열 배열로 반환

  return cube[CUBE_TYPE.UP].map((row) => row.join("")).join("\n");
}

// ----- solution
function solution(t, cmds) {
  const results = [];

  for (const { command } of cmds) {
    const cube = initCube();

    for (const cmd of command) {
      const face = cmd[0]; // "U", "D", "F", "B", "L", "R"
      const dir = cmd[1]; // "+" or "-"

      rotateFace(cube, face, dir);
    }

    results.push(getTopFaceResult(cube));
  }

  return results.join("\n");
}

// ----- print output
const answer = solution(t, cmds);
console.log(answer);
