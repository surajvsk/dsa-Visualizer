import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Shuffle } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { bubbleSortSteps, mergeSortSteps, quickSortSteps, randomArray } from '../../algorithms/sorting';
import { CODE } from '../../data/codeSnippets';
import { useVisualizerPlayer } from '../../hooks/useVisualizerPlayer';
import VisualizerLayout, { Legend } from '../Layout/VisualizerLayout';

const GENERATORS = {
  bubble: bubbleSortSteps,
  merge: mergeSortSteps,
  quick: quickSortSteps,
};

const COMPLEXITY = Array.from({ length: 16 }, (_, i) => {
  const n = (i + 1) * 4;
  return { n, bubble: n * n, merge: n * Math.log2(n), quick: n * Math.log2(n) };
});

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
      title="Sorting"
      subtitle="Watch comparisons and swaps. Switch algorithms — the visualizer stays the same, only the step generator changes."
      code={CODE[algo]}
      currentLine={step.line ?? 0}
      description={step.description}
      extra={
        <div className="flex flex-wrap gap-2">
          {['bubble', 'merge', 'quick'].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setAlgo(id)}
              className={algo === id ? 'btn-primary capitalize' : 'btn-ghost capitalize'}
            >
              {id} sort
            </button>
          ))}
          <button type="button" className="btn-ghost" onClick={() => setSeed((s) => s + 1)}>
            <Shuffle className="h-4 w-4" /> Random
          </button>
        </div>
      }
    >
      <div className="panel flex min-h-[280px] items-end justify-center gap-2 overflow-x-auto p-6">
        {step.array.map((item, idx) => {
          const isComparing = comparing.includes(idx);
          const isSorted = sorted.has(idx) || step.done;
          const muted = !inRange(idx);
          let color = 'bg-indigo-500';
          if (isSorted) color = 'bg-emerald-500';
          else if (step.pivot === idx) color = 'bg-fuchsia-500';
          else if (isComparing && step.swapped) color = 'bg-rose-500';
          else if (isComparing) color = 'bg-amber-400';
          if (muted && !isComparing && !isSorted) color = 'bg-slate-700';

          return (
            <motion.div
              key={item.id}
              layout
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className={`flex w-9 shrink-0 items-end justify-center rounded-t-md text-xs font-bold text-white md:w-10 ${color}`}
              style={{ height: `${item.value * 4.5}px` }}
            >
              <span className="mb-1">{item.value}</span>
            </motion.div>
          );
        })}
      </div>
      <Legend
        items={[
          { label: 'Idle', color: 'bg-indigo-500' },
          { label: 'Comparing', color: 'bg-amber-400' },
          { label: 'Swapped', color: 'bg-rose-500' },
          { label: 'Pivot', color: 'bg-fuchsia-500' },
          { label: 'Sorted', color: 'bg-emerald-500' },
        ]}
      />
      <div className="panel mt-6 p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
          Why Merge/Quick beat Bubble — comparisons vs n
        </p>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={COMPLEXITY}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="n" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
              />
              <Area type="monotone" dataKey="bubble" stroke="#f59e0b" fill="#f59e0b33" name="Bubble O(n²)" />
              <Area type="monotone" dataKey="merge" stroke="#34d399" fill="#34d39922" name="Merge O(n log n)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </VisualizerLayout>
  );
}
