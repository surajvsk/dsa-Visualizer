export function linearSearchSteps(arr, target) {
  const steps = [];
  const a = [...arr];

  steps.push({
    array: a,
    checking: null,
    found: false,
    line: 0,
    description: `${target} dhoondhna hai. Seedha pehle box se last tak dekhenge — koi shortcut nahi.`,
  });

  for (let i = 0; i < a.length; i++) {
    steps.push({
      array: a,
      checking: i,
      found: false,
      line: 2,
      description:
        a[i] === target
          ? `Box ${i} mein ${a[i]} hai — yahi toh chahiye tha!`
          : `Box ${i} mein ${a[i]} hai, ${target} nahi. Agla box dekho.`,
    });
    if (a[i] === target) {
      steps.push({
        array: a,
        checking: i,
        found: true,
        done: true,
        line: 3,
        description: `Mil gaya! ${target} jagah ${i} par hai. Itne boxes check kiye: ${i + 1}.`,
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
    description: `${target} is list mein hai hi nahi. Poori line dekh li.`,
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
    description: `List pehle se chhote-se-bade mein hai. ${target} dhoondhne ke liye hamesha beech wala box kholenge.`,
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
      description: `Beech ka box ${mid} — usme ${a[mid]} hai. Ye ${target} se chhota, bada, ya barabar?`,
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
        description: `Bilkul barabar! ${target} jagah ${mid} par mil gaya. Baaki copy padhne ki zarurat nahi.`,
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
        description: `${a[mid]} chhota hai ${target} se. Left waali aadhi list fenk do — wahan nahi hoga.`,
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
        description: `${a[mid]} bada hai ${target} se. Right waali aadhi list fenk do.`,
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
    description: `${target} is list mein nahi hai. Aadhi-aadhi kaat-kaat ke poora search khatam.`,
  });
  return steps;
}
