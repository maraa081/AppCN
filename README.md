# AppCN 🀄

Application web d'apprentissage du chinois mandarin, conçue pour les francophones connaissant déjà le japonais.

**Accès en ligne :** https://guaiguai2.duckdns.org/CN/

---

## Fonctionnalités

| Fonctionnalité | Statut |
|---|---|
| 4 modules (Phrases, Grammaire, Prononciation, Vocabulaire) | ✅ |
| +375 mots de vocabulaire avec audio | ✅ |
| Audio généré par **edge-tts** (voix naturelle) | ✅ |
| 3 vitesses audio : -40% / -20% / normale | ✅ |
| **SRS SM-2** (Spaced Repetition System) pour les flashcards | ✅ |
| Segmentation mot par mot dans les phrases | ✅ |
| Notes comparatives **japonais → chinois** (hanzi communs) | ✅ |
| Exercices de grammaire avec QCM | ✅ |
| Prononciation : pinyin + tons + reconnaissance auditive | ✅ |
| Progression sauvegardée automatiquement (localStorage) | ✅ |
| Fonctionne hors ligne (sauf synthèse vocale) | ✅ |
| LESSONS.md : 120 leçons détaillées | ✅ |
| Synthèse vocale navigateur (fallback Web Speech API) | ✅ |

## Modules

| Module | Description contenu |
|---|---|
| 💬 **Phrases** | Phrases thématiques avec traduction, pinyin, grammaire et segmentation mot à mot |
| 📐 **Grammaire** | Leçons structurées avec exercices QCM, comparaisons japonais |
| 🔊 **Prononciation** | Syllabes pinyin, tons, voyelles/consonnes, exercices d'écoute |
| 📚 **Vocabulaire** | ~375 mots avec flashcards SRS SM-2, notes comparatives, audio 3 vitesses |

## Déploiement

L'app est accessible en ligne via Caddy + DuckDNS :

```
https://guaiguai2.duckdns.org/CN/
  ↳ Caddy reverse proxy → localhost:5173/CN/
  ↳ Vite preview (build production)
```

### Lancer en local

```bash
# Dev
npm run dev

# Production
npm run build
npm run preview -- --host 0.0.0.0
```

### Script de démarrage

```bash
./start.sh              # Build + preview sur localhost:5173
./start.sh --host       # Build + preview accessible réseau local
./start.sh --host 8080  # Build + preview sur port personnalisé
```

### Sur le serveur

L'app tourne en continu via Vite preview, relancée par `start.sh`. Le Caddyfile sur Windows route `/CN/` vers `172.31.240.191:5173`.

## Audio

Deux systèmes audio co-existent :

1. **edge-tts** (principal) — généré avec [Microsoft Edge TTS](https://github.com/rany2/edge-tts), voix naturelle, stocké dans `dist/audio/`
   - 3 versions : normale, native, slow
   - Fichiers compressés (OPUS) pour chargement rapide

2. **Web Speech API** (fallback) — utilisé quand l'audio local n'est pas disponible, voix système

### Régénérer l'audio

```bash
pip install edge-tts
npm run generate-audio
```

## Contrôle audio

Chaque fichier audio dispose :
- 🎧 Bouton écouter (lecture unique)
- 🔁 Boucle (répétition continue)
- 🐢🐢🐢 Sélecteur de vitesse : -40% / -20% / normale (ralentissement natif via `playbackRate`)
- Segmentation mot par mot dans les phrases

## Structure du projet

```
AppCN/
├── src/
│   ├── main.jsx                    # Point d'entrée React
│   ├── App.jsx                     # Menu principal 4 modules
│   ├── App.css                     # Styles complets (dark glassmorphism)
│   ├── components/
│   │   ├── AudioButton.jsx         # Contrôle audio 3 vitesses + boucle
│   │   ├── ModuleHeader.jsx        # Entête module avec retour
│   │   ├── ProgressBar.jsx         # Progression localStorage
│   │   └── SharedComponents.jsx    # Composants réutilisables
│   ├── modules/
│   │   ├── Phrases/                # Module Phrases
│   │   ├── Grammar/                # Module Grammaire
│   │   ├── Pronunciation/          # Module Prononciation
│   │   └── Vocabulary/             # Module Vocabulaire (SRS)
│   └── utils/
│       ├── audio.js                # Gestionnaire audio edge-tts + Web Speech
│       ├── segmenter.js            # Segmentation mot par mot (Intl.Segmenter)
│       ├── storage.js              # Sauvegarde localStorage
│       └── tts.js                  # Synthèse vocale fallback
├── scripts/
│   └── generate-audio.py           # Script edge-tts
├── dist/
│   ├── assets/                     # Build JS/CSS
│   └── audio/                      # Fichiers audio générés
├── LESSONS.md                      # 120 leçons détaillées
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Ajouter du contenu

Chaque module a son fichier `data.js` :

- `src/modules/Phrases/data.js` → thèmes/leçons/phrases
- `src/modules/Grammar/data.js` → points grammaticaux/exercices
- `src/modules/Pronunciation/data.js` → syllabes/exercices
- `src/modules/Vocabulary/data.js` → mots, notes comparatives

Les données sont au format JS. La structure des mots de vocabulaire utilise un ID unique (`wid`) pour le mapping audio :

```js
{
  wid: 'v001',
  hanzi: '你好',
  pinyin: 'nǐ hǎo',
  meaning: 'Bonjour',
  jp_note: '你 (nǐ) = あなた, 好 (hǎo) = よい',
  // ...
}
```

## Pour les contributeurs

L'app utilise React 19 + Vite 8. Pas de routage externe, pas de store — tout est géré par useState et localStorage.

```bash
git clone https://github.com/maraa081/AppCN.git
cd AppCN
npm install
npm run dev
```

Puis ouvre http://localhost:5173/CN/ (ou via Caddy : https://guaiguai2.duckdns.org/CN/)

---

**Conçue pour Maraa** — connaît le japonais, apprend le chinois. Notes 🇯🇵 dans l'interface.
