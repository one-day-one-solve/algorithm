# 739. Daily Temperatures

## 문제 요약

이 문제는 매일의 기온이 주어졌을 때, 각 날짜마다 더 따뜻한 날이 오기까지 며칠을 기다려야 하는지를 계산하는 문제입니다.

예를 들어, 오늘이 73도이고 다음 날이 74도라면, 정답은 1입니다.

만약 이후에 더 따뜻한 날이 없다면, 정답은 0입니다.

## 아이디어: Monotnic Stack

유형이 Monotonic Stack 이기에 해당 자료구조를 공부한 후, 풀이를 했습니다.

### Monotonic Stack?

항상 한 방향으로만 정렬된 값을 유지하는 스택입니다.

- 스택에 들어가는 값들이 계속 작아지거나(내림차순)
- 혹은 계속 커지거나(오름차순) 하도록 만든 스택

#### 쓰는 이유?

새로운 값이 들어왔을 때, 지금까지 넣어둔 값들 중에서 "작거나 큰 값"을 빠르게 찾기 위함

### 예시

```plaintext
[5, 3, 1, 6] // Input

Stack: [5]
-> 3은 5보다 작음 (push)
-> 1은 3보다 작음 (push)
-> 6은 1보다 큼 (pop)
-> 6은 3보다 큼 (pop)
-> 6으 5보다 큼 (pop)
```

### Monotonic Stack을 사용한 아이디어

Monotonic Stack은 항상 특정 순서(오름차순 또는 내림차순)를 유지하는 스택이므로 해당 문제에서는 `내림차순 스택`을 사용해서 스택에는 아직 더 따뜻한 날을 못 찾은 날들만 저장합니다.

스택에는 `인덱스`를 저장합니다. 나중에 더 따뜻한 날까지 얼마나 지났는지를 계산하기 위해 `인덱스`를 저장합니다.

스택 안의 인덱스들은 temperatures가 내림차순으로 유지됩니다.

## 코드 해석

### 변수 초기화

- n: 전체 날짜 수
- answers: 정답 배열
- stack: monotonic stack, 아직 더 따뜻한 날을 못 찾은 인덱스를 저장. stack 안의 인덱스들은 temperatures가 내림차순으로 유지됨

```typescript
const n = temperatures.length;
const answers = new Array(n).fill(0);

const stack = [];
```

### temperatures 순회

- stack이 비어 있지 않고, 오늘의 온도(temperatures[i])가 스택 top보다 높다면,
  - 과거의 어떤 날보다 더 따뜻한 날이 왔다!
- while 조건문이 만족한 경우
  - stack에서 과거의 인덱스를 꺼내서, 며칠 뒤에 따뜻해졌는지 계산하여 정답 배열에 저장

```typescript
for (let i = 0; i < n; i++) {
  while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
    const pastIndex = stack.pop()!;
    answers[pastIndex] = i - pastIndex;
  }

  stack.push(i); // 오늘 날짜 인덱스 push, 더 따뜻한 날을 찾기 위해
}
```
