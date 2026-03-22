import { useGameStateStore } from '@/entities/game/model/game-state.store';
import { useRef, useEffect, useCallback, useState, useEffectEvent } from 'react';
// declare const ysdk: any;

interface MusicOptions {
  loop?: boolean;
  volume?: number; // 0-1
  fadeDuration?: number; // секунды
}

export const useBackgroundMusic = (url: string, options: MusicOptions = {}) => {
  const { loop = true, volume = 0.5, fadeDuration = 1.5 } = options;

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadAudio = useCallback(async () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const gain = ctx.createGain();
      gain.gain.value = 0; // для fade-in
      gain.connect(ctx.destination);
      gainRef.current = gain;

      const res = await fetch(url);
      const arrayBuffer = await res.arrayBuffer();
      bufferRef.current = await ctx.decodeAudioData(arrayBuffer);
    }
  }, [url]);

  const play = useCallback(async () => {
    if (useGameStateStore.getState().paused
      || useGameStateStore.getState().musicDisabled) return;
    await loadAudio();

    if (!isMountedRef.current)
      return;

    const ctx = audioCtxRef.current;
    const gain = gainRef.current;
    const buffer = bufferRef.current;
    if (!ctx || !gain || !buffer) return;

    if (ctx.state === 'suspended') await ctx.resume();

    if (sourceRef.current) sourceRef.current.stop();

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = loop;
    source.connect(gain);

    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume, now + fadeDuration);

    source.start();
    sourceRef.current = source;
    setIsPlaying(true);
  }, [loadAudio, loop, volume, fadeDuration]);

  const stop = useCallback(() => {
    const source = sourceRef.current;
    if (!source) return;

    source.stop();
    sourceRef.current = null;
    setIsPlaying(false);
  }, [fadeDuration]);

  const playIfNotPlaying = useEffectEvent(() => {
    if (!isPlaying) play();
  });

  useEffect(() => {
    const unsubscribe = useGameStateStore.subscribe(
      state => [state.paused, state.musicDisabled],
      ([paused, musicDisabled]) => {
        if (paused || musicDisabled) stop();
        else playIfNotPlaying();
      }
    )

    return () => {
      unsubscribe();
      if (sourceRef.current) sourceRef.current.stop();
    };
  }, [stop]);

  useEffect(() => {
    return () => {
      const source = sourceRef.current;
      if (source)
        source.stop();
    };
  }, [])

  return { play, stop, isPlaying };
};