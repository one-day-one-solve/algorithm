// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

const N = Number(input[0]);

const students = [];
for (let i = 1; i < input.length; i++) {
  const [studentNumber, ...likeNumbers] = input[i].split(" ").map(Number);
  students.push({ studentNumber, likeNumbers });
}

const EMPTY = -1;
const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function setSeat(n, classRoom, students) {
  for (const student of students) {
    let bestRow = 0;
    let bestCol = 0;
    let maxLike = -1;
    let maxEmpty = -1;

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        let likeCount = 0;
        let emptyCount = 0;

        if (classRoom[r][c] !== EMPTY) continue;

        for (const [dr, dc] of directions) {
          const [nr, nc] = [dr + r, dc + c];

          if (!isValidPosition(n, nr, nc)) continue;

          if (student.likeNumbers.includes(classRoom[nr][nc])) {
            likeCount++;
          }

          if (classRoom[nr][nc] === EMPTY) emptyCount++;
        }

        if (likeCount > maxLike) {
          maxLike = likeCount;
          maxEmpty = emptyCount;
          bestRow = r;
          bestCol = c;
        } else if (likeCount === maxLike && emptyCount > maxEmpty) {
          maxEmpty = emptyCount;
          bestRow = r;
          bestCol = c;
        }
      }
    }

    classRoom[bestRow][bestCol] = student.studentNumber;
  }
}

function getSatisfaction(likeCount) {
  switch (likeCount) {
    case 0: {
      return 0;
    }
    case 1: {
      return 1;
    }
    case 2: {
      return 10;
    }
    case 3: {
      return 100;
    }
    case 4: {
      return 1000;
    }
  }

  return 0;
}

function getTotalSatisfaction(n, classRoom, students) {
  let satisfaction = 0;

  for (let r = 0; r < classRoom.length; r++) {
    for (let c = 0; c < classRoom[r].length; c++) {
      const currentStudent = classRoom[r][c];
      const likeStudents = students.find((student) => student.studentNumber === currentStudent).likeNumbers;

      let likeCount = 0;

      for (const [dr, dc] of directions) {
        const [nr, nc] = [dr + r, dc + c];

        if (!isValidPosition(n, nr, nc)) continue;

        if (likeStudents.includes(classRoom[nr][nc])) {
          likeCount++;
        }
      }

      satisfaction += getSatisfaction(likeCount);
    }
  }

  return satisfaction;
}

function isValidPosition(n, r, c) {
  return r >= 0 && r < n && c >= 0 && c < n;
}

function solution(n, students) {
  const classRoom = Array.from({ length: n }, () => new Array(n).fill(EMPTY));

  setSeat(n, classRoom, students);

  const totalSatisfaction = getTotalSatisfaction(n, classRoom, students);

  return totalSatisfaction;
}

const answer = solution(N, students);
console.log(answer);
