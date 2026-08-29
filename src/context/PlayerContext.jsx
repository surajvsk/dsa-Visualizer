import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [speed, setSpeed] = useState(450);
  const [darkMode, setDarkMode] = useState(true);
  const [controls, setControls] = useState(null);

  const register = useCallback((api) => setControls(api), []);

  const value = useMemo(
    () => ({ speed, setSpeed, darkMode, setDarkMode, controls, register }),
    [speed, darkMode, controls, register]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider');
  return ctx;
}
