import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Shuffle } from 'lucide-react';
import { bubbleSortSteps, mergeSortSteps, quickSortSteps, randomArray } from '../../algorithms/sorting';
import { CODE } from '../../data/codeSnippets';
import { useVisualizerPlayer } from '../../hooks/useVisualizerPlayer';
import VisualizerLayout, { Legend } from '../Layout/VisualizerLayout';

const GENERATORS = {
  bubble: bubbleSortSteps,
  merge: mergeSortSteps,
  quick: quickSortSteps,
};

const ALGO_LABEL = {
  bubble: 'Start here: Bubble',
  merge: 'Then: Merge',
  quick: 'Then: Quick',
};

export default function SortingVisualizer() {
  const [algo, setAlgo] = useState('bubble');
  const [seed, setSeed] = useState(0);
  const [data] = useState(() => [28, 14, 42, 9, 35, 21, 17, 31, 12, 24]);
  const array = useMemo(() => (seed === 0 ? data : randomArray(10)), [seed, data]);

  const steps = useMemo(() => GENERATORS[algo](array), [algo, array]);
  const { currentStep } = useVisualizerPlayer(steps);

  const step = currentStep ?? { array: [], comparing: [], description: '', line: 0 };
  const comparing = step.comparing ?? [];
  const sorted = new Set(step.sorted ?? []);
  const inRange = (idx) => {
    if (!step.range) return true;
    return idx >= step.range[0] && idx <= step.range[1];
  };

  return (
    <VisualizerLayout
      topicId="sorting"
      code={CODE[algo]}
      currentLine={step.line ?? 0}
      description={step.description}
      extra={
        <>
          {['bubble', 'merge', 'quick'].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setAlgo(id)}
              className={algo === id ? 'btn-primary' : 'btn-ghost'}
            >
              {ALGO_LABEL[id]}
            </button>
          ))}
          <button type="button" className="btn-ghost" onClick={() => setSeed((s) => s + 1)}>
            <Shuffle className="h-4 w-4" /> New list
          </button>
        </>
      }
    >
      <div className="panel flex min-h-[300px] items-end justify-center gap-2 overflow-x-auto p-6">
        {step.array.map((item, idx) => {
          const isComparing = comparing.includes(idx);
          const isSorted = sorted.has(idx) || step.done;
          const muted = !inRange(idx);
          let color = 'bg-indigo-500';
          let tag = '';
          if (isSorted) {
            color = 'bg-emerald-500';
            tag = 'done';
          } else if (step.pivot === idx) {
            color = 'bg-fuchsia-500';
            tag = 'leader';
          } else if (isComparing && step.swapped) {
            color = 'bg-rose-500';
            tag = 'swap';
          } else if (isComparing) {
            color = 'bg-amber-400';
            tag = 'look';
          }
          if (muted && !isComparing && !isSorted) color = 'bg-slate-300';

          return (
            <div key={item.id} className="flex flex-col items-center gap-1">
              <span className="h-5 text-[10px] font-bold text-slate-500">{tag}</span>
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                className={`flex w-10 shrink-0 items-end justify-center rounded-t-xl text-sm font-extrabold text-white md:w-11 ${color}`}
                style={{ height: `${item.value * 4.5}px` }}
              >
                <span className="mb-1">{item.value}</span>
              </motion.div>
            </div>
          );
        })}
      </div>
      <Legend
        items={[
          { label: 'Standing still', color: 'bg-indigo-500' },
          { label: 'Looking at these two', color: 'bg-amber-400' },
          { label: 'Just swapped', color: 'bg-rose-500' },
          { label: 'This spot is done', color: 'bg-emerald-500' },
        ]}
      />
    </VisualizerLayout>
  );
}
