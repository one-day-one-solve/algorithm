// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

const N = Number(input[0]);
const A = input[1].split(" ").map(Number);
const [B, C] = input[2].split(" ").map(Number);

// console.log(N, A, B, C);

function solution(n, a, b, c) {
  let mainDirector = 0;
  let subDirector = 0;

  for (let i = 0; i < n; i++) {
    a[i] = Math.max(0, a[i] - b);
    mainDirector++;

    if (a[i] > 0) {
      const needSubDirector = Math.ceil(a[i] / c);
      subDirector += needSubDirector;
    }
  }

  return mainDirector + subDirector;
}

const answer = solution(N, A, B, C);
console.log(answer);
