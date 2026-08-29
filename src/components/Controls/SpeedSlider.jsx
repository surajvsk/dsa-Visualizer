export default function SpeedSlider({ speed, onChange }) {
  return (
    <label className="flex items-center gap-3 min-w-[180px]">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Speed</span>
      <input
        type="range"
        min="120"
        max="1200"
        step="30"
        value={speed}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-28 accent-indigo-500 cursor-pointer"
      />
      <span className="w-12 text-xs tabular-nums text-slate-400">{speed}ms</span>
    </label>
  );
}
