export const SAMPLE_TREE = {
  value: 8,
  left: {
    value: 3,
    left: { value: 1, left: null, right: null },
    right: {
      value: 6,
      left: { value: 4, left: null, right: null },
      right: { value: 7, left: null, right: null },
    },
  },
  right: {
    value: 10,
    left: null,
    right: {
      value: 14,
      left: { value: 13, left: null, right: null },
      right: null,
    },
  },
};

export function flattenTree(root) {
  const nodes = [];
  const edges = [];
  let xCounter = 0;

  function walk(node, depth, parent) {
    if (!node) return;
    walk(node.left, depth + 1, node.value);
    const id = node.value;
    const x = 48 + xCounter * 64;
    const y = 40 + depth * 90;
    xCounter += 1;
    nodes.push({ id, value: node.value, x, y, depth });
    if (parent != null) edges.push({ from: parent, to: id });
    walk(node.right, depth + 1, node.value);
  }

  walk(root, 0, null);
  return { nodes, edges };
}

export function traversalSteps(root, order = 'inorder') {
  const steps = [];
  const visited = [];
  const stack = [];

  function visit(node, phase) {
    stack.push(`${phase}(${node.value})`);
    steps.push({
      visiting: node.value,
      visited: [...visited],
      highlight: node.value,
      callStack: [...stack],
      line: phase === 'visit' ? 3 : phase === 'left' ? 1 : 5,
      description:
        phase === 'visit'
          ? `Write down ${node.value}. This is a visit.`
          : phase === 'left'
            ? `From ${node.value}, go to the left child.`
            : `From ${node.value}, go to the right child.`,
    });
    if (phase === 'visit') visited.push(node.value);
    stack.pop();
  }

  function inorder(node) {
    if (!node) return;
    visit(node, 'left');
    inorder(node.left);
    visit(node, 'visit');
    visit(node, 'right');
    inorder(node.right);
  }

  function preorder(node) {
    if (!node) return;
    visit(node, 'visit');
    visit(node, 'left');
    preorder(node.left);
    visit(node, 'right');
    preorder(node.right);
  }

  function postorder(node) {
    if (!node) return;
    visit(node, 'left');
    postorder(node.left);
    visit(node, 'right');
    postorder(node.right);
    visit(node, 'visit');
  }

  steps.push({
    visiting: null,
    visited: [],
    highlight: null,
    callStack: [],
    line: 0,
    description:
      order === 'inorder'
        ? 'Inorder: left first, then me, then right. The numbers should come out sorted.'
        : order === 'preorder'
          ? 'Preorder: visit me first, then left, then right. Like copying the tree.'
          : 'Postorder: both children first, me last.',
  });

  if (order === 'preorder') preorder(root);
  else if (order === 'postorder') postorder(root);
  else inorder(root);

  steps.push({
    visiting: null,
    visited: [...visited],
    highlight: null,
    callStack: [],
    done: true,
    line: 6,
    description: `Walk finished. Order: ${visited.join(' then ')}`,
  });
  return steps;
}
