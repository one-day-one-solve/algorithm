# 1318. Minimum Flips to Make a OR b Equal to c

## 코드 단계별 분석

1. 초기 설정

10^9 = 1,000,000,000 < (2^31 - 1 = 2,147,483,647) 이기 때문에 BITS_COUNT = 32로 설정

```typescript
const BITS_COUNT = 32; // 32비트 정수 처리
let flipCount = 0; // 총 플립 횟수
```

2. 각 비트 위치 순회

0번째 비트부터 31번째 비트까지 하나씩 검사

```typescript
for (let i = 0; i < BITS_COUNT; i++) {}
```

3. 각 숫자에서 현재 비트 추출

- `a >> i`: a를 오른쪽으로 i만큼 이동(i번째 비트가 맨 오른쪽으로 위치하게 됨)
- `& 1`: 맨 오른쪽 비트만 추출(나머지는 0으로)

```typescript
const aBit = (a >> i) & 1; // a의 i번째 비트
const bBit = (b >> i) & 1; // b의 i번째 비트
const cBit = (c >> i) & 1; // c의 i번째 비트
```

4. 현재 OR 연산 결과 계산

`a OR b`의 결과를 계산

```typescript
const orResult = aBit | bBit;
```

5. 핵심 로직: 플립 필요 여부 판단

- 경우 1: `orResult === cBit`, 이미 맞아서 flip이 필요 없는 경우
- 경우 2: `cBit === 0`, 목표가 0인데, `orResult`의 값이 1인 경우

  ```plaintext
  flipCount += aBit + bBit;

  aBit | bBit = 1이지만, cBit = 0 이어야 하는 상황
  가능한 경우:
      aBit = 0, bBit = 1 => bBit만 flip
      aBit = 1, bBit = 0 => aBit만 flip
      aBit = 1, bBit = 1 => 둘 다 flip
  ```

- 경우 3: `cBit === 1`, 목표가 1인데, `orResult`의 값이 0인 경우

  ```plaintext
  flipCount += 1;

  aBit = 0, bBit = 0 이지만 cBit = 1 이어야 하는 상황

  aBit 또는 bBit 중 하나만 1로 바꿔도 aBit | bBit = 1이 됩니다.
  ```

```typescript
if (orResult !== cBit) {
  flipCount += cBit === 0 ? aBit + bBit : 1;
}
```
