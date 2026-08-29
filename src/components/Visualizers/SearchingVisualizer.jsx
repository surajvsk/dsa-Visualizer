import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { binarySearchSteps, linearSearchSteps } from '../../algorithms/searching';
import { CODE } from '../../data/codeSnippets';
import { useVisualizerPlayer } from '../../hooks/useVisualizerPlayer';
import VisualizerLayout, { Legend } from '../Layout/VisualizerLayout';

const RAW = [3, 8, 12, 17, 24, 31, 36, 44, 51, 63];

export default function SearchingVisualizer() {
  const [algo, setAlgo] = useState('linear');
  const [target, setTarget] = useState(31);

  const steps = useMemo(
    () => (algo === 'binary' ? binarySearchSteps(RAW, target) : linearSearchSteps(RAW, target)),
    [algo, target]
  );
  const { currentStep } = useVisualizerPlayer(steps);
  const step = currentStep ?? { array: RAW, description: '', line: 0 };

  return (
    <VisualizerLayout
      topicId="searching"
      code={algo === 'binary' ? CODE.binary : CODE.linear}
      currentLine={step.line ?? 0}
      description={step.description}
      extra={
        <>
          <button type="button" className={algo === 'linear' ? 'btn-primary' : 'btn-ghost'} onClick={() => setAlgo('linear')}>
            One by one (Linear)
          </button>
          <button type="button" className={algo === 'binary' ? 'btn-primary' : 'btn-ghost'} onClick={() => setAlgo('binary')}>
            Cut in half (Binary)
          </button>
          <label className="text-sm font-semibold text-slate-600">
            Find this number
            <input
              type="number"
              className="ml-2 w-20 rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-slate-800"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
            />
          </label>
        </>
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
            let color = inWindow ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-400';
            if (isCheck) color = 'bg-amber-400 text-slate-900';
            if (found) color = 'bg-emerald-500 text-white';

            return (
              <motion.div
                key={`${idx}-${value}`}
                layout
                className={`flex h-20 w-14 shrink-0 flex-col items-center justify-center rounded-2xl text-base font-extrabold ${color}`}
              >
                {value}
                <span className="mt-1 text-[10px] font-bold opacity-70">box {idx}</span>
              </motion.div>
            );
          })}
        </div>
        {algo === 'binary' && (
          <p className="mt-4 text-sm font-semibold text-slate-600">
            Still in range: boxes {step.low ?? '—'} to {step.high ?? '—'}
            {step.mid != null ? ` · middle is ${step.mid}` : ''}
          </p>
        )}
      </div>
      <Legend
        items={[
          { label: 'Could still be here', color: 'bg-indigo-500' },
          { label: 'Opening this box', color: 'bg-amber-400' },
          { label: 'Found it', color: 'bg-emerald-500' },
          { label: 'Thrown away', color: 'bg-slate-300' },
        ]}
      />
    </VisualizerLayout>
  );
}
