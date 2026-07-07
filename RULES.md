# RULES.md — Mémoire permanente du projet AppCN

> À lire AVANT toute tâche. À mettre à jour APRÈS chaque tâche si une nouvelle règle ou erreur est identifiée.

---

## 1.1 Règles linguistiques — à respecter TOUJOURS

### Registre

- Tout le contenu est en **mandarin standard parlé moderne** (普通话), niveau conversation quotidienne
- Référence : ce qu'un locuteur natif de **20-35 ans** dirait naturellement à l'oral en Chine continentale
- **Interdit** : chinois classique (文言文), registre littéraire, administratif, juridique
- **Mots interdits ou à éviter absolument** : 之、于、乃、方才 (→ 刚才)、旋即 (→ 马上)、汝、尔, et toute structure en 所…者 / 之…也
- **Formules désuètes à ne pas utiliser** : 您贵姓 (trop formel), 吃饭了吗 comme salutation (vieux jeu), 幸会幸会 sans contexte humoristique
- Pour les termes qui existent en deux registres (ex: 父亲 vs 爸爸, 母亲 vs 妈妈) : toujours présenter le terme oral courant **EN PREMIER**, le terme formel en note secondaire
- Les expressions familières courantes sont acceptables mais doivent être marquées avec une note "registre familier 口语"

### Hanzi

- Uniquement des caractères **simplifiés** (简体字) — jamais de traditionnel (繁體字) sauf mention explicite
- Vérifier systématiquement que les hanzi affichés correspondent exactement au pinyin indiqué

### Pinyin

- Les tons doivent **TOUJOURS** être indiqués avec les diacritiques (mā má mǎ mà), jamais avec des chiffres (ma1) sauf dans les fichiers techniques internes
- Vérifier le **sandhi tonal** dans les exemples : 3e ton + 3e ton → le premier devient 2e ton à l'oral (ex: 你好 → níhǎo pas nǐhǎo), et 不 devient bú devant un 4e ton
- Ne pas mélanger pinyin standard et transcriptions approximatives

### Traductions françaises

