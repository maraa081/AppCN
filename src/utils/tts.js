/**
 * Synthèse vocale chinoise via Web Speech API — version robuste
 * Gère le chargement asynchrone des voix (Chrome a besoin de l'event voiceschanged)
 */

let synth = null;
let currentUtterance = null;
let voicesLoaded = false;
let voiceLoadPromise = null;

/**
 * Attend que les voix soient chargées (nécessaire sur Chrome)
 */
function waitForVoices() {
  if (voicesLoaded) return Promise.resolve();
  if (voiceLoadPromise) return voiceLoadPromise;

  synth = window.speechSynthesis;

  voiceLoadPromise = new Promise((resolve) => {
    const voices = synth.getVoices();
    if (voices.length > 0) {
      voicesLoaded = true;
      resolve();
      return;
    }
    // Chrome : les voix sont chargées de manière asynchrone
    synth.onvoiceschanged = () => {
      voicesLoaded = true;
      resolve();
    };
    // Timeout de sécurité (3s) — on parle quand même sans voix spécifique
    setTimeout(() => {
      voicesLoaded = true;
      resolve();
    }, 3000);
  });

  return voiceLoadPromise;
}

/**
 * Sélectionne la meilleure voix chinoise disponible
 */
function findChineseVoice() {
  if (!synth) return null;
  const voices = synth.getVoices();
  return (
    voices.find(v => v.lang.startsWith('zh-CN')) ||
    voices.find(v => v.lang.startsWith('zh')) ||
    voices.find(v => v.lang.startsWith('zh-TW')) ||
    null
  );
}

/**
 * Joue un texte en chinois mandarin
 * @param {string} text - Texte à prononcer (hanzi ou pinyin)
 * @param {number} rate - Vitesse (0.1 à 10, défaut 0.9)
 * @param {number} pitch - Hauteur (0 à 2, défaut 1)
 * @returns {Promise<string>} Résultat : 'ok' ou message d'erreur
 */
export async function speak(text, rate = 0.9, pitch = 1) {
  try {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      return 'Web Speech API non disponible';
    }

    synth = window.speechSynthesis;

    // Arrêter toute lecture en cours
    stop();

    // Attendre les voix
    await waitForVoices();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = rate;
    utterance.pitch = pitch;

    // Voix chinoise si disponible
    const zhVoice = findChineseVoice();
    if (zhVoice) {
      utterance.voice = zhVoice;
    }

    currentUtterance = utterance;

    return new Promise((resolve) => {
      utterance.onend = () => {
        currentUtterance = null;
        resolve('ok');
      };
      utterance.onerror = (e) => {
        currentUtterance = null;
        resolve(`Erreur audio: ${e.error || 'inconnue'}`);
      };

      // Parler — enveloppé dans un setTimeout pour contourner certains bugs Chrome
      setTimeout(() => {
        try {
          synth.speak(utterance);
        } catch (e) {
          currentUtterance = null;
          resolve(`Erreur: ${e.message}`);
        }
      }, 50);
    });
  } catch (e) {
    return `Erreur: ${e.message}`;
  }
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
 * Émet un bip sonore pour un ton donné (palier de hauteur)
 * @param {number} tone - Numéro du ton (1-5)
 */
export function playTone(tone) {
  const values = {
    1: { rate: 0.8, pitch: 1.5 },
    2: { rate: 1.0, pitch: 1.3 },
    3: { rate: 0.6, pitch: 0.6 },
    4: { rate: 1.1, pitch: 1.6 },
    5: { rate: 0.9, pitch: 1.0 },
  };
  const v = values[tone] || values[5];
  speak('à', v.rate, v.pitch);
}

/**
 * Teste si l'audio fonctionne (voix disponible)
 * @returns {Promise<{ok: boolean, voices: number, chineseVoice: string|null}>}
 */
export async function testAudio() {
  try {
    await waitForVoices();
    const voices = synth ? synth.getVoices() : [];
    const zhVoice = findChineseVoice();
    return {
      ok: synth !== null,
      voices: voices.length,
      chineseVoice: zhVoice ? zhVoice.name : null,
    };
  } catch {
    return { ok: false, voices: 0, chineseVoice: null };
  }
}
