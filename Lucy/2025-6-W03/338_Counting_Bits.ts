// 25ms...
function countBits(n: number): number[] {
  const answer = Array(n + 1).fill(0);

  for (let i = 0; i < n + 1; i++) {
    answer[i] = [...i.toString(2)].filter((numStr) => numStr === "1").length;
  }

  return answer;
}

// - 모범 답안: 1ms
function countBits(n: number): number[] {
  const answer = Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    answer[i] = answer[i >> 1] + (i & 1);
  }

  return answer;
}
