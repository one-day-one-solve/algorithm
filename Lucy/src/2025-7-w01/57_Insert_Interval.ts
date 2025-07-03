// 10ms
function insert(intervals: number[][], newInterval: number[]): number[][] {
  if (intervals.length === 0) return [newInterval];

  let resultIntervals: number[][] = [];

  let [newStart, newEnd] = newInterval;
  let isBreak = false;

  for (let i = 0; i < intervals.length; i++) {
    const [start, end] = intervals[i];

    if (end < newStart) {
      resultIntervals.push(intervals[i]);
    } else if (start > newEnd) {
      resultIntervals.push([newStart, newEnd]);
      intervals.slice(i).forEach((interval) => resultIntervals.push(interval));
      isBreak = true;
      break;
    } else {
      [newStart, newEnd] = [Math.min(newStart, start), Math.max(newEnd, end)];
    }
  }

  if (!isBreak) resultIntervals.push([newStart, newEnd]);

  return resultIntervals;
}

// 0ms
function insert(intervals: number[][], newInterval: number[]): number[][] {
  const result: number[][] = [];
  let i = 0;

  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);

  while (i < intervals.length) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}
