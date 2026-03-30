// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ----- init inputs
const n = Number(input[0]);
const spaces = input.slice(1).map((text) => text.split(" ").map(Number));

// ----- constants
const CELL_TYPE = {
    EMPTY: 0,
    BABYSHARK: 9
}

const DIRECTIONS = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
]

// ----- classes
class Shark {
    constructor(size = 2, eatCount = 0){
        this.size = size;
        this.eatCount = eatCount;
    }

    eatFish() {
        this.eatCount++;

        if(this.eatCount === this.size) {
            this.size++;
            this.eatCount = 0;
        }
    }
}

// ----- functions
function findShark(n, spaces) {
    for(let r = 0; r < n; r++) {
        for(let c = 0; c < n; c++) {
            if(spaces[r][c] === CELL_TYPE.BABYSHARK) {
                return [r, c];
            }
        }
    }
}

function bfs(n, r, c, shark, spaces) {
    const queue = [[r, c, 0]];
    let pointer = 0;

    const visited = Array.from({length: n}, () => Array(n).fill(false));
    visited[r][c] = true;

    let eatableFishes = [];
    let minDistance = Infinity;

    while(pointer < queue.length) {
        const [cr, cc, cd] = queue[pointer++];

        if(cd >= minDistance) continue; // 이러면 같은 거리에 있는 물고기들을 못찾지 않나?

        for(const [dr, dc] of DIRECTIONS) {
            const [nr, nc] = [dr + cr, dc + cc];

            if(nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc] && spaces[nr][nc] <= shark.size) {
                visited[nr][nc] = true;
                queue.push([nr, nc, cd + 1]);

                if(spaces[nr][nc] < shark.size && spaces[nr][nc] !== CELL_TYPE.EMPTY) {
                    if(minDistance > cd + 1) {
                        eatableFishes = [[nr, nc, cd + 1]];
                        minDistance = cd + 1;
                    } else if(minDistance === cd + 1) {
                        eatableFishes.push([nr, nc, cd + 1]);
                    }
                    
                }
            }
        }
    }

    if(eatableFishes.length === 0) return null;

    eatableFishes.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    return eatableFishes[0];
}

// ----- solution
function solution(n, spaces){
    const babyshark = new Shark();
    let time = 0;

    let [cr, cc] = findShark(n, spaces);
    spaces[cr][cc] = CELL_TYPE.EMPTY;

    while(true) {
        const result = bfs(n, cr, cc, babyshark, spaces);

        if(!result) break;

        const [r, c, d] = result;
        time += d;
        spaces[r][c] = 0;
        [cr, cc] = [r, c];

        babyshark.eatFish();
    }

    return time;
}

// ----- print outputs
const answer = solution(n, spaces);
console.log(answer);