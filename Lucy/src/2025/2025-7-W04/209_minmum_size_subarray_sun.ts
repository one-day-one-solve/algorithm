function minSubArrayLen(target: number, nums: number[]): number {
  const numsLen = nums.length;

  let left = 0;
  let right = 0;
  let minimumLen = Infinity;
  let currentSum = 0;

  while (right <= numsLen) {
    currentSum += nums[right];

    while (currentSum >= target) {
      minimumLen = Math.min(right - left + 1, minimumLen);
      currentSum -= nums[left];
      left++;
    }

    right++;
  }

  return Number.isFinite(minimumLen) ? minimumLen : 0;
}

minSubArrayLen(7, [2, 3, 1, 2, 4, 3]); // 2
minSubArrayLen(4, [1, 4, 4]); // 1
minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]); // 0
