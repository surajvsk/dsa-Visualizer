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
      description: `We will add ${value} at the front of the train — that front is called the head.`,
    },
  ];
  const fresh = { id: `n-new`, value, highlight: true, inserting: true };
  steps.push({
    nodes: [fresh, ...snapshot(nodes)],
    line: 1,
    description: `Make a new carriage. It holds ${value}.`,
  });
  steps.push({
    nodes: [{ ...fresh, inserting: false, highlight: true }, ...snapshot(nodes)],
    line: 2,
    description: `The new carriage's arrow now points to the old first carriage.`,
  });
  steps.push({
    nodes: [{ ...fresh, inserting: false, highlight: false }, ...snapshot(nodes)],
    done: true,
    line: 3,
    description: `Head is now ${value}. Adding at the front is easy for that reason.`,
  });
  return steps;
}

export function linkedListInsertTailSteps(values, value) {
  const nodes = values.map((v, i) => ({ id: `n${i}`, value: v, highlight: false }));
  const steps = [
    {
      nodes: snapshot(nodes),
      line: 0,
      description: `We will add ${value} at the end. First we must walk the whole train.`,
    },
  ];
  for (let i = 0; i < nodes.length; i++) {
    steps.push({
      nodes: snapshot(nodes).map((n, idx) => ({ ...n, highlight: idx === i })),
      line: 2,
      description: `Now at ${nodes[i].value}. Not the last carriage yet. Keep walking.`,
    });
  }
  const fresh = { id: `n-new`, value, highlight: true, inserting: true };
  steps.push({
    nodes: [...snapshot(nodes), fresh],
    line: 4,
    description: `The last carriage's arrow now points to ${value}.`,
  });
  steps.push({
    nodes: [...snapshot(nodes), { ...fresh, inserting: false, highlight: false }],
    done: true,
    line: 5,
    description: `${value} is the new last carriage.`,
  });
  return steps;
}

export function linkedListDeleteSteps(values, value) {
  const nodes = values.map((v, i) => ({ id: `n${i}`, value: v, highlight: false }));
  const steps = [
    {
      nodes: snapshot(nodes),
      line: 0,
      description: `Remove the carriage that holds ${value}. First walk until we find it.`,
    },
  ];
  const idx = nodes.findIndex((n) => n.value === value);
  if (idx === -1) {
    steps.push({
      nodes: snapshot(nodes),
      done: true,
      line: 6,
      description: `${value} is not on this train.`,
    });
    return steps;
  }
  for (let i = 0; i <= idx; i++) {
    steps.push({
      nodes: snapshot(nodes).map((n, j) => ({ ...n, highlight: j === i })),
      line: 2,
      description: i === idx ? `Found ${value}. Unhook this carriage from the line.` : `${nodes[i].value} is not ${value}. Keep going.`,
    });
  }
  const remaining = nodes.filter((_, i) => i !== idx);
  steps.push({
    nodes: snapshot(remaining),
    done: true,
    line: 4,
    description: `${value} is gone. The previous carriage now points straight to the next one.`,
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
      description: `Put ${value} into locker ${index}. Everyone after it must slide right to make space.`,
    },
  ];
  a.push(null);
  for (let i = a.length - 1; i > index; i--) {
    a[i] = a[i - 1];
    steps.push({
      array: [...a],
      highlight: [i, i - 1],
      line: 3,
      description: `Slide ${a[i]} one locker to the right, from ${i - 1} to ${i}.`,
    });
  }
  a[index] = value;
  steps.push({
    array: [...a],
    highlight: [index],
    swapped: true,
    line: 5,
    description: `${value} sits in the empty locker — locker ${index}.`,
  });
  steps.push({
    array: [...a],
    highlight: [index],
    done: true,
    line: 5,
    description: 'Done. The array is one longer. Inserting in the middle was slow because everyone had to move.',
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
      description: `Remove locker ${index} (it holds ${a[index]}). Neighbors slide left to close the gap.`,
    },
  ];
  const removed = a[index];
  for (let i = index; i < a.length - 1; i++) {
    a[i] = a[i + 1];
    steps.push({
      array: [...a],
      highlight: [i, i + 1],
      line: 3,
      description: `The next number slid into locker ${i}. The gap is closing.`,
    });
  }
  a.pop();
  steps.push({
    array: [...a],
    highlight: [],
    done: true,
    line: 6,
    description: `${removed} is gone. The array is one shorter.`,
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
    description: 'The stack is empty. Think of a pile of plates. A new plate always goes on top.',
  });

  for (const [op, value] of ops) {
    if (op === 'push') {
      stack.push(value);
      steps.push({
        stack: [...stack],
        op: 'push',
        value,
        line: 2,
        description: `Put ${value} on top. If we take one now, this is the plate we get.`,
      });
    } else {
      const popped = stack.pop();
      steps.push({
        stack: [...stack],
        op: 'pop',
        value: popped,
        line: 5,
        description: `Took ${popped} from the top. Now the top is ${stack[stack.length - 1] ?? 'empty'}.`,
      });
    }
  }

  steps.push({
    stack: [...stack],
    op: null,
    done: true,
    line: 7,
    description: 'Stack demo finished. Last plate on was the first plate off.',
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
    description: 'The queue is empty. Think of a ticket line. You join at the back. You leave from the front.',
  });

  for (const [op, value] of ops) {
    if (op === 'enqueue') {
      queue.push(value);
      steps.push({
        queue: [...queue],
        op: 'enqueue',
        value,
        line: 2,
        description: `${value} joined the back of the line.`,
      });
    } else {
      const removed = queue.shift();
      steps.push({
        queue: [...queue],
        op: 'dequeue',
        value: removed,
        line: 5,
        description: `${removed} left from the front — the person who had been waiting longest.`,
      });
    }
  }

  steps.push({
    queue: [...queue],
    op: null,
    done: true,
    line: 7,
    description: 'Queue demo finished. First in line was first to leave.',
  });
  return steps;
}
