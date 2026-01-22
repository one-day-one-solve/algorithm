// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

const dice = input[0].split(" ").map(Number);
const END_SCORE = -1;

class Square {
  score;
  next;
  blueArrow;

  constructor(score, next, blueArrow) {
    this.score = score;
    this.next = next;
    this.blueArrow = blueArrow;
  }
}

function initBoard() {
  const nodes = [];

  // 1. 노드 생성 (총 33개)
  // 인덱스 0 ~ 20: 시작부터 40점까지 (메인 경로)
  for (let i = 0; i <= 20; i++) nodes.push(new Square(i * 2, null, null));

  // 인덱스 21: 도착 (End)
  nodes.push(new Square(END_SCORE, null, null));

  // 인덱스 22 ~ 24: 10번 파란길 (13, 16, 19)
  for (const score of [13, 16, 19]) nodes.push(new Square(score, null, null));

  // 인덱스 25 ~ 26: 20번 파란길 (22, 24)
  for (const score of [22, 24]) nodes.push(new Square(score, null, null));

  // 인덱스 27 ~ 29: 30번 파란길 (28, 27, 26)
  for (const score of [28, 27, 26]) nodes.push(new Square(score, null, null));

  // 인덱스 30 ~ 32: 중앙 안쪽길 (25, 30, 35)
  for (const score of [25, 30, 35]) nodes.push(new Square(score, null, null));

  // 2. 경로 연결 (Wiring)
  // 헬퍼 함수: 범위 내 노드들을 순서대로 연결
  const connect = (from, to) => {
    for (let i = from; i < to; i++) nodes[i].next = nodes[i + 1];
  };

  // 주요 지점(Key Points) 별칭 붙이기
  const startNode = nodes[0];
  const node10 = nodes[5]; // 10점 (파란 화살표)
  const node20 = nodes[10]; // 20점 (파란 화살표)
  const node30 = nodes[15]; // 30점 (파란 화살표)
  const node40 = nodes[20]; // 40점 (안쪽/바깥쪽 모두 모이는 곳)
  const endNode = nodes[21]; // 도착

  const centerStart = nodes[30]; // 25점 (모든 파란길이 모이는 곳)
  const centerEnd = nodes[32]; // 35점 (40점으로 가기 직전)

  // [메인 경로] 바깥쪽 크게 도는 길
  connect(0, 20); // 0 -> ... -> 40
  node40.next = endNode; // 40 -> 도착

  // [중앙 경로] 25 -> 30 -> 35 -> 40
  connect(30, 32); // 25 -> 30 -> 35
  centerEnd.next = node40; // 35 -> 40

  // [파란 경로 1] 10 -> 13 -> 16 -> 19 -> 25
  node10.blueArrow = nodes[22];
  connect(22, 24); // 13 -> 16 -> 19
  nodes[24].next = centerStart; // 19 -> 25

  // [파란 경로 2] 20 -> 22 -> 24 -> 25
  node20.blueArrow = nodes[25];
  connect(25, 26); // 22 -> 24
  nodes[26].next = centerStart; // 24 -> 25

  // [파란 경로 3] 30 -> 28 -> 27 -> 26 -> 25
  node30.blueArrow = nodes[27];
  connect(27, 29); // 28 -> 27 -> 26
  nodes[29].next = centerStart; // 26 -> 25

  return nodes;
}

function getNextPosition(moveCount, currentPiece) {
  let nextPosition = currentPiece;

  if (nextPosition.blueArrow !== null) {
    nextPosition = nextPosition.blueArrow;
    moveCount--;
  }

  while (moveCount > 0) {
    if (nextPosition.next === null) {
      return nextPosition;
    }

    nextPosition = nextPosition.next;

    moveCount--;
  }

  return nextPosition;
}

function solution(dice) {
  const board = initBoard();

  const start = board[0];
  const end = board[21];
  const pieces = [start, start, start, start];

  let maxScore = 0;
  const dfs = (turn, scoreSum, currentPieces) => {
    if (turn > 9) {
      maxScore = Math.max(maxScore, scoreSum);
      return;
    }

    for (let i = 0; i < 4; i++) {
      const piece = currentPieces[i];

      if (piece === end) continue;

      const nextPosition = getNextPosition(dice[turn], piece);

      if (nextPosition !== end) {
        const isOccupied = currentPieces.some((piece, index) => index !== i && piece === nextPosition);

        if (isOccupied) continue;
      }

      const newPieces = [...currentPieces];
      newPieces[i] = nextPosition;

      const addedScore = nextPosition.score === END_SCORE ? 0 : nextPosition.score;

      dfs(turn + 1, scoreSum + addedScore, newPieces);
    }
  };

  dfs(0, 0, pieces);

  return maxScore;
}

const answer = solution(dice);
console.log(answer);
