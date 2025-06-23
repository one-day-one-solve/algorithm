// 12ms
function singleNumber(nums: number[]): number {
  if (nums.length === 1) return nums[0];

  const countMap = new Map<number, number>();

  for (const num of nums) {
    countMap.set(num, (countMap.get(num) || 0) + 1);
  }

  const find = Array.from(countMap).filter(([key, value]) => value === 1);
  return find[0][0];
}

// 모범 답안 - 1ms
function singleNumber(nums: number[]): number {
  // XOR 비트 연산 패턴 사용
  let result = 0;
  for (const num of nums) {
    result ^= num;
  }
  return result;
}
