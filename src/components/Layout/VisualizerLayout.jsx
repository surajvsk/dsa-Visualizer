import CodePanel from '../Explanation/CodePanel';

export default function VisualizerLayout({ title, subtitle, extra, code, currentLine, description, children }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
      <section className="flex min-h-0 flex-1 flex-col overflow-auto p-4 md:p-6 scrollbar-thin">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight md:text-2xl">{title}</h1>
            {subtitle && <p className="mt-1 max-w-2xl text-sm text-slate-400">{subtitle}</p>}
          </div>
          {extra}
        </div>
        <div className="mb-4 rounded-xl border border-indigo-400/20 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-100">
          {description || 'Press Play to start the animation.'}
        </div>
        {children}
      </section>
      <CodePanel code={code} currentLine={currentLine} description={description} />
    </div>
  );
}

export function Legend({ items }) {
  return (
    <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-1.5">
          <span className={`h-2.5 w-2.5 rounded-sm ${item.color}`} />
          {item.label}
        </span>
      ))}
    </div>
  );
}
