import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { fibonacciDpSteps, lcsSteps } from '../../algorithms/dp';
import { CODE } from '../../data/codeSnippets';
import { useVisualizerPlayer } from '../../hooks/useVisualizerPlayer';
import VisualizerLayout, { Legend } from '../Layout/VisualizerLayout';

export default function DPVisualizer() {
  const [mode, setMode] = useState('fib');
  const [n, setN] = useState(7);

  const steps = useMemo(
    () => (mode === 'fib' ? fibonacciDpSteps(Math.max(1, Math.min(n, 12))) : lcsSteps()),
    [mode, n]
  );
  const { currentStep } = useVisualizerPlayer(steps);
  const step = currentStep ?? { dp: [], table: [], description: '', line: 0 };

  return (
    <VisualizerLayout
      topicId="dp"
      code={mode === 'fib' ? CODE.fibDp : CODE.lcs}
      currentLine={step.line ?? 0}
      description={step.description}
      extra={
        <>
          <button type="button" className={mode === 'fib' ? 'btn-primary' : 'btn-ghost'} onClick={() => setMode('fib')}>
            Fibonacci notebook
          </button>
          <button type="button" className={mode === 'lcs' ? 'btn-primary' : 'btn-ghost'} onClick={() => setMode('lcs')}>
            Common letters in two words
          </button>
          {mode === 'fib' && (
            <label className="text-sm font-semibold text-slate-600">
              n
              <input
                type="number"
                min={1}
                max={12}
                className="ml-2 w-16 rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-slate-800"
                value={n}
                onChange={(e) => setN(Number(e.target.value))}
              />
            </label>
          )}
        </>
      }
    >
      {mode === 'fib' ? (
        <div className="panel overflow-x-auto p-6">
          <div className="flex gap-2">
            {(step.dp ?? []).map((v, i) => {
              const filling = step.filling === i;
              const using = (step.using ?? []).includes(i);
              return (
                <motion.div
                  key={i}
                  layout
                  className={`flex h-24 w-[4.5rem] shrink-0 flex-col items-center justify-center rounded-2xl border-2 text-lg font-extrabold ${
                    filling
                      ? 'border-amber-400 bg-amber-100 text-amber-900'
                      : using
                        ? 'border-sky-400 bg-sky-50 text-sky-900'
                        : 'border-slate-200 bg-slate-50 text-slate-800'
                  }`}
                >
      <span className="text-[10px] font-bold text-slate-500">cell {i}</span>
                  {v == null ? '·' : v}
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="panel overflow-auto p-4">
          <table className="border-separate border-spacing-1 text-center text-sm">
            <thead>
              <tr>
                <th className="w-8 text-slate-400" />
                <th className="text-slate-400">-</th>
                {(step.s2 ?? 'BDCABA').split('').map((ch, j) => (
                  <th key={j} className="w-10 font-bold text-indigo-700">
                    {ch}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(step.table ?? []).map((row, i) => (
                <tr key={i}>
                  <th className="pr-2 font-bold text-indigo-700">
                    {i === 0 ? '-' : (step.s1 ?? 'ABCBDAB')[i - 1]}
                  </th>
                  {row.map((cell, j) => {
                    const active = step.i === i && step.j === j;
                    return (
                      <td
                        key={j}
                        className={`h-9 w-10 rounded-lg font-bold ${
                          active
                            ? step.match
                              ? 'bg-emerald-500 text-white'
                              : 'bg-amber-400 text-slate-900'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Legend
        items={[
          { label: 'Filling this cell', color: 'bg-amber-400' },
          { label: 'Match / answer', color: 'bg-emerald-500' },
          { label: 'Used these cells', color: 'bg-sky-400' },
        ]}
      />
    </VisualizerLayout>
  );
}
