class Solution:
    def minWindow(self, s: str, t: str) -> str:
        # [1] 문자열 s와 문자열 t의 알파벳을 기록할 각 dictionary를 만든다.
        #     dict_t에 존재하는 알파벳의 개수가 dict_s와 같을 때, 정답을 기록하는 기준이 된다.
        dict_s, dict_t = defaultdict(int), defaultdict(int)
        for char in t:
            dict_t[char] += 1

        # [2] while문으로 sliding window 탐색한다.
        start, end = 0, 0
        matched_chars = 0
        minimum_window = float('inf')
        minimum_start, minimum_end = 0, 0
        while end < len(s):

            # [2-1] 탐색 중 t에 해당하는 알파벳이 나왔을 때, 각 dictionary를 비교하여 matched_chars를 기록한다.
            if s[end] in dict_t:
                dict_s[s[end]] += 1
                if dict_s[s[end]] == dict_t[s[end]]:
                    matched_chars += 1
                    
            # [2-2] 위에서 기록한 matched_chars가 t의 알파벳 개수와 같아질 때, window의 최소길이 값을 비교하도록 한다.
            while start <= end and matched_chars == len(dict_t):
                if end - start + 1 < minimum_window:
                    minimum_window = end - start + 1
                    minimum_start, minimum_end = start, end

                # [2-3] 최소길이 값을 찾아낼 수 있도록 sliding window 크기를 줄인다.
                if s[start] in dict_t:
                    dict_s[s[start]] -= 1
                    if dict_s[s[start]] < dict_t[s[start]]:
                        matched_chars -= 1
                start += 1

            # [2-4] 위 과정이 다 끝나면 sliding window를 확장하여 다시 탐색을 시작한다.
            end += 1

        # [3] 정답 조건(2-2)에 해당하지 않는다면 ""를 반환한다.
        return s[minimum_start:minimum_end+1] if minimum_window != float('inf') else "" 