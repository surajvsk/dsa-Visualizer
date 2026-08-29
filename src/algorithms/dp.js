export function fibonacciDpSteps(n) {
  const dp = Array(n + 1).fill(null);
  const steps = [];

  dp[0] = 0;
  steps.push({
    dp: [...dp],
    filling: 0,
    line: 1,
    description: 'Smallest question first: Fibonacci of 0 is 0. Write it in the first cell of the notebook.',
  });

  if (n >= 1) {
    dp[1] = 1;
    steps.push({
      dp: [...dp],
      filling: 1,
      line: 2,
      description: 'Next tiny question: Fibonacci of 1 is 1. Write that down too.',
    });
  }

  for (let i = 2; i <= n; i++) {
    steps.push({
      dp: [...dp],
      filling: i,
      using: [i - 1, i - 2],
      line: 4,
      description: `New question: add the two answers before this. ${dp[i - 1]} plus ${dp[i - 2]} will be fib ${i}.`,
    });
    dp[i] = dp[i - 1] + dp[i - 2];
    steps.push({
      dp: [...dp],
      filling: i,
      using: [i - 1, i - 2],
      line: 5,
      description: `Wrote it down: fib ${i} is ${dp[i]}. Next time we just read this cell.`,
    });
  }

  steps.push({
    dp: [...dp],
    filling: n,
    done: true,
    line: 6,
    description: `The answer is ${dp[n]}. No waiting stack — just a table filling left to right.`,
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
    description: `Longest common subsequence of "${s1}" and "${s2}". The table is empty. We fill it cell by cell.`,
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
          description: `Both strings have '${s1[i - 1]}' here — a match! The length is now ${dp[i][j]}.`,
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
          description: `'${s1[i - 1]}' and '${s2[j - 1]}' are different. Keep the best length we already had: ${dp[i][j]}.`,
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
    description: `The longest common piece is ${dp[m][n]} letters long.`,
    s1,
    s2,
  });
  return steps;
}
