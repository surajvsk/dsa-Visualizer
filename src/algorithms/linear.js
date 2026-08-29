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
      description: `${value} ko train ke sabse aage (head) jodna hai.`,
    },
  ];
  const fresh = { id: `n-new`, value, highlight: true, inserting: true };
  steps.push({
    nodes: [fresh, ...snapshot(nodes)],
    line: 1,
    description: `Naya dabba banaya — usme ${value} hai.`,
  });
  steps.push({
    nodes: [{ ...fresh, inserting: false, highlight: true }, ...snapshot(nodes)],
    line: 2,
    description: `Naye dabbe ka arrow purane pehle dabbe ko dikhata hai.`,
  });
  steps.push({
    nodes: [{ ...fresh, inserting: false, highlight: false }, ...snapshot(nodes)],
    done: true,
    line: 3,
    description: `Ab head ${value} hai. Shuruat par jodna itna aasan isliye hai.`,
  });
  return steps;
}

export function linkedListInsertTailSteps(values, value) {
  const nodes = values.map((v, i) => ({ id: `n${i}`, value: v, highlight: false }));
  const steps = [
    {
      nodes: snapshot(nodes),
      line: 0,
      description: `${value} ko last mein jodna hai. Pehle poori train chalne padegi.`,
    },
  ];
  for (let i = 0; i < nodes.length; i++) {
    steps.push({
      nodes: snapshot(nodes).map((n, idx) => ({ ...n, highlight: idx === i })),
      line: 2,
      description: `${nodes[i].value} par aaye. Last dabba abhi nahi mila, aage badho.`,
    });
  }
  const fresh = { id: `n-new`, value, highlight: true, inserting: true };
  steps.push({
    nodes: [...snapshot(nodes), fresh],
    line: 4,
    description: `Aakhri dabbe ka arrow ab ${value} ko dikhata hai.`,
  });
  steps.push({
    nodes: [...snapshot(nodes), { ...fresh, inserting: false, highlight: false }],
    done: true,
    line: 5,
    description: `${value} ab last dabba hai.`,
  });
  return steps;
}

export function linkedListDeleteSteps(values, value) {
  const nodes = values.map((v, i) => ({ id: `n${i}`, value: v, highlight: false }));
  const steps = [
    {
      nodes: snapshot(nodes),
      line: 0,
      description: `${value} wala dabba hataana hai. Pehle us tak chal ke jaao.`,
    },
  ];
  const idx = nodes.findIndex((n) => n.value === value);
  if (idx === -1) {
    steps.push({
      nodes: snapshot(nodes),
      done: true,
      line: 6,
      description: `${value} is train mein hai hi nahi.`,
    });
    return steps;
  }
  for (let i = 0; i <= idx; i++) {
    steps.push({
      nodes: snapshot(nodes).map((n, j) => ({ ...n, highlight: j === i })),
      line: 2,
      description: i === idx ? `${value} mil gaya — is dabbe ko line se alag karo.` : `${nodes[i].value} ${value} nahi hai, aage dekho.`,
    });
  }
  const remaining = nodes.filter((_, i) => i !== idx);
  steps.push({
    nodes: snapshot(remaining),
    done: true,
    line: 4,
    description: `${value} nikal gaya. Pichla dabba seedha agle se jud gaya.`,
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
      description: `${value} ko khana ${index} mein daalna hai. Aage wale right ko sarakenge, jagah banane ke liye.`,
    },
  ];
  a.push(null);
  for (let i = a.length - 1; i > index; i--) {
    a[i] = a[i - 1];
    steps.push({
      array: [...a],
      highlight: [i, i - 1],
      line: 3,
      description: `${a[i]} ko ek khana right khiska diya (${i - 1} se ${i}).`,
    });
  }
  a[index] = value;
  steps.push({
    array: [...a],
    highlight: [index],
    swapped: true,
    line: 5,
    description: `Khali jagah mein ${value} baith gaya (khana ${index}).`,
  });
  steps.push({
    array: [...a],
    highlight: [index],
    done: true,
    line: 5,
    description: 'Ho gaya. Array ab 1 lambi hai. Beech mein daalna isliye mehnga pada — sabko hataana pada.',
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
      description: `Khana ${index} (${a[index]}) nikalna hai. Gap band karne ke liye aage wale left aayenge.`,
    },
  ];
  const removed = a[index];
  for (let i = index; i < a.length - 1; i++) {
    a[i] = a[i + 1];
    steps.push({
      array: [...a],
      highlight: [i, i + 1],
      line: 3,
      description: `Agla number khana ${i} mein aa gaya, gap pat raha hai.`,
    });
  }
  a.pop();
  steps.push({
    array: [...a],
    highlight: [],
    done: true,
    line: 6,
    description: `${removed} nikal gaya. Array 1 chhoti ho gayi.`,
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
    description: 'Stack khaali hai. Socho plates ki gaddi — nayi plate hamesha upar rakhti hai.',
  });

  for (const [op, value] of ops) {
    if (op === 'push') {
      stack.push(value);
      steps.push({
        stack: [...stack],
        op: 'push',
        value,
        line: 2,
        description: `${value} upar rakh di. Ab sabse upar yahi hai — nikalna hoga to pehle yahi uthegi.`,
      });
    } else {
      const popped = stack.pop();
      steps.push({
        stack: [...stack],
        op: 'pop',
        value: popped,
        line: 5,
        description: `${popped} uth gayi (upar wali). Ab upar ${stack[stack.length - 1] ?? 'kuch nahi'}.`,
      });
    }
  }

  steps.push({
    stack: [...stack],
    op: null,
    done: true,
    line: 7,
    description: 'Stack demo khatam. Jo last gaya, wahi pehle nikla.',
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
    description: 'Queue khaali hai. Ticket line socho — peeche lagte ho, aage se nikalte ho.',
  });

  for (const [op, value] of ops) {
    if (op === 'enqueue') {
      queue.push(value);
      steps.push({
        queue: [...queue],
        op: 'enqueue',
        value,
        line: 2,
        description: `${value} line ke peeche lag gaya.`,
      });
    } else {
      const removed = queue.shift();
      steps.push({
        queue: [...queue],
        op: 'dequeue',
        value: removed,
        line: 5,
        description: `${removed} aage se nikal gaya (jo pehle aaya tha).`,
      });
    }
  }

  steps.push({
    queue: [...queue],
    op: null,
    done: true,
    line: 7,
    description: 'Queue demo khatam. Jo pehle line mein aaya, wahi pehle nikla.',
  });
  return steps;
}
