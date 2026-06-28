import { speak, stop } from '../utils/tts';
import { useState } from 'react';

export default function AudioButton({ text, label, size = 'small' }) {
  const [playing, setPlaying] = useState(false);

  const handleClick = async () => {
    if (playing) {
      stop();
      setPlaying(false);
      return;
    }
    setPlaying(true);
    try {
      await speak(text);
    } catch (e) {
      console.warn('TTS error:', e);
    }
    setPlaying(false);
  };

  return (
    <button
      className={`audio-btn ${playing ? 'playing' : ''} ${size}`}
      onClick={handleClick}
      title={`Écouter : ${text}`}
    >
      {playing ? '⏹' : '🔊'}
      {label && <span className="audio-label">{label}</span>}
    </button>
  );
}
