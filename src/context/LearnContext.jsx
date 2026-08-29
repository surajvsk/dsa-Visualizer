import { createContext, useContext, useState } from 'react';
import { LESSONS } from '../data/topics';

const LearnContext = createContext(null);

export function LearnProvider({ children }) {
  const [topic, setTopic] = useState('arrays');
  const [welcome, setWelcome] = useState(() => {
    try {
      return localStorage.getItem('dsa-welcome') !== '1';
    } catch {
      return true;
    }
  });

  const startLearning = () => {
    try {
      localStorage.setItem('dsa-welcome', '1');
    } catch {
      /* ignore */
    }
    setWelcome(false);
    setTopic('arrays');
  };

  const goNext = () => {
    const next = LESSONS[topic]?.next;
    if (next) setTopic(next);
  };

  return (
    <LearnContext.Provider value={{ topic, setTopic, welcome, startLearning, goNext }}>
      {children}
    </LearnContext.Provider>
  );
}

export function useLearn() {
  const ctx = useContext(LearnContext);
  if (!ctx) throw new Error('useLearn must be used inside LearnProvider');
  return ctx;
}
