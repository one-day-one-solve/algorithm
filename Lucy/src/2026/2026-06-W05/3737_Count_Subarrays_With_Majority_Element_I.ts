function countMajoritySubarrays(nums: number[], target: number): number {
  const n = nums.length;

  let subArrCount = 0;

  for (let i = 0; i < n; i++) {
    let targetCount = 0;
    for (let j = i; j < n; j++) {
      if (nums[j] === target) targetCount++;
      if (targetCount * 2 > j + 1 - i) subArrCount++;
    }
  }

  return subArrCount;
}
