/**
 * Gestionnaire audio MP3 pré-générés (3 vitesses) + manifest lookup
 * Les fichiers sont servis statiquement depuis public/audio/
 */

const AUDIO_BASE = '/CN/audio/';
let manifest = null;
let loadPromise = null;

export async function loadManifest() {
  if (manifest) return manifest;
  if (loadPromise) return loadPromise;

  loadPromise = fetch(`${AUDIO_BASE}manifest.json`)
    .then(r => r.json())
    .then(data => { manifest = data; return manifest; })
    .catch(() => { manifest = []; return manifest; });

  return loadPromise;
}

/**
 * Cherche le fichier audio pour un texte donné, en tenant compte de la vitesse
 * @param {string} text
 * @param {object} opts - { slow? (bool), native? (bool) }
 * @returns {string|null} Chemin relatif
 */
export async function findAudio(text, opts = {}) {
  const { slow = false, native = false } = opts;
  const mf = await loadManifest();
  if (!mf) return null;

  // Cherche en priorité la vitesse exacte
  const candidates = mf.filter(e => e.text === text);

  if (native) {
    const n = candidates.find(e => e.path.includes('_native'));
    if (n) return n.path;
  }
  if (slow) {
    const s = candidates.find(e => e.path.includes('_slow'));
    if (s) return s.path;
  }
  // Default medium : ni slow ni native
  const m = candidates.find(e => !e.path.includes('_slow') && !e.path.includes('_native'));
  if (m) return m.path;

  // Fallback : n'importe quel fichier correspondant
  return candidates.length > 0 ? candidates[0].path : null;
}

/**
 * Joue un fichier audio
 */
export function playAudio(path, opts = {}) {
  const { speed = 1.0, loop = false, onEnd } = opts;
  const audio = new Audio();
  audio.preload = 'auto';
  audio.src = `${AUDIO_BASE}${path}`;
  audio.playbackRate = speed;
  audio.loop = loop;

  const ctrl = {
    stop() { audio.pause(); audio.currentTime = 0; },
    pause() { audio.pause(); },
    resume() { audio.play().catch(() => {}); },
    setSpeed(s) { audio.playbackRate = s; },
    setLoop(l) { audio.loop = l; },
  };

  audio.play().catch(e => console.warn('Audio:', e.message));
  if (onEnd) audio.onended = onEnd;
  return ctrl;
}

export function preloadAudio(paths) {
  paths.forEach(path => {
    const a = new Audio();
    a.preload = 'auto';
    a.src = `${AUDIO_BASE}${path}`;
  });
}
