// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ----- init inputs
const [n, m] = input[0].split(" ").map(Number);
const map = input.slice(1).map((text) => text.split(""));

// ----- constants
const CELL_TYPE = {
    EMPTY: '.',
    WALL: '#',
    HOLE: 'O',
    RED_MARBLE: 'R',
    BLUE_MARBLE: 'B'
}

const DIRECTIONS = [
    [-1, 0], // 위로 기울이기
    [1, 0], // 아래로 기울이기
    [0, -1], // 좌로 기울이기
    [0, 1], // 우로 기울이기
]

// ----- function
function findPosition(map) {
    const positionMap = {};

    for(let r = 0; r < n; r++) {
        for(let c = 0; c < m; c++) {
            if(map[r][c] === CELL_TYPE.RED_MARBLE) {
                positionMap['red']= {r, c};
            } else if(map[r][c] === CELL_TYPE.BLUE_MARBLE) {
                positionMap['blue']= {r, c};
            } else if(map[r][c] === CELL_TYPE.HOLE) {
                positionMap['hole']= {r, c};
            }
        }
    }

    return positionMap;
}

function move(map, r, c, dr, dc){
    let [cr, cc] = [r, c];
    let isFallen = false;
    let count = 0;

    while(map[cr + dr][cc + dc] !== CELL_TYPE.WALL) {
        [cr, cc] = [dr + cr, dc + cc];
        count++;

        if(map[cr][cc] === CELL_TYPE.HOLE) {
            isFallen = true;
            break;
        }
    }

    return {r: cr, c:cc, isFallen, count};
}

// ----- solution
function solution(n, m, map){
    const {red, blue, hole} = findPosition(map);

    const bfs = (rr, rc, br, bc) => {
        const queue = [];
        queue.push({rr, rc, br, bc, depth: 0});
        let pointer = 0;

        const visited = new Set();
        visited.add(`${rr},${rc},${br},${bc}`);

        while(pointer < queue.length) {
            const {rr, rc, br, bc, depth} = queue[pointer++];

            for(const [dr, dc] of DIRECTIONS) {
                const nRed = move(map, rr, rc, dr, dc);
                const nBlue = move(map, br, bc, dr, dc);

                if(nBlue.isFallen) continue;
                if(nRed.isFallen) return depth + 1;

                if(nRed.r === nBlue.r && nRed.c === nBlue.c) {
                    if(nRed.count > nBlue.count) {
                        nRed.r -= dr;
                        nRed.c -= dc;
                    } else {
                        nBlue.r -= dr;
                        nBlue.c -= dc;
                    }
                }

                if(!visited.has(`${nRed.r},${nRed.c},${nBlue.r},${nBlue.c}`) && depth + 1 < 10){
                    visited.add(`${nRed.r},${nRed.c},${nBlue.r},${nBlue.c}`);
                    queue.push({rr: nRed.r, rc: nRed.c, br: nBlue.r, bc: nBlue.c, depth: depth + 1});
                }
            }
        }

        return -1;
    }

    return bfs(red.r, red.c, blue.r, blue.c);
}

// ----- print output
const answer = solution(n, m, map);
console.log(answer);