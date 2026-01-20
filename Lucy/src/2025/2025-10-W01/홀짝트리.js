// https://school.programmers.co.kr/learn/courses/30/lessons/181187
// 홀짝트리

// 20.0/100.0
// union-find 알고리즘 사용
class UnionFind {
  constructor(nodes) {
    this.parent = new Map();
    for (const node of nodes) {
      this.parent.set(node, node);
    }
  }
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      this.parent.set(rootX, rootY);
    }
  }
  find(x) {
    if (this.parent.get(x) === x) {
      return x;
    }

    this.parent.set(x, this.find(this.parent.get(x)));
    return this.parent.get(x);
  }
}
function solution(nodes, edges) {
  const unionFind = new UnionFind(nodes);
  for (const [a, b] of edges) {
    unionFind.union(a, b);
  }

  const groups = new Map();
  for (const node of nodes) {
    const root = unionFind.find(node);

    const newGroups = groups.get(root) || [];
    newGroups.push(node);

    groups.set(root, newGroups);
  }

  const degreeMap = new Map();
  for (const [a, b] of edges) {
    degreeMap.set(a, (degreeMap.get(a) || 0) + 1);
    degreeMap.set(b, (degreeMap.get(b) || 0) + 1);
  }

  const getNodeValue = (nodeNum, childCount) => {
    if (nodeNum % 2 === 0) {
      if (childCount % 2 === 0) return "짝수 노드";
      else return "역짝수 노드";
    } else {
      if (childCount % 2 === 0) return "역홀수 노드";
      else return "홀수 노드";
    }
  };

  const whenRoot = new Map();
  const whenNotRoot = new Map();
  for (const node of nodes) {
    const degree = degreeMap.get(node) || 0;

    const rootChildCount = degree;
    whenRoot.set(node, getNodeValue(node, rootChildCount));

    const notRootChildCount = degree - 1;
    whenNotRoot.set(node, getNodeValue(node, notRootChildCount));
  }

  let oddEvenTreeCount = 0;
  let reverseOddEvenCount = 0;
  for (const [root, treeNodes] of groups) {
    let canBeOddTreeEven = false;
    let canBeReverseOddTreeEven = false;

    for (const candidateRoot of treeNodes) {
      let isOddEvenTree = true;
      let isReversedOddEvenTree = true;

      for (const node of treeNodes) {
        let nodeType = "";
        if (node === candidateRoot) nodeType = whenRoot.get(node);
        else nodeType = whenNotRoot.get(node);

        if (nodeType === "홀수 노드" || nodeType === "짝수 노드") isReversedOddEvenTree = false;
        if (nodeType === "역홀수 노드" || nodeType === "역짝수 노드") isOddEvenTree = false;
      }

      if (isOddEvenTree) canBeOddTreeEven = true;
      if (isReversedOddEvenTree) canBeReverseOddTreeEven = true;
    }

    if (canBeOddTreeEven) oddEvenTreeCount++;
    if (canBeReverseOddTreeEven) reverseOddEvenCount++;
  }

  return [oddEvenTreeCount, reverseOddEvenCount];
}

// 100.0/100.0
// dfs 사용
function solution(nodes, edges) {
  // 차수 계산을 위한 Map
  const degree = new Map();
  for (const node of nodes) {
    degree.set(node, 0);
  }

  // 인접 리스트 생성 및 차수 계산
  const adj = new Map();
  for (const node of nodes) {
    adj.set(node, []);
  }

  for (const [a, b] of edges) {
    adj.get(a).push(b);
    adj.get(b).push(a);
    degree.set(a, degree.get(a) + 1);
    degree.set(b, degree.get(b) + 1);
  }

  // DFS로 연결된 컴포넌트(트리) 찾기
  const visited = new Set();
  const trees = [];

  for (const node of nodes) {
    if (!visited.has(node)) {
      const treeNodes = [];
      const stack = [node];

      while (stack.length > 0) {
        const curr = stack.pop();
        if (visited.has(curr)) continue;

        visited.add(curr);
        treeNodes.push(curr);

        for (const neighbor of adj.get(curr)) {
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        }
      }

      trees.push(treeNodes);
    }
  }

  let oddEvenCount = 0;
  let reverseOddEvenCount = 0;

  // 각 트리 검사
  for (const treeNodes of trees) {
    // 단일 노드 트리
    if (treeNodes.length === 1) {
      const node = treeNodes[0];
      if (node % 2 === 0) {
        oddEvenCount++;
      } else {
        reverseOddEvenCount++;
      }
      continue;
    }

    // 각 노드가 루트가 아닐 때 어떤 타입인지 미리 계산
    const nodeTypes = new Map();
    for (const node of treeNodes) {
      const d = degree.get(node) - 1; // 루트가 아닐 때 자식 수
      const isOdd = node % 2 === 1;

      if (isOdd) {
        nodeTypes.set(node, d % 2 === 1 ? "odd" : "revOdd"); // 홀수 노드 or 역홀수 노드
      } else {
        nodeTypes.set(node, d % 2 === 0 ? "even" : "revEven"); // 짝수 노드 or 역짝수 노드
      }
    }

    let canBeOddEven = false;
    let canBeReverse = false;

    // 각 노드를 루트로 만들어보기
    for (const root of treeNodes) {
      // 루트의 타입 계산
      const rootDegree = degree.get(root);
      const rootIsOdd = root % 2 === 1;
      let rootType;

      if (rootIsOdd) {
        rootType = rootDegree % 2 === 1 ? "odd" : "revOdd"; // 홀수 노드 or 역홀수 노드
      } else {
        rootType = rootDegree % 2 === 0 ? "even" : "revEven"; // 짝수 노드 or 역짝수 노드
      }

      // 홀짝 트리 체크
      let isOddEvenTree = true;
      if (rootType === "revOdd" || rootType === "revEven") {
        isOddEvenTree = false;
      } else {
        for (const node of treeNodes) {
          if (node === root) continue;
          const type = nodeTypes.get(node);
          if (type === "revOdd" || type === "revEven") {
            isOddEvenTree = false;
            break;
          }
        }
      }

      // 역홀짝 트리 체크
      let isReverseTree = true;
      if (rootType === "odd" || rootType === "even") {
        isReverseTree = false;
      } else {
        for (const node of treeNodes) {
          if (node === root) continue;
          const type = nodeTypes.get(node);
          if (type === "odd" || type === "even") {
            isReverseTree = false;
            break;
          }
        }
      }

      if (isOddEvenTree) canBeOddEven = true;
      if (isReverseTree) canBeReverse = true;

      // 조기 종료
      if (canBeOddEven && canBeReverse) break;
    }

    if (canBeOddEven) oddEvenCount++;
    if (canBeReverse) reverseOddEvenCount++;
  }

  return [oddEvenCount, reverseOddEvenCount];
}
