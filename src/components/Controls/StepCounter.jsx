export default function StepCounter({ current, total, onSeek }) {
  const max = Math.max(total - 1, 0);
  return (
    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
      <span className="tabular-nums">
        step {total === 0 ? '0' : current + 1} / {total}
      </span>
      <input
        type="range"
        min="0"
        max={max}
        value={Math.min(current, max)}
        onChange={(e) => onSeek?.(Number(e.target.value))}
        disabled={total <= 1}
        className="h-2 w-24 cursor-pointer accent-indigo-600 disabled:opacity-30"
      />
    </div>
  );
}
