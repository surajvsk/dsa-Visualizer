export function linearSearchSteps(arr, target) {
  const steps = [];
  const a = [...arr];

  steps.push({
    array: a,
    checking: null,
    found: false,
    line: 0,
    description: `We want to find ${target}. We will check every box from left to right. No shortcuts.`,
  });

  for (let i = 0; i < a.length; i++) {
    steps.push({
      array: a,
      checking: i,
      found: false,
      line: 2,
      description:
        a[i] === target
          ? `Box ${i} holds ${a[i]}. That is the number we wanted!`
          : `Box ${i} holds ${a[i]}, not ${target}. Check the next box.`,
    });
    if (a[i] === target) {
      steps.push({
        array: a,
        checking: i,
        found: true,
        done: true,
        line: 3,
        description: `Found it. ${target} is at position ${i}. We looked at ${i + 1} boxes.`,
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
    description: `${target} is not in this list. We checked every box.`,
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
    description: `The list is already small to big. To find ${target}, we always open the middle box.`,
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
      description: `The middle box is ${mid}. It holds ${a[mid]}. Is that smaller, bigger, or equal to ${target}?`,
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
        description: `Exact match. ${target} is at position ${mid}. We can stop. No need to read the rest.`,
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
        description: `${a[mid]} is smaller than ${target}. Throw away the left half. It cannot be there.`,
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
        description: `${a[mid]} is bigger than ${target}. Throw away the right half.`,
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
    description: `${target} is not in this list. We kept cutting the list in half until nothing was left.`,
  });
  return steps;
}
