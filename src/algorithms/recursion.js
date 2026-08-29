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
      description: `fact(${k}) ko kaam diya. Yeh card stack par rakh diya — jawab ka wait karega.`,
      result: null,
    });

    if (k <= 1) {
      frame.returning = 1;
      steps.push({
        callStack: stack.map((f) => ({ ...f })),
        line: 2,
        description: `Rukne ki jagah aa gayi: fact(${k}) = 1. Ab isse chhota sawal nahi.`,
        result: null,
      });
      stack.pop();
      steps.push({
        callStack: stack.map((f) => ({ ...f })),
        line: 2,
        description: `1 wapas de diya. Yeh card hatao — upar wala ab hisaab laga sakta hai.`,
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
      description: `Neeche se ${sub} aaya. ${k} × ${sub} = ${value}. Yeh fact(${k}) ka jawab hai.`,
      result: null,
    });
    stack.pop();
    steps.push({
      callStack: stack.map((f) => ({ ...f })),
      line: 3,
      description: `${value} wapas bheja. fact(${k}) ka card ab uth gaya.`,
      result: k === n ? value : null,
    });
    return value;
  }

  const result = fact(n);
  steps.push({
    callStack: [],
    line: 3,
    done: true,
    description: `Khatam. ${n}! matlab ${n} se 1 tak guna = ${result}.`,
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
      description: `fib(${k}) se poocha: ${k}th Fibonacci kya hai?`,
      result: null,
    });

    if (k <= 1) {
      frame.returning = k;
      steps.push({
        callStack: stack.map((f) => ({ ...f })),
        line: 2,
        description: `Chhota sawal: fib(${k}) = ${k}. Yahan ruk jaate hain.`,
        result: null,
      });
      stack.pop();
      steps.push({
        callStack: stack.map((f) => ({ ...f })),
        line: 2,
        description: `${k} wapas diya. Card hatao.`,
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
      description: `Do chhote jawab: ${left} + ${right} = ${value}. Yeh fib(${k}) hai.`,
      result: null,
    });
    stack.pop();
    steps.push({
      callStack: stack.map((f) => ({ ...f })),
      line: 3,
      description: `${value} wapas. Dekho kitni baar same sawal dohra: isi liye recursion slow padti hai.`,
      result: k === n ? value : null,
    });
    return value;
  }

  const result = fib(n);
  steps.push({
    callStack: [],
    line: 3,
    done: true,
    description: `fib(${n}) = ${result}. Same hisaab baar-baar hua — next mode (memo) mein yeh bachaenge.`,
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
        description: `Copy mein pehle se likha hai: fib(${k}) = ${memo[k]}. Dobara mat gino!`,
        result: null,
      });
      stack.pop();
      return memo[k];
    }

    steps.push({
      callStack: stack.map((f) => ({ ...f })),
      memo: { ...memo },
      line: 1,
      description: `fib(${k}) copy mein nahi hai. Iska jawab nikalna padega.`,
      result: null,
    });

    if (k <= 1) {
      memo[k] = k;
      frame.returning = k;
      steps.push({
        callStack: stack.map((f) => ({ ...f })),
        memo: { ...memo },
        line: 4,
        description: `Chhota jawab copy mein likh diya: fib(${k}) = ${k}.`,
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
      description: `Jawab mil gaya: fib(${k}) = ${value}. Copy mein save, agla copy se padhega.`,
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
    description: `fib(${n}) = ${result}. Memo ki wajah se kaam bahut kam hua — DP ka yehi idea hai.`,
    result,
  });
  return steps;
}
