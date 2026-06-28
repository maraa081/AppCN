import { findAudio, playAudio, loadManifest } from '../utils/audio';
import { loadPrefs, savePrefs } from '../utils/storage';
import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Bouton audio — MP3 pré-générés (3 vitesses). Préférence sauvegardée.
 *
 * Props:
 * - text: Texte pour lookup dans le manifest
 * - src: Chemin direct (prioritaire)
 * - type: Filtre de lookup ('vocab', 'phrase', etc.)
 * - size: "small" | "large"
 * - label: Texte à côté
 */
export default function AudioButton({ text, src, type, size = 'small', label }) {
  const [state, setState] = useState('idle');
  const [speed, setSpeed] = useState(null); // 'slow' | 'medium' | 'native'
  const [loop, setLoop] = useState(false);
  const ctrlRef = useRef(null);

  // Charger la préférence de vitesse
  useEffect(() => {
    const prefs = loadPrefs();
    setSpeed(prefs.audioSpeed || 'medium');
  }, []);

  const getSpeedSuffix = useCallback((s) => {
    if (s === 'slow') return '_slow.mp3';
    if (s === 'native') return '_native.mp3';
    return '.mp3'; // medium = default
  }, []);

  const getPath = useCallback(async () => {
    if (src) return src;
    if (!text) return null;

    const suffix = getSpeedSuffix(speed);
    // Try exact speed first
    const exact = await findAudio(text, { slow: suffix === '_slow.mp3' });
    if (exact) return exact;

    // Fallback: try medium
    if (speed !== 'medium') {
      const medium = await findAudio(text, { slow: false });
      if (medium) return medium;
    }

    // Fallback: any type
    const any = await findAudio(text, {});
    return any;
  }, [src, text, speed, getSpeedSuffix]);

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
      speed: 1.0,  // Vitesse déjà codée dans le fichier
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

  const cycleSpeed = (e) => {
    e.stopPropagation();
    const speeds = ['slow', 'medium', 'native'];
    const labels = { slow: '🐢 -40%', medium: '▶ -20%', native: '⏩ +0%' };
    const idx = speeds.indexOf(speed);
    const next = speeds[(idx + 1) % 3];
    setSpeed(next);

    // Sauvegarder la préférence
    const prefs = loadPrefs();
    prefs.audioSpeed = next;
    savePrefs(prefs);

    // Si lecture en cours, redémarrer avec la nouvelle vitesse
    if (state === 'playing') {
      handleStop();
      setTimeout(handlePlay, 100);
    }
  };

  const toggleLoop = (e) => {
    e.stopPropagation();
    setLoop(l => !l);
    if (ctrlRef.current) {
      ctrlRef.current.setLoop(!loop);
    }
  };

  const speedLabels = { slow: '⏪', medium: '▶', native: '⏩' };
  const speedTitle = { slow: 'Lent (-40%)', medium: 'Moyen (-20%)', native: 'Rapide (+0%)' };

  const btnIcon = state === 'playing' ? '⏹' : state === 'loading' ? '⏳' : state === 'error' ? '⚠️' : speedLabels[speed] || '▶';
  const btnTitle = state === 'playing' ? 'Arrêter'
    : state === 'error' ? 'Audio introuvable'
    : `Écouter (${speedTitle[speed] || 'moyen'})`;

  return (
    <span className="audio-group">
      <button
        className={`audio-btn ${state === 'playing' ? 'playing' : ''} ${state === 'error' ? 'error' : ''} ${size}`}
        onClick={state === 'playing' ? handleStop : handlePlay}
        title={btnTitle}
      >
        {btnIcon}
      </button>
      {state !== 'playing' && (
        <button
          className={`audio-btn speed-btn ${size}`}
          onClick={cycleSpeed}
          title={`Vitesse : ${speedTitle[speed] || 'moyen'}. Cliquer pour changer.`}
        >
          {speedLabels[speed]}
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
