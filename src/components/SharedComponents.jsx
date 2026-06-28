import { useState, useEffect } from 'react';
import AudioButton from './AudioButton';
import { loadDictionary, segmentText } from '../utils/segmenter';

export default function LevelSelector({ levels, currentLevel, onSelect }) {
  const levelKeys = Object.keys(levels);
  const labels = { debutant: 'Débutant', intermediaire: 'Intermédiaire', avance: 'Avancé' };

  return (
    <div className="level-selector">
      <h3>Niveau</h3>
      <div className="level-buttons">
        {levelKeys.map(key => (
          <button
            key={key}
            className={`level-btn ${currentLevel === key ? 'active' : ''}`}
            onClick={() => onSelect(key)}
          >
            {labels[key] || key}
            <span className="lesson-count">{levels[key].length} leçons</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function LessonCard({ lesson, moduleId, level, completed, onStart }) {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className={`lesson-card ${completed ? 'completed' : ''}`}>
      <div className="lesson-header" onClick={() => setShowExplanation(!showExplanation)}>
        <h4>{lesson.title}</h4>
        <span className="grammar-point-tag">{lesson.grammarPoint}</span>
        {completed && <span className="badge-done">✓</span>}
      </div>
      {showExplanation && (
        <div className="lesson-explanation">
          <p>{lesson.grammarExplanation}</p>
          {lesson.jpNote && (
            <div className="jp-note">
              <span className="jp-tag">🇯🇵 Japonais</span>
              <p>{lesson.jpNote}</p>
            </div>
          )}
        </div>
      )}
      <div className="lesson-actions">
        <button className="btn-primary" onClick={onStart}>
          {completed ? '📖 Réviser' : '▶ Commencer'}
        </button>
      </div>
    </div>
  );
}

function SegmentedText({ text }) {
  const [activeWord, setActiveWord] = useState(null);
  const [segments, setSegments] = useState(() => segmentText(text));

  // Ré-segmente si le dictionnaire change
  useEffect(() => {
    setSegments(segmentText(text));
  }, [text]);

  return (
    <span className="segmented-text">
      {segments.map((seg, i) => (
        <span
          key={i}
          className={`word-segment ${seg.isVocab ? 'has-audio' : ''} ${activeWord === i ? 'active' : ''}`}
          onClick={() => setActiveWord(activeWord === i ? null : i)}
          title={seg.isVocab ? seg.pinyin || '' : ''}
        >
          {seg.hanzi}
          {activeWord === i && seg.isVocab && (
            <span className="word-popup" onClick={e => e.stopPropagation()}>
              <span className="word-pinyin">{seg.pinyin}</span>
              <AudioButton
                text={seg.hanzi}
                type="vocab"
                size="small"
                showSlow
              />
            </span>
          )}
        </span>
      ))}
    </span>
  );
}

export function PhraseList({ phrases, showPinyin, onTogglePinyin, onComplete, isCompleted, vocabWords }) {
  const [showFrench, setShowFrench] = useState(false);

  // Charger le dictionnaire pour la segmentation
  useEffect(() => {
    if (vocabWords) {
      loadDictionary(vocabWords);
    }
  }, [vocabWords]);

  return (
    <div className="phrase-list">
      <div className="phrase-controls">
        <label className="toggle-label">
          <input type="checkbox" checked={showPinyin} onChange={onTogglePinyin} />
          Pinyin
        </label>
        <label className="toggle-label">
          <input type="checkbox" checked={showFrench} onChange={() => setShowFrench(!showFrench)} />
          Traduction
        </label>
      </div>
      {phrases.map((phrase, idx) => (
        <div key={idx} className="phrase-card">
          <div className="phrase-content">
            <div className="phrase-hanzi">
              <SegmentedText text={phrase.chinese} />
              <AudioButton text={phrase.chinese} showSlow />
            </div>
            {showPinyin && (
              <div className="phrase-pinyin">{phrase.pinyin}</div>
            )}
            {showFrench && (
              <div className="phrase-french">{phrase.french}</div>
            )}
          </div>
        </div>
      ))}
      {onComplete && (
        <button className="btn-primary btn-complete" onClick={onComplete}>
          {isCompleted ? '✅ Déjà terminée' : '✅ Leçon terminée'}
        </button>
      )}
    </div>
  );
}

export function ExampleList({ examples }) {
  const [showPinyin, setShowPinyin] = useState(true);

  return (
    <div className="example-list">
      <label className="toggle-label">
        <input type="checkbox" checked={showPinyin} onChange={() => setShowPinyin(!showPinyin)} />
        Pinyin
      </label>
      {examples.map((ex, i) => (
        <div key={i} className="example-item">
          <div className="phrase-hanzi">
            <span>{ex.chinese}</span>
            <AudioButton text={ex.chinese} showSlow />
          </div>
          {showPinyin && <div className="phrase-pinyin">{ex.pinyin}</div>}
          <div className="phrase-french">{ex.french}</div>
        </div>
      ))}
    </div>
  );
}

export function ExerciseView({ exercise, onAnswer, feedback, onNext }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState('');

  const isCorrect = () => {
    if (exercise.type === 'fill' || exercise.type === 'listen_dictation') {
      const typed = typedAnswer.trim();
      if (typed === exercise.answer) return true;
      if (exercise.altAnswers && exercise.altAnswers.some(a => typed.includes(a) || a.includes(typed))) return true;
      return false;
    }
    return selected === exercise.correctIndex;
  };

  const handleSubmit = () => {
    if (answered) return;
    const correct = isCorrect();
    setAnswered(true);
    onAnswer(correct);
  };

  const handleNext = () => {
    setSelected(null);
    setAnswered(false);
    setTypedAnswer('');
    onNext();
  };

  const hasAudio = exercise.listenText || exercise.listenTexts || exercise.type.startsWith('listen_');

  return (
    <div className={`exercise-card ${answered ? (isCorrect() ? 'correct' : 'wrong') : ''}`}>
      <div className="exercise-header">
        {hasAudio && (
          <div className="exercise-listen">
            {exercise.listenTexts ? (
              // Multiple audio clips (pour choose_tone_triplet)
              exercise.listenTexts.map((t, i) => (
                <span key={i} className="multiaudio-item">
                  <AudioButton text={t} size="large" showSlow />
                  <span className="multiaudio-label">#{i + 1}</span>
                </span>
              ))
            ) : (
              <AudioButton text={exercise.listenText} size="large" showSlow />
            )}
            <span className="listen-hint">Écouter{exercise.listenTexts ? ' chaque syllabe' : ''}</span>
          </div>
        )}
        <p className="exercise-question">{exercise.instruction || exercise.question}</p>
      </div>

      {(exercise.type === 'fill' || exercise.type === 'listen_dictation') ? (
        <div className="exercise-fill">
          <input
            type="text"
            value={typedAnswer}
            onChange={e => setTypedAnswer(e.target.value)}
            placeholder={exercise.type === 'listen_dictation' ? 'Tape le pinyin (ex: ma3, ni3 hao3)...' : 'Tape ta réponse...'}
            disabled={answered}
            className="fill-input"
            autoFocus
          />
        </div>
      ) : (
        <div className="exercise-options">
          {exercise.options.map((opt, i) => (
            <button
              key={i}
              className={`option-btn ${selected === i ? 'selected' : ''} ${answered ? (i === exercise.correctIndex ? 'correct' : (selected === i ? 'wrong' : '')) : ''}`}
              onClick={() => !answered && setSelected(i)}
              disabled={answered}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      <div className="exercise-actions">
        {!answered ? (
          <button className="btn-primary" onClick={handleSubmit} 
            disabled={(exercise.type === 'fill' || exercise.type === 'listen_dictation') ? !typedAnswer : selected === null}>
            ✓ Vérifier
          </button>
        ) : (
          <>
            <div className={`feedback ${isCorrect() ? 'correct' : 'wrong'}`}>
              {isCorrect() ? '✅ Correct !' : '❌ Pas tout à fait...'}
              {exercise.explanation && <p className="explanation">{exercise.explanation}</p>}
            </div>
            <button className="btn-secondary" onClick={handleNext}>
              Suivant →
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function SyllableCard({ syllable }) {
  return (
    <div className="syllable-card">
      <div className="syllable-pinyin">{syllable.pinyin}</div>
      <AudioButton text={syllable.pinyin} size="large" showSlow />
      <div className="syllable-desc">{syllable.description}</div>
      {syllable.example && (
        <div className="syllable-example">{syllable.example}</div>
      )}
    </div>
  );
}

export function VocabCard({ word, showPinyin, showJpNote }) {
  return (
    <div className="vocab-card">
      <div className="vocab-hanzi">
        <span className="vocab-char">{word.hanzi}</span>
        <AudioButton text={word.hanzi} showSlow />
      </div>
      {showPinyin && <div className="vocab-pinyin">{word.pinyin}</div>}
      <div className="vocab-french">{word.french}</div>
      {word.jpKanji && showJpNote && (
        <div className="jp-note">
          <span className="jp-tag">🇯🇵</span>
          <p>{word.jpNote}</p>
        </div>
      )}
      <div className="vocab-meta">
        <span className={`theme-tag ${word.theme}`}>{word.theme}</span>
        <span className={`level-tag ${word.level}`}>{word.level}</span>
      </div>
    </div>
  );
}

export function StatsDisplay({ stats }) {
  if (!stats) return null;
  const rate = stats.totalAnswered > 0
    ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
    : 0;

  return (
    <div className="stats-display">
      <h3>📊 Statistiques</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-value">{stats.totalAnswered}</span>
          <span className="stat-label">Exercices faits</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{rate}%</span>
          <span className="stat-label">Taux de réussite</span>
        </div>
      </div>
    </div>
  );
}

export function WordPair({ pair }) {
  return (
    <div className="word-pair">
      <div className="pair-side">
        <span className="pair-char">{pair.a.chinese}</span>
        <span className="pair-pinyin">{pair.a.pinyin}</span>
        <span className="pair-french">{pair.a.french}</span>
        <AudioButton text={pair.a.pinyin} showSlow />
      </div>
      <div className="pair-vs">vs</div>
      <div className="pair-side">
        <span className="pair-char">{pair.b.chinese}</span>
        <span className="pair-pinyin">{pair.b.pinyin}</span>
        <span className="pair-french">{pair.b.french}</span>
        <AudioButton text={pair.b.pinyin} showSlow />
      </div>
    </div>
  );
}
