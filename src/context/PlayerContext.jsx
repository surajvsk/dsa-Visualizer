import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [speed, setSpeed] = useState(850);
  const [voiceOn, setVoiceOn] = useState(true);
  const [controls, setControls] = useState(null);

  const register = useCallback((api) => setControls(api), []);

  useEffect(() => {
    function onKey(e) {
      if (!controls) return;
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
      if (e.code === 'Space') {
        e.preventDefault();
        if (controls.isPlaying) controls.pause();
        else controls.play();
      }
      if (e.code === 'ArrowRight') controls.next();
      if (e.code === 'ArrowLeft') controls.prev();
      if (e.key === 'r' || e.key === 'R') controls.reset();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [controls]);

  const value = useMemo(
    () => ({ speed, setSpeed, voiceOn, setVoiceOn, controls, register }),
    [speed, voiceOn, controls, register]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider');
  return ctx;
}
