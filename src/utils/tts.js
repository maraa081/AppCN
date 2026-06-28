/**
 * Synthèse vocale chinoise via Web Speech API
 */

const synth = window.speechSynthesis;
let currentUtterance = null;

/**
 * Joue un texte en chinois mandarin
 * @param {string} text - Texte à prononcer
 * @param {number} rate - Vitesse (0.1 à 10, défaut 0.9)
 * @param {number} pitch - Hauteur (0 à 2, défaut 1)
 * @returns {Promise<void>}
 */
export function speak(text, rate = 0.9, pitch = 1) {
  return new Promise((resolve, reject) => {
    if (!synth) {
      reject(new Error('Web Speech API non supportée'));
      return;
    }

    // Arrêter toute lecture en cours
    stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = rate;
    utterance.pitch = pitch;

    // Sélectionner une voix chinoise si disponible
    const voices = synth.getVoices();
    const zhVoice = voices.find(v =>
      v.lang.startsWith('zh') && v.lang.includes('CN')
    ) || voices.find(v => v.lang.startsWith('zh'));
    if (zhVoice) utterance.voice = zhVoice;

    currentUtterance = utterance;

    utterance.onend = () => {
      currentUtterance = null;
      resolve();
    };
    utterance.onerror = (e) => {
      currentUtterance = null;
      reject(e);
    };

    synth.speak(utterance);
  });
}

/**
 * Arrête la lecture en cours
 */
export function stop() {
  if (synth) {
    synth.cancel();
    currentUtterance = null;
  }
}

/**
 * Joue une syllabe pinyin avec son ton (en utilisant le pinyin numérique)
 * Exemple : "ma1" → joue "mā"
 * @param {string} syllable - Syllabe pinyin avec ton (ma1, ma2, ma3, ma4, ma5)
 */
export function speakPinyin(syllable) {
  const toneMap = {
    1: '\u0304', // macron
    2: '\u0301', // acute
    3: '\u030C', // caron
    4: '\u0300', // grave
    5: ''        // neutre
  };

  // Extraire le numéro de ton
  const match = syllable.match(/^([a-zA-Z]+[uo]?)([1-5])$/);
  if (!match) {
    speak(syllable, 0.9, 1);
    return;
  }

  const base = match[1];
  const tone = parseInt(match[2]);

  // Jouer en ajustant le pitch selon le ton pour aider la reconnaissance
  const pitchMap = { 1: 1.0, 2: 1.25, 3: 0.7, 4: 1.5, 5: 0.9 };
  speak(syllable.replace(/[1-5]$/, ''), 0.9, pitchMap[tone] || 1);
}
