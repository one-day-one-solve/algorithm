// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ----- init inputs
const n = Number(input[0]);
const a = input[1].split(" ").map(Number);
const operators = input[2].split(" ").map(Number); // [덧셈, 뺄셈, 곱셈, 나눗셈]

// ----- solution
function solution(n, a, operators) {
    let minVal = Infinity;
    let maxVal = -Infinity;

    const backtrack = (index, result, plus, minus, mul, div) => {
        if(index === n) {
            minVal = Math.min(minVal, result);
            maxVal = Math.max(maxVal, result);
            return;
        }

        // 어떻게 for문을 돌릴까?
        if(plus > 0) {
            backtrack(index + 1, result + a[index], plus - 1, minus, mul, div);
        }
        if(minus > 0) {
            backtrack(index + 1, result - a[index], plus, minus - 1, mul, div);
        }
        if(mul > 0) {
            backtrack(index + 1, result * a[index], plus, minus, mul - 1, div);
        }
        if(div > 0) {
            backtrack(index + 1, Math.trunc(result / a[index]), plus, minus, mul, div - 1);
        }
    }

    backtrack(1, a[0], ...operators);

    return [maxVal, minVal].join("\n")
}

// ----- print output
const answer = solution(n, a, operators);
console.log(answer);
