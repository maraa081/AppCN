/**
 * Données du module Prononciation & Écoute
 * Initiales, finales, tons, et exercices de reconnaissance auditive
 */

const pronunciationData = {
  id: 'pronunciation',
  title: 'Prononciation & Écoute',
  levels: {
    debutant: [
      {
        id: 'les_tons',
        title: 'Les 4 tons + ton neutre',
        grammarPoint: 'Système tonal du mandarin',
        grammarExplanation: `Le mandarin a 4 tons + 1 ton neutre. Chaque syllabe a un ton qui change le sens du mot :

1er ton (ā) : haut et plat → mā (妈妈, maman)
2e ton (á) : montant → má (麻, chanvre)
3e ton (ǎ) : d'abord descendant puis montant → mǎ (马, cheval)
4e ton (à) : descendant et brusque → mà (骂, insulter)
Ton neutre (a) : léger, court → ma (吗, particule interrogative)

⚠️ Attention : les tons changent le sens ! mā (maman) ≠ mǎ (cheval).
Rappelle-toi : en japonais, c'est un accent de hauteur (平板式/起伏式). En chinois, chaque syllabe a son propre ton fixe.`,
        jpNote: 'Le japonais a un accent tonique (lexical), mais c\'est une hauteur relative entre syllabes. Le chinois a des tons absolus par syllabe — concept très différent !',
        syllables: [
          { pinyin: 'mā', tone: 1, description: 'Haut et plat — comme si tu lis une note tenue', example: '妈妈 (māma, maman)' },
          { pinyin: 'má', tone: 2, description: 'Montant — comme si tu poses une question', example: '麻 (má, chanvre)' },
          { pinyin: 'mǎ', tone: 3, description: 'Descendant puis montant — comme un creux', example: '马 (mǎ, cheval)' },
          { pinyin: 'mà', tone: 4, description: 'Descendant brusque — comme un ordre sec', example: '骂 (mà, insulter)' },
          { pinyin: 'ma', tone: 5, description: 'Léger et court — ton neutre', example: '吗 (ma, ?)' },
        ],
        exercises: [
          {
            id: 'tone_id1',
            type: 'listen_choose_tone',
            instruction: 'Écoute et identifie le ton de "ma" que tu entends',
            listenText: 'mā',
            correctTone: 1,
            options: ['1er ton (haut plat)', '2e ton (montant)', '3e ton (creux)', '4e ton (descendant)'],
            correctIndex: 0,
          },
          {
            id: 'tone_id2',
            type: 'listen_choose_tone',
            listenText: 'mǎ',
            correctTone: 3,
            options: ['1er ton (haut plat)', '2e ton (montant)', '3e ton (creux)', '4e ton (descendant)'],
            correctIndex: 2,
          },
          {
            id: 'tone_id3',
            type: 'listen_choose_tone',
            listenText: 'mà',
            correctTone: 4,
            options: ['1er ton (haut plat)', '2e ton (montant)', '3e ton (creux)', '4e ton (descendant)'],
            correctIndex: 3,
          },
          {
            id: 'tone_id4',
            type: 'listen_choose_tone',
            listenText: 'má',
            correctTone: 2,
            options: ['1er ton (haut plat)', '2e ton (montant)', '3e ton (creux)', '4e ton (descendant)'],
            correctIndex: 1,
          },
        ],
      },
      {
        id: 'initiales',
        title: 'Initiales du pinyin',
        grammarPoint: 'Les consonnes initiales',
        grammarExplanation: `Les initiales du pinyin sont les consonnes au début d'une syllabe.

⚠️ Attention aux pièges pour francophones :
• zh, ch, sh : rétroflexes (langue recourbée vers l'arrière)
  zh → comme "dj" mais la langue en arrière
  ch → comme "tch" mais la langue en arrière
  sh → comme "ch" mais la langue en arrière

• j, q, x : palatales (langue contre le palais)
  j → comme "di" très doux
  q → comme "tsi" aspiré
  x → comme "si" mais avec la langue collée au palais

• r : comme "j" français mais plus roulé

• c : "ts" aspiré, z : "ts" non aspiré
• b, d, g : non aspirés (comme en français, mais plus secs)`,
        syllables: [
          { pinyin: 'bā', tone: 1, description: 'b non aspiré (pas comme "p" anglais)', example: '八 (bā, huit)' },
          { pinyin: 'pā', tone: 1, description: 'p aspiré (forte bouffée d\'air)', example: '趴 (pā, se coucher)' },
          { pinyin: 'zhī', tone: 1, description: 'zh rétroflexe — langue en arrière', example: '知 (zhī, savoir)' },
          { pinyin: 'chī', tone: 1, description: 'ch rétroflexe aspiré', example: '吃 (chī, manger)' },
          { pinyin: 'shī', tone: 1, description: 'sh rétroflexe', example: '诗 (shī, poème)' },
          { pinyin: 'rì', tone: 4, description: 'r comme "j" français plus roulé', example: '日 (rì, soleil)' },
          { pinyin: 'jī', tone: 1, description: 'j palatal — doux, comme "di"', example: '鸡 (jī, poulet)' },
          { pinyin: 'qī', tone: 1, description: 'q palatal aspiré', example: '七 (qī, sept)' },
          { pinyin: 'xī', tone: 1, description: 'x palatal — "si" langue collée', example: '西 (xī, ouest)' },
          { pinyin: 'cā', tone: 1, description: 'c = "ts" aspiré', example: '擦 (cā, essuyer)' },
          { pinyin: 'zā', tone: 1, description: 'z = "ts" non aspiré', example: '扎 (zā, attacher)' },
        ],
        exercises: [
          {
            id: 'init1',
            type: 'listen_choose_pinyin',
            instruction: 'Quel pinyin entends-tu ?',
            listenText: 'chī',
            correctIndex: 1,
            options: ['zhī', 'chī', 'shī', 'qī'],
          },
          {
            id: 'init2',
            type: 'listen_choose_pinyin',
            listenText: 'xī',
            correctIndex: 2,
            options: ['jī', 'qī', 'xī', 'shī'],
          },
        ],
      },
      {
        id: 'finales',
        title: 'Finales du pinyin',
        grammarPoint: 'Les voyelles et finales',
        grammarExplanation: `Les finales sont les voyelles (ou combinaisons) après l'initiale.

Finales simples : a, o, e, i, u, ü
• ü (yu) : comme le "u" allemand, ou le "u" français avec les lèvres arrondies en "ou"

Finales composées courantes :
• ai → comme "aille" en français
• ei → comme "euil" mais plus bref
• ao → comme "a-o" (pas comme "au" français !)
• ou → comme "o" en français
• an → comme "ane" en français
• en → comme "eune" (entre "un" et "ein")
• ang → comme "ang" avec le nez (nasale)
• eng → comme "ong" français

⚠️ Important : i après zh/ch/sh/r se prononce comme un "r" prolongé (pas un "i").
    知 (zhī) se prononce comme "jr" pas "dji" !`,
        syllables: [
          { pinyin: 'ài', tone: 4, description: 'ai = "aille"', example: '爱 (ài, aimer)' },
          { pinyin: 'ēi', tone: 1, description: 'ei = "euil" bref', example: '嘿 (hēi, hé)' },
          { pinyin: 'āo', tone: 1, description: 'ao = "a-ou" pas "o"', example: '猫 (māo, chat)' },
          { pinyin: 'ān', tone: 1, description: 'an = "ane"', example: '安 (ān, paix)' },
          { pinyin: 'ēn', tone: 1, description: 'en = "eun"', example: '恩 (ēn, grâce)' },
          { pinyin: 'āng', tone: 1, description: 'ang = "ang" nasal', example: '昂 (áng, levé)' },
          { pinyin: 'yī', tone: 1, description: 'yi = "i" simple', example: '一 (yī, un)' },
          { pinyin: 'yú', tone: 2, description: 'ü = u allemand', example: '鱼 (yú, poisson)' },
          { pinyin: 'wǒ', tone: 3, description: 'uo = "ou-o"', example: '我 (wǒ, je)' },
        ],
        exercises: [
          {
            id: 'final1',
            type: 'listen_choose_pinyin',
            instruction: 'Quel pinyin entends-tu ?',
            listenText: 'ào',
            correctIndex: 2,
            options: ['ài', 'ēi', 'ào', 'ān'],
          },
        ],
      },
    ],
    intermediaire: [
      {
        id: 'paires_tonales',
        title: 'Paires tonales et mots',
        grammarPoint: 'Combinaisons de tons dans les mots',
        grammarExplanation: `Les mots chinois ont souvent 2 syllabes. La combinaison des tons peut être difficile :

Règles importantes :
• 3e ton + 3e ton → le premier devient 2e ton
   你 (nǐ, 3) + 好 (hǎo, 3) → 你好 (ní hǎo, 2+3)
   Pas "nǐ hǎo" mais "ní hǎo" !

• Quand trois 3e tons se suivent, le deuxième devient 2e ton

• Le 3e ton seul se prononce complet, mais dans une phrase il devient souvent un "demi 3e ton" (juste descendant, pas remontant)

• 不 (bù, 4e ton) devient bú devant un 4e ton
   不对 = bú duì (pas bù duì)

• 一 (yī, 1er) devient 2e ton devant un 4e ton, et 4e ton devant un 1er/2e/3e`,
        examples: [
          { chinese: '你好', pinyin: 'ní hǎo', french: 'Bonjour (3+3→2+3)' },
          { chinese: '很好', pinyin: 'hěn hǎo', french: 'Très bon (3+3→2+3)' },
          { chinese: '不对', pinyin: 'bú duì', french: 'Incorrect (4+4→2+4)' },
          { chinese: '一个', pinyin: 'yí gè', french: 'Un (1+4→2+4)' },
          { chinese: '一天', pinyin: 'yì tiān', french: 'Un jour (1+1→4+1)' },
        ],
        exercises: [
          {
            id: 'tone_comb1',
            type: 'qcm',
            question: 'Comment se prononce 你好 réellement ?',
            options: ['nǐ hǎo', 'ní hǎo', 'nǐ háo', 'nì hǎo'],
            correctIndex: 1,
            explanation: 'Règle : deux 3e tons → le premier devient 2e ton. nǐ (3) + hǎo (3) → ní hǎo (2+3).',
          },
        ],
      },
      {
        id: 'mots_contre_exemples',
        title: 'Mots qui diffèrent par le ton',
        grammarPoint: 'Paires minimales tonales',
        grammarExplanation: `Le même son avec un ton différent donne un mot différent. Exercice essentiel !

Exemples de paires minimales :
• 妈 (mā) = maman vs 马 (mǎ) = cheval
• 买 (mǎi) = acheter vs 卖 (mài) = vendre
• 书 (shū) = livre vs 树 (shù) = arbre
• 睡 (shuì) = dormir vs 水 (shuǐ) = eau
• 西 (xī) = ouest vs 细 (xì) = fin/mince`,
        pairs: [
          { a: { chinese: '妈', pinyin: 'mā', french: 'maman' }, b: { chinese: '马', pinyin: 'mǎ', french: 'cheval' } },
          { a: { chinese: '买', pinyin: 'mǎi', french: 'acheter' }, b: { chinese: '卖', pinyin: 'mài', french: 'vendre' } },
          { a: { chinese: '书', pinyin: 'shū', french: 'livre' }, b: { chinese: '树', pinyin: 'shù', french: 'arbre' } },
          { a: { chinese: '睡', pinyin: 'shuì', french: 'dormir' }, b: { chinese: '水', pinyin: 'shuǐ', french: 'eau' } },
          { a: { chinese: '西', pinyin: 'xī', french: 'ouest' }, b: { chinese: '细', pinyin: 'xì', french: 'mince' } },
        ],
        exercises: [
          {
            id: 'min_pair1',
            type: 'listen_choose_word',
            instruction: 'Quel mot entends-tu ?',
            listenText: 'mǎ',
            correctIndex: 1,
            options: ['妈 (mā, maman)', '马 (mǎ, cheval)', '骂 (mà, insulter)', '麻 (má, chanvre)'],
          },
          {
            id: 'min_pair2',
            type: 'listen_choose_word',
            listenText: 'mài',
            correctIndex: 1,
            options: ['买 (mǎi, acheter)', '卖 (mài, vendre)', '麦 (mài, blé)', '埋 (mái, enterrer)'],
          },
        ],
      },
    ],
    avance: [
      {
        id: 'phrases_ecoute',
        title: 'Compréhension de phrases',
        grammarPoint: 'Reconnaître les tons en contexte',
        grammarExplanation: `Dans une phrase réelle, les tons s'atténuent :
• Beaucoup de syllabes deviennent légères/neutres en position non-accentuée
• Le ton 3 se réduit souvent à un "demi-ton" descendant
• L'intonation de la phrase (question, exclamation) peut masquer les tons individuels

Entraîne-toi à reconnaître le sens d'une phrase entière plutôt que chaque ton individuellement.`,
        phrases: [
          { chinese: '我想喝水', pinyin: 'wǒ xiǎng hē shuǐ', french: 'Je veux boire de l\'eau', difficulty: 'Vocabulaire simple' },
          { chinese: '他在做什么？', pinyin: 'tā zài zuò shénme', french: 'Que fait-il ?', difficulty: 'Action en cours' },
          { chinese: '你吃饭了吗？', pinyin: 'nǐ chī fàn le ma', french: 'As-tu mangé ?', difficulty: 'Accompli + question' },
        ],
        exercises: [
          {
            id: 'phrase_listen1',
            type: 'listen_choose_translation',
            instruction: 'Écoute la phrase et choisis la traduction',
            listenText: '我想喝水',
            correctIndex: 1,
            options: ['Je veux manger', 'Je veux boire de l\'eau', 'Je vais boire', 'J\'ai bu de l\'eau'],
          },
        ],
      },
    ],
  },
};

export default pronunciationData;
