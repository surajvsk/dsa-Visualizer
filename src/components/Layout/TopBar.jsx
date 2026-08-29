import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import PlayPauseButton from '../Controls/PlayPauseButton';
import SpeedSlider from '../Controls/SpeedSlider';
import StepCounter from '../Controls/StepCounter';

export default function TopBar({ onMenu, title }) {
  const { speed, setSpeed, controls } = usePlayer();

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-white/10 bg-ink-900/80 px-3 backdrop-blur-md md:px-5">
      <button
        type="button"
        onClick={onMenu}
        className="btn-ghost px-2.5 lg:hidden"
        aria-label="Open topics"
      >
        <span className="text-lg leading-none">☰</span>
      </button>

      <div className="flex items-center gap-2.5 min-w-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-[11px] font-extrabold">
          DSA
        </div>
        <div className="min-w-0 hidden sm:block">
          <p className="truncate text-sm font-bold tracking-tight">Visualizer</p>
          <p className="truncate text-[11px] text-slate-400">{title}</p>
        </div>
      </div>

      <div className="mx-auto hidden items-center gap-3 md:flex">
        <SpeedSlider speed={speed} onChange={setSpeed} />
        <PlayPauseButton
          isPlaying={!!controls?.isPlaying}
          onPlay={() => controls?.play()}
          onPause={() => controls?.pause()}
          disabled={!controls}
        />
        <button type="button" className="btn-ghost" onClick={() => controls?.prev()} disabled={!controls}>
          <ChevronLeft className="h-4 w-4" /> Prev
        </button>
        <button type="button" className="btn-ghost" onClick={() => controls?.next()} disabled={!controls}>
          Next <ChevronRight className="h-4 w-4" />
        </button>
        <button type="button" className="btn-ghost" onClick={() => controls?.reset()} disabled={!controls}>
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
      </div>

      <div className="ml-auto">
        <StepCounter
          current={controls?.currentIndex ?? 0}
          total={controls?.totalSteps ?? 0}
          onSeek={controls?.goTo}
        />
      </div>
    </header>
  );
}
