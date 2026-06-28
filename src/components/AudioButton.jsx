import { findAudio, playAudio } from '../utils/audio';
import { loadPrefs, savePrefs } from '../utils/storage';
import { useState, useRef, useEffect, useCallback } from 'react';

const SPEEDS = ['slow', 'medium', 'native'];
const SPEED_ICON = { slow: '🐢', medium: '▶', native: '⏩' };
const SPEED_LABEL = { slow: '-40%', medium: '-20%', native: '0%' };
const SPEED_TITLE = { slow: 'Lent (-40%)', medium: 'Normal (-20%)', native: 'Rapide (0%)' };

export default function AudioButton({ text, src, type, size = 'small', label }) {
  const [state, setState] = useState('idle');
  const [speed, setSpeed] = useState('medium');
  const [loop, setLoop] = useState(false);
  const ctrlRef = useRef(null);

  useEffect(() => {
    const prefs = loadPrefs();
    setSpeed(prefs.audioSpeed || 'medium');
  }, []);

  const findPath = useCallback(async (s) => {
    if (src) return src;
    if (!text) return null;
    if (s === 'slow') return (await findAudio(text, { slow: true })) || (await findAudio(text, {}));
    if (s === 'native') return (await findAudio(text, { native: true })) || (await findAudio(text, {}));
    return (await findAudio(text, { slow: false })) || (await findAudio(text, {}));
  }, [src, text]);

  const handlePlay = async () => {
    if (ctrlRef.current) { ctrlRef.current.stop(); ctrlRef.current = null; }
    setState('loading');
    const path = await findPath(speed);
    if (!path) { setState('error'); setTimeout(() => setState('idle'), 2000); return; }
    setState('playing');
    ctrlRef.current = playAudio(path, { speed: 1.0, loop, onEnd: () => { setState('idle'); ctrlRef.current = null; } });
  };

  const handleStop = () => {
    if (ctrlRef.current) { ctrlRef.current.stop(); ctrlRef.current = null; }
    setState('idle');
  };

  const cycleSpeed = (e) => {
    e.stopPropagation();
    const idx = SPEEDS.indexOf(speed);
    const next = SPEEDS[(idx + 1) % 3];
    setSpeed(next);
    const prefs = loadPrefs();
    prefs.audioSpeed = next;
    savePrefs(prefs);
    // Redémarrer si en cours
    if (state === 'playing') {
      handleStop();
      setTimeout(handlePlay, 150);
    }
  };

  const toggleLoop = (e) => {
    e.stopPropagation();
    setLoop(l => !l);
    if (ctrlRef.current) ctrlRef.current.setLoop(!loop);
  };

  return (
    <span className={`audio-group ${size}`}>
      {/* Play/Stop */}
      <button
        className={`audio-btn ${state === 'playing' ? 'playing' : ''} ${state === 'error' ? 'error' : ''} ${size}`}
        onClick={state === 'playing' ? handleStop : handlePlay}
        title={state === 'playing' ? 'Arrêter' : `Écouter (${SPEED_TITLE[speed]})`}
      >
        {state === 'playing' ? '⏹' : state === 'loading' ? '⏳' : state === 'error' ? '⚠️' : '🔊'}
      </button>

      {/* Speed : cycle au clic, texte toujours visible */}
      <button
        className={`audio-btn speed-btn ${size}`}
        onClick={cycleSpeed}
        title={`Vitesse : ${SPEED_TITLE[speed]}. Cliquer pour changer.`}
      >
        {SPEED_ICON[speed]}
        <span className="speed-text">{SPEED_LABEL[speed]}</span>
      </button>

      {/* Loop : toujours visible */}
      <button
        className={`audio-btn loop-btn ${loop ? 'active' : ''} ${size}`}
        onClick={toggleLoop}
        title={loop ? 'Répétition active (cliquer pour arrêter)' : 'Répétition en boucle'}
      >
        {loop ? '🔁' : '🔂'}
      </button>

      {label && <span className="audio-label">{label}</span>}
    </span>
  );
}
