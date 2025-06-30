function findMinArrowShots(points: number[][]): number {
  // edge case
  if (points.length === 0) return 0;

  // sort
  points.sort((a, b) => a[0] - b[0]);

  let countArrow = 1;
  // 첫 번째 화살이 터트릴 수 있는 가장 오른쪽 지점
  let xEndPointer = points[0][1];

  for (let i = 1; i < points.length; i++) {
    const [xStart, xEnd] = points[i];

    if (xEndPointer < xStart) {
      countArrow++;
      xEndPointer = xEnd;
    } else {
      xEndPointer = Math.min(xEndPointer, xEnd);
    }
  }

  return countArrow;
}
