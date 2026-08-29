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
      title="Linked List"
      subtitle="Nodes live anywhere in memory and point to the next. Insert at head is O(1); finding a value is O(n)."
      code={code}
      currentLine={step.line ?? 0}
      description={step.description}
      extra={
        <div className="flex flex-wrap items-center gap-2">
          {[
            ['head', 'Insert head'],
            ['tail', 'Insert tail'],
            ['delete', 'Delete'],
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
          <label className="text-xs text-slate-400">
            Value
            <input
              type="number"
              className="ml-2 w-20 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-slate-100"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
          </label>
        </div>
      }
    >
      <div className="panel overflow-x-auto p-8">
        <div className="flex items-center gap-2">
          <span className="mr-2 text-xs font-bold uppercase tracking-wider text-teal-400">Head</span>
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
                  className={`flex min-w-[72px] items-center justify-center rounded-xl border-2 px-4 py-3 text-lg font-bold ${
                    node.highlight
                      ? 'border-amber-400 bg-amber-400/15 text-amber-200'
                      : 'border-teal-400/70 bg-teal-400/10 text-teal-100'
                  }`}
                >
                  {node.value}
                </div>
                {i < step.nodes.length - 1 && (
                  <motion.div layout className="text-2xl text-teal-300">
                    →
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <span className="ml-2 text-sm text-slate-500">null</span>
        </div>
      </div>
      <Legend
        items={[
          { label: 'Node', color: 'bg-teal-400' },
          { label: 'Active', color: 'bg-amber-400' },
        ]}
      />
    </VisualizerLayout>
  );
}
