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
    // run forces a fresh step list after "Phir se taiyar"
  }, [mode, index, value, run]);

  const { currentStep } = useVisualizerPlayer(steps);
  const step = currentStep ?? { array: BASE, highlight: [], description: '', line: 0 };
  const highlight = new Set(step.highlight ?? []);

  return (
    <VisualizerLayout
      topicId="arrays"
      code={mode === 'insert' ? CODE.arrayInsert : CODE.arrayDelete}
      currentLine={step.line ?? 0}
      description={step.description}
      extra={
        <>
          <button type="button" className={mode === 'insert' ? 'btn-primary' : 'btn-ghost'} onClick={() => setMode('insert')}>
            Beech mein daalo
          </button>
          <button type="button" className={mode === 'delete' ? 'btn-primary' : 'btn-ghost'} onClick={() => setMode('delete')}>
            Nikaalo
          </button>
          <label className="text-sm font-semibold text-slate-600">
            Kaunsa khana
            <input
              type="number"
              className="ml-2 w-16 rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-slate-800"
              value={index}
              min={0}
              max={mode === 'insert' ? BASE.length : BASE.length - 1}
              onChange={(e) => setIndex(Number(e.target.value))}
            />
          </label>
          {mode === 'insert' && (
            <label className="text-sm font-semibold text-slate-600">
              Kaunsa number
              <input
                type="number"
                className="ml-2 w-16 rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-slate-800"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
              />
            </label>
          )}
          <button type="button" className="btn-ghost" onClick={() => setRun((r) => r + 1)}>
            Phir se taiyar
          </button>
        </>
      }
    >
      <div className="panel overflow-x-auto p-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Khana number (index)</p>
        <div className="mb-2 flex gap-2 text-center text-sm font-bold text-slate-500">
          {step.array.map((_, i) => (
            <span key={`i-${i}`} className="w-16">
              {i}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          {step.array.map((v, i) => (
            <motion.div
              key={`${i}-${v}`}
              layout
              className={`flex h-[4.5rem] w-16 shrink-0 flex-col items-center justify-center rounded-2xl border-2 text-xl font-extrabold ${
                v == null
                  ? 'border-dashed border-slate-300 text-slate-300'
                  : highlight.has(i)
                    ? 'border-amber-400 bg-amber-100 text-amber-900'
                    : 'border-slate-200 bg-slate-50 text-slate-800'
              }`}
            >
              {v ?? '·'}
            </motion.div>
          ))}
        </div>
      </div>
      <Legend
        items={[
          { label: 'Saadi khana', color: 'bg-slate-300' },
          { label: 'Abhi yahan kaam ho raha', color: 'bg-amber-400' },
        ]}
      />
    </VisualizerLayout>
  );
}
