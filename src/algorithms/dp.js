export function fibonacciDpSteps(n) {
  const dp = Array(n + 1).fill(null);
  const steps = [];

  dp[0] = 0;
  steps.push({
    dp: [...dp],
    filling: 0,
    line: 1,
    description: 'Sabse chhota sawal: 0th Fibonacci = 0. Copy ke pehle khane mein likh diya.',
  });

  if (n >= 1) {
    dp[1] = 1;
    steps.push({
      dp: [...dp],
      filling: 1,
      line: 2,
      description: 'Agla chhota sawal: 1st Fibonacci = 1. Yeh bhi copy mein.',
    });
  }

  for (let i = 2; i <= n; i++) {
    steps.push({
      dp: [...dp],
      filling: i,
      using: [i - 1, i - 2],
      line: 4,
      description: `Naya sawal: pehle ke do jawab jodo. ${dp[i - 1]} + ${dp[i - 2]} — yeh fib(${i}) hoga.`,
    });
    dp[i] = dp[i - 1] + dp[i - 2];
    steps.push({
      dp: [...dp],
      filling: i,
      using: [i - 1, i - 2],
      line: 5,
      description: `Copy mein likh diya: fib(${i}) = ${dp[i]}. Agli baar yahi padhenge.`,
    });
  }

  steps.push({
    dp: [...dp],
    filling: n,
    done: true,
    line: 6,
    description: `Jawab mil gaya: fib(${n}) = ${dp[n]}. Recursion jaisa wait nahi, seedha table.`,
  });
  return steps;
}

export function lcsSteps(s1 = 'ABCBDAB', s2 = 'BDCABA') {
  const m = s1.length;
  const n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  const steps = [];

  steps.push({
    table: dp.map((row) => [...row]),
    i: 0,
    j: 0,
    line: 0,
    description: `"${s1}" aur "${s2}" ki sabse lamba common subsequence. Table khali hai, ab bharenge.`,
    s1,
    s2,
  });

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        steps.push({
          table: dp.map((row) => [...row]),
          i,
          j,
          match: true,
          line: 3,
          description: `Dono jagah '${s1[i - 1]}' hai — match! Length ${dp[i][j]} ho gayi.`,
          s1,
          s2,
        });
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        steps.push({
          table: dp.map((row) => [...row]),
          i,
          j,
          match: false,
          line: 5,
          description: `'${s1[i - 1]}' aur '${s2[j - 1]}' alag hain. Jo pehle se badi length thi, wahi rakho: ${dp[i][j]}.`,
          s1,
          s2,
        });
      }
    }
  }

  steps.push({
    table: dp.map((row) => [...row]),
    i: m,
    j: n,
    done: true,
    line: 7,
    description: `Sabse lamba common hissa ${dp[m][n]} letters ka hai.`,
    s1,
    s2,
  });
  return steps;
}