- Refléter le bon registre (ne pas traduire 您 par "vous" sans noter que c'est très formel)
- Idiomatique en français, pas de calque mot à mot depuis le chinois

### Question à se poser avant tout ajout de contenu

> "Est-ce qu'un locuteur natif chinois de 20-35 ans dirait vraiment ça à l'oral dans cette situation ?"
>
> Si la réponse est "peut-être" ou "dans un contexte formel seulement" → ne pas l'ajouter sans note de registre.

---

## 1.2 Règles techniques — à respecter TOUJOURS

### Audio

- Système audio : **edge-tts uniquement**, voix `zh-CN-XiaoxiaoNeural` (féminine) et `zh-CN-YunxiNeural` (masculine)
- Les fichiers audio sont pré-générés en MP3/OPUS et stockés dans `public/audio/`
- **Ne JAMAIS utiliser** Web Speech API, SpeechSynthesis ou `playbackRate` pour le chinois
- Les 3 vitesses (-40% / -20% / normale) sont des fichiers distincts pré-générés avec `--rate` d'edge-tts, pas du pitch-shifting côté navigateur
- Après tout ajout de contenu : lancer `npm run generate-audio` pour générer **uniquement les fichiers manquants** (ne jamais tout régénérer)
- **Convention de nommage des fichiers audio :**
  - `{type}/{suffixe}.{ext}` où `type` = `pair`, `phrase`, `word`, `extra` et `suffixe` = identifiant unique
  - Les variantes natives (--rate non modifié) sont dans des dossiers `{type}_native/`
  - Les variantes ralenties (--rate ajusté) sont dans des dossiers `{type}_slow/`

### Segmentation

- La segmentation mot par mot utilise `Intl.Segmenter` (déjà en place dans `utils/segmenter.js`)
- Ne pas segmenter en caractères individuels — respecter les vrais mots (现在 = 1 mot, pas 现 + 在)

### Stockage

- Tout le stockage est local (localStorage) — pas de backend cloud, pas de dépendance externe au runtime
- Le SRS utilise l'algorithme SM-2 (déjà implémenté) — ne pas le remplacer ni le contourner

### Stack

- React 19 + Vite 8, pas de routeur externe, pas de store global
- Python 3.8+ requis pour la génération audio (edge-tts)

---

## 1.3 Erreurs déjà connues et corrigées (historique)

> Cette section est mise à jour après chaque correction.

_(À compléter avec les résultats des audits.)_

### Corrigé dans l'audit initial (juillet 2026)

**Corrections appliquées le 2026-07-07 :**

**Vocabulaire — Notes d'interférence japonais ajoutées :**
- w33 电话 (diàn huà) : note "電話 = denwa, identique"
- w34 电脑 (diàn nǎo) : note "电+脑 = cerveau électrique. Japonais dit コンピュータ"
- w59 钱 (qián) : note précisée sur l'usage différence JP vs CN
- w64 认识 (rèn shi) : ⚠️ faux ami "認識 = ninshiki (reconnaissance) ≠ connaître"
- w96 辛苦了 (xīn kǔ le) : note culturelle "expression typique chinoise"
- w226 旧 (jiù) : note "旧 = kyū, usage plus large en chinois"
- w248 左边 (zuǒ biān) / w249 右边 (yòu biān) : note structure 边 vs japonais sans suffixe
- w258 上班 (shàng bān) / w259 下班 (xià bān) : notes comparaison JP 出勤/退勤

**Remplacements Point 1 (mots trop spécifiques) :**
- w94 再见明天见 → 明天见 (à demain, forme plus naturelle)
- w149 可乐 conservé + w380 汽水 ajouté comme synonyme HSK
- w179 公共汽车 conservé + w381 公交车 ajouté comme synonyme oral plus court

**Ajouts HSK 1 (Point 2) :**
- +50 mots HSK1 ajoutés (w382-w431) : pronoms, verbes être/avoir, particules, mots interrogatifs, classificateurs, etc.
- Couverture HSK1 passée de 62% à 95%

**Ajouts HSK 2-3 (Point 3) :**
- +33 mots HSK 2-3 ajoutés (w432-w464) : verbes de mouvement, adverbes, structures 把/被, etc.
- w451 把 et w452 被 : note renvoyant vers le module Grammaire

**Marquage HSK (Point 4) :**
- 131 mots hors-HSK marqués avec `hskLevel: 'hors-HSK'` dans data.js
- Badge visible dans l'interface pour signaler le niveau HSK

**Audio :**
- Générateur : 57 nouveaux fichiers audio générés, 1911 existants préservés
- Total : 1968 fichiers audio dans public/audio/

**Phrases — Notes de registre :**
- Ajout de 早 (zǎo) = "Salut (le matin, oral)" dans les salutations
- 早上好 (zǎo shang hǎo) marqué "plus formel"

**Grammaire — Exercice :**
- Leçon négation (不/没) : option 4 corrigée ("我没有吃饭了" → "我没有吃饭")

LESSONS.md contient l'historique complet des corrections techniques.

## 1.5 Conventions HSK

- hskLevel est un champ optionnel dans les données vocabulaire
- Valeurs possibles : 'hors-HSK' (ni HSK1, ni HSK2, ni HSK3)
- Si le champ est absent, le mot est considéré comme faisant partie d'un niveau HSK (1, 2 ou 3)
- Les mots HSK 1-3 ne sont pas marqués (silence = dans HSK)
- Ne pas remplacer un mot hors-HSK uniquement parce qu'il est hors-HSK. Le critère est l'utilité orale réelle.

---

## 1.4 Sandhi tonal — Règles et comportement edge-tts

### Règles de sandhi à connaître

| Règle | Exemple | Pinyin isolé | Pinyin sandhi |
|---|---|---|---|
| 3ᵉ + 3ᵉ → 2ᵉ + 3ᵉ | 你好 | nǐ hǎo | ní hǎo |
| 3ᵉ + 3ᵉ + 3ᵉ | 我很好 | wǒ hěn hǎo | wó hén hǎo |
| 不 (bù) + 4ᵉ → bú | 不要 | bù yào | bú yào |
| 一 (yī) + 4ᵉ → yí | 一个 | yī gè | yí gè |
| 一 (yī) + 1ᵉ/2ᵉ/3ᵉ → yì | 一起 | yī qǐ | yì qǐ |

### Comportement edge-tts

Edge TTS applique le sandhi tonal automatiquement dans la synthèse vocale, même si le texte en entrée utilise le pinyin théorique. Il n'est pas nécessaire de modifier les données source pour que l'audio sonne correctement — edge-tts gère :
- Le sandhi du 3ᵉ ton (3+3 → 2+3)
- Le sandhi de 不 (bù → bú devant 4ᵉ)
- Le sandhi de 一 (yī → yí/yì selon le ton suivant)
- Le caractère 不 suivi d'un complément (听不懂, 吃不下) est automatiquement traité

→ **Aucune modification manuelle des données pinyin n'est nécessaire** pour le sandhi tonal. L'audio généré par edge-tts sera correct.
