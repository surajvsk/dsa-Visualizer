import { useEffect, useState } from 'react';
import { ChevronDown, MessageCircle, Volume2 } from 'lucide-react';
import { LESSONS, TOPICS } from '../../data/topics';
import { useLearn } from '../../context/LearnContext';
import { usePlayer } from '../../context/PlayerContext';
import { speak, stopSpeech } from '../../lib/speech';
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
  const { controls, voiceOn } = usePlayer();
  const { goNext } = useLearn();
  const [showCode, setShowCode] = useState(false);
  const atStart = !controls?.isPlaying && (controls?.currentIndex ?? 0) === 0;
  const done = (controls?.totalSteps ?? 0) > 0 && controls?.currentIndex === controls.totalSteps - 1;

  useEffect(() => {
    if (!voiceOn || !lesson?.speech) {
      stopSpeech();
      return undefined;
    }
    speak(lesson.speech);
    return () => stopSpeech();
  }, [topicId, voiceOn, lesson?.speech]);

  useEffect(() => {
    if (!voiceOn || controls?.isPlaying || atStart) return undefined;
    if (description) speak(description);
    return undefined;
  }, [description, voiceOn, controls?.isPlaying, atStart]);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto p-4 md:p-6 scrollbar-thin">
      <p className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">{lesson?.title}</p>
      <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-600">{lesson?.analogy}</p>

      <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-950">
        <span className="font-bold">What to watch: </span>
        {lesson?.goal}
      </div>

      {extra && <div className="mt-4 flex flex-wrap items-center gap-2">{extra}</div>}

      <button
        type="button"
        className="btn-ghost mt-4 self-start"
        onClick={() => lesson?.speech && speak(lesson.speech)}
        disabled={!voiceOn}
      >
        <Volume2 className="h-4 w-4" /> Hear this topic
      </button>

      {atStart && (
        <p className="mt-4 animate-pulse text-center text-base font-bold text-indigo-700 md:text-lg">
          Press Play. A voice will explain each step in simple English.
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
            {done ? 'Got it?' : voiceOn ? 'Now hearing' : 'What is happening'}
          </p>
          <p className="mt-1 text-lg font-semibold leading-snug text-slate-900">
            {description || 'Press Play. Each step will be written here in plain English.'}
          </p>
        </div>
      </div>

      <div className="mt-5">{children}</div>

      {lesson?.remember && (
        <p className="mt-5 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700">
          <span className="font-bold text-slate-900">Remember: </span>
          {lesson.remember}
        </p>
      )}

      <div className="mt-4">
        <button type="button" className="btn-ghost text-slate-600" onClick={() => setShowCode((v) => !v)}>
          <ChevronDown className={`h-4 w-4 transition ${showCode ? 'rotate-180' : ''}`} />
          {showCode ? 'Hide code' : 'Show code (optional)'}
        </button>
        {showCode && (
          <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200">
            <CodePanel code={code} currentLine={currentLine} />
          </div>
        )}
      </div>

      {lesson?.next && (
        <button type="button" className="btn-primary mt-6 self-start" onClick={goNext}>
          Next topic: {TOPICS.find((t) => t.id === lesson.next)?.label}
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
