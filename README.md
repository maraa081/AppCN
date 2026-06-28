# AppCN 🀄

Application web d'apprentissage du chinois mandarin, conçue pour les francophones connaissant déjà le japonais.

**Fonctionnalités :**
- 4 modules indépendants avec niveaux Débutant / Intermédiaire / Avancé
- Notes comparatives japonais → chinois (hanzi communs, différences grammaticales)
- Synthèse vocale (Web Speech API, zh-CN)
- Progression sauvegardée automatiquement (localStorage)
- Flashcards avec répétition espacée
- Fonctionne hors ligne (sauf la synthèse vocale qui nécessite le navigateur)

## Modules

| Module | Description |
|--------|-------------|
| 💬 **Phrases** | Phrases classées par thème avec traduction, pinyin et explications grammaticales |
| 📐 **Grammaire** | Leçons structurées avec exercices QCM et comparaisons japonais |
| 🔊 **Prononciation** | Syllabes pinyin, tons et exercices de reconnaissance auditive |
| 📚 **Vocabulaire** | 87 mots avec flashcards, notes comparatives et répétition espacée |

## Prérequis

- **Node.js 18+** (testé avec Node 22)
- **npm** (inclus avec Node.js)
- Un navigateur moderne (Chrome, Firefox, Edge)

## Installation et lancement

```bash
# 1. Cloner le dépôt
git clone https://github.com/maraa081/AppCN.git
cd AppCN

# 2. Installer les dépendances
npm install

# 3. Lancer en développement
npm run dev
```

Ouvre ensuite l'URL affichée (généralement http://localhost:5173).

### Mode production

```bash
npm run build
npm run preview
```

## Structure du projet

```
AppCN/
├── src/
│   ├── main.jsx              # Point d'entrée React
│   ├── App.jsx               # Composant principal + menu
│   ├── App.css               # Styles complets
│   ├── components/
│   │   ├── AudioButton.jsx   # Bouton de synthèse vocale
│   │   ├── ModuleHeader.jsx  # Entête de module
│   │   ├── ProgressBar.jsx   # Barre de progression
│   │   └── SharedComponents.jsx  # Composants réutilisables
│   ├── modules/
│   │   ├── Phrases/          # Module Phrases
│   │   ├── Grammar/          # Module Grammaire
│   │   ├── Pronunciation/    # Module Prononciation
│   │   └── Vocabulary/       # Module Vocabulaire
│   ├── hooks/                # (réservé)
│   └── utils/
│       ├── tts.js            # Synthèse vocale (Web Speech API)
│       └── storage.js        # Sauvegarde locale (localStorage)
├── public/
│   └── favicon.svg           # Icône 🀄
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Ajouter du contenu

Chaque module a son fichier `data.js` :

- `src/modules/Phrases/data.js` → ajoute des thèmes/leçons/phrases
- `src/modules/Grammar/data.js` → ajoute des points grammaticaux/exercices
- `src/modules/Pronunciation/data.js` → ajoute des syllabes/exercices d'écoute
- `src/modules/Vocabulary/data.js` → ajoute des mots au vocabulaire

Les données sont au format JavaScript (objets/tableaux). Ajoute librement tes propres leçons en suivant la structure existante.

## Notes sur la synthèse vocale

L'application utilise **Web Speech API** (`speechSynthesis`), native dans tous les navigateurs modernes.

- La voix chinoise dépend du système d'exploitation et du navigateur
- Sous Windows : les voix chinoises sont incluses (paramètres régionaux)
- Sous macOS : voix Ting-Ting (中国普通话) disponible
- Linux : peut nécessiter l'installation de voix (ex: `espeak-ng` avec `mbrola`)

> L'application reste fonctionnelle sans audio : les pinyin et traductions sont toujours affichés.

## Pour qui ?

Conçue pour **Maraa** — connaît le japonais, apprend le chinois. Les notes 🇯🇵 dans l'interface mettent en avant les similitudes et différences entre les deux langues.

## Licence

Projet personnel — MIT
