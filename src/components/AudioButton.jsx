import { findAudio, playAudio, loadManifest } from '../utils/audio';
import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Bouton audio — utilise les MP3 pré-générés par edge-tts.
 *
 * Props:
 * - text: Texte à prononcer (cherché dans le manifest)
 * - src: Chemin audio direct (prioritaire sur text)
 * - type: Filtre de type pour la recherche dans le manifest
 * - size: "small" | "large"
 * - label: Texte à côté du bouton
 * - showSlow: Afficher le bouton vitesse lente
 */
export default function AudioButton({ text, src, type, size = 'small', label, showSlow = false }) {
  const [state, setState] = useState('idle'); // idle | loading | playing | error
  const [speed, setSpeed] = useState(1.0);     // 1.0 normal, 0.7 slow
  const [loop, setLoop] = useState(false);
  const ctrlRef = useRef(null);
  const [manifestReady, setManifestReady] = useState(false);

  // Précharge le manifest au montage
  useEffect(() => {
    loadManifest().then(() => setManifestReady(true));
  }, []);

  const getPath = useCallback(async () => {
    if (src) return src;
    if (!text) return null;
    // Cherche dans le manifest
    const found = await findAudio(text, { slow: speed < 1, type });
    return found;
  }, [src, text, speed, type]);

  const handlePlay = async () => {
    if (ctrlRef.current) {
      ctrlRef.current.stop();
      ctrlRef.current = null;
    }

    setState('loading');
    const path = await getPath();
    if (!path) {
      setState('error');
      setTimeout(() => setState('idle'), 2000);
      return;
    }

    setState('playing');
    ctrlRef.current = playAudio(path, {
      speed,
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

  const toggleSpeed = (e) => {
    e.stopPropagation();
    const newSpeed = speed === 1.0 ? 0.7 : 1.0;
    setSpeed(newSpeed);
    if (ctrlRef.current) {
      ctrlRef.current.setSpeed(newSpeed);
    }
  };

  const toggleLoop = (e) => {
    e.stopPropagation();
    setLoop(l => !l);
    if (ctrlRef.current) {
      ctrlRef.current.setLoop(!loop);
    }
  };

  const btnIcon = state === 'playing' ? '⏹' : state === 'loading' ? '⏳' : state === 'error' ? '⚠️' : speed < 1 ? '🐢' : '🔊';
  const btnTitle = state === 'playing' ? 'Arrêter'
    : state === 'error' ? 'Audio introuvable'
    : speed < 1 ? `Écouter (lent -30%)`
    : 'Écouter';

  return (
    <span className="audio-group">
      <button
        className={`audio-btn ${state === 'playing' ? 'playing' : ''} ${state === 'error' ? 'error' : ''} ${size}`}
        onClick={state === 'playing' ? handleStop : handlePlay}
        title={btnTitle}
      >
        {btnIcon}
      </button>
      {showSlow && state === 'idle' && (
        <button
          className={`audio-btn speed-btn ${speed < 1 ? 'active' : ''} ${size}`}
          onClick={toggleSpeed}
          title={speed < 1 ? 'Vitesse normale' : 'Ralentir (-30%)'}
        >
          🐢
        </button>
      )}
      {state === 'playing' && (
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
