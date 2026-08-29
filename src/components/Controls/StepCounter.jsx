export default function StepCounter({ current, total, onSeek }) {
  const max = Math.max(total - 1, 0);
  return (
    <div className="flex items-center gap-2 text-xs text-slate-400">
      <span className="tabular-nums font-medium text-slate-300">
        {total === 0 ? '0 / 0' : `${current + 1} / ${total}`}
      </span>
      <input
        type="range"
        min="0"
        max={max}
        value={Math.min(current, max)}
        onChange={(e) => onSeek?.(Number(e.target.value))}
        disabled={total <= 1}
        className="h-1.5 w-28 accent-cyan-400 cursor-pointer disabled:opacity-30"
      />
    </div>
  );
}
