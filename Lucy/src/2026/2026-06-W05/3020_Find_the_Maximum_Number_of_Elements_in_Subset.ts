function maximumLength(nums: number[]): number {
  const countMap = new Map<number, number>();

  for (const num of nums) {
    countMap.set(num, (countMap.get(num) || 0) + 1);
  }

  let maxCount = 1;

  for (const [val, cnt] of countMap) {
    if (val === 1) {
      maxCount = Math.max(maxCount, cnt % 2 === 0 ? cnt - 1 : cnt);
    } else {
      let v = val;
      let len = 0;

      while ((countMap.get(v) ?? 0) >= 2) {
        len += 2;
        v = v * v;
      }

      if ((countMap.get(v) ?? 0) === 1) len += 1;
      else if ((countMap.get(v) ?? 0) === 0) len -= 1;

      maxCount = Math.max(maxCount, len);
    }
  }

  return maxCount;
}
