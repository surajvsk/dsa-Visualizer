import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  linkedListDeleteSteps,
  linkedListInsertHeadSteps,
  linkedListInsertTailSteps,
} from '../../algorithms/linear';
import { CODE } from '../../data/codeSnippets';
import { useVisualizerPlayer } from '../../hooks/useVisualizerPlayer';
import VisualizerLayout, { Legend } from '../Layout/VisualizerLayout';

const BASE = [12, 7, 25, 4];

export default function LinkedListVisualizer() {
  const [op, setOp] = useState('head');
  const [value, setValue] = useState(99);

  const steps = useMemo(() => {
    if (op === 'head') return linkedListInsertHeadSteps(BASE, value);
    if (op === 'tail') return linkedListInsertTailSteps(BASE, value);
    return linkedListDeleteSteps(BASE, value);
  }, [op, value]);

  const { currentStep } = useVisualizerPlayer(steps);
  const step = currentStep ?? { nodes: [], description: '', line: 0 };
  const code = op === 'head' ? CODE.listInsertHead : op === 'tail' ? CODE.listInsertTail : CODE.listDelete;

  return (
    <VisualizerLayout
      topicId="linkedlist"
      code={code}
      currentLine={step.line ?? 0}
      description={step.description}
      extra={
        <>
          {[
            ['head', 'Add at front'],
            ['tail', 'Add at end'],
            ['delete', 'Remove a box'],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={op === id ? 'btn-primary' : 'btn-ghost'}
              onClick={() => setOp(id)}
            >
              {label}
            </button>
          ))}
          <label className="text-sm font-semibold text-slate-600">
            Number
            <input
              type="number"
              className="ml-2 w-20 rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-slate-800"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
          </label>
        </>
      }
    >
      <div className="panel overflow-x-auto p-8">
        <div className="flex items-center gap-2">
          <span className="mr-1 text-sm font-extrabold text-teal-700">Start →</span>
          <AnimatePresence initial={false}>
            {(step.nodes ?? []).map((node, i) => (
              <motion.div
                key={node.id}
                layout
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div
                  className={`flex min-w-[72px] flex-col items-center justify-center rounded-2xl border-2 px-4 py-3 text-lg font-extrabold ${
                    node.highlight
                      ? 'border-amber-400 bg-amber-100 text-amber-900'
                      : 'border-teal-400 bg-teal-50 text-teal-900'
                  }`}
                >
                  {node.value}
                </div>
                {i < step.nodes.length - 1 && (
                  <motion.div layout className="text-2xl font-bold text-teal-600">
                    →
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <span className="ml-2 text-sm font-semibold text-slate-400">end</span>
        </div>
      </div>
      <Legend
        items={[
          { label: 'Carriage', color: 'bg-teal-400' },
          { label: 'Looking here', color: 'bg-amber-400' },
        ]}
      />
    </VisualizerLayout>
  );
}
