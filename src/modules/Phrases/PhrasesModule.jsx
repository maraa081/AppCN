import { useState } from 'react';
import ModuleHeader from '../../components/ModuleHeader';
import LevelSelector, { LessonCard, PhraseList } from '../../components/SharedComponents';
import { loadProgress, completeLesson } from '../../utils/storage';
import phrasesData from './data';

export default function PhrasesModule({ onBack }) {
  const [level, setLevel] = useState('debutant');
  const [activeLesson, setActiveLesson] = useState(null);
  const [showPinyin, setShowPinyin] = useState(true);
  const [completedLessons, setCompletedLessons] = useState(() => {
    const p = loadProgress();
    const completed = {};
    Object.keys(p.phrases || {}).forEach(lvl => {
      Object.keys(p.phrases[lvl] || {}).forEach(lid => {
        if (p.phrases[lvl][lid]?.completed) completed[lid] = true;
      });
    });
    return completed;
  });

  const levels = phrasesData.levels;

  const isCompleted = (lessonId) => {
    return completedLessons[lessonId] || false;
  };

  const handleCompleteLesson = () => {
    if (activeLesson) {
      completeLesson('phrases', level, activeLesson.id);
      setCompletedLessons(prev => ({ ...prev, [activeLesson.id]: true }));
    }
  };

  if (activeLesson) {
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
              <h3>📖 Point grammatical : {activeLesson.grammarPoint}</h3>
              <p>{activeLesson.grammarExplanation}</p>
              {activeLesson.jpNote && (
                <div className="jp-note">
                  <span className="jp-tag">🇯🇵 Japonais</span>
                  <p>{activeLesson.jpNote}</p>
                </div>
              )}
            </div>
          )}
          <div className="examples-section">
            <h3>📝 Phrases</h3>
            <PhraseList
              phrases={activeLesson.phrases}
              showPinyin={showPinyin}
              onTogglePinyin={() => setShowPinyin(!showPinyin)}
              onComplete={handleCompleteLesson}
              isCompleted={isCompleted(activeLesson.id)}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="module-view">
      <ModuleHeader title={phrasesData.title} onBack={onBack} />
      <div className="module-content">
        <LevelSelector levels={levels} currentLevel={level} onSelect={setLevel} />
        <div className="lessons-list">
          {levels[level].map(lesson => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              moduleId="phrases"
              level={level}
              completed={isCompleted(lesson.id)}
              onStart={() => setActiveLesson(lesson)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
