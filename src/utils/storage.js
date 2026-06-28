/**
 * Stockage local : progression SRS (SM-2), préférences, statistiques
 */

const STORAGE_KEY = 'appcn_progress';
const PREFS_KEY = 'appcn_prefs';

// ====== PROGRESSION ======

export function loadProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : getDefaultProgress();
  } catch {
    return getDefaultProgress();
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn('Save error:', e);
  }
}

function getDefaultProgress() {
  return {
    phrases: {},
    grammar: {},
    pronunciation: {},
    vocabulary: {
      srsCards: {},       // wordId → SM-2 card data
      knownWords: [],
      sessions: 0,
    },
    stats: {
      totalAnswered: 0,
      totalCorrect: 0,
      sessionsStarted: 0,
    }
  };
}

export function completeLesson(module, level, lessonId) {
  const p = loadProgress();
  if (!p[module][level]) p[module][level] = {};
  p[module][level][lessonId] = { completed: true, completedAt: new Date().toISOString() };
  saveProgress(p);
}

export function recordAnswer(moduleId, exerciseId, correct) {
  const p = loadProgress();
  if (!p[moduleId].answers) p[moduleId].answers = {};
  if (!p[moduleId].answers[exerciseId]) p[moduleId].answers[exerciseId] = { attempts: 0, correct: 0 };
  p[moduleId].answers[exerciseId].attempts++;
  if (correct) p[moduleId].answers[exerciseId].correct++;
  p.stats.totalAnswered++;
  if (correct) p.stats.totalCorrect++;
  saveProgress(p);
}

// ====== PRÉFÉRENCES ======

export function loadPrefs() {
  try {
    const data = localStorage.getItem(PREFS_KEY);
    return data ? JSON.parse(data) : getDefaultPrefs();
  } catch {
    return getDefaultPrefs();
  }
}

export function savePrefs(prefs) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch (e) {
    console.warn('Prefs save error:', e);
  }
}

function getDefaultPrefs() {
  return {
    audioSpeed: 'medium',   // 'slow' | 'medium' | 'native'
    showPinyin: true,
  };
}

// ====== SM-2 RÉPÉTITION ESPACÉE ======

/**
 * SM-2 algorithm (Anki-like)
 *
 * @param {string} wordId
 * @param {number} grade - 0=oublié, 1=difficile, 2=moyen, 3=facile, 4=parfait
 */
export function recordSrsReview(wordId, grade) {
  const p = loadProgress();
  const cards = p.vocabulary.srsCards;

  if (!cards[wordId]) {
    cards[wordId] = {
      ef: 2.5,         // Easiness Factor
      interval: 0,     // jours
      reps: 0,         // répétitions réussies consécutives
      nextReview: new Date().toISOString(),
      lastReview: null,
      history: [],
    };
  }

  const card = cards[wordId];

  // SM-2 algorithm
  if (grade >= 3) {
    // Correct
    if (card.reps === 0) {
      card.interval = 1;
    } else if (card.reps === 1) {
      card.interval = 6;
    } else {
      card.interval = Math.round(card.interval * card.ef);
    }
    card.reps++;
  } else {
    // Forgotten
    card.reps = 0;
    card.interval = 1;
  }

  // Update EF (Easiness Factor)
  const q = 5 - grade;
  card.ef = card.ef + (0.1 - q * (0.08 + q * 0.02));
  if (card.ef < 1.3) card.ef = 1.3;

  // Schedule next review
  const next = new Date();
  next.setDate(next.getDate() + card.interval);
  card.nextReview = next.toISOString();
  card.lastReview = new Date().toISOString();

  card.history.push({
    date: card.lastReview,
    grade,
    interval: card.interval,
  });

  // Track stats
  p.stats.totalAnswered++;
  if (grade >= 3) p.stats.totalCorrect++;

  // Known if interval >= 30
  if (card.interval >= 30 && !p.vocabulary.knownWords.includes(wordId)) {
    p.vocabulary.knownWords.push(wordId);
  }

  saveProgress(p);
  return card;
}

/**
 * Récupère les éléments à réviser aujourd'hui
 * @param {Array} items - [{ id, ... }, ...] (mots, phrases, etc.)
 * @param {string} type - 'vocabulary' | 'phrases' | 'grammar'
 */
export function getDueItems(items, type = 'vocabulary') {
  const p = loadProgress();
  const cards = p.vocabulary.srsCards;
  const now = new Date();

  return items.filter(item => {
    const id = item.id || item;
    const card = cards[id];
    if (!card) return true; // jamais révisé → dû
    if (p.vocabulary.knownWords.includes(id)) return false; // connu permanent
    return new Date(card.nextReview) <= now;
  });
}

/**
 * Statut de révision pour un élément
 */
export function getCardStatus(wordId) {
  const p = loadProgress();
  const card = p.vocabulary.srsCards[wordId];
  if (!card) return { status: 'new', interval: 0, ef: 2.5, reps: 0 };
  const known = p.vocabulary.knownWords.includes(wordId);
  return {
    status: known ? 'known' : 'learning',
    interval: card.interval,
    ef: card.ef,
    reps: card.reps,
    nextReview: card.nextReview,
    history: card.history,
  };
}

/**
 * Compte les révisions dues aujourd'hui
 */
export function countDue(items) {
  const due = getDueItems(items);
  return due.length;
}
