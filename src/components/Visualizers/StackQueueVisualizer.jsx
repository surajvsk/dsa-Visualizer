import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { queueDemoSteps, stackDemoSteps } from '../../algorithms/linear';
import { CODE } from '../../data/codeSnippets';
import { useVisualizerPlayer } from '../../hooks/useVisualizerPlayer';
import VisualizerLayout, { Legend } from '../Layout/VisualizerLayout';

export default function StackQueueVisualizer() {
  const [mode, setMode] = useState('stack');
  const steps = useMemo(() => (mode === 'stack' ? stackDemoSteps() : queueDemoSteps()), [mode]);
  const { currentStep } = useVisualizerPlayer(steps);
  const step = currentStep ?? { stack: [], queue: [], description: '', line: 0 };

  return (
    <VisualizerLayout
      topicId="stackqueue"
      code={mode === 'stack' ? CODE.stack : CODE.queue}
      currentLine={step.line ?? 0}
      description={step.description}
      extra={
        <>
          <button type="button" className={mode === 'stack' ? 'btn-primary' : 'btn-ghost'} onClick={() => setMode('stack')}>
            Plates (Stack)
          </button>
          <button type="button" className={mode === 'queue' ? 'btn-primary' : 'btn-ghost'} onClick={() => setMode('queue')}>
            Ticket line (Queue)
          </button>
        </>
      }
    >
      {mode === 'stack' ? (
        <div className="panel mx-auto flex min-h-[340px] w-full max-w-sm flex-col-reverse items-center justify-start gap-2 p-6">
          <p className="text-sm font-bold text-slate-400">Bottom — we never take from here</p>
          <AnimatePresence>
            {(step.stack ?? []).map((v, i) => (
              <motion.div
                key={`${v}-${i}`}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 24 }}
                className={`flex h-14 w-48 items-center justify-center rounded-2xl border-2 text-xl font-extrabold ${
                  i === (step.stack?.length ?? 0) - 1
                    ? 'border-violet-400 bg-violet-100 text-violet-900'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                {v}
                {i === (step.stack?.length ?? 0) - 1 && (
                  <span className="ml-2 text-xs font-bold text-violet-600">top</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <p className="text-sm font-extrabold text-violet-700">Top — this plate comes off</p>
        </div>
      ) : (
        <div className="panel overflow-x-auto p-8">
          <div className="mb-3 flex justify-between text-sm font-extrabold text-slate-500">
            <span>Front (leaves here)</span>
            <span>Back (joins here)</span>
          </div>
          <div className="flex min-h-[88px] items-center gap-2">
            <AnimatePresence>
              {(step.queue ?? []).map((v, i) => (
                <motion.div
                  key={`${v}-${i}-${step.queue.length}`}
                  layout
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -30 }}
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl border-2 text-lg font-extrabold ${
                    i === 0 ? 'border-sky-400 bg-sky-100 text-sky-900' : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  {v}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
      <Legend
        items={
          mode === 'stack'
            ? [
                { label: 'Buried below', color: 'bg-slate-300' },
                { label: 'Top plate', color: 'bg-violet-400' },
              ]
            : [
                { label: 'Waiting in line', color: 'bg-slate-300' },
                { label: 'Next to leave', color: 'bg-sky-400' },
              ]
        }
      />
    </VisualizerLayout>
  );
}
