import { TOPICS } from '../../data/topics';

export default function Sidebar({ topic, onSelect, open, onClose }) {
  return (
    <>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          aria-label="Close sidebar"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/10 bg-ink-900 pt-16 transition-transform lg:static lg:z-0 lg:translate-x-0 lg:pt-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-4 pb-3 pt-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Topics</p>
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
                className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                  active
                    ? 'bg-indigo-600/20 text-white ring-1 ring-indigo-400/40'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${active ? 'text-indigo-300' : 'text-slate-500'}`} />
                <span>
                  <span className="block text-sm font-semibold">{item.label}</span>
                  <span className="block text-[11px] text-slate-500">{item.hint}</span>
                </span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
