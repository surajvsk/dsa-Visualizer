export const SAMPLE_GRAPH = {
  nodes: [
    { id: 'A', x: 260, y: 48 },
    { id: 'B', x: 120, y: 140 },
    { id: 'C', x: 400, y: 140 },
    { id: 'D', x: 60, y: 260 },
    { id: 'E', x: 200, y: 260 },
    { id: 'F', x: 340, y: 260 },
    { id: 'G', x: 460, y: 260 },
  ],
  adj: {
    A: ['B', 'C'],
    B: ['A', 'D', 'E'],
    C: ['A', 'F', 'G'],
    D: ['B'],
    E: ['B', 'F'],
    F: ['C', 'E'],
    G: ['C'],
  },
};

export function bfsSteps(graph, start) {
  const steps = [];
  const visited = new Set();
  const queue = [start];

  steps.push({
    visiting: null,
    visited: [],
    queue: [...queue],
    line: 1,
    description: `${start} is where we begin. We use a queue — a waiting line. Whoever joined first is visited first.`,
  });

  while (queue.length) {
    const node = queue.shift();
    steps.push({
      visiting: node,
      visited: [...visited],
      queue: [...queue],
      line: 4,
      description: `${node} left the line. We are looking at this city now.`,
    });
    if (visited.has(node)) {
      steps.push({
        visiting: node,
        visited: [...visited],
        queue: [...queue],
        line: 5,
        description: `We already visited ${node}. Skip it — no need to do the work twice.`,
      });
      continue;
    }
    visited.add(node);
    const neighbors = (graph[node] || []).filter((n) => !visited.has(n) && !queue.includes(n));
    neighbors.forEach((n) => queue.push(n));
    steps.push({
      visiting: node,
      visited: [...visited],
      queue: [...queue],
      line: 8,
      description: `Visited ${node}. Neighbors joining the line: ${neighbors.join(', ') || 'none new'}.`,
    });
  }

  steps.push({
    visiting: null,
    visited: [...visited],
    queue: [],
    done: true,
    line: 10,
    description: `We walked the whole map. Visit order: ${[...visited].join(' then ')}. Nearby cities first.`,
  });
  return steps;
}

export function dfsSteps(graph, start) {
  const steps = [];
  const visited = new Set();
  const stack = [start];

  steps.push({
    visiting: null,
    visited: [],
    stack: [...stack],
    line: 1,
    description: `Start at ${start}. We use a stack. The last city we added is the next one we dive into.`,
  });

  while (stack.length) {
    const node = stack.pop();
    steps.push({
      visiting: node,
      visited: [...visited],
      stack: [...stack],
      line: 4,
      description: `Pop ${node} off the stack. Now follow this path deeper.`,
    });
    if (visited.has(node)) {
      steps.push({
        visiting: node,
        visited: [...visited],
        stack: [...stack],
        line: 5,
        description: `We already visited ${node}. Skip it — no need to do the work twice.`,
      });
      continue;
    }
    visited.add(node);
    const neighbors = [...(graph[node] || [])].reverse().filter((n) => !visited.has(n));
    neighbors.forEach((n) => stack.push(n));
    steps.push({
      visiting: node,
      visited: [...visited],
      stack: [...stack],
      line: 8,
      description: `Visited ${node}. Next paths on the stack: ${neighbors.join(', ') || 'none new'}.`,
    });
  }

  steps.push({
    visiting: null,
    visited: [...visited],
    stack: [],
    done: true,
    line: 10,
    description: `Depth-first search is done. Order: ${[...visited].join(' then ')}. One deep path, then another.`,
  });
  return steps;
}
