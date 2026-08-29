import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { factorialSteps, fibonacciMemoSteps, fibonacciSteps } from '../../algorithms/recursion';
import { CODE } from '../../data/codeSnippets';
import { useVisualizerPlayer } from '../../hooks/useVisualizerPlayer';
import VisualizerLayout, { Legend } from '../Layout/VisualizerLayout';

const MODES = {
  factorial: { label: 'Start: Factorial', run: (n) => factorialSteps(n), code: CODE.factorial, max: 6 },
  fibonacci: { label: 'Then: Fibonacci', run: (n) => fibonacciSteps(n), code: CODE.fibonacci, max: 5 },
  memo: { label: 'Then: remember answers', run: (n) => fibonacciMemoSteps(n), code: CODE.fibMemo, max: 7 },
};

export default function RecursionVisualizer() {
  const [mode, setMode] = useState('factorial');
  const [n, setN] = useState(4);
  const meta = MODES[mode];
  const safeN = Math.max(1, Math.min(n, meta.max));

  const steps = useMemo(() => meta.run(safeN), [mode, safeN, meta]);
  const { currentStep } = useVisualizerPlayer(steps);
  const step = currentStep ?? { callStack: [], description: '', line: 0, memo: {} };

  return (
    <VisualizerLayout
      topicId="recursion"
      code={meta.code}
      currentLine={step.line ?? 0}
      description={step.description}
      extra={
        <>
          {Object.entries(MODES).map(([id, m]) => (
            <button
              key={id}
              type="button"
              className={mode === id ? 'btn-primary' : 'btn-ghost'}
              onClick={() => setMode(id)}
            >
              {m.label}
            </button>
          ))}
          <label className="text-sm font-semibold text-slate-600">
            How big is n
            <input
              type="number"
              min={1}
              max={meta.max}
              className="ml-2 w-16 rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-slate-800"
              value={safeN}
              onChange={(e) => setN(Number(e.target.value))}
            />
          </label>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_200px]">
        <div className="panel min-h-[280px] p-6">
          <p className="mb-3 text-sm font-extrabold text-purple-800">Waiting cards (call stack)</p>
          <div className="flex min-h-[200px] flex-col-reverse justify-start gap-2">
            <AnimatePresence>
              {(step.callStack ?? []).map((call) => (
                <motion.div
                  key={call.id}
                  layout
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  className="rounded-2xl border-2 border-purple-200 bg-purple-50 px-4 py-3"
                >
                  <p className="text-base font-bold text-purple-950">
                    {call.functionName}({call.args}) is waiting
                    {call.returning != null && (
                      <span className="ml-2 text-emerald-700">→ jawab {call.returning}</span>
                    )}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
            {(step.callStack ?? []).length === 0 && (
              <p className="text-sm text-slate-500">Nobody is waiting now.</p>
            )}
          </div>
        </div>
        <div className="panel p-5">
          <p className="text-sm font-extrabold text-slate-500">Final answer</p>
          <p className="mt-2 text-4xl font-extrabold text-slate-900">{step.result ?? '—'}</p>
          {step.memo && Object.keys(step.memo).length > 0 && (
            <>
              <p className="mt-5 text-sm font-extrabold text-slate-500">Notebook</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {Object.entries(step.memo).map(([k, v]) => (
                  <span key={k} className="chip bg-indigo-100 text-indigo-800">
                    {k} = {v}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Legend
        items={[
          { label: 'Waiting card', color: 'bg-purple-400' },
          { label: 'Got an answer', color: 'bg-emerald-500' },
        ]}
      />
    </VisualizerLayout>
  );
}
