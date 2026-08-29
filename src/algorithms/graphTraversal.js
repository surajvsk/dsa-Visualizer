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
    description: `${start} se ghumna shuru. Queue (line) use hogi — jo pehle aaya, usi shehar pehle dekhenge.`,
  });

  while (queue.length) {
    const node = queue.shift();
    steps.push({
      visiting: node,
      visited: [...visited],
      queue: [...queue],
      line: 4,
      description: `${node} line se nikal aaya. Ab yahi shehar dekhte hain.`,
    });
    if (visited.has(node)) {
      steps.push({
        visiting: node,
        visited: [...visited],
        queue: [...queue],
        line: 5,
        description: `${node} pehle dekh chuke. Skip — time barbaad nahi.`,
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
      description: `${node} dekh liya. Padosi line mein: ${neighbors.join(', ') || 'koi naya nahi'}.`,
    });
  }

  steps.push({
    visiting: null,
    visited: [...visited],
    queue: [],
    done: true,
    line: 10,
    description: `Poora naksha dekh liya. Order: ${[...visited].join(' → ')} (padosi-padosi).`,
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
    description: `${start} se ghumna. Stack use hoga — jo last mein aaya, usi raaste gehraai tak jaayenge.`,
  });

  while (stack.length) {
    const node = stack.pop();
    steps.push({
      visiting: node,
      visited: [...visited],
      stack: [...stack],
      line: 4,
      description: `${node} stack se nikala. Ab is raaste ko gehraai tak dekho.`,
    });
    if (visited.has(node)) {
      steps.push({
        visiting: node,
        visited: [...visited],
        stack: [...stack],
        line: 5,
        description: `${node} pehle dekh chuke. Skip — time barbaad nahi.`,
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
      description: `${node} dekh liya. Agle raaste stack par: ${neighbors.join(', ') || 'koi naya nahi'}.`,
    });
  }

  steps.push({
    visiting: null,
    visited: [...visited],
    stack: [],
    done: true,
    line: 10,
    description: `DFS khatam. Order: ${[...visited].join(' → ')} (ek raasta gehra, phir doosra).`,
  });
  return steps;
}
