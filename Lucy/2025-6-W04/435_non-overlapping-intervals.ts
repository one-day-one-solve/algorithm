// greedy
// 75ms
function eraseOverlapIntervals(intervals: number[][]): number {
  if (intervals.length === 0) return 0;

  intervals.sort((a, b) => a[1] - b[1]);

  let nonOverlappingCount = 1;
  let lastIntervalEndTime = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    const [startTime, endTime] = intervals[i];

    if (lastIntervalEndTime <= startTime) {
      nonOverlappingCount++;
      lastIntervalEndTime = endTime;
    }
  }

  return intervals.length - nonOverlappingCount;
}
