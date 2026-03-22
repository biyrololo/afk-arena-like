import { useGameStateStore } from '@/entities/game/model/game-state.store';
import { useEffect, useRef, useCallback } from 'react';

export const useSoundEffects = (urls: Record<string, string>) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const buffersRef = useRef<Record<string, AudioBuffer>>({});

  useEffect(() => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Предзагрузка всех звуков
    Object.entries(urls).forEach(([key, url]) => {
      fetch(url)
        .then(res => res.arrayBuffer())
        .then(data => ctx.decodeAudioData(data))
        .then(buffer => {
          buffersRef.current[key] = buffer;
        });
    });

    return () => { ctx.close(); };
  }, []);

  const playSound = useCallback((name: string, volume = 1) => {
    if (useGameStateStore.getState().paused || useGameStateStore.getState().musicDisabled) return;
    const ctx = audioCtxRef.current;
    const buffer = buffersRef.current[name];

    if (!ctx || !buffer) return;

    if (ctx.state === 'suspended') ctx.resume();

    // Создаем "одноразовую" цепочку узлов для каждого выстрела/клика
    const source = ctx.createBufferSource();
    const gainNode = ctx.createGain();

    source.buffer = buffer;
    gainNode.gain.value = volume;

    source.connect(gainNode);
    gainNode.connect(ctx.destination);

    source.start(0);

    // Автоматическая очистка после завершения проигрывания
    source.onended = () => {
      source.disconnect();
      gainNode.disconnect();
    };
  }, []);

  return { playSound };
};