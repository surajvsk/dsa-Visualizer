import { useState, useEffect, useRef, useCallback } from 'react';

export function useAnimationQueue(steps, speed = 500) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRef = useRef(null);
  const stepsLen = steps?.length ?? 0;
  const stepsId = steps?.[0]?.__id ?? stepsLen;

  useEffect(() => {
    setCurrentIndex(0);
    setIsPlaying(false);
  }, [steps, stepsId]);

  useEffect(() => {
    if (isPlaying && currentIndex < stepsLen - 1) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, speed);
    } else if (currentIndex >= stepsLen - 1 && stepsLen > 0) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [isPlaying, currentIndex, stepsLen, speed]);

  const play = useCallback(() => {
    setCurrentIndex((i) => (stepsLen > 0 && i >= stepsLen - 1 ? 0 : i));
    setIsPlaying(true);
  }, [stepsLen]);

  const pause = useCallback(() => setIsPlaying(false), []);

  const next = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex((i) => Math.min(i + 1, Math.max(stepsLen - 1, 0)));
  }, [stepsLen]);

  const prev = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex(0);
  }, []);

  const goTo = useCallback(
    (index) => {
      setIsPlaying(false);
      setCurrentIndex(Math.max(0, Math.min(index, Math.max(stepsLen - 1, 0))));
    },
    [stepsLen]
  );

  return {
    currentStep: steps?.[currentIndex] ?? null,
    currentIndex,
    totalSteps: stepsLen,
    isPlaying,
    play,
    pause,
    next,
    prev,
    reset,
    goTo,
  };
}
