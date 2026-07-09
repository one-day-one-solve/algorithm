function numberOfSubstrings(s: string): number {
  let answer = 0;
  let l = 0;

  const charCount = [0, 0, 0]; //   count a, count b, count c

  for (let r = 0; r < s.length; r++) {
    const idx = s.charCodeAt(r) - 97;
    if (s[r] === "a") {
      charCount[0] += 1;
    } else if (s[r] === "b") {
      charCount[1] += 1;
    } else if (s[r] === "c") {
      charCount[2] += 1;
    }

    while (charCount[0] > 0 && charCount[1] > 0 && charCount[2] > 0) {
      answer += s.length - r;

      if (s[l] === "a") {
        charCount[0] -= 1;
      } else if (s[l] === "b") {
        charCount[1] -= 1;
      } else if (s[l] === "c") {
        charCount[2] -= 1;
      }
      l++;
    }
  }

  return answer;
}
