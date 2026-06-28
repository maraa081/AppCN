import { speak, stop, testAudio } from '../utils/tts';
import { useState, useEffect } from 'react';

export default function AudioButton({ text, label, size = 'small' }) {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(null);
  const [audioOk, setAudioOk] = useState(true);

  // Test l'audio au premier clic
  const ensureAudio = async () => {
    if (!audioOk) {
      const result = await testAudio();
      if (!result.ok) {
        setError('Audio non supporté');
        return false;
      }
      setAudioOk(true);
    }
    return true;
  };

  const handleClick = async () => {
    if (playing) {
      stop();
      setPlaying(false);
      return;
    }

    setError(null);

    if (!(await ensureAudio())) return;

    setPlaying(true);
    const result = await speak(text);
    setPlaying(false);

    if (result !== 'ok') {
      setError(result);
      // Si c'est juste "pas de voix chinoise", c'est pas bloquant
      if (!result.includes('disponible')) {
        // Réessayer avec une approche plus simple : parler directement
        const retry = await speakSimple(text);
        if (!retry) {
          setTimeout(() => setError(null), 3000);
        }
      }
    }
  };

  return (
    <button
      className={`audio-btn ${playing ? 'playing' : ''} ${size} ${error ? 'error' : ''}`}
      onClick={handleClick}
      title={error || `Écouter : ${text}`}
    >
      {playing ? '⏹' : error ? '⚠️' : '🔊'}
      {label && <span className="audio-label">{label}</span>}
    </button>
  );
}

/**
 * Fallback de dernier recours : parler sans attendre les voix
 */
async function speakSimple(text) {
  try {
    const synth = window.speechSynthesis;
    if (!synth) return false;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN';
    u.rate = 0.9;
    synth.speak(u);
    return true;
  } catch {
    return false;
  }
}
