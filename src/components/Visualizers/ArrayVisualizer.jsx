import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { arrayDeleteSteps, arrayInsertSteps } from '../../algorithms/linear';
import { CODE } from '../../data/codeSnippets';
import { useVisualizerPlayer } from '../../hooks/useVisualizerPlayer';
import VisualizerLayout, { Legend } from '../Layout/VisualizerLayout';

const BASE = [4, 11, 7, 19, 2, 15];

export default function ArrayVisualizer() {
  const [mode, setMode] = useState('insert');
  const [index, setIndex] = useState(2);
  const [value, setValue] = useState(9);
  const [run, setRun] = useState(0);

  const steps = useMemo(() => {
    const idx = Math.max(0, Math.min(index, mode === 'insert' ? BASE.length : BASE.length - 1));
    return mode === 'insert' ? arrayInsertSteps(BASE, idx, value) : arrayDeleteSteps(BASE, idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, index, value, run]);

  const { currentStep } = useVisualizerPlayer(steps);
  const step = currentStep ?? { array: BASE, highlight: [], description: '', line: 0 };
  const highlight = new Set(step.highlight ?? []);

  return (
    <VisualizerLayout
      title="Arrays"
      subtitle="Arrays store items in contiguous memory. Insert and delete must shift neighbors — that's why they are O(n)."
      code={mode === 'insert' ? CODE.arrayInsert : CODE.arrayDelete}
      currentLine={step.line ?? 0}
      description={step.description}
      extra={
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className={mode === 'insert' ? 'btn-primary' : 'btn-ghost'} onClick={() => setMode('insert')}>
            Insert
          </button>
          <button type="button" className={mode === 'delete' ? 'btn-primary' : 'btn-ghost'} onClick={() => setMode('delete')}>
            Delete
          </button>
          <label className="text-xs text-slate-400">
            Index
            <input
              type="number"
              className="ml-2 w-16 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-slate-100"
              value={index}
              min={0}
              max={mode === 'insert' ? BASE.length : BASE.length - 1}
              onChange={(e) => setIndex(Number(e.target.value))}
            />
          </label>
          {mode === 'insert' && (
            <label className="text-xs text-slate-400">
              Value
              <input
                type="number"
                className="ml-2 w-16 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-slate-100"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
              />
            </label>
          )}
          <button type="button" className="btn-ghost" onClick={() => setRun((r) => r + 1)}>
            Rebuild steps
          </button>
        </div>
      }
    >
      <div className="panel overflow-x-auto p-6">
        <div className="mb-3 flex gap-2 font-mono text-[11px] text-slate-500">
          {step.array.map((_, i) => (
            <span key={`i-${i}`} className="w-16 text-center">
              {i}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          {step.array.map((v, i) => (
            <motion.div
              key={`${i}-${v}`}
              layout
              initial={{ scale: 0.9, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl border text-lg font-bold ${
                v == null
                  ? 'border-dashed border-slate-600 text-slate-600'
                  : highlight.has(i)
                    ? 'border-amber-400 bg-amber-400/20 text-amber-200'
                    : 'border-white/10 bg-white/5 text-white'
              }`}
            >
              {v ?? '·'}
            </motion.div>
          ))}
        </div>
      </div>
      <Legend
        items={[
          { label: 'Cell', color: 'bg-white/40' },
          { label: 'Active / shifting', color: 'bg-amber-400' },
        ]}
      />
    </VisualizerLayout>
  );
}
