export default function SpeedSlider({ speed, onChange }) {
  const label = speed >= 1000 ? 'Very slow' : speed >= 700 ? 'Slow' : speed >= 450 ? 'Normal' : 'Fast';
  return (
    <label className="flex items-center gap-3 min-w-[200px]">
      <span className="text-xs font-bold text-slate-500">Slow</span>
      <input
        type="range"
        min="180"
        max="1400"
        step="40"
        value={1580 - speed}
        onChange={(e) => onChange(1580 - Number(e.target.value))}
        className="h-2 w-28 cursor-pointer accent-indigo-600"
      />
      <span className="w-10 text-xs font-bold text-slate-500">Fast</span>
      <span className="w-[5.5rem] text-xs font-bold text-indigo-700">{label}</span>
    </label>
  );
}
