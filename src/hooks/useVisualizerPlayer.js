import { useEffect } from 'react';
import { useAnimationQueue } from './useAnimationQueue';
import { usePlayer } from '../context/PlayerContext';

export function useVisualizerPlayer(steps) {
  const { speed, register, voiceOn } = usePlayer();
  const queue = useAnimationQueue(steps, speed, voiceOn);

  useEffect(() => {
    register({
      isPlaying: queue.isPlaying,
      currentIndex: queue.currentIndex,
      totalSteps: queue.totalSteps,
      play: queue.play,
      pause: queue.pause,
      next: queue.next,
      prev: queue.prev,
      reset: queue.reset,
      goTo: queue.goTo,
    });
    return () => register(null);
  }, [
    queue.isPlaying,
    queue.currentIndex,
    queue.totalSteps,
    queue.play,
    queue.pause,
    queue.next,
    queue.prev,
    queue.reset,
    queue.goTo,
    register,
  ]);

  return queue;
}
