import { useCallback, useEffect, useRef, useState } from 'react';

const notes = [220, 277.18, 329.63, 392, 440, 329.63, 261.63, 293.66];

export function useAudioEngine() {
  const audioRef = useRef(null);
  const gainRef = useRef(null);
  const timerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.34);

  const stop = useCallback(() => {
    window.clearInterval(timerRef.current);
    timerRef.current = null;
    setIsPlaying(false);
  }, []);

  const playNote = useCallback((frequency, index) => {
    const context = audioRef.current;
    const gain = gainRef.current;

    if (!context || !gain) return;

    const oscillator = context.createOscillator();
    const noteGain = context.createGain();
    const filter = context.createBiquadFilter();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    filter.type = 'lowpass';
    filter.frequency.value = 1100;

    const start = context.currentTime;
    const length = index % 3 === 0 ? 2.8 : 2.15;

    noteGain.gain.setValueAtTime(0, start);
    noteGain.gain.linearRampToValueAtTime(0.18, start + 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.001, start + length);

    oscillator.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(gain);
    oscillator.start(start);
    oscillator.stop(start + length + 0.05);
  }, []);

  const play = useCallback(async () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    if (!audioRef.current) {
      audioRef.current = new AudioContext();
      gainRef.current = audioRef.current.createGain();
      gainRef.current.gain.value = volume;
      gainRef.current.connect(audioRef.current.destination);
    }

    await audioRef.current.resume();
    setIsPlaying(true);

    let index = 0;
    playNote(notes[index], index);
    timerRef.current = window.setInterval(() => {
      index = (index + 1) % notes.length;
      playNote(notes[index], index);
    }, 1650);
  }, [playNote, volume]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stop();
      return;
    }

    play();
  }, [isPlaying, play, stop]);

  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.setTargetAtTime(volume, audioRef.current.currentTime, 0.08);
    }
  }, [volume]);

  useEffect(() => stop, [stop]);

  return { isPlaying, toggle, volume, setVolume };
}
