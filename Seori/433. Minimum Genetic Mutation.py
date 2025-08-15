class Solution:
    def minMutation(self, startGene: str, endGene: str, bank: List[str]) -> int:
        dict_mutate = {'A' : ('C', 'G', 'T'),
                     'C' : ('A', 'G', 'T'),
                     'G' : ('A', 'C', 'T'),
                     'T' : ('A', 'C', 'G')}

        visited = [startGene]
        queue = [(startGene, 0)]
        while queue:
            nowGene, count = queue.pop(0)
            if nowGene == endGene:
                return count
            for i in range(len(nowGene)):
                for mutate in dict_mutate:
                    nextGene = nowGene[:i] + mutate + nowGene[i+1:]
                    if nextGene in bank and nextGene not in visited:
                        queue.append((nextGene, count + 1))
                        visited.append(nextGene)
        return -1
