function summaryRanges(nums: number[]): string[] {
  const numsLen = nums.length;

  const results: string[] = [];

  let rangeStartPointer = 0;
  let rangeEndPointer = 0;

  while (rangeStartPointer < numsLen) {
    while (rangeEndPointer + 1 < numsLen && nums[rangeEndPointer + 1] - nums[rangeEndPointer] === 1) {
      rangeEndPointer++;
    }

    if (rangeStartPointer === rangeEndPointer) {
      results.push(nums[rangeStartPointer].toString());
      rangeStartPointer += 1;
      rangeEndPointer = rangeStartPointer;
    } else {
      results.push(`${nums[rangeStartPointer]}->${nums[rangeEndPointer]}`);
      rangeStartPointer = rangeEndPointer + 1;
      rangeEndPointer = rangeStartPointer;
    }
  }

  return results;
}
