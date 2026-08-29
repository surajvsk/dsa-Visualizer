export default function CodePanel({ code = [], currentLine = 0 }) {
  return (
    <pre className="max-h-72 overflow-auto bg-slate-900 p-3 font-mono text-[12px] leading-6 text-slate-200 scrollbar-thin">
      {code.map((line, i) => {
        const active = i === currentLine;
        return (
          <div
            key={`${i}-${line}`}
            className={`flex gap-3 rounded-md px-2 ${active ? 'bg-indigo-500/30' : ''}`}
          >
            <span className={`w-5 shrink-0 text-right ${active ? 'text-indigo-200' : 'text-slate-500'}`}>
              {i + 1}
            </span>
            <span className={active ? 'text-white' : 'text-slate-400'}>{line || ' '}</span>
          </div>
        );
      })}
    </pre>
  );
}
