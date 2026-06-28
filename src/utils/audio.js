/**
 * Gestionnaire audio MP3 pré-générés + manifest de lookup
 * Les fichiers sont dans public/audio/ servis statiquement par Vite
 */

const AUDIO_BASE = '/CN/audio/';
let manifest = null;
let manifestLoadPromise = null;

/**
 * Charge le manifest.json qui mappe texte → fichier audio
 */
export async function loadManifest() {
  if (manifest) return manifest;
  if (manifestLoadPromise) return manifestLoadPromise;

  manifestLoadPromise = fetch(`${AUDIO_BASE}manifest.json`)
    .then(r => r.json())
    .then(data => {
      manifest = data;
      return manifest;
    })
    .catch(() => {
      manifest = [];
      return manifest;
    });

  return manifestLoadPromise;
}

/**
 * Cherche le chemin audio pour un texte donné
 * @param {string} text - Texte à chercher (hanzi, pinyin)
 * @param {object} options
 * @param {boolean} options.slow - Version lente ?
 * @param {string} options.type - Filtrer par type ('vocab', 'phrase', 'syllable', etc.)
 * @returns {string|null} Chemin relatif (ex: "vocab/w1.mp3") ou null
 */
export async function findAudio(text, options = {}) {
  const { slow = false, type = null } = options;
  const mf = await loadManifest();
  if (!mf) return null;

  const entry = mf.find(e =>
    e.text === text &&
    e.slow === slow &&
    (!type || e.type.startsWith(type))
  );

  return entry ? entry.path : null;
}

/**
 * Joue un fichier audio
 */
export function playAudio(path, options = {}) {
  const { speed = 1.0, loop = false, onEnd } = options;
  const audio = new Audio();
  audio.preload = 'auto';
  audio.src = `${AUDIO_BASE}${path}`;
  audio.playbackRate = speed;
  audio.loop = loop;

  const controller = {
    stop() { audio.pause(); audio.currentTime = 0; },
    pause() { audio.pause(); },
    resume() { audio.play().catch(() => {}); },
    setSpeed(s) { audio.playbackRate = s; },
    setLoop(l) { audio.loop = l; },
    audio,
  };

  audio.play().catch(e => console.warn('Audio:', e.message));
  if (onEnd) audio.onended = onEnd;

  return controller;
}

/**
 * Arrête tous les sons
 */
export function stopAll() {
  // Les éléments audio sont récupérés par le GC quand on les perd
}

/**
 * Précharge une liste de fichiers audio
 */
export function preloadAudio(paths) {
  paths.forEach(path => {
    const a = new Audio();
    a.preload = 'auto';
    a.src = `${AUDIO_BASE}${path}`;
  });
}
