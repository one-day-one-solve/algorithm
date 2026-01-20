function findPeakElement(nums: number[]): number {
  const n = nums.length;

  let l = 0;
  let r = n - 1;

  while (l < r) {
    const mid = Math.floor((l + r) / 2);

    if (nums[mid] > nums[mid + 1]) {
      r = mid;
    }

    if (nums[mid] < nums[mid + 1]) {
      l = mid + 1;
    }
  }

  return l;
}

findPeakElement([1, 2, 3, 1]); // 2
findPeakElement([1, 2, 1, 3, 5, 6, 4]); // 5
findPeakElement([2, 1]); // 0
findPeakElement([6, 5, 4, 3, 2, 3, 2]); // 0
findPeakElement([1, 2, 3]); // 2
