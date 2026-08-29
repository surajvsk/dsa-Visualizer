export default function CodePanel({ code = [], currentLine = 0, description }) {
  return (
    <aside className="flex w-full shrink-0 flex-col border-t border-white/10 bg-ink-900 lg:w-[360px] lg:border-l lg:border-t-0">
      <div className="border-b border-white/10 px-4 py-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Code</p>
        {description && (
          <p className="mt-1 text-sm leading-snug text-slate-300">{description}</p>
        )}
      </div>
      <pre className="flex-1 overflow-auto p-3 font-mono text-[12px] leading-6 scrollbar-thin">
        {code.map((line, i) => {
          const active = i === currentLine;
          return (
            <div
              key={`${i}-${line}`}
              className={`flex gap-3 rounded-md px-2 ${
                active ? 'bg-indigo-500/20 ring-1 ring-indigo-400/30' : ''
              }`}
            >
              <span className={`w-5 shrink-0 text-right ${active ? 'text-indigo-300' : 'text-slate-600'}`}>
                {i + 1}
              </span>
              <span className={active ? 'text-indigo-100' : 'text-slate-400'}>{line || ' '}</span>
            </div>
          );
        })}
      </pre>
    </aside>
  );
}
