// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

const N = Number(input[0]);
const T = Array.from({ length: N }, () => 0);
const P = Array.from({ length: N }, () => 0);

for (let i = 1; i < N + 1; i++) {
  const [t, p] = input[i].split(" ").map(Number);
  T[i - 1] = t;
  P[i - 1] = p;
}

function solution(n, t, p) {
  const dp = Array.from({ length: n + 1 }, () => 0);
  dp[n] = 0; // 퇴사일

  for (let i = n - 1; i >= 0; i--) {
    const time = t[i];
    const pay = p[i];
    const nextDay = i + time;

    if (nextDay > n) {
      dp[i] = dp[i + 1];
    } else {
      dp[i] = Math.max(dp[i + 1], dp[nextDay] + pay);
    }
  }

  return dp[0];
}

const answer = solution(N, T, P);
console.log(answer);
