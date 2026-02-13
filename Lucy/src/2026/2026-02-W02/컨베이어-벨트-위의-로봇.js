// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ===== init input
const [n, k] = input[0].split(" ").map(Number);
const a = input[1].split(" ").map(Number);

// ===== solution
function solution(n, k, a) {
  const UP_LOCATION = 0;
  const DOWN_LOCATION = n - 1;

  const robots = Array.from({ length: n }, () => false);
  let step = 0;

  const rotate = () => {
    a.unshift(a.pop());
    for (let i = n - 1; i > 0; i--) {
      robots[i] = robots[i - 1];
    }

    robots[UP_LOCATION] = false;
    robots[DOWN_LOCATION] = false;
  };

  const move = () => {
    for (let i = n - 2; i >= 0; i--) {
      if (robots[i] && a[i + 1] > 0 && !robots[i + 1]) {
        robots[i] = false;
        robots[i + 1] = true;
        a[i + 1]--;

        if (i + 1 === n - 1) robots[i + 1] = false;
      }
    }
  };

  const load = () => {
    if (a[UP_LOCATION] > 0) {
      robots[0] = true;
      a[0]--;
    }
  };

  const countZero = () => {
    const count = a.reduce((prev, curr) => (curr === 0 ? prev + 1 : prev), 0);

    return count;
  };

  while (true) {
    step++;

    rotate();
    move();
    load();

    const zeroCount = countZero();
    if (zeroCount >= k) return step;
  }
}

const answer = solution(n, k, a);
console.log(answer);
