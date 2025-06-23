// 41ms
function minFlips(a: number, b: number, c: number): number {
  let flipCount = 0;
  for (let i = 0; i < 32; i++) {
    const aBit = (a >> i) & 1;
    const bBit = (b >> i) & 1;
    const cBit = (c >> i) & 1;

    if ((aBit | bBit) !== cBit) {
      if (cBit === 0 && (aBit | bBit) === 1) {
        flipCount += aBit + bBit;
      } else if (cBit === 1 && (aBit | bBit) === 0) {
        flipCount++;
      }
    }
  }

  return flipCount;
}

// 모범답안 - 30ms
function minFlips(a: number, b: number, c: number): number {
  const BITS_COUNT = 32;
  let flipCount = 0;

  for (let i = 0; i < BITS_COUNT; i++) {
    const aBit = (a >> i) & 1;
    const bBit = (b >> i) & 1;
    const cBit = (c >> i) & 1;
    const orResult = aBit | bBit;

    if (orResult !== cBit) {
      // 목표가 0이면 1인 비트들을 모두 플립, 목표가 1이면 하나만 플립
      flipCount += cBit === 0 ? aBit + bBit : 1;
    }
  }

  return flipCount;
}
