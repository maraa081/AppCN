# AppCN 🀄

Application web d'apprentissage du chinois mandarin, conçue pour les francophones connaissant déjà le japonais.

**Accès en ligne :** https://guaiguai2.duckdns.org/CN/

---

## Fonctionnalités

| Fonctionnalité | Statut |
|---|---|
| 4 modules (Phrases, Grammaire, Prononciation, Vocabulaire) | ✅ |
| **375 mots** de vocabulaire avec audio | ✅ |
| Audio **edge-tts** (voix neuronale Microsoft, MP3 pré-générés) | ✅ |
| 3 vitesses audio : -40% / -20% / normale | ✅ |
| **SRS SM-2** (Spaced Repetition System) pour les flashcards | ✅ |
| Segmentation mot par mot dans les phrases | ✅ |
| Notes comparatives **japonais → chinois** (hanzi communs) | ✅ |
| Exercices de grammaire avec QCM | ✅ |
| Prononciation : pinyin + tons + reconnaissance auditive | ✅ |
| Progression sauvegardée automatiquement (localStorage) | ✅ |
| **Fonctionne hors ligne** (audio + contenu en local) | ✅ |
| LESSONS.md : 120 leçons détaillées | ✅ |

## Modules

| Module | Description contenu |
|---|---|
| 💬 **Phrases** | Phrases thématiques avec traduction, pinyin, grammaire et segmentation mot à mot |
| 📐 **Grammaire** | Leçons structurées avec exercices QCM, comparaisons japonais |
| 🔊 **Prononciation** | Syllabes pinyin, tons, voyelles/consonnes, exercices d'écoute |
| 📚 **Vocabulaire** | 375 mots avec flashcards SRS SM-2, notes comparatives, audio 3 vitesses, 19 thèmes |

## Prérequis

- **Node.js 18+** (testé avec Node 22)
- **npm** (inclus avec Node.js)
- **Python 3** (pour la génération audio edge-tts)
- **edge-tts** : `pip install edge-tts` (pour régénérer l'audio)
- Un navigateur moderne (Chrome, Firefox, Edge)

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

L'audio est généré hors-ligne avec **edge-tts** (voix neuronale Microsoft), puis stocké en fichiers MP3/OPUS dans le projet. **Aucune connexion ni API externe nécessaire au runtime** — tout est lu depuis les fichiers locaux.

- ~1696 fichiers audio (mots, phrases, paires, versions natives et ralenties)
- 3 taux de lecture : normale / -20% / -40% (pré-générés, pas de pitch artefact)

### Régénérer l'audio

```bash
pip install edge-tts
npm run generate-audio      # utilise scripts/generate-audio.py
# ou directement :
node scripts/generate-audio.mjs
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
│       ├── audio.js                # Lecteur MP3 pré-générés + lookup manifest
│       ├── segmenter.js            # Segmentation mot par mot (Intl.Segmenter)
│       ├── storage.js              # Sauvegarde localStorage (progression + SRS)
│       └── tts.js                  # Synthèse vocale fallback (Web Speech API)
├── scripts/
│   ├── generate-audio.py           # Script edge-tts (voix Microsoft neuronale)
│   └── generate-audio.mjs          # Version Node.js du générateur audio
├── public/
│   ├── audio/                      # ~1696 fichiers MP3/OPUS pré-générés
│   └── favicon.svg                 # Icône 🀄
├── dist/
│   ├── assets/                     # Build JS/CSS (production)
│   └── audio/                      # Copie des fichiers audio pour le déploiement
├── LESSONS.md                      # 120 leçons détaillées
├── index.html
├── start.sh                        # Script de build + lancement
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

Les données sont au format JS. Les mots de vocabulaire utilisent ce format :

```js
{
  id: 'saluer-1',
  hanzi: '你好',
  pinyin: 'nǐ hǎo',
  french: 'Bonjour',
  theme: 'salutations',
  level: 'debutant',
  jpKanji: '你好',
  jpNote: '你 = あなた, 好 = よい',
  example: '你好，我叫…'
}
```

## Génération audio pour le nouveau contenu

Après avoir ajouté des mots ou des phrases :

```bash
npm run generate-audio
```

Cela génère les fichiers MP3 pour tout le contenu manquant via edge-tts et met à jour `public/audio/manifest.json`.

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
