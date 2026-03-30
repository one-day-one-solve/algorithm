// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ----- init inputs
const [n, m, h] = input[0].split(" ").map(Number);
const rows = input.slice(1, m + 1).map((text) => text.split(" ").map(Number));

// ----- constants
const MAXIMUM_EXTRA_LADDER = 3;

// ----- functions

function isCorrect(ladder){
    for(let i = 1; i <= n; i++) {
        let curr = i;

        for(let j = 1; j <= h; j++) {
            if(ladder[j][curr]) curr++;
            else if(ladder[j][curr - 1]) curr--;
        }

        if(curr !== i) return false;
    }

    return true;
}

// ----- solution
function solution(n, m, h, rows) {
    const ladder = Array.from({length: h + 1}, () => Array(n + 1).fill(false));
    rows.forEach(([a, b]) => ladder[a][b] = true);

    const backtrack = (count, startRow, limit) => {
        if(count === limit) return isCorrect(ladder);

        for(let r = startRow; r <= h; r++) {
            for(let c = 1; c < n; c++) {
                if(!ladder[r][c] && !ladder[r][c - 1] && !ladder[r][c + 1]) {
                    ladder[r][c] = true;
                    if(backtrack(count + 1, r, limit)) return true;
                    ladder[r][c] = false;
                }
            }
        }

        return false;
    }

    for(let limit = 0; limit <= MAXIMUM_EXTRA_LADDER; limit++) {
        if(backtrack(0, 1, limit)) return limit;
    }

    return -1;
}

// ----- print output
const answer = solution(n, m, h, rows);
console.log(answer);