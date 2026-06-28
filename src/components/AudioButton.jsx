import { findAudio, playAudio } from '../utils/audio';
import { loadPrefs, savePrefs } from '../utils/storage';
import { useState, useRef, useEffect, useCallback } from 'react';

const SPEEDS = ['slow', 'medium', 'native'];
const SPEED_ICONS = { slow: '🐢', medium: '▶', native: '⏩' };
const SPEED_PCT = { slow: '-40%', medium: '-20%', native: '+0%' };
const SPEED_TITLE = { slow: 'Lent', medium: 'Normal', native: 'Rapide' };

export default function AudioButton({ text, src, type, size = 'small', label }) {
  const [state, setState] = useState('idle');
  const [speed, setSpeed] = useState('medium');
  const [loop, setLoop] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const ctrlRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const prefs = loadPrefs();
    setSpeed(prefs.audioSpeed || 'medium');
  }, []);

  // Fermer le menu au clic à l'extérieur
  useEffect(() => {
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [showMenu]);

  const findAudioPath = useCallback(async (s) => {
    if (src) return src;
    if (!text) return null;

    if (s === 'slow') {
      const f = await findAudio(text, { slow: true });
      if (f) return f;
    }
    if (s === 'native') {
      const f = await findAudio(text, { native: true });
      if (f) return f;
    }
    // Default medium
    const f = await findAudio(text, { slow: false });
    if (f) return f;
    return await findAudio(text, {});
  }, [src, text]);

  const handlePlay = async () => {
    if (ctrlRef.current) {
      ctrlRef.current.stop();
      ctrlRef.current = null;
    }
    setState('loading');
    setShowMenu(false);

    const path = await findAudioPath(speed);
    if (!path) {
      setState('error');
      setTimeout(() => setState('idle'), 2000);
      return;
    }

    setState('playing');
    ctrlRef.current = playAudio(path, {
      speed: 1.0,
      loop,
      onEnd: () => {
        setState('idle');
        ctrlRef.current = null;
      },
    });
  };

  const handleStop = () => {
    if (ctrlRef.current) {
      ctrlRef.current.stop();
      ctrlRef.current = null;
    }
    setState('idle');
  };

  const changeSpeed = (s) => {
    setSpeed(s);
    setShowMenu(false);
    const prefs = loadPrefs();
    prefs.audioSpeed = s;
    savePrefs(prefs);
  };

  const toggleLoop = (e) => {
    e.stopPropagation();
    setLoop(l => !l);
    if (ctrlRef.current) ctrlRef.current.setLoop(!loop);
  };

  const isPlaying = state === 'playing';

  return (
    <span className="audio-group" ref={menuRef}>
      {/* Play / Stop */}
      <button
        className={`audio-btn ${isPlaying ? 'playing' : ''} ${state === 'error' ? 'error' : ''} ${size}`}
        onClick={isPlaying ? handleStop : handlePlay}
        title={isPlaying ? 'Arrêter' : `Écouter (${SPEED_TITLE[speed]})`}
      >
        {isPlaying ? '⏹' : state === 'loading' ? '⏳' : state === 'error' ? '⚠️' : '🔊'}
      </button>

      {/* Speed selector */}
      <span className="speed-selector">
        <button
          className={`audio-btn speed-btn ${size}`}
          onClick={() => setShowMenu(!showMenu)}
          title={`Vitesse : ${SPEED_TITLE[speed]} (${SPEED_PCT[speed]})`}
        >
          {SPEED_ICONS[speed]}
        </button>
        {showMenu && (
          <span className="speed-menu">
            {SPEEDS.map(s => (
              <button
                key={s}
                className={`speed-option ${s === speed ? 'active' : ''}`}
                onClick={() => changeSpeed(s)}
              >
                {SPEED_ICONS[s]} {SPEED_TITLE[s]} <span className="speed-pct">{SPEED_PCT[s]}</span>
              </button>
            ))}
          </span>
        )}
      </span>

      {/* Loop (only when playing) */}
      {isPlaying && (
        <button
          className={`audio-btn loop-btn ${loop ? 'active' : ''} ${size}`}
          onClick={toggleLoop}
          title={loop ? 'Stop boucle' : 'Boucle'}
        >
          {loop ? '🔁' : '🔂'}
        </button>
      )}

      {label && <span className="audio-label">{label}</span>}
    </span>
  );
}
