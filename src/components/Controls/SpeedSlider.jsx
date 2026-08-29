export default function SpeedSlider({ speed, onChange }) {
  const label = speed >= 1000 ? 'Bahut dheere' : speed >= 700 ? 'Dheere' : speed >= 450 ? 'Theek' : 'Tez';
  return (
    <label className="flex items-center gap-3 min-w-[200px]">
      <span className="text-xs font-bold text-slate-500">Dheere</span>
      <input
        type="range"
        min="180"
        max="1400"
        step="40"
        value={1580 - speed}
        onChange={(e) => onChange(1580 - Number(e.target.value))}
        className="h-2 w-28 cursor-pointer accent-indigo-600"
      />
      <span className="w-12 text-xs font-bold text-slate-500">Tez</span>
      <span className="w-[5.5rem] text-xs font-bold text-indigo-700">{label}</span>
    </label>
  );
}
