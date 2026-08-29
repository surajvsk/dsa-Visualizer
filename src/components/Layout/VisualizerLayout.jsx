import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { LESSONS, TOPICS } from '../../data/topics';
import { useLearn } from '../../context/LearnContext';
import { usePlayer } from '../../context/PlayerContext';
import CodePanel from '../Explanation/CodePanel';

export default function VisualizerLayout({
  topicId,
  extra,
  code,
  currentLine,
  description,
  children,
}) {
  const lesson = LESSONS[topicId];
  const { controls } = usePlayer();
  const { goNext } = useLearn();
  const [showCode, setShowCode] = useState(false);
  const atStart = !controls?.isPlaying && (controls?.currentIndex ?? 0) === 0;
  const done = (controls?.totalSteps ?? 0) > 0 && controls?.currentIndex === controls.totalSteps - 1;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto p-4 md:p-6 scrollbar-thin">
      <p className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">{lesson?.title}</p>
      <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-600">{lesson?.analogy}</p>

      <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-950">
        <span className="font-bold">Kya dekhna hai: </span>
        {lesson?.goal}
      </div>

      {extra && <div className="mt-4 flex flex-wrap items-center gap-2">{extra}</div>}

      {atStart && (
        <p className="mt-4 animate-pulse text-center text-base font-bold text-indigo-700 md:text-lg">
          Upar “Chalao” dabaao. Picture khud, dheere-dheere chalegi.
        </p>
      )}

      <div
        className={`mt-4 flex gap-3 rounded-2xl border-2 px-4 py-4 shadow-sm ${
          done ? 'border-emerald-300 bg-emerald-50' : 'border-indigo-200 bg-indigo-50'
        }`}
      >
        <MessageCircle className={`mt-0.5 h-6 w-6 shrink-0 ${done ? 'text-emerald-600' : 'text-indigo-600'}`} />
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
            {done ? 'Samajh aa gaya?' : 'Ab kya ho raha hai'}
          </p>
          <p className="mt-1 text-lg font-semibold leading-snug text-slate-900">
            {description || 'Chalao dabaao — har kadam yahan simple bhasha mein likha aayega.'}
          </p>
        </div>
      </div>

      <div className="mt-5">{children}</div>

      {lesson?.remember && (
        <p className="mt-5 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700">
          <span className="font-bold text-slate-900">Yaad rakhna: </span>
          {lesson.remember}
        </p>
      )}

      <div className="mt-4">
        <button type="button" className="btn-ghost text-slate-600" onClick={() => setShowCode((v) => !v)}>
          <ChevronDown className={`h-4 w-4 transition ${showCode ? 'rotate-180' : ''}`} />
          {showCode ? 'Code chhupao' : 'Code bhi dekhna hai? (zaruri nahi)'}
        </button>
        {showCode && (
          <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200">
            <CodePanel code={code} currentLine={currentLine} />
          </div>
        )}
      </div>

      {lesson?.next && (
        <button type="button" className="btn-primary mt-6 self-start" onClick={goNext}>
          Agla topic: {TOPICS.find((t) => t.id === lesson.next)?.label}
        </button>
      )}
    </div>
  );
}

export function Legend({ items }) {
  return (
    <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-1.5">
          <span className={`h-3 w-3 rounded-sm ${item.color}`} />
          {item.label}
        </span>
      ))}
    </div>
  );
}
