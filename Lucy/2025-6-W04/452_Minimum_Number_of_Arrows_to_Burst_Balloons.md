# 452. Minimum Number of Arrows to Burst Balloons

## 문제 요약

이 문제는 XY 평면의 X 축을 따라 수평으로 놓인 여러 개의 풍선들을, 최소한의 화살로 모두 터뜨리는 방법을 찾는 문제입니다.

각 화살은 X 축의 한 지점에서 수직으로 위로 발사되며, 해당 지점에 걸치는 모든 풍선을 터뜨릴 수 있습니다.

풍선들의 x 좌표 번위가 주어질 때, 겹치는 구간을 최대한 하나의 화살로 처리하는 것이 핵심입니다.

## 아이디어

겹쳐 있는 풍선들은 하나의 화살로 터뜨릴 수 있습니다. 그래서 가능한 겹치는 풍선들을 한 그룹으로 묶고, 그룹마다 화살로 1개씩만 쏘면 됩니다.

풍선들을 x 시작점 기준으로 정렬해서 순서대로 비교하고, 겹치는 풍선이면 같은 화살로 처리하고, 겹치지 않으면 새로운 화살을 쏩니다.

## 코드 해석

### Edge Case: 풍선이 하나도 없는 경우

- 풍선이 하나도 없으니 화살이 필요 없으므로 0을 return 합니다.

```typescript
if (points.length === 0) return 0;
```

### 정렬: 풍선들을 x 시작점을 기준으로 정렬

- 풍선들을 x 시작점 기준으로 오름차순 정렬합니다.
- 정렬하는 이유는 풍선들을 왼쪽부터 오른쪽으로 처리하기 위함입니다.

```typescript
points.sort((a, b) => a[0] - b[0]);
```

### 변수 초기화: 사용할 화살의 갯수와 x의 좌표

- 첫 번째 화살은 무조건 필요하다고 생각하고 countArrow 를 1로 초기화
- xEndPointer는 지금까지 겹치는 풍선들의 가장 오른쪽 끝 지점을 저장

```typescript
let countArrow = 1;
let xEndPointer = points[0][1];
```

### points 배열 순회

- 현재 풍선의 시작점이 xEndPointer보다 크면?
  - 겹치지 않으므로 새 화살이 필요. countArrow 1 증가
- 현재 풍선의 시작점과 xEndPointer가 겹친다면?
  - 하나의 화살로 풍선 제거 가능.
  - 겹치는 범위를 좁히기 위해 xEndPointer에 Math.min(xEndPointer, xEnd) 값으로 재할당

```typescript
for (let i = 1; i < points.length; i++) {
  const [xStart, xEnd] = points[i];

  if (xEndPointer < xStart) {
    countArrow++;
    xEndPointer = xEnd;
  } else {
    xEndPointer = Math.min(xEndPointer, xEnd);
  }
}
```
