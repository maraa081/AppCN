import { useState } from 'react';
import ModuleHeader from '../../components/ModuleHeader';
import LevelSelector, { LessonCard, PhraseList } from '../../components/SharedComponents';
import { loadProgress, completeLesson } from '../../utils/storage';
import phrasesData from './data';

export default function PhrasesModule({ onBack }) {
  const [level, setLevel] = useState('debutant');
  const [activeLesson, setActiveLesson] = useState(null);
  const [showPinyin, setShowPinyin] = useState(true);
  const progress = loadProgress();
  const levels = phrasesData.levels;

  const isCompleted = (lessonId) => {
    return progress.phrases?.[level]?.[lessonId]?.completed || false;
  };

  const handleCompleteLesson = () => {
    if (activeLesson) {
      completeLesson('phrases', level, activeLesson.id);
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
              <p>{activeLesson.grammarExplanation}</p>
              {activeLesson.jpNote && (
                <div className="jp-note">
                  <span className="jp-tag">🇯🇵 Japonais</span>
                  <p>{activeLesson.jpNote}</p>
                </div>
              )}
            </div>
          )}
          <PhraseList
            phrases={activeLesson.phrases}
            showPinyin={showPinyin}
            onTogglePinyin={() => setShowPinyin(!showPinyin)}
            onComplete={handleCompleteLesson}
          />
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
