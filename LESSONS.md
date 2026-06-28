# LESSONS.md — Registre des erreurs et conventions du projet AppCN

> À relire avant toute nouvelle tâche sur ce projet.

## Conventions de structure

### Nommage des fichiers audio

| Type | Format | Exemple | Source |
|------|--------|---------|--------|
| Vocabulaire | `w{id}.mp3` | `w89.mp3` (晚安) | `id: 'w89'` dans data.js |
| Phrases | `p{idx}.mp3` | `p1.mp3` (你好) | Index dans l'ordre du fichier data.js |
| Syllabes | `{pinyin}.mp3` | `mā.mp3` | Texte exact du pinyin |
| Paires | `pair_{idx}.mp3` | `pair_0.mp3` | Index dans l'ordre du script |
| Extra | `e{idx}.mp3` | `e1.mp3` | Index dans l'ordre du script |
| Version lente | `{base}_slow.mp3` | `w89_slow.mp3` | Même nom + `_slow` |

**Règle :** Les IDs audio doivent **toujours** être extraits directement des fichiers `data.js` par le script Python, jamais basés sur l'index d'un tableau dans le script lui-même.

### Générateur audio (scripts/generate-audio.py)

- Lit dynamiquement les mots et phrases depuis les fichiers `data.js` via regex
- Utilise `--force` pour régénérer tout, ou laisse le cache intact pour les incréments
- Génère 2 vitesses par fichier : normale (+0%) et lente (-30%)
- Produit un `manifest.json` mappant texte → chemin audio

## Erreurs identifiées et corrigées

### 1. Audio pipeline : index vs ID

**Symptôme :** En cliquant sur 🔊 pour 晚安, l'audio jouait "爸爸". 

**Cause :** Le script Python utilisait `enumerate(VOCAB)` pour générer les noms de fichiers `w1.mp3`, `w2.mp3`… L'ordre physique des mots dans `data.js` avait changé après une réorganisation par thèmes, mais les IDs (w10, w89…) restaient en place. Le fichier `w89.mp3` contenait l'audio du 89e mot dans l'ancien fichier, pas du mot ayant l'ID w89.

**Règle :** Ne jamais utiliser l'index d'un tableau pour nommer des fichiers quand les données ont des IDs explicites. Toujours extraire les paires `(id, contenu)` depuis la source et utiliser l'ID comme nom de fichier.

**Appliqué à :** vocabulaire (extraction par `id:` + `hanzi:`) et phrases (extraction par `chinese:` dans l'ordre du fichier).

### 2. Mots de vocabulaire perdus lors de la réorganisation

**Symptôme :** 水, 茶, 咖啡, 书, 电话, 电脑, 手表 (ex-w28-w35) ont disparu de l'interface.

**Cause :** En réécrivant `data.js` pour ajouter de nouveaux mots, ces entrées ont été omises par erreur.

**Règle :** Quand on réorganise un fichier de données volumineux, vérifier qu'aucune entrée existante n'a été supprimée. Faire une comparaison `avant/après` des IDs.

### 3. Import manquant dans SharedComponents.jsx

**Symptôme :** Les modules affichaient un écran vide (fond bleu foncé) au clic.

**Cause :** `AudioButton` était utilisé dans plusieurs composants partagés (`PhraseList`, `ExerciseView`, `VocabCard`, etc.) mais n'était pas importé en haut du fichier.

**Règle :** Vérifier que tous les composants utilisés dans un fichier JSX sont importés. Un composant défini dans un fichier séparé doit toujours être importé.

### 4. TTS Web Speech API : voix non chargées

**Symptôme :** L'audio ne fonctionnait pas dans Chrome.

**Cause :** Chrome charge les voix de manière asynchrone. `speechSynthesis.getVoices()` retourne un tableau vide au premier appel si `voiceschanged` ne s'est pas encore déclenché.

**Règle :** Attendre l'événement `voiceschanged` (avec un timeout de sécurité) avant de sélectionner une voix.

**Résolu par :** Remplacement complet par edge-tts (prégénération MP3 côté serveur, plus de Web Speech API).

### 5. URL de base /CN/

**Symptôme :** L'application ne trouvait pas ses assets quand servie via Caddy sur `/CN/`.

**Cause :** Vite build avec le mauvais `base` dans `vite.config.js`.

**Règle :** Configurer `base: '/CN/'` dans `vite.config.js` pour correspondre au chemin du proxy inverse.

### 6. Complétion de leçon non réactive

**Symptôme :** Marquer une leçon terminée ne mettait pas à jour l'affichage sans rechargement.

**Cause :** L'état `completed` était lu depuis le stockage local au rendu, mais pas mis à jour localement après l'action de complétion.

**Règle :** Utiliser un état React local (`useState`) qui se met à jour immédiatement, et persister l'état dans le stockage local en parallèle.

## Conventions de code

### Structure des données vocabulaire

```js
{ id: 'w89', hanzi: '晚安', pinyin: 'wǎn ān', french: 'Bonne nuit',
  theme: 'salutations', level: 'debutant',
  jpKanji: true, jpNote: '…' }
```

- `id` : format `w{numéro}`, commencer à w1
- Les IDs inutilisés (mots supprimés) ne sont jamais réattribués
- `theme` doit correspondre à une clé de `themes` dans le même fichier
- `level` : `debutant` | `intermediaire` | `avance`

### Structure des données phrases

```js
{ chinese: '你好', pinyin: 'nǐ hǎo', french: 'Bonjour' }
```

- Les phrases sont organisées en leçons dans `levels: { debutant: […], intermediaire: […], avance: […] }`
- Chaque leçon a un `grammarPoint` et une `grammarExplanation`

### Génération audio ajout

1. Ajouter les nouveaux mots/phrases dans les fichiers `data.js`
2. Lancer `npm run generate-audio` (ou `python3 scripts/generate-audio.py`)
3. Les fichiers existants sont ignorés, seuls les nouveaux sont créés
4. Rebuild : `npx vite build`
5. Le manifeste est mis à jour automatiquement

## Process recommandé pour toute modification

1. **Relire ce fichier** (LESSONS.md)
2. Planifier la modification
3. Vérifier la cohérence des IDs si ajout de données
4. Si génération audio : lancer le script, vérifier les fichiers créés
5. Tester le build (`npx vite build`)
6. Commit et push
