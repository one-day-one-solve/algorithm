class Solution:
    def numberOfSubstrings(self, s: str) -> int:
        # last_seen에 a, b, c의 가장 최근 인덱스를 저장
        last_seen = {'a': -1, 'b': -1, 'c': -1}
        ans = 0
        
        # 탐색하면서 last_seen 업데이트
        for i in range(len(s)):
            last_seen[s[i]] = i
            
            # 세 문자 중 가장 먼저 등장했던 문자의 인덱스를 찾음
            min_idx = min(last_seen['a'], last_seen['b'], last_seen['c'])
            
            # 세 문자가 모두 등장한 상태라면 min_idx + 1을 정답에 더해줌
            if min_idx != -1:
                ans += (min_idx + 1)
                
        return ans