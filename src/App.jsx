import { lazy, Suspense, useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { PlayerProvider, usePlayer } from './context/PlayerContext';
import { LearnProvider, useLearn } from './context/LearnContext';
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import WelcomeScreen from './components/Layout/WelcomeScreen';
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
    <div className="flex shrink-0 flex-wrap items-center justify-center gap-2 border-t border-slate-200 bg-paper px-3 py-2 md:hidden">
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
  const { topic, setTopic, welcome, startLearning } = useLearn();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const Visualizer = VISUALIZERS[topic] ?? ArrayVisualizer;
  const meta = TOPICS.find((t) => t.id === topic);

  if (welcome) {
    return <WelcomeScreen onStart={startLearning} />;
  }

  return (
    <div className="flex h-full flex-col bg-cream">
      <TopBar onMenu={() => setSidebarOpen(true)} title={meta?.label ?? 'Array'} />
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
              <div className="flex flex-1 items-center justify-center text-slate-500">
                Picture taiyar ho rahi hai…
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
    <LearnProvider>
      <PlayerProvider>
        <Shell />
      </PlayerProvider>
    </LearnProvider>
  );
}
