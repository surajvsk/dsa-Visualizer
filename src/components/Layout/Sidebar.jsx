import { TOPICS } from '../../data/topics';

export default function Sidebar({ topic, onSelect, open, onClose }) {
  return (
    <>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-label="Close"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[280px] flex-col border-r border-slate-200 bg-[#fffdf8] pt-16 transition-transform lg:static lg:z-0 lg:translate-x-0 lg:pt-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-4 pb-2 pt-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">Start here</p>
          <p className="mt-1 text-sm text-slate-500">Top to bottom, easy to harder</p>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-6 scrollbar-thin">
          {TOPICS.map((item) => {
            const Icon = item.icon;
            const active = topic === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelect(item.id);
                  onClose();
                }}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                  active
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
                    active ? 'bg-white/20' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {item.step}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 text-sm font-bold">
                    <Icon className="h-4 w-4 shrink-0 opacity-80" />
                    {item.label}
                  </span>
                  <span className={`block text-xs ${active ? 'text-indigo-100' : 'text-slate-500'}`}>
                    {item.hint}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
