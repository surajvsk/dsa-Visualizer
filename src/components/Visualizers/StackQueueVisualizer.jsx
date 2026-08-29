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
      title="Stack & Queue"
      subtitle="A stack is LIFO (plates). A queue is FIFO (a line). Same items, opposite access rules."
      code={mode === 'stack' ? CODE.stack : CODE.queue}
      currentLine={step.line ?? 0}
      description={step.description}
      extra={
        <div className="flex gap-2">
          <button type="button" className={mode === 'stack' ? 'btn-primary' : 'btn-ghost'} onClick={() => setMode('stack')}>
            Stack
          </button>
          <button type="button" className={mode === 'queue' ? 'btn-primary' : 'btn-ghost'} onClick={() => setMode('queue')}>
            Queue
          </button>
        </div>
      }
    >
      {mode === 'stack' ? (
        <div className="panel mx-auto flex min-h-[320px] w-full max-w-xs flex-col-reverse items-center justify-start gap-2 p-6">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Bottom</p>
          <AnimatePresence>
            {(step.stack ?? []).map((v, i) => (
              <motion.div
                key={`${v}-${i}`}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 24 }}
                className={`flex h-12 w-40 items-center justify-center rounded-xl border text-lg font-bold ${
                  i === (step.stack?.length ?? 0) - 1
                    ? 'border-violet-400 bg-violet-500/20 text-violet-100'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                {v}
              </motion.div>
            ))}
          </AnimatePresence>
          <p className="text-[11px] font-bold uppercase tracking-wider text-violet-300">Top</p>
        </div>
      ) : (
        <div className="panel overflow-x-auto p-8">
          <div className="mb-3 flex justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <span>Front</span>
            <span>Back</span>
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
                  className={`flex h-16 w-16 items-center justify-center rounded-xl border text-lg font-bold ${
                    i === 0 ? 'border-sky-400 bg-sky-500/20 text-sky-100' : 'border-white/10 bg-white/5'
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
                { label: 'Below top', color: 'bg-white/40' },
                { label: 'Top', color: 'bg-violet-400' },
              ]
            : [
                { label: 'Waiting', color: 'bg-white/40' },
                { label: 'Front', color: 'bg-sky-400' },
              ]
        }
      />
    </VisualizerLayout>
  );
}
