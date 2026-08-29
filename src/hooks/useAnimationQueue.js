import { useState, useEffect, useRef, useCallback } from 'react';
import { speak, stopSpeech } from '../lib/speech';

export function useAnimationQueue(steps, speed = 500, voiceOn = false) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRef = useRef(null);
  const stepsLen = steps?.length ?? 0;
  const stepsId = steps?.[0]?.__id ?? stepsLen;

  useEffect(() => {
    setCurrentIndex(0);
    setIsPlaying(false);
    stopSpeech();
  }, [steps, stepsId]);

  useEffect(() => {
    if (isPlaying && currentIndex < stepsLen - 1) {
      let cancelled = false;
      const text = steps?.[currentIndex]?.description ?? '';

      const advance = () => {
        if (!cancelled) setCurrentIndex((prev) => prev + 1);
      };

      (async () => {
        if (voiceOn && text) {
          await speak(text);
        }
        if (cancelled) return;
        const wait = voiceOn ? 450 : speed;
        timeoutRef.current = setTimeout(advance, wait);
      })();

      return () => {
        cancelled = true;
        stopSpeech();
        clearTimeout(timeoutRef.current);
      };
    }

    if (currentIndex >= stepsLen - 1 && stepsLen > 0) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [isPlaying, currentIndex, stepsLen, speed, voiceOn, steps]);

  const play = useCallback(() => {
    setCurrentIndex((i) => (stepsLen > 0 && i >= stepsLen - 1 ? 0 : i));
    setIsPlaying(true);
  }, [stepsLen]);

  const pause = useCallback(() => {
    stopSpeech();
    setIsPlaying(false);
  }, []);

  const next = useCallback(() => {
    stopSpeech();
    setIsPlaying(false);
    setCurrentIndex((i) => Math.min(i + 1, Math.max(stepsLen - 1, 0)));
  }, [stepsLen]);

  const prev = useCallback(() => {
    stopSpeech();
    setIsPlaying(false);
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const reset = useCallback(() => {
    stopSpeech();
    setIsPlaying(false);
    setCurrentIndex(0);
  }, []);

  const goTo = useCallback(
    (index) => {
      stopSpeech();
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
