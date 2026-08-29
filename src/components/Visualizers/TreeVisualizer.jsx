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
      title="Trees & BST"
      subtitle="This BST is laid out in-order along x. Traversal order changes which node lights up next — not the shape of the tree."
      code={CODE[order]}
      currentLine={step.line ?? 0}
      description={step.description}
      extra={
        <div className="flex flex-wrap gap-2">
          {['inorder', 'preorder', 'postorder'].map((id) => (
            <button
              key={id}
              type="button"
              className={order === id ? 'btn-primary capitalize' : 'btn-ghost capitalize'}
              onClick={() => setOrder(id)}
            >
              {id}
            </button>
          ))}
        </div>
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
                stroke={active ? '#34d399' : '#334155'}
                strokeWidth="2"
              />
            );
          })}
          {layout.nodes.map((node) => {
            const isVisiting = step.visiting === node.id || step.highlight === node.id;
            const isVisited = visited.has(node.id);
            const fill = isVisited ? '#10b981' : isVisiting ? '#f59e0b' : '#334155';
            return (
              <g key={node.id}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  fill={fill}
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  animate={{ scale: isVisiting ? 1.12 : 1 }}
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize="13"
                  fontWeight="700"
                >
                  {node.value}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="mt-3 font-mono text-sm text-slate-300">
        Order: {(step.visited ?? []).join(' → ') || '—'}
      </p>
      <Legend
        items={[
          { label: 'Unvisited', color: 'bg-slate-600' },
          { label: 'Visiting', color: 'bg-amber-400' },
          { label: 'Visited', color: 'bg-emerald-500' },
        ]}
      />
    </VisualizerLayout>
  );
}
