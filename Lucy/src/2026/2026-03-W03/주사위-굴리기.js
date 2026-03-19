// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ----- init input
const [n, m, x, y, k] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + n).map((text) => text.split(" ").map(Number));
const commands = input[1 + n].split(" ").map(Number);

// ----- constants
const COMMAND_TYPE = {
  EAST: 1,
  WEST: 2,
  NORTH: 3,
  SOUTH: 4,
};

const DIRECTIONS = {
  [COMMAND_TYPE.EAST]: [0, 1],
  [COMMAND_TYPE.WEST]: [0, -1],
  [COMMAND_TYPE.NORTH]: [-1, 0],
  [COMMAND_TYPE.SOUTH]: [1, 0],
};

// ----- function
function roll(dice, command) {
  const [top, bottom, north, south, east, west] = dice;

  if (command === COMMAND_TYPE.EAST) {
    const [newTop, newBottom, newEast, newWest] = [west, east, top, bottom];

    return [newTop, newBottom, north, south, newEast, newWest];
  } else if (command === COMMAND_TYPE.WEST) {
    const [newTop, newBottom, newEast, newWest] = [east, west, bottom, top];

    return [newTop, newBottom, north, south, newEast, newWest];
  } else if (command === COMMAND_TYPE.NORTH) {
    const [newTop, newBottom, newNorth, newSouth] = [south, north, top, bottom];

    return [newTop, newBottom, newNorth, newSouth, east, west];
  } else if (command === COMMAND_TYPE.SOUTH) {
    const [newTop, newBottom, newNorth, newSouth] = [north, south, bottom, top];

    return [newTop, newBottom, newNorth, newSouth, east, west];
  }
}

// ----- solution
function solution(n, m, x, y, k, map, commands) {
  let dice = Array.from({ length: 6 }, () => 0); // [top, botton, north, south, east, west]
  let [cx, cy] = [x, y];

  const results = [];

  for (const command of commands) {
    const [dx, dy] = DIRECTIONS[command];
    const [nx, ny] = [cx + dx, cy + dy];

    if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

    [cx, cy] = [nx, ny];
    dice = roll(dice, command);

    if (map[cx][cy] === 0) {
      map[cx][cy] = dice[1];
    } else {
      dice[1] = map[cx][cy];
      map[cx][cy] = 0;
    }

    results.push(dice[0]);
  }

  return results.join("\n");
}

// ----- answer
const answer = solution(n, m, x, y, k, map, commands);
console.log(answer);
