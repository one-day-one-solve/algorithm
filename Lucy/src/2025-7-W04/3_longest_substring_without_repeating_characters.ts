// using set
function lengthOfLongestSubstring(s: string): number {
  if (s.length === 0) return 0;

  let left = 0;
  let longest = 1;

  const charMap = new Map<string, number>();
  charMap.set(s[0], 0);

  for (let right = 1; right < s.length; right++) {
    const currentChar = s[right];

    if (charMap.has(currentChar)) {
      const findIndex = charMap.get(currentChar) as number;

      for (let i = left; i < findIndex; i++) {
        charMap.delete(s[i]);
      }

      left = findIndex + 1;
      charMap.set(currentChar, right);
    } else {
      charMap.set(currentChar, right);
    }

    longest = Math.max(longest, right - left + 1);
  }

  return longest;
}

// using map
function lengthOfLongestSubstring(s: string): number {
  if (s.length === 0) return 0;

  let left = 0;
  let longest = 1;

  const charMap = new Map<string, number>();
  charMap.set(s[0], 0);

  for (let right = 1; right < s.length; right++) {
    const currentChar = s[right];

    if (charMap.has(currentChar)) {
      const findIndex = charMap.get(currentChar) as number;

      left = Math.max(findIndex + 1, left);
    }

    charMap.set(currentChar, right);
    longest = Math.max(longest, right - left + 1);
  }

  return longest;
}
