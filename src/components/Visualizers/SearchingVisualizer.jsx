import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { binarySearchSteps, linearSearchSteps } from '../../algorithms/searching';
import { CODE } from '../../data/codeSnippets';
import { useVisualizerPlayer } from '../../hooks/useVisualizerPlayer';
import VisualizerLayout, { Legend } from '../Layout/VisualizerLayout';

const RAW = [3, 8, 12, 17, 24, 31, 36, 44, 51, 63];

export default function SearchingVisualizer() {
  const [algo, setAlgo] = useState('binary');
  const [target, setTarget] = useState(31);

  const steps = useMemo(
    () => (algo === 'binary' ? binarySearchSteps(RAW, target) : linearSearchSteps(RAW, target)),
    [algo, target]
  );
  const { currentStep } = useVisualizerPlayer(steps);
  const step = currentStep ?? { array: RAW, description: '', line: 0 };

  return (
    <VisualizerLayout
      title="Searching"
      subtitle="Linear scan checks every item. Binary search halves a sorted array each step — O(log n)."
      code={algo === 'binary' ? CODE.binary : CODE.linear}
      currentLine={step.line ?? 0}
      description={step.description}
      extra={
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className={algo === 'linear' ? 'btn-primary' : 'btn-ghost'} onClick={() => setAlgo('linear')}>
            Linear
          </button>
          <button type="button" className={algo === 'binary' ? 'btn-primary' : 'btn-ghost'} onClick={() => setAlgo('binary')}>
            Binary
          </button>
          <label className="text-xs text-slate-400">
            Target
            <input
              type="number"
              className="ml-2 w-20 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-slate-100"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
            />
          </label>
        </div>
      }
    >
      <div className="panel overflow-x-auto p-6">
        <div className="flex items-end gap-2">
          {step.array.map((value, idx) => {
            const isCheck = algo === 'linear' ? step.checking === idx : step.mid === idx;
            const inWindow =
              algo === 'binary' && step.low != null && step.high != null
                ? idx >= step.low && idx <= step.high
                : true;
            const found = step.found && isCheck;
            let color = inWindow ? 'bg-indigo-500' : 'bg-slate-800 text-slate-500';
            if (isCheck) color = 'bg-amber-400 text-slate-900';
            if (found) color = 'bg-emerald-500';

            return (
              <motion.div
                key={`${idx}-${value}`}
                layout
                className={`flex h-20 w-14 shrink-0 flex-col items-center justify-center rounded-xl text-sm font-bold ${color}`}
              >
                {value}
                <span className="mt-1 text-[10px] font-medium opacity-70">{idx}</span>
              </motion.div>
            );
          })}
        </div>
        {algo === 'binary' && (
          <p className="mt-4 text-xs text-slate-400">
            low = {step.low ?? '—'} · mid = {step.mid ?? '—'} · high = {step.high ?? '—'}
          </p>
        )}
      </div>
      <Legend
        items={[
          { label: 'In range', color: 'bg-indigo-500' },
          { label: 'Checking', color: 'bg-amber-400' },
          { label: 'Found', color: 'bg-emerald-500' },
          { label: 'Discarded', color: 'bg-slate-800' },
        ]}
      />
    </VisualizerLayout>
  );
}
