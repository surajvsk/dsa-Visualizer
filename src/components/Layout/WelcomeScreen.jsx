export default function WelcomeScreen({ onStart }) {
  return (
    <div className="flex h-full items-center justify-center bg-cream p-6">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl md:p-10">
        <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">DSA mushkil nahi</p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
          Picture chalegi, aap sirf dekho.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Array, stack, sorting — yeh sab English ke bade shabd hain. Asal mein yeh roz ki cheezein hain:
          almirah, plates, ticket line.
        </p>
        <ul className="mt-6 space-y-3 text-base text-slate-700">
          <li>
            <strong>1.</strong> “Chalao” dabaao — animation khud kadam-kadam chalegi.
          </li>
          <li>
            <strong>2.</strong> Peela / laal / hara colour dekho — har colour ka matlab likha hai.
          </li>
          <li>
            <strong>3.</strong> Pehle Array, phir aahista-aahista aage.
          </li>
        </ul>
        <button type="button" className="btn-primary mt-8 w-full py-3.5 text-lg" onClick={onStart}>
          Chalo, Array se shuru karte hain
        </button>
        <p className="mt-3 text-center text-xs text-slate-400">Code baad mein. Pehle samajh.</p>
      </div>
    </div>
  );
}
