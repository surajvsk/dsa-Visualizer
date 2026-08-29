import { Pause, Play } from 'lucide-react';

export default function PlayPauseButton({ isPlaying, onPlay, onPause, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={isPlaying ? onPause : onPlay}
      className={`min-w-[128px] text-base ${isPlaying ? 'btn-ghost' : 'btn-primary'}`}
    >
      {isPlaying ? (
        <>
          <Pause className="h-5 w-5" /> Ruko
        </>
      ) : (
        <>
          <Play className="h-5 w-5" /> Chalao
        </>
      )}
    </button>
  );
}
