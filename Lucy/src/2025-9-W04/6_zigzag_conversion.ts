function convert(s: string, numRows: number): string {
  if (numRows === 1) return s;

  const zigzag: string[] = Array.from({ length: numRows }, () => "");

  for (let i = 0; i < s.length; i++) {
    const cycleLen = 2 * numRows - 2;
    const positionInCycle = i % cycleLen;

    const row = positionInCycle > numRows - 1 ? cycleLen - positionInCycle : positionInCycle;
    zigzag[row] += s[i];
  }

  return zigzag.join("");
}
