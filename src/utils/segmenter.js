/**
 * Segmenteur de texte chinois en mots
 * Utilise le vocabulaire existant comme dictionnaire de segmentation
 * avec un algorithme de forward maximum matching.
 */

// Cache du dictionnaire (hanzi → { pinyin, audioId })
let wordDict = null;

/**
 * Charge le dictionnaire depuis les données de vocabulaire
 * @param {Array} vocabWords - Liste des mots du vocabulaire
 */
export function loadDictionary(vocabWords) {
  wordDict = {};
  // Trier par longueur décroissante (max match)
  const sorted = [...vocabWords].sort((a, b) => b.hanzi.length - a.hanzi.length);

  for (const word of sorted) {
    if (!wordDict[word.hanzi]) {
      wordDict[word.hanzi] = {
        pinyin: word.pinyin,
        audioId: word.id,
        french: word.french,
      };
    }
  }
}

/**
 * Segmente un texte chinois en mots en utilisant le dictionnaire.
 * Retourne un tableau de segments : { hanzi, pinyin, audioId, isVocab }
 */
export function segmentText(text) {
  if (!wordDict) return fallbackSegmentation(text);

  const segments = [];
  let i = 0;

  while (i < text.length) {
    let matched = false;

    // Cherche le plus long mot correspondant à partir de la position i
    for (let len = Math.min(8, text.length - i); len >= 1; len--) {
      const candidate = text.slice(i, i + len);
      if (wordDict[candidate]) {
        segments.push({
          hanzi: candidate,
          pinyin: wordDict[candidate].pinyin,
          audioId: wordDict[candidate].audioId,
          isVocab: true,
        });
        i += len;
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Aucun mot trouvé → prendre 1 caractère
      segments.push({
        hanzi: text[i],
        pinyin: null,
        audioId: null,
        isVocab: false,
      });
      i++;
    }
  }

  return segments;
}

/**
 * Segmentation de base sans dictionnaire : chaque caractère individuellement
 */
function fallbackSegmentation(text) {
  return [...text].map(char => ({
    hanzi: char,
    pinyin: null,
    audioId: null,
    isVocab: false,
  }));
}

/**
 * Vide le cache (pour rechargement)
 */
export function clearDictionary() {
  wordDict = null;
}
