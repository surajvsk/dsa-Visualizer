import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { flattenTree, SAMPLE_TREE, traversalSteps } from '../../algorithms/tree';
import { CODE } from '../../data/codeSnippets';
import { useVisualizerPlayer } from '../../hooks/useVisualizerPlayer';
import VisualizerLayout, { Legend } from '../Layout/VisualizerLayout';

const layout = flattenTree(SAMPLE_TREE);
const nodeById = Object.fromEntries(layout.nodes.map((n) => [n.id, n]));

export default function TreeVisualizer() {
  const [order, setOrder] = useState('inorder');
  const steps = useMemo(() => traversalSteps(SAMPLE_TREE, order), [order]);
  const { currentStep } = useVisualizerPlayer(steps);
  const step = currentStep ?? { visited: [], visiting: null, description: '', line: 0 };
  const visited = new Set(step.visited ?? []);
  const width = Math.max(...layout.nodes.map((n) => n.x)) + 60;
  const height = Math.max(...layout.nodes.map((n) => n.y)) + 60;

  return (
    <VisualizerLayout
      topicId="trees"
      code={CODE[order]}
      currentLine={step.line ?? 0}
      description={step.description}
      extra={
        <>
          {[
            ['inorder', 'Left → me → right'],
            ['preorder', 'Me first'],
            ['postorder', 'Me last'],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={order === id ? 'btn-primary' : 'btn-ghost'}
              onClick={() => setOrder(id)}
            >
              {label}
            </button>
          ))}
        </>
      }
    >
      <div className="panel overflow-x-auto p-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-[340px] w-full min-w-[520px]">
          {layout.edges.map((e) => {
            const a = nodeById[e.from];
            const b = nodeById[e.to];
            const active = visited.has(e.from) && (visited.has(e.to) || step.visiting === e.to);
            return (
              <line
                key={`${e.from}-${e.to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={active ? '#059669' : '#cbd5e1'}
                strokeWidth="3"
              />
            );
          })}
          {layout.nodes.map((node) => {
            const isVisiting = step.visiting === node.id || step.highlight === node.id;
            const isVisited = visited.has(node.id);
            const fill = isVisited ? '#10b981' : isVisiting ? '#f59e0b' : '#e2e8f0';
            const text = isVisited || isVisiting ? 'white' : '#334155';
            return (
              <g key={node.id}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="22"
                  fill={fill}
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  animate={{ scale: isVisiting ? 1.12 : 1 }}
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fill={text}
                  fontSize="14"
                  fontWeight="800"
                >
                  {node.value}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="mt-3 text-base font-bold text-slate-700">
        Written so far: {(step.visited ?? []).join(' → ') || 'nothing yet'}
      </p>
      <Legend
        items={[
          { label: 'Not visited', color: 'bg-slate-300' },
          { label: 'We are here', color: 'bg-amber-400' },
          { label: 'Already written', color: 'bg-emerald-500' },
        ]}
      />
    </VisualizerLayout>
  );
}
