// const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString().trim().split("\n");

// ----- init input
const n = Number(input[0]);
const s = input.slice(1).map((text) => text.split(" ").map(Number));

// ----- constants

// ----- solution
function solution(n, s) {
  const getCombination = () => {
    const results = [];

    const backtrack = (start, currentTeam, countPerson) => {
      if (countPerson === n / 2) {
        results.push([...currentTeam]);
        return;
      }

      for (let i = start; i < n; i++) {
        currentTeam.push(i);
        backtrack(i + 1, currentTeam, countPerson + 1);
        currentTeam.pop();
      }
    };

    backtrack(0, [], 0);

    return results;
  };

  const getTeamStats = (team) => {
    const teamLen = team.length;

    let ability = 0;

    for (let i = 0; i < teamLen; i++) {
      for (let j = i + 1; j < teamLen; j++) {
        ability += s[team[i]][team[j]] + s[team[j]][team[i]];
      }
    }

    return ability;
  };

  const starkTeamCombination = getCombination();
  let min = Infinity;

  for (const starkTeam of starkTeamCombination) {
    const linkTeam = Array.from({ length: n }, (_, i) => i).filter((player) => !starkTeam.includes(player));

    const startAbility = getTeamStats(starkTeam);
    const linkAbility = getTeamStats(linkTeam);

    const diff = Math.abs(startAbility - linkAbility);

    min = Math.min(min, diff);
  }

  return min;
}

// ----- answer
const answer = solution(n, s);
console.log(answer);
