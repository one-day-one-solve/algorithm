class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # dictionary에 탐색하면서 나온 알파벳을 기록함. defautdict를 사용하면 key 초기값 세팅을 따로 해주지 않아도 된다.
        english = defaultdict(int)
        start, end = 0, 0
        answer = 0
        while end < len(s):
            # 이번 탐색 대상이 중복 알파벳이 아니라면, answer에 최대값을 비교하여 기록한다.
            if not english[s[end]]:
                english[s[end]] += 1
                answer = max(answer, end - start + 1)

            # 중복 알파벳이 나왔다면 앞부분의 알파벳 있던 부분까지 sliding window 축소
            else:
                english[s[start]] -= 1
                start += 1
                continue

            # sliding window 확장
            end += 1
        
        return answer