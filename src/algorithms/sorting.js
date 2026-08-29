export function toItems(arr) {
  return arr.map((value, i) => ({ id: `el-${i}-${value}-${Math.random().toString(36).slice(2, 6)}`, value }));
}

export function valuesOf(items) {
  return items.map((x) => x.value);
}

export function bubbleSortSteps(arr) {
  const steps = [];
  const a = toItems(arr);

  steps.push({
    array: a.map((x) => ({ ...x })),
    comparing: [],
    swapped: false,
    sorted: [],
    line: 0,
    description: 'Start Bubble Sort — adjacent pairs will be compared.',
  });

  for (let i = 0; i < a.length; i++) {
    let swappedInPass = false;
    for (let j = 0; j < a.length - i - 1; j++) {
      const sorted = Array.from({ length: i }, (_, k) => a.length - 1 - k);
      steps.push({
        array: a.map((x) => ({ ...x })),
        comparing: [j, j + 1],
        swapped: false,
        sorted,
        line: 2,
        description: `Compare ${a[j].value} and ${a[j + 1].value}`,
      });

      if (a[j].value > a[j + 1].value) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swappedInPass = true;
        steps.push({
          array: a.map((x) => ({ ...x })),
          comparing: [j, j + 1],
          swapped: true,
          sorted,
          line: 4,
          description: `Swap — ${a[j].value} now sits left of ${a[j + 1].value}`,
        });
      }
    }
    if (!swappedInPass && i < a.length - 1) {
      steps.push({
        array: a.map((x) => ({ ...x })),
        comparing: [],
        swapped: false,
        sorted: Array.from({ length: a.length }, (_, k) => k),
        done: true,
        line: 6,
        description: 'No swaps in this pass — array is already sorted.',
      });
      return steps;
    }
  }

  steps.push({
    array: a.map((x) => ({ ...x })),
    comparing: [],
    swapped: false,
    sorted: a.map((_, i) => i),
    done: true,
    line: 7,
    description: 'Done. Largest values have bubbled to the right.',
  });
  return steps;
}

export function mergeSortSteps(arr) {
  const steps = [];
  const a = toItems(arr);

  steps.push({
    array: a.map((x) => ({ ...x })),
    comparing: [],
    range: [0, a.length - 1],
    line: 0,
    description: 'Start Merge Sort — divide the array, then merge sorted halves.',
  });

  function mergeSort(l, r) {
    if (l >= r) return;
    const mid = Math.floor((l + r) / 2);
    steps.push({
      array: a.map((x) => ({ ...x })),
      comparing: [],
      range: [l, r],
      line: 1,
      description: `Divide range [${l}…${r}] at mid ${mid}`,
    });
    mergeSort(l, mid);
    mergeSort(mid + 1, r);
    merge(l, mid, r);
  }

  function merge(l, mid, r) {
    const left = a.slice(l, mid + 1);
    const right = a.slice(mid + 1, r + 1);
    let i = 0;
    let j = 0;
    let k = l;

    while (i < left.length && j < right.length) {
      steps.push({
        array: a.map((x) => ({ ...x })),
        comparing: [l + i, mid + 1 + j],
        range: [l, r],
        line: 6,
        description: `Merge [${l}…${r}]: compare ${left[i].value} and ${right[j].value}`,
      });
      if (left[i].value <= right[j].value) {
        a[k] = left[i];
        i += 1;
      } else {
        a[k] = right[j];
        j += 1;
      }
      steps.push({
        array: a.map((x) => ({ ...x })),
        comparing: [k],
        swapped: true,
        range: [l, r],
        line: 8,
        description: `Place ${a[k].value} at index ${k}`,
      });
      k += 1;
    }

    while (i < left.length) {
      a[k] = left[i];
      steps.push({
        array: a.map((x) => ({ ...x })),
        comparing: [k],
        range: [l, r],
        line: 12,
        description: `Copy remaining ${a[k].value} from left half`,
      });
      i += 1;
      k += 1;
    }

    while (j < right.length) {
      a[k] = right[j];
      steps.push({
        array: a.map((x) => ({ ...x })),
        comparing: [k],
        range: [l, r],
        line: 15,
        description: `Copy remaining ${a[k].value} from right half`,
      });
      j += 1;
      k += 1;
    }
  }

  mergeSort(0, a.length - 1);
  steps.push({
    array: a.map((x) => ({ ...x })),
    comparing: [],
    sorted: a.map((_, i) => i),
    done: true,
    line: 17,
    description: 'Merge Sort complete.',
  });
  return steps;
}

export function quickSortSteps(arr) {
  const steps = [];
  const a = toItems(arr);

  steps.push({
    array: a.map((x) => ({ ...x })),
    comparing: [],
    pivot: null,
    line: 0,
    description: 'Start Quick Sort — pick a pivot, partition, recurse.',
  });

  function partition(low, high) {
    const pivotValue = a[high].value;
    let i = low;
    steps.push({
      array: a.map((x) => ({ ...x })),
      comparing: [],
      pivot: high,
      range: [low, high],
      line: 2,
      description: `Pivot = ${pivotValue} (index ${high})`,
    });

    for (let j = low; j < high; j++) {
      steps.push({
        array: a.map((x) => ({ ...x })),
        comparing: [j],
        pivot: high,
        range: [low, high],
        line: 5,
        description: `Compare ${a[j].value} with pivot ${pivotValue}`,
      });
      if (a[j].value < pivotValue) {
        [a[i], a[j]] = [a[j], a[i]];
        steps.push({
          array: a.map((x) => ({ ...x })),
          comparing: [i, j],
          swapped: true,
          pivot: high,
          range: [low, high],
          line: 7,
          description: `${a[i].value} is smaller than pivot — swap into left side`,
        });
        i += 1;
      }
    }
    [a[i], a[high]] = [a[high], a[i]];
    steps.push({
      array: a.map((x) => ({ ...x })),
      comparing: [i, high],
      swapped: true,
      pivot: i,
      range: [low, high],
      line: 10,
      description: `Place pivot ${a[i].value} at index ${i}`,
    });
    return i;
  }

  function quickSort(low, high) {
    if (low >= high) return;
    const p = partition(low, high);
    quickSort(low, p - 1);
    quickSort(p + 1, high);
  }

  quickSort(0, a.length - 1);
  steps.push({
    array: a.map((x) => ({ ...x })),
    comparing: [],
    pivot: null,
    sorted: a.map((_, i) => i),
    done: true,
    line: 16,
    description: 'Quick Sort complete.',
  });
  return steps;
}

export function randomArray(n = 10, min = 8, max = 48) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}
