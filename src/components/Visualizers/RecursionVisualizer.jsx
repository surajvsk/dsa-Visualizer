import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { factorialSteps, fibonacciMemoSteps, fibonacciSteps } from '../../algorithms/recursion';
import { CODE } from '../../data/codeSnippets';
import { useVisualizerPlayer } from '../../hooks/useVisualizerPlayer';
import VisualizerLayout, { Legend } from '../Layout/VisualizerLayout';

const MODES = {
  factorial: { label: 'Factorial', run: (n) => factorialSteps(n), code: CODE.factorial, max: 7 },
  fibonacci: { label: 'Fibonacci', run: (n) => fibonacciSteps(n), code: CODE.fibonacci, max: 6 },
  memo: { label: 'Fib + memo', run: (n) => fibonacciMemoSteps(n), code: CODE.fibMemo, max: 8 },
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
      title="Recursion"
      subtitle="Each call waits on the stack until the base case returns. Watch frames push on the way down and pop on the way up."
      code={meta.code}
      currentLine={step.line ?? 0}
      description={step.description}
      extra={
        <div className="flex flex-wrap items-center gap-2">
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
          <label className="text-xs text-slate-400">
            n
            <input
              type="number"
              min={1}
              max={meta.max}
              className="ml-2 w-16 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-slate-100"
              value={safeN}
              onChange={(e) => setN(Number(e.target.value))}
            />
          </label>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_220px]">
        <div className="panel min-h-[280px] p-6">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-purple-300">Call stack</p>
          <div className="flex min-h-[200px] flex-col-reverse justify-start gap-2">
            <AnimatePresence>
              {(step.callStack ?? []).map((call) => (
                <motion.div
                  key={call.id}
                  layout
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  className="rounded-xl border border-purple-400/40 bg-purple-500/15 px-4 py-3"
                >
                  <p className="font-mono text-sm font-semibold text-purple-100">
                    {call.functionName}({call.args})
                    {call.returning != null && (
                      <span className="ml-2 text-emerald-300">→ {call.returning}</span>
                    )}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
            {(step.callStack ?? []).length === 0 && (
              <p className="text-sm text-slate-500">Stack empty.</p>
            )}
          </div>
        </div>
        <div className="panel p-5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Result</p>
          <p className="mt-2 font-mono text-3xl font-extrabold text-white">{step.result ?? '—'}</p>
          {step.memo && (
            <>
              <p className="mt-5 text-[11px] font-bold uppercase tracking-wider text-slate-500">Memo</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {Object.entries(step.memo).map(([k, v]) => (
                  <span key={k} className="chip bg-white/10 text-slate-200">
                    {k}:{v}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Legend
        items={[
          { label: 'Active frame', color: 'bg-purple-400' },
          { label: 'Returning', color: 'bg-emerald-400' },
        ]}
      />
    </VisualizerLayout>
  );
}
