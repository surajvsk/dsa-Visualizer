import { lazy, Suspense, useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { PlayerProvider, usePlayer } from './context/PlayerContext';
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import SpeedSlider from './components/Controls/SpeedSlider';
import PlayPauseButton from './components/Controls/PlayPauseButton';
import { TOPICS } from './data/topics';

const ArrayVisualizer = lazy(() => import('./components/Visualizers/ArrayVisualizer'));
const SortingVisualizer = lazy(() => import('./components/Visualizers/SortingVisualizer'));
const SearchingVisualizer = lazy(() => import('./components/Visualizers/SearchingVisualizer'));
const LinkedListVisualizer = lazy(() => import('./components/Visualizers/LinkedListVisualizer'));
const StackQueueVisualizer = lazy(() => import('./components/Visualizers/StackQueueVisualizer'));
const RecursionVisualizer = lazy(() => import('./components/Visualizers/RecursionVisualizer'));
const TreeVisualizer = lazy(() => import('./components/Visualizers/TreeVisualizer'));
const GraphVisualizer = lazy(() => import('./components/Visualizers/GraphVisualizer'));
const DPVisualizer = lazy(() => import('./components/Visualizers/DPVisualizer'));

const VISUALIZERS = {
  arrays: ArrayVisualizer,
  sorting: SortingVisualizer,
  searching: SearchingVisualizer,
  linkedlist: LinkedListVisualizer,
  stackqueue: StackQueueVisualizer,
  recursion: RecursionVisualizer,
  trees: TreeVisualizer,
  graphs: GraphVisualizer,
  dp: DPVisualizer,
};

function MobilePlayer() {
  const { speed, setSpeed, controls } = usePlayer();
  return (
    <div className="flex shrink-0 flex-wrap items-center justify-center gap-2 border-t border-white/10 bg-ink-900 px-3 py-2 md:hidden">
      <SpeedSlider speed={speed} onChange={setSpeed} />
      <PlayPauseButton
        isPlaying={!!controls?.isPlaying}
        onPlay={() => controls?.play()}
        onPause={() => controls?.pause()}
        disabled={!controls}
      />
      <button type="button" className="btn-ghost px-2" onClick={() => controls?.prev()}>
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button type="button" className="btn-ghost px-2" onClick={() => controls?.next()}>
        <ChevronRight className="h-4 w-4" />
      </button>
      <button type="button" className="btn-ghost px-2" onClick={() => controls?.reset()}>
        <RotateCcw className="h-4 w-4" />
      </button>
    </div>
  );
}

function Shell() {
  const [topic, setTopic] = useState('sorting');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const Visualizer = VISUALIZERS[topic] ?? SortingVisualizer;
  const meta = TOPICS.find((t) => t.id === topic);

  return (
    <div className="flex h-full flex-col bg-ink-950">
      <TopBar onMenu={() => setSidebarOpen(true)} title={meta?.label ?? 'Sorting'} />
      <div className="flex min-h-0 flex-1">
        <Sidebar
          topic={topic}
          onSelect={setTopic}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex min-w-0 flex-1 flex-col">
          <Suspense
            fallback={
              <div className="flex flex-1 items-center justify-center text-sm text-slate-400">
                Loading visualizer…
              </div>
            }
          >
            <Visualizer />
          </Suspense>
          <MobilePlayer />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <PlayerProvider>
      <Shell />
    </PlayerProvider>
  );
}
