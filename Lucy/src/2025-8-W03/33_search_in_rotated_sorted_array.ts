function search(nums: number[], target: number): number {
  const n = nums.length;

  let l = 0;
  let r = n - 1;
  while (l < r) {
    const mid = Math.floor((l + r) / 2);

    if (nums[mid] > nums[r]) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }

  const rotatePointer = l;

  if (nums[0] === target) return 0;
  if (rotatePointer === 0) {
    l = 0;
    r = n - 1;
  } else if (nums[0] > target) {
    l = rotatePointer;
    r = n - 1;
  } else {
    l = 0;
    r = rotatePointer;
  }

  while (l < r) {
    const mid = Math.floor((l + r) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] > target) {
      r = mid - 1;
    } else if (nums[mid] < target) {
      l = mid + 1;
    }
  }

  if (nums[l] === target) return l;

  return -1;
}
