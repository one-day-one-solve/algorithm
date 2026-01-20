function minWindow(s: string, t: string): string {
  let result = "";

  const m = s.length;
  const n = t.length;

  let window = "";
  let left = 0;
  let right = 0;

  const countT = new Map<string, number>();
  for (const ch of t) {
    countT.set(ch, (countT.get(ch) || 0) + 1);
  }

  let minimumLen = Infinity;
  const validCount = new Map<string, number>();

  while (right < m) {
    const currentCh = s[right];
    if (t.includes(currentCh)) {
      validCount.set(currentCh, (validCount.get(currentCh) || 0) + 1);
    }

    right++;

    const isValid = () => Array.from(countT).every(([k, v]) => validCount.has(k) && validCount.get(k)! >= v);
    while (isValid()) {
      const currentLength = right - left;
      if (currentLength < minimumLen) {
        minimumLen = currentLength;
        result = s.substring(left, left + currentLength);
      }

      if (validCount.has(s[left])) {
        validCount.set(s[left], validCount.get(s[left])! - 1);
      }
      left++;
    }
  }

  return result;
}
