// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ----- init inputs
const [n, k] = input[0].split(" ").map(Number);
const fishTanks = input[1].split(" ").map(Number);

// ----- constants
const DIRECTIONS = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
]

// ----- functions
function feedFishes(board){
    const minFish = Math.min(...board.flat());

    return board.map((fish) => {
        if(fish[0] === minFish) return [fish[0] + 1];
        return [fish[0]];
    })
}

function rollBowls(board){
    const firstBowl = board.shift();
    board[0].push(...firstBowl);

    while(true){
        let floatWidth = board.findIndex(col => col.length === 1);
        if(floatWidth === -1) floatWidth = board.length;

        const floatHeight = board[0].length;

        const leftBottomWidth = board.length - floatWidth;

        if(floatHeight > leftBottomWidth) break;

        const floatingBlock = board.splice(0, floatWidth);

        for(let c = floatWidth - 1; c >= 0; c--) {
            for(let r = 0; r < floatHeight; r++) {
                board[r].push(floatingBlock[c][r]);
            }
        }
    }

    return board;
}

function balanceFishes(board){
    const diff = board.map((col) => new Array(col.length).fill(0));

    for(let c = 0; c < board.length; c++) {
        for(let r = 0; r < board[c].length; r++) {
            for(const [dr, dc] of DIRECTIONS) {
                const [nx, ny] = [c + dc, r + dr];

                if(nx < 0 || nx >= board.length || ny < 0 || ny >= board[nx].length) continue;

                if(board[c][r] > board[nx][ny]) {
                    const difference = board[c][r] - board[nx][ny];
                    const givercount = Math.floor(difference / 5);

                    if(givercount > 0) {
                        diff[c][r] -= givercount;
                        diff[nx][ny] += givercount;
                    }
                }
            }
        }
    }

    for(let c = 0; c < board.length; c++) {
        for(let r = 0; r < board[c].length; r++) {
            board[c][r] += diff[c][r];
        }
    }

    return board;
}

function flattenBowls(board){
    const newBoard = [];

    for(const col of board) {
        for(const fish of col) {
            newBoard.push([fish]);
        }    
    }

    return newBoard;
}

function foldBowls(board){
    for(let count = 0; count < 2; count++) {
        const half = board.splice(0, Math.floor(board.length / 2));

        const rotated = half.reverse().map(col => col.reverse());

        for(let i = 0; i < board.length; i++) {
            board[i].push(...rotated[i]);
        }
    }

    return board;
    
}

function checkIsDone(board, k){
    let minFish = Infinity;
    let maxFish = -Infinity;

    for(const fish of board) {
        const current = fish[0];

        minFish = Math.min(minFish, current);
        maxFish = Math.max(maxFish, current);
    }

    return Math.abs(maxFish - minFish) <= k;
}

// ----- solution
function solution(n, k, fishTanks){
    let turn = 0;

    let board = fishTanks.map(fish => [fish]);

    while(true) {
        if(checkIsDone(board, k)) break;

        turn++;

        board = feedFishes(board);
        board = rollBowls(board);
        board = balanceFishes(board);
        board = flattenBowls(board);
        board = foldBowls(board);
        board = balanceFishes(board);
        board = flattenBowls(board);
    }

    return turn;
}

// ----- print output
const answer = solution(n, k, fishTanks);
console.log(answer);