# 338. Counting Bits

- `i >> 1`: right shfit 연산
- `i & 1`: and bit 연산

## example

```plaintext
i = 4(100)
i >> 1: 10
i & 1: 0 (마지막 비트가 0 이므로 0)
answer[i >> 1] = answer[2] = 1

answer[i] = answer[i >> 1] + (i & 1);
=> answer[4] = answer[2] + 0;
=> answer[4] = 1;
```
