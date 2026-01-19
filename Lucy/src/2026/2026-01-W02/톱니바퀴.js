// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// constants
const POLE_TYPE = {
  N: 0,
  S: 1,
};

const ROTATION_TYPE = {
  CLOCKWISE: 1,
  COUNTER_CLOCKWISE: -1,
};

// input parsing
const wheels = input.slice(0, 4).map((text) => text.split("").map(Number));
const k = Number(input[4]);
const commands = input.slice(5).map((text) => text.split(" ").map(Number));

function getRotationDirs(wheels, startWheelIndex, startDir) {
  const dirs = [0, 0, 0, 0];
  dirs[startWheelIndex] = startDir;

  for (let left = startWheelIndex - 1; left >= 0; left--) {
    const current = left + 1;

    if (wheels[left][2] === wheels[current][6]) break;

    dirs[left] = -dirs[current];
  }

  for (let right = startWheelIndex + 1; right < 4; right++) {
    const current = right - 1;

    if (wheels[current][2] === wheels[right][6]) break;

    dirs[right] = -dirs[current];
  }

  return dirs;
}

function rotateWheels(wheels, dirs) {
  for (let i = 0; i < 4; i++) {
    const rotation = dirs[i];
    const wheel = wheels[i];

    if (rotation === ROTATION_TYPE.CLOCKWISE) {
      const last = wheel.pop();
      wheel.unshift(last);
    } else if (rotation === ROTATION_TYPE.COUNTER_CLOCKWISE) {
      const first = wheel.shift();
      wheel.push(first);
    }
  }
}

function getTotalScore(wheels) {
  let score = 0;

  for (let i = 0; i < wheels.length; i++) {
    const currentWheel = wheels[i];

    score = score + (currentWheel[0] === POLE_TYPE.S ? 2 ** i : 0);
  }

  return score;
}

// solution
function solution(wheels, commands) {
  for (const [wheelNumber, rotationType] of commands) {
    const dirs = getRotationDirs(wheels, wheelNumber - 1, rotationType);

    rotateWheels(wheels, dirs);
  }

  let totalScore = getTotalScore(wheels);

  return totalScore;
}

// output
const answer = solution(wheels, commands);
console.log(answer);
