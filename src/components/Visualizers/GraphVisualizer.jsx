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
      title="Graphs"
      subtitle="BFS explores level by level (queue). DFS dives deep first (stack). Same graph, different visit order."
      code={algo === 'bfs' ? CODE.bfs : CODE.dfs}
      currentLine={step.line ?? 0}
      description={step.description}
      extra={
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className={algo === 'bfs' ? 'btn-primary' : 'btn-ghost'} onClick={() => setAlgo('bfs')}>
            BFS
          </button>
          <button type="button" className={algo === 'dfs' ? 'btn-primary' : 'btn-ghost'} onClick={() => setAlgo('dfs')}>
            DFS
          </button>
          <label className="text-xs text-slate-400">
            Start
            <select
              className="ml-2 rounded-lg border border-white/10 bg-ink-800 px-2 py-1 text-slate-100"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            >
              {SAMPLE_GRAPH.nodes.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.id}
                </option>
              ))}
            </select>
          </label>
        </div>
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
                    stroke={lit ? '#34d399' : '#334155'}
                    strokeWidth="2.5"
                  />
                );
              })
          )}
          {SAMPLE_GRAPH.nodes.map((node) => {
            const isVisiting = step.visiting === node.id;
            const isVisited = visited.has(node.id);
            const inFrontier = frontier.has(node.id);
            const fill = isVisited ? '#10b981' : isVisiting ? '#f59e0b' : inFrontier ? '#6366f1' : '#1e293b';
            return (
              <g key={node.id}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="22"
                  fill={fill}
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  animate={{ scale: isVisiting ? 1.15 : 1 }}
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="700"
                >
                  {node.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <span className="chip bg-white/10 text-slate-300">
          {algo === 'bfs' ? 'Queue' : 'Stack'}: {(algo === 'bfs' ? step.queue : step.stack)?.join(', ') || 'empty'}
        </span>
        <span className="chip bg-emerald-500/20 text-emerald-200">
          Visited: {(step.visited ?? []).join(' → ') || '—'}
        </span>
      </div>
      <Legend
        items={[
          { label: 'Unseen', color: 'bg-slate-700' },
          { label: 'In frontier', color: 'bg-indigo-500' },
          { label: 'Visiting', color: 'bg-amber-400' },
          { label: 'Visited', color: 'bg-emerald-500' },
        ]}
      />
    </VisualizerLayout>
  );
}
