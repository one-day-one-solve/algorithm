# 435. Non-overlapping Intervals

## 문제 요약

일정 기간들을 나타내는 `intervals`가 주어졌을 때, 겹치는 구간을 제거해서 나머지 구간들이 서로 겹치지 않도록 만들어야 합니다. 이때, 최소 몇 개의 구간을 제거해야 그렇게 만들 수 있는지를 구하는 문제입니다.

## 아이디어

이 문제는 겹치지 않는 구간을 최대한 많이 선택하자는 아이디어로 해결할 수 있었습니다.

첫 번째 구간을 무조건 선택하고 현재 구간의 시작 시간이 이전 구간의 끝나는 시간보다 크거나 같으면, 겹치지 않는 것이니 해당 구간을 선택하는 식으로 겹치지 않는 구간들을 카운트하였습니다.

intervals 배열을 모두 순회한 후, (intervals 배열의 길이 - 겹치지 않은 구간을 카운트한 값)을 계산하여 제거한 구간의 최소 갯수를 구할 수 있었습니다.

## 코드 해석

### intervals 배열 정렬

- 구간을 끝나는 시간을 기준으로 오름차순 정렬
- 끝나는 시간을 기준으로 정렬하는 이유?
  - `빨리 끝나는 구간을 먼저 선택`해서, 다음 구간이 들어올 자리를 더 많이 남겨둘 수 있게 하기 위해 intervals 배열을 각 구간의 endTime을 기준으로 오름차순으로 정렬

```typescript
intervals.sort((a, b) => a[1] - b[1]);
```

### 변수 초기화

- 첫 번째 구간을 무조건 선택했다는 뜻으로 nonOverlappingCount 를 1로 초기화
- lastIntervalEndTime은 첫 번째 구간을 선택했으므로 자연스레 첫 번째 구간의 endTime을 저장하여 이후 구간들과 비교할 값을 저장

```typescript
let nonOverlappingCount = 1;
let lastIntervalEndTime = intervals[0][1];
```

### intervals 배열 순회

- 현재 구간의 시작 시간이 이전 구간의 끝나는 시간보다 크거나 같으면, 겹치지 않음!
  - 선택한다는 뜻으로 nonOverlappingCount 1 증가
  - lastIntervalEndTime을 현재 구간의 끝나는 시간(endTime)으로 재할당

```typescript
for (let i = 1; i < intervals.length; i++) {
  const [startTime, endTime] = intervals[i];

  if (lastIntervalEndTime <= startTime) {
    nonOverlappingCount++;
    lastIntervalEndTime = endTime;
  }
}
```

### 제거된 구간의 최소 갯수 계산

- 전체 구간 중에서, 겹치지 않는 구간 수를 뺀 것이 바로 제거해야 할 최소 갯수!

```typescript
return intervals.length - nonOverlappingCount;
```
