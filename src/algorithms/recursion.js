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
      description: `We called fact(${k}). This card waits on the stack until a smaller question answers.`,
      result: null,
    });

    if (k <= 1) {
      frame.returning = 1;
      steps.push({
        callStack: stack.map((f) => ({ ...f })),
        line: 2,
        description: `Stop here. fact(${k}) is 1. There is no smaller question than this. This is the base case.`,
        result: null,
      });
      stack.pop();
      steps.push({
        callStack: stack.map((f) => ({ ...f })),
        line: 2,
        description: `We return 1. Remove this card. The card above can now do its math.`,
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
      description: `The answer ${sub} came from below. ${k} times ${sub} is ${value}. That is fact(${k}).`,
      result: null,
    });
    stack.pop();
    steps.push({
      callStack: stack.map((f) => ({ ...f })),
      line: 3,
      description: `Send ${value} back up. The fact(${k}) card can leave.`,
      result: k === n ? value : null,
    });
    return value;
  }

  const result = fact(n);
  steps.push({
    callStack: [],
    line: 3,
    done: true,
    description: `Finished. ${n} factorial means multiply from ${n} down to 1, which is ${result}.`,
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
      description: `Ask fib(${k}): what is Fibonacci number ${k}?`,
      result: null,
    });

    if (k <= 1) {
      frame.returning = k;
      steps.push({
        callStack: stack.map((f) => ({ ...f })),
        line: 2,
        description: `Tiny question: fib(${k}) is just ${k}. We stop here.`,
        result: null,
      });
      stack.pop();
      steps.push({
        callStack: stack.map((f) => ({ ...f })),
        line: 2,
        description: `Return ${k} and take this card off the stack.`,
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
      description: `Two small answers: ${left} plus ${right} is ${value}. That is fib(${k}).`,
      result: null,
    });
    stack.pop();
    steps.push({
      callStack: stack.map((f) => ({ ...f })),
      line: 3,
      description: `Return ${value}. Notice the same question is asked many times. That is why this is slow.`,
      result: k === n ? value : null,
    });
    return value;
  }

  const result = fib(n);
  steps.push({
    callStack: [],
    line: 3,
    done: true,
    description: `fib(${n}) is ${result}. We repeated the same work. Next, try the memo mode to skip repeats.`,
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
        description: `Already in the notebook: fib(${k}) is ${memo[k]}. Do not calculate again.`,
        result: null,
      });
      stack.pop();
      return memo[k];
    }

    steps.push({
      callStack: stack.map((f) => ({ ...f })),
      memo: { ...memo },
      line: 1,
      description: `fib(${k}) is not in the notebook yet. We must work it out.`,
      result: null,
    });

    if (k <= 1) {
      memo[k] = k;
      frame.returning = k;
      steps.push({
        callStack: stack.map((f) => ({ ...f })),
        memo: { ...memo },
        line: 4,
        description: `Write the tiny answer in the notebook: fib(${k}) is ${k}.`,
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
      description: `Got it: fib(${k}) is ${value}. Saved in the notebook for next time.`,
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
    description: `fib(${n}) is ${result}. The notebook saved a lot of work. That is the idea behind DP.`,
    result,
  });
  return steps;
}
