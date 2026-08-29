let callId = 0;
function nextId() {
  callId += 1;
  return callId;
}

export function factorialSteps(n) {
  callId = 0;
  const steps = [];
  const stack = [];

  function fact(k) {
    const id = nextId();
    const frame = { id, functionName: 'fact', args: k, returning: null };
    stack.push(frame);
    steps.push({
      callStack: stack.map((f) => ({ ...f })),
      line: 1,
      description: `Call fact(${k}) — push onto the call stack.`,
      result: null,
    });

    if (k <= 1) {
      frame.returning = 1;
      steps.push({
        callStack: stack.map((f) => ({ ...f })),
        line: 2,
        description: `Base case: fact(${k}) = 1`,
        result: null,
      });
      stack.pop();
      steps.push({
        callStack: stack.map((f) => ({ ...f })),
        line: 2,
        description: `Return 1 from fact(${k}) — pop the stack.`,
        result: k === n ? 1 : null,
      });
      return 1;
    }

    const sub = fact(k - 1);
    const value = k * sub;
    frame.returning = value;
    steps.push({
      callStack: stack.map((f) => ({ ...f })),
      line: 3,
      description: `fact(${k}) = ${k} × fact(${k - 1}) = ${k} × ${sub} = ${value}`,
      result: null,
    });
    stack.pop();
    steps.push({
      callStack: stack.map((f) => ({ ...f })),
      line: 3,
      description: `Return ${value} from fact(${k})`,
      result: k === n ? value : null,
    });
    return value;
  }

  const result = fact(n);
  steps.push({
    callStack: [],
    line: 3,
    done: true,
    description: `Done. ${n}! = ${result}`,
    result,
  });
  return steps;
}

export function fibonacciSteps(n) {
  callId = 0;
  const steps = [];
  const stack = [];

  function fib(k) {
    const id = nextId();
    const frame = { id, functionName: 'fib', args: k, returning: null };
    stack.push(frame);
    steps.push({
      callStack: stack.map((f) => ({ ...f })),
      line: 1,
      description: `Call fib(${k})`,
      result: null,
    });

    if (k <= 1) {
      frame.returning = k;
      steps.push({
        callStack: stack.map((f) => ({ ...f })),
        line: 2,
        description: `Base case: fib(${k}) = ${k}`,
        result: null,
      });
      stack.pop();
      steps.push({
        callStack: stack.map((f) => ({ ...f })),
        line: 2,
        description: `Return ${k} from fib(${k})`,
        result: null,
      });
      return k;
    }

    const left = fib(k - 1);
    const right = fib(k - 2);
    const value = left + right;
    frame.returning = value;
    steps.push({
      callStack: stack.map((f) => ({ ...f })),
      line: 3,
      description: `fib(${k}) = fib(${k - 1}) + fib(${k - 2}) = ${left} + ${right} = ${value}`,
      result: null,
    });
    stack.pop();
    steps.push({
      callStack: stack.map((f) => ({ ...f })),
      line: 3,
      description: `Return ${value} from fib(${k})`,
      result: k === n ? value : null,
    });
    return value;
  }

  const result = fib(n);
  steps.push({
    callStack: [],
    line: 3,
    done: true,
    description: `Done. fib(${n}) = ${result} — notice how many overlapping calls happened.`,
    result,
  });
  return steps;
}

export function fibonacciMemoSteps(n) {
  callId = 0;
  const steps = [];
  const stack = [];
  const memo = {};

  function fib(k) {
    const id = nextId();
    const frame = { id, functionName: 'fib', args: k, returning: null };
    stack.push(frame);

    if (memo[k] !== undefined) {
      frame.returning = memo[k];
      steps.push({
        callStack: stack.map((f) => ({ ...f })),
        memo: { ...memo },
        line: 2,
        description: `Memo hit: fib(${k}) = ${memo[k]} (no extra work)`,
        result: null,
      });
      stack.pop();
      return memo[k];
    }

    steps.push({
      callStack: stack.map((f) => ({ ...f })),
      memo: { ...memo },
      line: 1,
      description: `Call fib(${k}) — not in memo yet`,
      result: null,
    });

    if (k <= 1) {
      memo[k] = k;
      frame.returning = k;
      steps.push({
        callStack: stack.map((f) => ({ ...f })),
        memo: { ...memo },
        line: 4,
        description: `Base case stored: memo[${k}] = ${k}`,
        result: null,
      });
      stack.pop();
      return k;
    }

    const value = fib(k - 1) + fib(k - 2);
    memo[k] = value;
    frame.returning = value;
    steps.push({
      callStack: stack.map((f) => ({ ...f })),
      memo: { ...memo },
      line: 6,
      description: `Store memo[${k}] = ${value}`,
      result: null,
    });
    stack.pop();
    return value;
  }

  const result = fib(n);
  steps.push({
    callStack: [],
    memo: { ...memo },
    line: 6,
    done: true,
    description: `Done. fib(${n}) = ${result} with memoization (far fewer calls).`,
    result,
  });
  return steps;
}
