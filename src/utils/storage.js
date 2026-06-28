/**
 * Gestion du stockage local (IndexedDB via localStorage fallback)
 */

const STORAGE_KEY = 'appcn_progress';

/**
 * Charge la progression depuis le stockage local
 * @returns {object}
 */
export function loadProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : getDefaultProgress();
  } catch {
    return getDefaultProgress();
  }
}

/**
 * Sauvegarde la progression
 * @param {object} progress
 */
export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn('Erreur sauvegarde progression:', e);
  }
}

/**
 * Structure par défaut de la progression
 */
function getDefaultProgress() {
  return {
    phrases: {},
    grammar: {},
    pronunciation: {},
    vocabulary: {
      knownWords: [],     // mots mémorisés
      dueReviews: {},     // carte → date de révision
      reviewHistory: {},   // carte → historique des révisions
    },
    stats: {
      totalAnswered: 0,
      totalCorrect: 0,
      sessionsStarted: 0,
    }
  };
}

/**
 * Marque une leçon comme complétée
 * @param {string} module - 'phrases'|'grammar'|'pronunciation'
 * @param {string} level - 'debutant'|'intermediaire'|'avance'
 * @param {string} lessonId
 */
export function completeLesson(module, level, lessonId) {
  const progress = loadProgress();
  if (!progress[module][level]) {
    progress[module][level] = {};
  }
  progress[module][level][lessonId] = {
    completed: true,
    completedAt: new Date().toISOString(),
  };
  saveProgress(progress);
}

/**
 * Enregistre une réponse à un exercice
 * @param {string} moduleId
 * @param {string} exerciseId
 * @param {boolean} correct
 */
export function recordAnswer(moduleId, exerciseId, correct) {
  const progress = loadProgress();
  if (!progress[moduleId].answers) progress[moduleId].answers = {};
  if (!progress[moduleId].answers[exerciseId]) {
    progress[moduleId].answers[exerciseId] = { attempts: 0, correct: 0 };
  }
  progress[moduleId].answers[exerciseId].attempts++;
  if (correct) progress[moduleId].answers[exerciseId].correct++;
  progress.stats.totalAnswered++;
  if (correct) progress.stats.totalCorrect++;
  saveProgress(progress);
}

/**
 * Gestion des flashcards (vocabulaire) avec répétition espacée simple
 */
const REVIEW_INTERVALS = [1, 3, 7, 14, 30]; // jours entre les révisions

export function getReviewIntervals() {
  return REVIEW_INTERVALS;
}

/**
 * Calcule la prochaine date de révision pour un mot
 */
export function getNextReviewDate(currentLevel) {
  const days = REVIEW_INTERVALS[Math.min(currentLevel, REVIEW_INTERVALS.length - 1)];
  const next = new Date();
  next.setDate(next.getDate() + days);
  return next.toISOString();
}

/**
 * Enregistre une révision de mot
 * @param {string} wordId
 * @param {boolean} success - vrai si l'utilisateur a trouvé la bonne réponse
 */
export function recordReview(wordId, success) {
  const progress = loadProgress();
  const reviews = progress.vocabulary;

  if (!reviews.reviewHistory[wordId]) {
    reviews.reviewHistory[wordId] = { level: 0, reviews: [] };
  }

  const card = reviews.reviewHistory[wordId];
  card.reviews.push({
    date: new Date().toISOString(),
    success,
  });

  if (success) {
    card.level = Math.min(card.level + 1, REVIEW_INTERVALS.length - 1);
  } else {
    card.level = Math.max(card.level - 1, 0);
  }

  reviews.dueReviews[wordId] = getNextReviewDate(card.level);

  // Si le niveau est maximal, ajouter aux mots connus
  if (card.level >= REVIEW_INTERVALS.length - 1 && !reviews.knownWords.includes(wordId)) {
    reviews.knownWords.push(wordId);
  }

  progress.stats.totalAnswered++;
  if (success) progress.stats.totalCorrect++;
  saveProgress(progress);
}

/**
 * Récupère les mots à réviser aujourd'hui
 * @param {Array} allWords - Liste de tous les mots disponibles
 * @returns {Array} Mots à réviser
 */
export function getDueWords(allWords) {
  const progress = loadProgress();
  const { dueReviews, reviewHistory } = progress.vocabulary;
  const now = new Date();

  const due = allWords.filter(word => {
    const wordId = word.id || word.hanzi;
    const dueDate = dueReviews[wordId];
    if (!dueDate) {
      // Jamais révisé → à faire
      if (!reviewHistory[wordId]) return true;
      return false;
    }
    return new Date(dueDate) <= now;
  });

  return due;
}

/**
 * Récupère les statistiques globales
 */
export function getStats() {
  return loadProgress().stats;
}
