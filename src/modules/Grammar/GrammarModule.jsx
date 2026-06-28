import { useState } from 'react';
import ModuleHeader from '../../components/ModuleHeader';
import LevelSelector, { LessonCard, ExampleList, ExerciseView } from '../../components/SharedComponents';
import { loadProgress, completeLesson, recordAnswer } from '../../utils/storage';
import grammarData from './data';

export default function GrammarModule({ onBack }) {
  const [level, setLevel] = useState('debutant');
  const [activeLesson, setActiveLesson] = useState(null);
  const [view, setView] = useState('lesson'); // lesson | exercises
  const [currentExercise, setCurrentExercise] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const progress = loadProgress();
  const levels = grammarData.levels;

  const isCompleted = (lessonId) => {
    return progress.grammar?.[level]?.[lessonId]?.completed || false;
  };

  if (activeLesson) {
    if (view === 'exercises') {
      const ex = activeLesson.exercises[currentExercise];
      if (!ex) {
        return (
          <div className="module-view">
            <ModuleHeader title={activeLesson.title} onBack={() => { setActiveLesson(null); setCurrentExercise(0); }} />
            <div className="module-content">
              <div className="completion-message">
                <h3>🎉 Exercices terminés !</h3>
                <button className="btn-primary" onClick={() => { completeLesson('grammar', level, activeLesson.id); setActiveLesson(null); setCurrentExercise(0); }}>
                  ✅ Marquer comme terminé
                </button>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className="module-view">
          <ModuleHeader
            title={activeLesson.title}
            subtitle={`Exercice ${currentExercise + 1}/${activeLesson.exercises.length}`}
            onBack={() => { setView('lesson'); }}
          />
          <div className="module-content">
            <ExerciseView
              exercise={ex}
              onAnswer={(correct) => recordAnswer('grammar', ex.id, correct)}
              feedback={feedback}
              onNext={() => setCurrentExercise(prev => prev + 1)}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="module-view">
        <ModuleHeader title={activeLesson.title} subtitle={activeLesson.grammarPoint} onBack={() => setActiveLesson(null)} />
        <div className="module-content">
          <div className="grammar-box">
            <h3>📖 Explication</h3>
            <p>{activeLesson.explanation}</p>
            {activeLesson.jpNote && (
              <div className="jp-note">
                <span className="jp-tag">🇯🇵 Japonais</span>
                <p>{activeLesson.jpNote}</p>
              </div>
            )}
          </div>
          <div className="examples-section">
            <h3>📝 Exemples</h3>
            <ExampleList examples={activeLesson.examples} />
          </div>
          {activeLesson.exercises?.length > 0 && (
            <button className="btn-primary btn-start-ex" onClick={() => { setView('exercises'); setCurrentExercise(0); }}>
              🎯 Commencer les exercices ({activeLesson.exercises.length})
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="module-view">
      <ModuleHeader title={grammarData.title} onBack={onBack} />
      <div className="module-content">
        <LevelSelector levels={levels} currentLevel={level} onSelect={setLevel} />
        <div className="lessons-list">
          {levels[level].map(lesson => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              moduleId="grammar"
              level={level}
              completed={isCompleted(lesson.id)}
              onStart={() => { setActiveLesson(lesson); setView('lesson'); }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
