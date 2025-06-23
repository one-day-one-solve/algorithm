class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEndOfWord: boolean = false;
}

class Trie {
  root = new TrieNode();

  insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEndOfWord = true;
  }

  search(word: string): boolean {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }
    return node.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }
    return true;
  }

  findNode(prefix: string): TrieNode | null {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) {
        return null;
      }

      node = node.children.get(char)!;
    }

    return node;
  }

  dfs(node: TrieNode, path: string, results: string[]): string[] {
    if (results.length === 3) {
      return results;
    }

    if (node.isEndOfWord) {
      results.push(path);
    }

    for (const char of [...node.children.keys()].sort()) {
      this.dfs(node.children.get(char)!, path + char, results);
    }

    return results;
  }
}

function suggestedProducts(products: string[], searchWord: string): string[][] {
  products.sort();

  const trie = new Trie();

  for (const product of products) {
    trie.insert(product);
  }

  const answer: string[][] = [];

  let prefix = "";
  for (let i = 0; i < searchWord.length; i++) {
    prefix += searchWord[i];
    const node = trie.findNode(prefix);
    if (node === null) {
      answer.push([]);
    } else {
      const suggestions = trie.dfs(node, prefix, []);
      answer.push(suggestions);
    }
  }

  return answer;
}
