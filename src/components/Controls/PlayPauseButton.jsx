import { Pause, Play } from 'lucide-react';

export default function PlayPauseButton({ isPlaying, onPlay, onPause, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={isPlaying ? onPause : onPlay}
      className="btn-primary min-w-[108px]"
    >
      {isPlaying ? (
        <>
          <Pause className="h-4 w-4" /> Pause
        </>
      ) : (
        <>
          <Play className="h-4 w-4" /> Play
        </>
      )}
    </button>
  );
}
