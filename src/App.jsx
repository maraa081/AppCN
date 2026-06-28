import { useState } from 'react';
import './App.css';
import PhrasesModule from './modules/Phrases/PhrasesModule';
import GrammarModule from './modules/Grammar/GrammarModule';
import PronunciationModule from './modules/Pronunciation/PronunciationModule';
import VocabularyModule from './modules/Vocabulary/VocabularyModule';

const MODULES = [
  {
    id: 'phrases',
    title: 'Phrases',
    subtitle: 'Grammaire en contexte',
    desc: 'Phrases classées par thème avec traduction, pinyin et explications grammaticales.',
    component: PhrasesModule,
  },
  {
    id: 'grammar',
    title: 'Grammaire',
    subtitle: 'Leçons structurées',
    desc: 'Points grammaticaux expliqués, comparaisons japonais et exercices.',
    component: GrammarModule,
  },
  {
    id: 'pronunciation',
    title: 'Prononciation',
    subtitle: 'Écoute & tons',
    desc: 'Syllabes pinyin, tons, exercices de reconnaissance auditive.',
    component: PronunciationModule,
  },
  {
    id: 'vocabulary',
    title: 'Vocabulaire',
    subtitle: 'Flashcards & répétition',
    desc: 'Listes thématiques, notes comparatives et répétition espacée.',
    component: VocabularyModule,
  },
];

export default function App() {
  const [activeModule, setActiveModule] = useState(null);

  const handleBack = () => setActiveModule(null);

  if (activeModule) {
    const mod = MODULES.find(m => m.id === activeModule);
    if (mod) {
      const Component = mod.component;
      return <Component onBack={handleBack} />;
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>AppCN</h1>
          <p className="app-subtitle">Apprentissage du chinois mandarin</p>
          <p className="app-tip">
            Tu connais le japonais ? Les notes <span className="jp-tag">Japonais</span> t'aident à faire le lien.
          </p>
        </div>
      </header>

      <main className="main-menu">
        {MODULES.map(mod => (
          <button
            key={mod.id}
            className="module-card"
            onClick={() => setActiveModule(mod.id)}
          >
            <div className="module-info">
              <h2>{mod.title}</h2>
              <span className="module-subtitle">{mod.subtitle}</span>
              <p className="module-desc">{mod.desc}</p>
            </div>
            <span className="card-arrow">→</span>
          </button>
        ))}
      </main>

      <footer className="app-footer">
        <p>AppCN — Les données de démarrage sont incluses. Ajoute ton contenu dans <code>src/modules/*/data.js</code></p>
      </footer>
    </div>
  );
}
