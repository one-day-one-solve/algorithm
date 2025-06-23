# 136. Single Number

## XOR 연산?

XOR(배타적 논리합)는 두 비트가 다를 때만 1을 반환하는 연산입니다.

### XOR 진리표

```plaintext
0 XOR 0 = 0
0 XOR 1 = 1
1 XOR 0 = 1
1 XOR 1 = 0
```

### XOR 성질

1. 자기 자신과 XOR 하면 0

```plaintext
5 XOR 5 = 0
7 XOR 7 = 0
어떤 수 XOR 자기 자신 = 0
```

2. 0과 XOR 하면 자기 자신

```plaintext
5 XOR 0 = 5
7 XOR 0 = 7
어떤 수 XOR 0 = 자기 자신
```

3. 교환법칙과 결합법칙이 성립

```plaintext
A XOR B = B XOR A
(A XOR B) XOR C = A XOR (B XOR C)
```

## 예시

배열을 `[a, b, c, b, c]` 라고 하면(여기서 a가 한 번만 나타나는 수):

`result = a XOR b XOR c XOR b XOR c`

교환법칙과 결합벅칙에 의해 순서를 바꿀 수 있습니다:

```plaintext
result = a XOR (b XOR b) XOR (c XOR c)
result = a XOR 0 XOR 0
result = a
```
