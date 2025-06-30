# 901. Online Stock Span

## 문제 요약

매일 주식 가격이 주어지고, 그 날의 주가 span을 계산하는 문제입니다.

주가 span? 오늘부터 과거로 연속된 날 중, 오늘 가격보다 작거나 같은 가격이 나온 `최대 연속 일수` 입니다.

예를 들어, 최근 4일 가격이 [7, 2, 1, 2] 이고 오늘 가격이 2라면, 오늘부터 거꾸로 4일 연속 가격이 2 이하라서 주가 span은 4 입니다.

## 아이디어

매번 오늘 가격과 과거 가격을 비교해서, 오늘 가격보다 작거나 같은 과거 날들을 거꾸로 연속으로 확인해 주가 span을 계산합니다.

주가 배열을 저장하며, 현재 가격이 들어올 때마다 뒤에서부터 조건을 만족하는 날을 하나씩 탐색하는 방법을 사용했습니다.

## 코드 해석

### StockSpanner 클래스의 생성자

- stock 배열에 주가 데이터를 차례로 저장

```typescript
class StockSpanner {
  private stock: number[];

  constructor() {
    this.stock = [];
  }
  //...
}
```

### next 메서드

- 매개변수로 들어온 price를 stock 배열에 추가
- count: 오늘 가격 포함 주가 span 길이(최소 1일)
- pointer: 오늘 이전 날부터 역순으로 확인할 인덱스

- pointer가 가리키는 날 가격이 오늘 가격보다 작거나 같으면, count를 1씩 늘리며 연속해서 과거 가격을 확인합니다.

```typescript
next(price: number): number {
    this.stock.push(price);

    let count = 1;
    let pointer = this.stock.length - 2;

    while (pointer >= 0
    && this.stock[pointer] <= this.stock[this.stock.length - 1]) {
        pointer--;
        count++;
    }

    return count;
}
```
