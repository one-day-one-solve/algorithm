// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ----- init inputs
const [n, m, fuel] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + n).map((text) => text.split(" ").map(Number));
const [tr, tc] = input[1 + n].split(" ").map((no) => Number(no) - 1);
const passengers = input.slice(1 + n + 1).map((text) => {
  const [sr, sc, er, ec] = text.split(" ").map(Number);

  return [sr - 1, sc - 1, er - 1, ec - 1];
});

// ----- constants
const CELL_TYPE = {
  EMPTY: 0,
  WALL: 1,
};

const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

// ----- functions
function findClosestPassenger(map, remaining, tr, tc) {
  let closestPassenger = null;

  const queue = [[tr, tc, 0]];
  let pointer = 0;

  const visited = new Set(); // `r,c`
  visited.add(`${tr},${tc}`);

  while (pointer < queue.length) {
    const [cr, cc, cd] = queue[pointer++];

    if (closestPassenger !== null && cd > closestPassenger.dist) break;

    const idx = remaining.findIndex(([sr, sc]) => sr === cr && sc === cc);
    if (idx !== -1) {
      if (
        closestPassenger === null ||
        cd < closestPassenger.dist ||
        (cd === closestPassenger.dist && cr < closestPassenger.r) ||
        (cd === closestPassenger.dist && cr === closestPassenger.r && cc < closestPassenger.c)
      ) {
        closestPassenger = {
          index: idx,
          dist: cd,
          r: cr,
          c: cc,
        };
      }
    }

    for (const [dr, dc] of DIRECTIONS) {
      const [nr, nc] = [dr + cr, dc + cc];

      if (nr >= 0 && nr < map.length && nc >= 0 && nc < map[0].length && !visited.has(`${nr},${nc}`) && map[nr][nc] !== CELL_TYPE.WALL) {
        visited.add(`${nr},${nc}`);
        queue.push([nr, nc, cd + 1]);
      }
    }
  }

  return closestPassenger;
}

function findDistanceTo(map, sr, sc, er, ec) {
  const queue = [[sr, sc, 0]];
  let pointer = 0;

  const visited = new Set(); // `r, c`
  visited.add(`${sr},${sc}`);

  while (pointer < queue.length) {
    const [cr, cc, cd] = queue[pointer++];

    if (cr === er && cc === ec) return cd;

    for (const [dr, dc] of DIRECTIONS) {
      const [nr, nc] = [dr + cr, dc + cc];

      if (nr >= 0 && nr < map.length && nc >= 0 && nc < map[0].length && !visited.has(`${nr},${nc}`) && map[nr][nc] !== CELL_TYPE.WALL) {
        visited.add(`${nr},${nc}`);
        queue.push([nr, nc, cd + 1]);
      }
    }
  }

  return -1;
}

// ----- solution
function solution(n, m, fuel, map, tr, tc, passengers) {
  let currentFuel = fuel;
  let remaining = [...passengers];
  let [taxiR, taxiC] = [tr, tc];

  while (remaining.length > 0) {
    // 현재 택시 위치에서 가장 가까운 승객 찾기
    const result = findClosestPassenger(map, remaining, taxiR, taxiC);
    if (result === null) return -1;

    // 연료 소모 체크
    currentFuel -= result.dist;
    if (currentFuel < 0) return -1;

    // 승객 픽업 후 목적지까지 최단 거리로 이동
    const [_, __, er, ec] = remaining[result.index];
    const distToDest = findDistanceTo(map, result.r, result.c, er, ec);
    if (distToDest === -1 || currentFuel < distToDest) return -1;

    currentFuel -= distToDest;

    // 연료 충전
    currentFuel += distToDest * 2;
    [taxiR, taxiC] = [er, ec];

    // remaining에서 승객 제거, 택시 위치 업데이트
    remaining.splice(result.index, 1);
  }

  return currentFuel;
}

// ----- print output
const answer = solution(n, m, fuel, map, tr, tc, passengers);
console.log(answer);
