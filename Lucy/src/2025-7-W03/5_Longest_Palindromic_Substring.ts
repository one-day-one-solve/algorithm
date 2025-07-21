// Use Dynamic Programming
// 557ms
function longestPalindrome(s: string): string {
  const n = s.length;
  if (n < 2) {
    return s;
  }

  const dp: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false));

  let longestStr = s[0];

  // length = 1
  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
  }

  // length = 2
  for (let i = 0; i < n; i++) {
    if (s[i] === s[i + 1]) {
      dp[i][i + 1] = true;
      longestStr = s.substring(i, i + 2);
    }
  }

  // length >= 3
  for (let len = 3; len <= n; len++) {
    for (let l = 0; l <= n - len; l++) {
      const r = l + len - 1;

      if (s[l] === s[r] && dp[l + 1][r - 1]) {
        dp[l][r] = true;

        if (len > longestStr.length) {
          longestStr = s.substring(l, r + 1);
        }
      }
    }
  }

  return longestStr;
}

// Wrong Answer
//  test case: s = "aacabdkacaa"
function longestPalindrome(s: string): string {
  const n = s.length;
  let longestStr = "";

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let l = i;
      let r = j;
      let isPalindromicStr = true;

      while (l < r) {
        if (s[l] !== s[r]) {
          isPalindromicStr = false;
          break;
        }

        l++;
        r--;
      }

      if (isPalindromicStr) {
        const currentStr = s.substring(i, j + 1);
        if (longestStr.length < currentStr.length) {
          longestStr = currentStr;
        }
      }
    }
  }

  return longestStr;
}
