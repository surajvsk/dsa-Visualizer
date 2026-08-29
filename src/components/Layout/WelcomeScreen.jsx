import { useEffect } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { speak, stopSpeech } from '../../lib/speech';

const INTRO =
  'Welcome. Data structures are not as hard as they sound. They are everyday things: lockers, plates, a ticket line. Pictures will move. A voice will explain each step. Let us start with arrays.';

export default function WelcomeScreen({ onStart }) {
  const { voiceOn } = usePlayer();

  useEffect(() => {
    if (voiceOn) speak(INTRO);
    return () => stopSpeech();
  }, [voiceOn]);

  return (
    <div className="flex h-full items-center justify-center bg-[#f6f1e8] p-6">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl md:p-10">
        <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">DSA is not that hard</p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
          Watch the picture. Listen to the voice.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Array, stack, sorting — big English words. In real life they are lockers, plates, and a ticket
          line. We will show them moving, and a teacher voice will explain every step in simple English.
        </p>
        <ul className="mt-6 space-y-3 text-base text-slate-700">
          <li>
            <strong>1.</strong> Press Play — the animation walks one step at a time, and the voice talks.
          </li>
          <li>
            <strong>2.</strong> Yellow, red, and green have meanings. A legend sits under the picture.
          </li>
          <li>
            <strong>3.</strong> Start with Array, then go down the list. Easy first, harder later.
          </li>
        </ul>
        <button type="button" className="btn-primary mt-8 w-full py-3.5 text-lg" onClick={onStart}>
          Start with arrays
        </button>
        <p className="mt-3 text-center text-xs text-slate-400">Code can wait. Understanding first.</p>
      </div>
    </div>
  );
}
