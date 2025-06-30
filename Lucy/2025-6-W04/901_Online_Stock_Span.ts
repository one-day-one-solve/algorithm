// 나의 풀이 - 315ms
class StockSpanner {
  private stock: number[];
  constructor() {
    this.stock = [];
  }

  next(price: number): number {
    this.stock.push(price);

    let count = 1;
    let pointer = this.stock.length - 2;
    while (pointer >= 0 && this.stock[pointer] <= this.stock[this.stock.length - 1]) {
      pointer--;
      count++;
    }

    return count;
  }
}

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */

// 모범 답안 풀이 - 48ms
class StockSpanner {
  private stock: number[][];
  constructor() {
    this.stock = [];
  }

  next(price: number): number {
    let span = 1;
    while (this.stock.length > 0 && this.stock[this.stock.length - 1][0] <= price) {
      const [_, preSpan] = this.stock.pop();
      span += preSpan;
    }

    this.stock.push([price, span]);

    return span;
  }
}

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */
