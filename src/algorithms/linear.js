function snapshot(nodes) {
  return nodes.map((n) => ({ ...n }));
}

export function linkedListInsertHeadSteps(values, value) {
  const nodes = values.map((v, i) => ({
    id: `n${i}`,
    value: v,
    highlight: false,
  }));
  const steps = [
    {
      nodes: snapshot(nodes),
      line: 0,
      description: `Insert ${value} at the head.`,
    },
  ];
  const fresh = { id: `n-new`, value, highlight: true, inserting: true };
  steps.push({
    nodes: [fresh, ...snapshot(nodes)],
    line: 1,
    description: `Create a new node (${value}).`,
  });
  steps.push({
    nodes: [{ ...fresh, inserting: false, highlight: true }, ...snapshot(nodes)],
    line: 2,
    description: `Point the new node to the old head.`,
  });
  steps.push({
    nodes: [{ ...fresh, inserting: false, highlight: false }, ...snapshot(nodes)],
    done: true,
    line: 3,
    description: `Head now points to ${value}.`,
  });
  return steps;
}

export function linkedListInsertTailSteps(values, value) {
  const nodes = values.map((v, i) => ({ id: `n${i}`, value: v, highlight: false }));
  const steps = [
    {
      nodes: snapshot(nodes),
      line: 0,
      description: `Insert ${value} at the tail.`,
    },
  ];
  for (let i = 0; i < nodes.length; i++) {
    steps.push({
      nodes: snapshot(nodes).map((n, idx) => ({ ...n, highlight: idx === i })),
      line: 2,
      description: `Walk to node ${nodes[i].value}…`,
    });
  }
  const fresh = { id: `n-new`, value, highlight: true, inserting: true };
  steps.push({
    nodes: [...snapshot(nodes), fresh],
    line: 4,
    description: `Link last node → ${value}.`,
  });
  steps.push({
    nodes: [...snapshot(nodes), { ...fresh, inserting: false, highlight: false }],
    done: true,
    line: 5,
    description: `${value} is the new tail.`,
  });
  return steps;
}

export function linkedListDeleteSteps(values, value) {
  const nodes = values.map((v, i) => ({ id: `n${i}`, value: v, highlight: false }));
  const steps = [
    {
      nodes: snapshot(nodes),
      line: 0,
      description: `Delete the first node with value ${value}.`,
    },
  ];
  const idx = nodes.findIndex((n) => n.value === value);
  if (idx === -1) {
    steps.push({
      nodes: snapshot(nodes),
      done: true,
      line: 6,
      description: `${value} was not found.`,
    });
    return steps;
  }
  for (let i = 0; i <= idx; i++) {
    steps.push({
      nodes: snapshot(nodes).map((n, j) => ({ ...n, highlight: j === i })),
      line: 2,
      description: i === idx ? `Found ${value} — unlink it.` : `Check ${nodes[i].value}…`,
    });
  }
  const remaining = nodes.filter((_, i) => i !== idx);
  steps.push({
    nodes: snapshot(remaining),
    done: true,
    line: 4,
    description: `Removed ${value}. List reconnects around the gap.`,
  });
  return steps;
}

export function arrayInsertSteps(arr, index, value) {
  const a = [...arr];
  const steps = [
    {
      array: [...a],
      highlight: [],
      line: 0,
      description: `Insert ${value} at index ${index}. Shift elements right.`,
    },
  ];
  a.push(null);
  for (let i = a.length - 1; i > index; i--) {
    a[i] = a[i - 1];
    steps.push({
      array: [...a],
      highlight: [i, i - 1],
      line: 3,
      description: `Shift index ${i - 1} → ${i} (${a[i]})`,
    });
  }
  a[index] = value;
  steps.push({
    array: [...a],
    highlight: [index],
    swapped: true,
    line: 5,
    description: `Write ${value} at index ${index}.`,
  });
  steps.push({
    array: [...a],
    highlight: [index],
    done: true,
    line: 5,
    description: 'Insert complete. Length increased by 1.',
  });
  return steps;
}

export function arrayDeleteSteps(arr, index) {
  const a = [...arr];
  const steps = [
    {
      array: [...a],
      highlight: [index],
      line: 0,
      description: `Delete index ${index} (value ${a[index]}). Shift left to fill the gap.`,
    },
  ];
  const removed = a[index];
  for (let i = index; i < a.length - 1; i++) {
    a[i] = a[i + 1];
    steps.push({
      array: [...a],
      highlight: [i, i + 1],
      line: 3,
      description: `Shift index ${i + 1} → ${i}`,
    });
  }
  a.pop();
  steps.push({
    array: [...a],
    highlight: [],
    done: true,
    line: 6,
    description: `Removed ${removed}. Length decreased by 1.`,
  });
  return steps;
}

export function stackDemoSteps() {
  const steps = [];
  const stack = [];
  const ops = [
    ['push', 10],
    ['push', 20],
    ['push', 30],
    ['pop', null],
    ['push', 40],
    ['pop', null],
    ['pop', null],
  ];

  steps.push({
    stack: [],
    op: null,
    line: 0,
    description: 'Stack is LIFO — last in, first out.',
  });

  for (const [op, value] of ops) {
    if (op === 'push') {
      stack.push(value);
      steps.push({
        stack: [...stack],
        op: 'push',
        value,
        line: 2,
        description: `push(${value}) — new top is ${value}.`,
      });
    } else {
      const popped = stack.pop();
      steps.push({
        stack: [...stack],
        op: 'pop',
        value: popped,
        line: 5,
        description: `pop() → ${popped}. New top is ${stack[stack.length - 1] ?? 'empty'}.`,
      });
    }
  }

  steps.push({
    stack: [...stack],
    op: null,
    done: true,
    line: 7,
    description: 'Demo complete.',
  });
  return steps;
}

export function queueDemoSteps() {
  const steps = [];
  const queue = [];
  const ops = [
    ['enqueue', 10],
    ['enqueue', 20],
    ['enqueue', 30],
    ['dequeue', null],
    ['enqueue', 40],
    ['dequeue', null],
  ];

  steps.push({
    queue: [],
    op: null,
    line: 0,
    description: 'Queue is FIFO — first in, first out.',
  });

  for (const [op, value] of ops) {
    if (op === 'enqueue') {
      queue.push(value);
      steps.push({
        queue: [...queue],
        op: 'enqueue',
        value,
        line: 2,
        description: `enqueue(${value}) — joins the back.`,
      });
    } else {
      const removed = queue.shift();
      steps.push({
        queue: [...queue],
        op: 'dequeue',
        value: removed,
        line: 5,
        description: `dequeue() → ${removed}. Front moves forward.`,
      });
    }
  }

  steps.push({
    queue: [...queue],
    op: null,
    done: true,
    line: 7,
    description: 'Demo complete.',
  });
  return steps;
}
