const MOD = 10 ** 9 + 7;

function zigZagArrays(n: number, l: number, r: number): number {
  const down = new Array<number>(r + 1).fill(0);
  const up = new Array<number>(r + 1).fill(0);
  const sumDown = new Array<number>(r + 2).fill(0);
  const sumUp = new Array<number>(r + 2).fill(0);

  // 값 초기화
  for (let i = l; i <= r; i++) {
    down[i] = up[i] = 1;
    sumDown[i] = sumUp[i] = i - l + 1; // sum[i] = l부터 i까지의 누적합, sum[i] = dp[l] + dp[l + 1] + ... + dp[i]
  }

  for (let i = 1; i < n; i++) {
    for (let j = l; j <= r; j++) {
      down[j] = (sumUp[r] - sumUp[j] + MOD) % MOD;
      up[j] = sumDown[j - 1];
    }

    sumDown[l] = down[l];
    sumUp[l] = up[l];

    for (let j = l + 1; j <= r; j++) {
      sumDown[j] = (sumDown[j - 1] + down[j]) % MOD;
      sumUp[j] = (sumUp[j - 1] + up[j]) % MOD;
    }
  }

  return (sumDown[r] + sumUp[r]) % MOD;
}
