import { useState, useMemo } from 'react';
import ModuleHeader from '../../components/ModuleHeader';
import AudioButton from '../../components/AudioButton';
import { VocabCard, StatsDisplay } from '../../components/SharedComponents';
import { loadProgress, getDueWords, recordReview } from '../../utils/storage';
import vocabularyData from './data';

export default function VocabularyModule({ onBack }) {
  const [showPinyin, setShowPinyin] = useState(true);
  const [showJpNote, setShowJpNote] = useState(true);
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterTheme, setFilterTheme] = useState('all');
  const [view, setView] = useState('browse');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardReveal, setFlashcardReveal] = useState(false);
  const [flashcardMode, setFlashcardMode] = useState('due');

  const progress = loadProgress();
  const allWords = vocabularyData.words;
  const themes = vocabularyData.themes;

  const filteredWords = useMemo(() => {
    return allWords.filter(w => {
      if (filterLevel !== 'all' && w.level !== filterLevel) return false;
      if (filterTheme !== 'all' && w.theme !== filterTheme) return false;
      return true;
    });
  }, [filterLevel, filterTheme]);

  const dueWords = useMemo(() => getDueWords(allWords), [progress]);

  const flashcardWords = useMemo(() => {
    const words = flashcardMode === 'due' ? dueWords : filteredWords;
    return words.filter(w => !progress.vocabulary.knownWords.includes(w.id));
  }, [flashcardMode, dueWords, filteredWords, progress]);

  const currentFlashcard = flashcardWords[flashcardIndex];

  const handleFlashcardAnswer = (success) => {
    if (currentFlashcard) {
      recordReview(currentFlashcard.id, success);
    }
    setFlashcardReveal(false);
    setFlashcardIndex(prev => prev + 1);
  };

  const startFlashcards = (mode) => {
    setFlashcardMode(mode);
    setFlashcardIndex(0);
    setFlashcardReveal(false);
    setView('flashcards');
  };

  const knownCount = progress.vocabulary.knownWords.length;
  const stats = progress.stats;

  if (view === 'flashcards') {
    if (!currentFlashcard) {
      return (
        <div className="module-view">
          <ModuleHeader title="Flashcards" onBack={() => setView('browse')} />
          <div className="module-content">
            <div className="completion-message">
              <h3>🎉 Toutes les cartes révisées !</h3>
              <p>Plus de mots à réviser pour l'instant.</p>
              <button className="btn-primary" onClick={() => setView('browse')}>
                ← Retour
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="module-view">
        <ModuleHeader
          title="Flashcards"
          subtitle={`${flashcardIndex + 1}/${flashcardWords.length}`}
          onBack={() => setView('browse')}
        />
        <div className="module-content">
          <div className={`flashcard ${flashcardReveal ? 'revealed' : ''}`}>
            <div className="flashcard-front" onClick={() => setFlashcardReveal(true)}>
              <span className="flashcard-char">{currentFlashcard.hanzi}</span>
              {showPinyin && flashcardReveal && (
                <span className="flashcard-pinyin">{currentFlashcard.pinyin}</span>
              )}
            </div>
            {flashcardReveal && (
              <div className="flashcard-back">
                <div className="flashcard-french">{currentFlashcard.french}</div>
                <AudioButton text={currentFlashcard.hanzi} size="large" />
                {currentFlashcard.jpKanji && (
                  <div className="jp-note">
                    <span className="jp-tag">🇯🇵</span>
                    <p>{currentFlashcard.jpNote}</p>
                  </div>
                )}
                <div className="flashcard-actions">
                  <button className="btn-secondary btn-wrong" onClick={() => handleFlashcardAnswer(false)}>
                    ❌ Pas retenu
                  </button>
                  <button className="btn-primary btn-correct" onClick={() => handleFlashcardAnswer(true)}>
                    ✅ Retenu
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="module-view">
      <ModuleHeader title={vocabularyData.title} onBack={onBack} />
      <div className="module-content">
        <StatsDisplay stats={stats} />

        <div className="vocab-controls">
          <div className="filter-row">
            <select value={filterLevel} onChange={e => setFilterLevel(e.target.value)}>
              <option value="all">Tous niveaux</option>
              <option value="debutant">Débutant</option>
              <option value="intermediaire">Intermédiaire</option>
              <option value="avance">Avancé</option>
            </select>
            <select value={filterTheme} onChange={e => setFilterTheme(e.target.value)}>
              <option value="all">Tous thèmes</option>
              {Object.entries(themes).map(([key, t]) => (
                <option key={key} value={key}>{t.icon} {t.name}</option>
              ))}
            </select>
          </div>
          <label className="toggle-label">
            <input type="checkbox" checked={showPinyin} onChange={() => setShowPinyin(!showPinyin)} />
            Pinyin
          </label>
          <label className="toggle-label">
            <input type="checkbox" checked={showJpNote} onChange={() => setShowJpNote(!showJpNote)} />
            Notes japonais
          </label>
        </div>

        <div className="flashcard-launch">
          <button className="btn-primary" onClick={() => startFlashcards('due')}>
            📚 Réviser ({dueWords.length} mots à réviser)
          </button>
          <button className="btn-secondary" onClick={() => startFlashcards('all')}>
            🔄 Tout réviser
          </button>
        </div>

        <div className="vocab-stats-mini">
          <span>📖 {knownCount} mots connus</span>
          <span>📝 {allWords.length} mots disponibles</span>
        </div>

        <div className="vocab-grid">
          {filteredWords.map(word => (
            <VocabCard
              key={word.id}
              word={word}
              showPinyin={showPinyin}
              showJpNote={showJpNote}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
