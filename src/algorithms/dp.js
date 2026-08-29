export function fibonacciDpSteps(n) {
  const dp = Array(n + 1).fill(null);
  const steps = [];

  dp[0] = 0;
  steps.push({
    dp: [...dp],
    filling: 0,
    line: 1,
    description: 'Base: dp[0] = 0',
  });

  if (n >= 1) {
    dp[1] = 1;
    steps.push({
      dp: [...dp],
      filling: 1,
      line: 2,
      description: 'Base: dp[1] = 1',
    });
  }

  for (let i = 2; i <= n; i++) {
    steps.push({
      dp: [...dp],
      filling: i,
      using: [i - 1, i - 2],
      line: 4,
      description: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i - 1]} + ${dp[i - 2]}`,
    });
    dp[i] = dp[i - 1] + dp[i - 2];
    steps.push({
      dp: [...dp],
      filling: i,
      using: [i - 1, i - 2],
      line: 5,
      description: `Store dp[${i}] = ${dp[i]}`,
    });
  }

  steps.push({
    dp: [...dp],
    filling: n,
    done: true,
    line: 6,
    description: `Answer: fib(${n}) = ${dp[n]}`,
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
    description: `LCS of "${s1}" and "${s2}". Fill a (m+1)×(n+1) table.`,
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
          description: `'${s1[i - 1]}' == '${s2[j - 1]}' → dp[${i}][${j}] = ${dp[i][j]}`,
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
          description: `'${s1[i - 1]}' ≠ '${s2[j - 1]}' → max(${dp[i - 1][j]}, ${dp[i][j - 1]}) = ${dp[i][j]}`,
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
    description: `LCS length = ${dp[m][n]}`,
    s1,
    s2,
  });
  return steps;
}
