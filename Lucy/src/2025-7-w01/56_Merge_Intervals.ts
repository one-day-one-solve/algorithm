// 54ms
function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);

  const removeIndices: number[] = [];

  for (let i = 0; i < intervals.length - 1; i++) {
    const [currentStart, currentEnd] = intervals[i];
    const [nextStart, nextEnd] = intervals[i + 1];

    if (currentEnd >= nextStart) {
      removeIndices.push(i);
      intervals[i + 1][0] = Math.min(currentStart, nextStart);
      intervals[i + 1][1] = Math.max(currentEnd, nextEnd);
    }
  }

  const results = intervals.filter((_, index) => !removeIndices.includes(index));

  return results;
}

// 6ms
function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);

  let result = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    let start = intervals[i][0];
    let end = intervals[i][1];
    let lastEnd = result[result.length - 1][1];

    if (start <= lastEnd) {
      result[result.length - 1][1] = Math.max(lastEnd, end);
    } else {
      result.push([start, end]);
    }
  }
  return result;
}
