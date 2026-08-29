export function linearSearchSteps(arr, target) {
  const steps = [];
  const a = [...arr];

  steps.push({
    array: a,
    checking: null,
    found: false,
    line: 0,
    description: `Linear Search for ${target} — scan left to right.`,
  });

  for (let i = 0; i < a.length; i++) {
    steps.push({
      array: a,
      checking: i,
      found: false,
      line: 2,
      description: `Check index ${i}: ${a[i]} ${a[i] === target ? '==' : '≠'} ${target}`,
    });
    if (a[i] === target) {
      steps.push({
        array: a,
        checking: i,
        found: true,
        done: true,
        line: 3,
        description: `Found ${target} at index ${i}.`,
      });
      return steps;
    }
  }

  steps.push({
    array: a,
    checking: null,
    found: false,
    done: true,
    line: 6,
    description: `${target} is not in the array.`,
  });
  return steps;
}

export function binarySearchSteps(arr, target) {
  const steps = [];
  const a = [...arr].sort((x, y) => x - y);
  let lo = 0;
  let hi = a.length - 1;

  steps.push({
    array: a,
    low: lo,
    high: hi,
    mid: null,
    found: false,
    line: 0,
    description: `Binary Search for ${target} on a sorted array.`,
  });

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    steps.push({
      array: a,
      low: lo,
      high: hi,
      mid,
      found: false,
      line: 3,
      description: `mid = ${mid}, value = ${a[mid]}`,
    });

    if (a[mid] === target) {
      steps.push({
        array: a,
        low: lo,
        high: hi,
        mid,
        found: true,
        done: true,
        line: 5,
        description: `Found ${target} at index ${mid}.`,
      });
      return steps;
    }

    if (a[mid] < target) {
      lo = mid + 1;
      steps.push({
        array: a,
        low: lo,
        high: hi,
        mid,
        found: false,
        line: 7,
        description: `${a[mid]} < ${target} — search the right half.`,
      });
    } else {
      hi = mid - 1;
      steps.push({
        array: a,
        low: lo,
        high: hi,
        mid,
        found: false,
        line: 9,
        description: `${a[mid]} > ${target} — search the left half.`,
      });
    }
  }

  steps.push({
    array: a,
    low: lo,
    high: hi,
    mid: null,
    found: false,
    done: true,
    line: 11,
    description: `${target} is not in the array.`,
  });
  return steps;
}
