function dailyTemperatures(temperatures: number[]): number[] {
  const n = temperatures.length;
  const answers = new Array(n).fill(0);

  const stack = [];

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const pastIndex = stack.pop()!;
      answers[pastIndex] = i - pastIndex;
    }

    stack.push(i);
  }

  return answers;
}
