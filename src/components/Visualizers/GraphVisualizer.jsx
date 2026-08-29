import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { bfsSteps, dfsSteps, SAMPLE_GRAPH } from '../../algorithms/graphTraversal';
import { CODE } from '../../data/codeSnippets';
import { useVisualizerPlayer } from '../../hooks/useVisualizerPlayer';
import VisualizerLayout, { Legend } from '../Layout/VisualizerLayout';

export default function GraphVisualizer() {
  const [algo, setAlgo] = useState('bfs');
  const [start, setStart] = useState('A');

  const steps = useMemo(
    () => (algo === 'bfs' ? bfsSteps(SAMPLE_GRAPH.adj, start) : dfsSteps(SAMPLE_GRAPH.adj, start)),
    [algo, start]
  );
  const { currentStep } = useVisualizerPlayer(steps);
  const step = currentStep ?? { visited: [], visiting: null, queue: [], stack: [], description: '', line: 0 };
  const visited = new Set(step.visited ?? []);
  const frontier = new Set(algo === 'bfs' ? step.queue ?? [] : step.stack ?? []);

  return (
    <VisualizerLayout
      topicId="graphs"
      code={algo === 'bfs' ? CODE.bfs : CODE.dfs}
      currentLine={step.line ?? 0}
      description={step.description}
      extra={
        <>
          <button type="button" className={algo === 'bfs' ? 'btn-primary' : 'btn-ghost'} onClick={() => setAlgo('bfs')}>
            Nearby first (BFS)
          </button>
          <button type="button" className={algo === 'dfs' ? 'btn-primary' : 'btn-ghost'} onClick={() => setAlgo('dfs')}>
            Deep path (DFS)
          </button>
          <label className="text-sm font-semibold text-slate-600">
            Start from
            <select
              className="ml-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-slate-800"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            >
              {SAMPLE_GRAPH.nodes.map((n) => (
                <option key={n.id} value={n.id}>
                  City {n.id}
                </option>
              ))}
            </select>
          </label>
        </>
      }
    >
      <div className="panel p-4">
        <svg viewBox="0 0 520 320" className="h-[300px] w-full">
          {Object.entries(SAMPLE_GRAPH.adj).flatMap(([from, tos]) =>
            tos
              .filter((to) => from < to)
              .map((to) => {
                const a = SAMPLE_GRAPH.nodes.find((n) => n.id === from);
                const b = SAMPLE_GRAPH.nodes.find((n) => n.id === to);
                const lit = visited.has(from) && visited.has(to);
                return (
                  <line
                    key={`${from}-${to}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={lit ? '#059669' : '#cbd5e1'}
                    strokeWidth="3"
                  />
                );
              })
          )}
          {SAMPLE_GRAPH.nodes.map((node) => {
            const isVisiting = step.visiting === node.id;
            const isVisited = visited.has(node.id);
            const inFrontier = frontier.has(node.id);
            const fill = isVisited ? '#10b981' : isVisiting ? '#f59e0b' : inFrontier ? '#6366f1' : '#e2e8f0';
            const text = isVisited || isVisiting || inFrontier ? 'white' : '#334155';
            return (
              <g key={node.id}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="24"
                  fill={fill}
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  animate={{ scale: isVisiting ? 1.15 : 1 }}
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fill={text}
                  fontSize="15"
                  fontWeight="800"
                >
                  {node.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
        <span className="chip bg-indigo-100 text-indigo-800">
          {algo === 'bfs' ? 'Queue' : 'Stack'}: {(algo === 'bfs' ? step.queue : step.stack)?.join(', ') || 'empty'}
        </span>
        <span className="chip bg-emerald-100 text-emerald-800">
          Visited: {(step.visited ?? []).join(' → ') || '—'}
        </span>
      </div>
      <Legend
        items={[
          { label: 'Not visited', color: 'bg-slate-300' },
          { label: 'Next in line', color: 'bg-indigo-500' },
          { label: 'We are here', color: 'bg-amber-400' },
          { label: 'Already visited', color: 'bg-emerald-500' },
        ]}
      />
    </VisualizerLayout>
  );
}
