import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import PlayPauseButton from '../Controls/PlayPauseButton';
import SpeedSlider from '../Controls/SpeedSlider';
import StepCounter from '../Controls/StepCounter';

export default function TopBar({ onMenu, title }) {
  const { speed, setSpeed, controls } = usePlayer();

  return (
    <header className="flex h-[4.25rem] shrink-0 items-center gap-3 border-b border-slate-200 bg-paper/90 px-3 backdrop-blur-md md:px-5">
      <button type="button" onClick={onMenu} className="btn-ghost px-2.5 lg:hidden" aria-label="Topics">
        ☰
      </button>

      <div className="flex min-w-0 items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-[10px] font-extrabold text-white">
          DSA
        </div>
        <div className="hidden min-w-0 sm:block">
          <p className="truncate text-sm font-extrabold text-slate-900">Picture se seekho</p>
          <p className="truncate text-xs text-slate-500">{title}</p>
        </div>
      </div>

      <div className="mx-auto hidden items-center gap-2 md:flex">
        <SpeedSlider speed={speed} onChange={setSpeed} />
        <PlayPauseButton
          isPlaying={!!controls?.isPlaying}
          onPlay={() => controls?.play()}
          onPause={() => controls?.pause()}
          disabled={!controls}
        />
        <button type="button" className="btn-ghost" onClick={() => controls?.prev()} disabled={!controls}>
          <ChevronLeft className="h-4 w-4" /> Pehle
        </button>
        <button type="button" className="btn-ghost" onClick={() => controls?.next()} disabled={!controls}>
          Agla <ChevronRight className="h-4 w-4" />
        </button>
        <button type="button" className="btn-ghost" onClick={() => controls?.reset()} disabled={!controls}>
          <RotateCcw className="h-4 w-4" /> Phir se
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
