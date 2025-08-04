class Solution:
    def findSubstring(self, s: str, words: List[str]) -> List[int]:
        # [1] dict_word에 주어진 단어를 기록한다. 이후에 sliding window 탐색하면서 dict_window와 같아질 때, 정답을 기록하는 기준이 된다.
        dict_word = defaultdict(int)
        for word in words:
            dict_word[word] += 1

        word_count = len(words)
        word_len = len(words[0])
        result = []
        # [2] 모든 단어의 길이는 동일하므로 단어 길이만큼만 반복한다.
        #     sliding window 탐색의 시작점(start)과 끝점(end)를 잡고, 그 안에 존재하는 단어를 dict_window에 기록한다.
        for i in range(word_len):
            start = i
            end = i + word_len * word_count
            if end > len(s):
                break
            dict_window = defaultdict(int)
            for j in range(word_count):
                word = s[start + j * word_len : start + (j+1) * word_len]
                dict_window[word] += 1

            # [3] dict_word와 dict_window가 같다면 start 인덱스를 기록한다.
            if dict_word == dict_window:
                result.append(start)

            # [4] 이후 while문을 통해 탐색을 계속한다. start와 end를 단어 길이만큼 이동해주면서, dict_window에 기록된 단어를 바꿔주고 계속해서 비교한다.
            start += word_len
            end += word_len

            while end <= len(s):
                before = s[start - word_len:start]
                after = s[end - word_len:end]
                if before in dict_window:
                    dict_window[before] -= 1
                    if not dict_window[before]:
                        del dict_window[before]
                dict_window[after] += 1
                
                if dict_word == dict_window:
                    result.append(start)

                start += word_len
                end += word_len

        return result