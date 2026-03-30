// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ----- init inputs
const [n, m] = input[0].split(" ").map(Number);
const a = input.slice(1, n + 1).map((text) => text.split(" ").map(Number));
const commands = input.slice(n + 1).map((text) => {
    const [d, s] = text.split(" ").map(Number);

    return [d - 1, s];
}); // [d, s][]

// ----- constants
const DIRECTIONS = [
    [0, -1],
    [-1, -1], // 대각선
    [-1, 0],
    [-1, 1], // 대각선
    [0, 1],
    [1, 1], // 대각선
    [1, 0],
    [1, -1] // 대각선
]

const INIT_CLOUD_POS = [
    [n - 1, 0],
    [n - 1, 1],
    [n - 2, 0],
    [n - 2, 1]
]

// ----- functions
function moveClouds(n, clouds, d, s){
    const [dr, dc] = DIRECTIONS[d];

    return clouds.map(([cr, cc]) => [
        ((cr + s * dr) % n + n) % n,
        ((cc + s * dc) % n + n) % n
    ])
}

function rain(a, clouds, visited){
    for(const [r, c] of clouds) {
        a[r][c] += 1;
        visited[r][c] = true;
    }
}

function copyWater(a, n, clouds){
    for(const [cr, cc] of clouds) {
        let countBasket = 0;

        for(const i of [1, 3, 5, 7]) {
            const [dr, dc] = DIRECTIONS[i];

            const [nr, nc] = [cr + dr, cc + dc];

            if(nr >= 0 && nr < n && nc >= 0 && nc < n && a[nr][nc] > 0) {
                countBasket++;
            }
        }

        a[cr][cc] += countBasket;
    }
}

function createClouds(a, n, visited){
    const nextClouds = [];
    for(let r = 0; r < n; r++) {
        for(let c = 0; c < n; c++) {
            if(a[r][c] >= 2 && !visited[r][c]) {
                a[r][c] -= 2;
                nextClouds.push([r, c]);
            }
        }
    }

    return nextClouds;
}

function calcTotalWater(a, n) {
    let totalWater = 0;
    for(let r = 0; r < n; r++) {
        for(let c = 0; c < n; c++) {
            totalWater += a[r][c];
        }
    }

    return totalWater;
}

// ----- solution
function solution(n, m, a, commands){
    let clouds = [...INIT_CLOUD_POS];

    for(const [d, s] of commands) {
        const visited = Array.from({length: n}, () => Array(n).fill(false));
        
        clouds = moveClouds(n, clouds, d, s);

        rain(a, clouds, visited);

        copyWater(a, n, clouds);

        clouds = createClouds(a, n, visited);
    }

    const totalWater = calcTotalWater(a, n);

    return totalWater;
}

// ----- print output
const answer = solution(n, m, a, commands);
console.log(answer);
