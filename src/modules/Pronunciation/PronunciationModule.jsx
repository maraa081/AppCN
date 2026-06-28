import { useState } from 'react';
import ModuleHeader from '../../components/ModuleHeader';
import LevelSelector, { SyllableCard, ExerciseView, WordPair, LessonCard } from '../../components/SharedComponents';
import { loadProgress, recordAnswer } from '../../utils/storage';
import pronunciationData from './data';

export default function PronunciationModule({ onBack }) {
  const [level, setLevel] = useState('debutant');
  const [activeLesson, setActiveLesson] = useState(null);
  const [view, setView] = useState('lesson'); // lesson | practice
  const [currentExercise, setCurrentExercise] = useState(0);
  const progress = loadProgress();
  const levels = pronunciationData.levels;

  if (activeLesson) {
    if (view === 'practice') {
      const exercises = activeLesson.exercises || [];
      const pairs = activeLesson.pairs || [];
      const ex = exercises[currentExercise];

      if (!ex && currentExercise >= exercises.length) {
        return (
          <div className="module-view">
            <ModuleHeader title={activeLesson.title} onBack={() => { setActiveLesson(null); setCurrentExercise(0); }} />
            <div className="module-content">
              <div className="completion-message">
                <h3>🎯 Exercices terminés !</h3>
                <button className="btn-primary" onClick={() => { setActiveLesson(null); setCurrentExercise(0); }}>
                  ← Retour aux leçons
                </button>
              </div>
            </div>
          </div>
        );
      }

      if (exercises.length > 0) {
        return (
          <div className="module-view">
            <ModuleHeader
              title={activeLesson.title}
              subtitle={`Exercice ${currentExercise + 1}/${exercises.length}`}
              onBack={() => setView('lesson')}
            />
            <div className="module-content">
              <ExerciseView
                exercise={ex}
                onAnswer={(correct) => recordAnswer('pronunciation', ex.id, correct)}
                onNext={() => setCurrentExercise(prev => prev + 1)}
              />
            </div>
          </div>
        );
      }

      return (
        <div className="module-view">
          <ModuleHeader title={activeLesson.title} onBack={() => setActiveLesson(null)} />
          <div className="module-content">
            <h3>Paires minimales</h3>
            {pairs.map((pair, i) => (
              <WordPair key={i} pair={pair} />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="module-view">
        <ModuleHeader
          title={activeLesson.title}
          subtitle={activeLesson.grammarPoint}
          onBack={() => setActiveLesson(null)}
        />
        <div className="module-content">
          {activeLesson.grammarExplanation && (
            <div className="grammar-box">
              <p>{activeLesson.grammarExplanation}</p>
              {activeLesson.jpNote && (
                <div className="jp-note">
                  <span className="jp-tag">🇯🇵 Japonais</span>
                  <p>{activeLesson.jpNote}</p>
                </div>
              )}
            </div>
          )}

          {activeLesson.syllables && (
            <div className="syllables-grid">
              {activeLesson.syllables.map((s, i) => (
                <SyllableCard key={i} syllable={s} />
              ))}
            </div>
          )}

          {activeLesson.examples && (
            <div className="examples-section">
              <h3>📝 Exemples</h3>
              {activeLesson.examples.map((ex, i) => (
                <div key={i} className="example-item">
                  <span>{ex.chinese}</span>
                  <span className="example-pinyin">{ex.pinyin}</span>
                  <span className="example-french">{ex.french}</span>
                </div>
              ))}
            </div>
          )}

          {activeLesson.phrases && (
            <div className="examples-section">
              <h3>🎧 Phrases à écouter</h3>
              {activeLesson.phrases.map((p, i) => (
                <div key={i} className="example-item">
                  <span>{p.chinese}</span>
                  <span className="example-pinyin">{p.pinyin}</span>
                  <span className="example-french">{p.french}</span>
                </div>
              ))}
            </div>
          )}

          {activeLesson.exercises?.length > 0 && (
            <button className="btn-primary btn-start-ex" onClick={() => { setView('practice'); setCurrentExercise(0); }}>
              🎯 Exercices d'écoute ({activeLesson.exercises.length})
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="module-view">
      <ModuleHeader title={pronunciationData.title} onBack={onBack} />
      <div className="module-content">
        <LevelSelector levels={levels} currentLevel={level} onSelect={setLevel} />
        <div className="lessons-list">
          {levels[level].map(lesson => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              moduleId="pronunciation"
              level={level}
              completed={false}
              onStart={() => { setActiveLesson(lesson); setView('lesson'); }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
