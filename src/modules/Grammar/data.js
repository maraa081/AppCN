/**
 * Données du module Grammaire — leçons structurées + exercices
 * Chaque leçon : { id, title, grammarPoint, explanation, jpNote, examples, exercises }
 * Exercices : type "qcm" (choisir) ou "fill" (compléter)
 */

const grammarData = {
  id: 'grammar',
  title: 'Grammaire chinoise',
  levels: {
    debutant: [
      {
        id: 'ordre_mots',
        title: 'Ordre des mots (SVO)',
        grammarPoint: 'Sujet + Verbe + Objet',
        explanation: `Le chinois suit l'ordre Sujet - Verbe - Objet, comme le français (mais contrairement au japonais qui est SOV).
Exemple : 我 (je) 吃 (mange) 饭 (riz) = "Je mange du riz".
Pas de particule pour marquer le sujet (contrairement à は/が en japonais).
Les adverbes se placent avant le verbe : 我每天都喝水 (wǒ měitiān dōu hē shuǐ, "Je bois de l'eau tous les jours").`,
        jpNote: 'En japonais : 私はご飯を食べます (SOV). En chinois : 我吃饭 (SVO). C\'est une grosse différence structurelle. Le chinois ressemble plus au français qu\'au japonais pour l\'ordre des mots.',
        examples: [
          { chinese: '我看书', pinyin: 'wǒ kàn shū', french: 'Je lis un livre' },
          { chinese: '她做饭', pinyin: 'tā zuò fàn', french: 'Elle cuisine' },
          { chinese: '我喜欢猫', pinyin: 'wǒ xǐhuān māo', french: 'J\'aime les chats' },
          { chinese: '我不吃辣', pinyin: 'wǒ bù chī là', french: 'Je ne mange pas épicé' },
        ],
        exercises: [
          {
            id: 'ordre1',
            type: 'qcm',
            question: '"Je bois du thé" en chinois = ?',
            options: ['茶喝我 (chá hē wǒ)', '我喝茶 (wǒ hē chá)', '喝我茶 (hē wǒ chá)', '茶我喝 (chá wǒ hē)'],
            correctIndex: 1,
            explanation: 'Correct ! Ordre SVO : 我 (sujet) + 喝 (verbe) + 茶 (objet).',
          },
          {
            id: 'ordre2',
            type: 'qcm',
            question: 'Traduire : 她看书 (tā kàn shū)',
            options: ['Elle écrit un livre', 'Elle lit un livre', 'Il voit un livre', 'Elle regarde un livre'],
            correctIndex: 1,
            explanation: '她 (elle) + 看 (lire/regarder) + 书 (livre) = Elle lit un livre.',
          },
          {
            id: 'ordre3',
            type: 'fill',
            question: 'Complète : "J\'aime le chinois" → 我______中文',
            answer: '喜欢',
            altAnswers: ['很喜歡', '爱'],
            explanation: '喜欢 (xǐhuān) = aimer. Ordre SVO : 我 + 喜欢 + 中文.',
          },
        ],
      },
      {
        id: 'negation',
        title: 'La négation : 不 et 没',
        grammarPoint: 'Particules de négation',
        explanation: `Deux façons de dire "ne...pas" :

1. 不 (bù) : négation générale, devant le verbe/adjectif
   - 不去 (bù qù) = "ne pas aller"
   - 不好 (bù hǎo) = "pas bon"
   - 不吃 (bù chī) = "ne pas manger"
   ⚠️ 不 devient 不 (bú) au 4e ton devant un autre 4e ton

2. 没 (méi) / 没有 (méiyǒu) : négation d'existence ou d'accompli
   - 没有钱 (méiyǒu qián) = "ne pas avoir d'argent"
   - 没去 (méi qù) = "n'est pas allé" (passé négatif)
   - 没吃 (méi chī) = "n'a pas mangé"

Règle simple : 不 pour les actions habituelles/futures, 没 pour l'accompli/possession.`,
        jpNote: 'Comme en japonais ない (nai) vs なかった (nakatta), mais le chinois est plus simple : 没 marque le passé négatif, 不 le reste.',
        examples: [
          { chinese: '我不吃猪肉', pinyin: 'wǒ bù chī zhūròu', french: 'Je ne mange pas de porc' },
          { chinese: '他没来上课', pinyin: 'tā méi lái shàngkè', french: 'Il n\'est pas venu en cours' },
          { chinese: '我没有车', pinyin: 'wǒ méiyǒu chē', french: 'Je n\'ai pas de voiture' },
          { chinese: '这个不好吃', pinyin: 'zhège bù hǎochī', french: 'Ce n\'est pas bon (à manger)' },
          { chinese: '我不去', pinyin: 'wǒ bù qù', french: 'Je n\'y vais pas' },
        ],
        exercises: [
          {
            id: 'neg1',
            type: 'qcm',
            question: 'Quelle négation pour "Je n\'ai pas mangé" ?',
            options: ['我不吃饭', '我没吃饭', '我无不吃饭', '我没有吃饭'],
            correctIndex: 1,
            explanation: '没 + verbe = action non accomplie. 我没吃饭 = "Je n\'ai pas mangé".',
          },
          {
            id: 'neg2',
            type: 'qcm',
            question: 'Traduire "Je ne suis pas chinois" :',
            options: ['我没是中国人', '我不是中国人', '我没中国人', '我不是人是中国'],
            correctIndex: 1,
            explanation: '不 + 是 (être) = "ne pas être". 我不是中国人.',
          },
          {
            id: 'neg3',
            type: 'fill',
            question: '"Je n\'ai pas de temps" → 我______时间',
            answer: '没有',
            explanation: '没有 (méiyǒu) pour la négation de possession.',
          },
        ],
      },
      {
        id: 'questions',
        title: 'Les questions',
        grammarPoint: 'Particules et mots interrogatifs',
        explanation: `Plusieurs façons de poser une question :

1. 吗 (ma) : question oui/non (ajoutée à la fin)
   → 你是学生吗？ (nǐ shì xuéshēng ma) = "Es-tu étudiant ?"

2. Forme A-not-A : répéter le verbe
   → 吃不吃？ (chī bù chī) = "Manger ou pas ?"
   → 好不好？ (hǎo bù hǎo) = "D'accord ?" (litt. "bon ou pas bon ?")

3. Mots interrogatifs : 什么 (quoi), 谁 (qui), 哪里 (où), 什么时候 (quand), 为什么 (pourquoi)
   → L'ordre des mots ne change pas (contrairement au français)
   → 你叫什么？ (nǐ jiào shénme) = "Tu t'appelles comment ?" (pas d'inversion)`,
        jpNote: 'Contrairement au japonais où か (ka) sert de marqueur de question (comme 吗), le chinois utilise aussi la forme A-not-A qui n\'existe pas en japonais.',
        examples: [
          { chinese: '你去不去？', pinyin: 'nǐ qù bù qù', french: 'Tu vas ou pas ?' },
          { chinese: '这是什么？', pinyin: 'zhè shì shénme', french: 'Qu\'est-ce que c\'est ?' },
          { chinese: '他是谁？', pinyin: 'tā shì shuí', french: 'Qui est-il ?' },
          { chinese: '你在哪里？', pinyin: 'nǐ zài nǎlǐ', french: 'Où es-tu ?' },
          { chinese: '为什么？', pinyin: 'wèishénme', french: 'Pourquoi ?' },
        ],
        exercises: [
          {
            id: 'q1',
            type: 'qcm',
            question: 'Comment dire "Où habites-tu ?" ?',
            options: ['你住哪里？', '哪里你住？', '你哪里住？', '你住吗哪里？'],
            correctIndex: 0,
            explanation: 'Sujet + verbe + 哪里 (où). L\'ordre des mots ne change pas pour les questions.',
          },
          {
            id: 'q2',
            type: 'fill',
            question: '"C\'est quoi ?" → 这______？',
            answer: '是什么',
            explanation: '这是什么 (zhè shì shénme) = Qu\'est-ce que c\'est ?',
          },
        ],
      },
      {
        id: 'classificateurs',
        title: 'Les classificateurs (量词)',
        grammarPoint: 'Nombre + Classificateur + Nom',
        explanation: `En chinois, on ne peut pas dire "un livre" directement. Il faut un classificateur (mesureur) entre le nombre et le nom :
   — 一本书 (yī běn shū) = "un volume de livre"

Classificateurs courants :
• 个 (gè) : le plus courant, polyvalent (personnes, objets génériques)
• 本 (běn) : pour les livres, cahiers
• 只 (zhǐ) : pour un animal (un chien : 一只狗)
• 条 (tiáo) : pour les objets longs (poisson, rue, pantalon)
• 张 (zhāng) : pour les objets plats (table, papier, photo)
• 杯 (bēi) : pour les boissons (一杯茶)

⚠️ En japonais aussi il y a des classificateurs, mais les mots diffèrent ! (本 = hon, pareil en chinois běn !)`,
        jpNote: 'Le chinois et le japonais partagent certains classificateurs : 本 (běn/hon) pour les livres, 枚 (méi/mai) pour les objets plats. Mais beaucoup diffèrent ! Fais attention au chinois 个 qui est universel et n\'existe pas en japonais.',
        examples: [
          { chinese: '一个人', pinyin: 'yī gè rén', french: 'une personne' },
          { chinese: '两只猫', pinyin: 'liǎng zhǐ māo', french: 'deux chats' },
          { chinese: '三本书', pinyin: 'sān běn shū', french: 'trois livres' },
          { chinese: '一杯水', pinyin: 'yī bēi shuǐ', french: 'un verre d\'eau' },
          { chinese: '一张桌子', pinyin: 'yī zhāng zhuōzi', french: 'une table' },
          { chinese: '五条鱼', pinyin: 'wǔ tiáo yú', french: 'cinq poissons' },
        ],
        exercises: [
          {
            id: 'class1',
            type: 'qcm',
            question: 'Quel classificateur pour "un chat" ?',
            options: ['一只猫 (yī zhǐ māo)', '一个猫 (yī gè māo)', '一条猫 (yī tiáo māo)', '一本猫 (yī běn māo)'],
            correctIndex: 0,
            explanation: '只 (zhǐ) pour les animaux de petite/moyenne taille.',
          },
          {
            id: 'class2',
            type: 'fill',
            question: '"Deux tasses de café" → 两______咖啡',
            answer: '杯',
            explanation: '杯 (bēi) = tasse / verre pour les boissons.',
          },
        ],
      },
    ],
    intermediaire: [
      {
        id: 'le_accompli',
        title: '了 (le) — Accompli et changement',
        grammarPoint: 'Particule verbale 了',
        explanation: `了 (le) a DEUX usages distincts :

1. 了 d'accompli (après le verbe) : action terminée
   我吃了 (wǒ chī le) = "J'ai mangé"
   他去了 (tā qù le) = "Il est allé"

2. 了 de changement d'état (fin de phrase) : situation nouvelle
   我饿了 (wǒ è le) = "J'ai faim (maintenant, avant non)"
   春天了 (chūntiān le) = "C'est le printemps (déjà)"

⚠️ Quand les deux sont combinés : 我吃了饭了 (wǒ chī le fàn le) = "J'ai mangé (et du coup maintenant je n'ai plus faim)"

Pas d'équivalent direct en français (ni en japonais).`,
        jpNote: 'Le japonais a た (ta) pour le passé accompli, mais sans la nuance de "changement d\'état". 了 combine des nuances du た et du になる en japonais.',
        examples: [
          { chinese: '我吃了早饭', pinyin: 'wǒ chī le zǎofàn', french: 'J\'ai pris mon petit-déjeuner' },
          { chinese: '下雨了', pinyin: 'xià yǔ le', french: 'Il pleut (maintenant)' },
          { chinese: '他走了', pinyin: 'tā zǒu le', french: 'Il est parti' },
          { chinese: '花开了', pinyin: 'huā kāi le', french: 'Les fleurs ont éclos / sont en fleurs' },
          { chinese: '我知道了', pinyin: 'wǒ zhīdào le', french: 'J\'ai compris (maintenant je sais)' },
        ],
        exercises: [
          {
            id: 'le1',
            type: 'qcm',
            question: 'Que signifie 下雨了 (xià yǔ le) ?',
            options: ['Il va pleuvoir', 'Il pleut (changement : il s\'est mis à pleuvoir)', 'Il a plu hier', 'Il pleut souvent'],
            correctIndex: 1,
            explanation: '了 de changement ici : "il s\'est mis à pleuvoir, maintenant il pleut".',
          },
          {
            id: 'le2',
            type: 'fill',
            question: '"J\'ai lu ce livre" → 我看______这本书',
            answer: '了',
            explanation: '了 d\'accompli après le verbe : 看了 = "avoir lu".',
          },
        ],
      },
      {
        id: 'de_possessif',
        title: '的 (de) — Possession et modification',
        grammarPoint: 'Particule 的 (de)',
        explanation: `的 (de) sert à lier un modificateur à un nom :

1. Possession : 我的书 (wǒ de shū) = "mon livre"
   你的笔 (nǐ de bǐ) = "ton stylo"

2. Adjectif : 漂亮的女孩 (piàoliang de nǚhái) = "jolie fille"

3. Relative : 我昨天买的书 (wǒ zuótiān mǎi de shū) = "le livre que j\'ai acheté hier"

⚠️ Avec les proches (famille), on peut omettre 的 : 我妈妈 (wǒ māma) = "ma mère" (plus naturel que 我的妈妈).`,
        jpNote: '的 (de) correspond plus ou moins à の (no) en japonais pour la possession. MAIS en chinois, 的 sert aussi pour les relatives et adjectifs — beaucoup plus large que le の japonais.',
        examples: [
          { chinese: '我的电脑', pinyin: 'wǒ de diànnǎo', french: 'mon ordinateur' },
          { chinese: '他的朋友', pinyin: 'tā de péngyou', french: 'son ami' },
          { chinese: '红色的车', pinyin: 'hóngsè de chē', french: 'la voiture rouge' },
          { chinese: '妈妈做的菜', pinyin: 'māma zuò de cài', french: 'le plat que maman a cuisiné' },
          { chinese: '好看的衣服', pinyin: 'hǎokàn de yīfu', french: 'de beaux vêtements' },
        ],
        exercises: [
          {
            id: 'de1',
            type: 'qcm',
            question: 'Traduire "Mon ami" :',
            options: ['我的朋友', '我朋友', 'Les deux sont possibles', 'Ni l\'un ni l\'autre'],
            correctIndex: 2,
            explanation: 'Les deux fonctionnent ! 我的朋友 est plus formel, 我朋友 est plus naturel dans la conversation.',
          },
        ],
      },
      {
        id: 'zai_progressif',
        title: '在 (zài) — Action en cours',
        grammarPoint: '在 + verbe = progressif',
        explanation: `En chinois, pour dire qu'on est en train de faire quelque chose :
   在 + verbe → 我在吃饭 (wǒ zài chī fàn) = "Je suis en train de manger"

On peut aussi utiliser 正在 (zhèngzài) pour insister :
   我正在学习 (wǒ zhèngzài xuéxí) = "Je suis justement en train d'étudier"

Et 呢 (ne) à la fin de la phrase ajoute une nuance d'action en cours :
   我吃饭呢 (wǒ chī fàn ne) = "Je mange (là tout de suite)"`,
        jpNote: 'En japonais : 〜ている (te-iru) = progressif. En chinois, 在 remplit ce rôle. Mais le chinois est plus simple : pas de conjugaison !',
        examples: [
          { chinese: '他在看书', pinyin: 'tā zài kàn shū', french: 'Il est en train de lire' },
          { chinese: '你在做什么？', pinyin: 'nǐ zài zuò shénme', french: 'Que fais-tu (en ce moment) ?' },
          { chinese: '我在等你呢', pinyin: 'wǒ zài děng nǐ ne', french: 'Je t\'attends (tu vois bien !)' },
        ],
        exercises: [
          {
            id: 'zai1',
            type: 'qcm',
            question: 'Comment dire "J\'étudie le chinois (en ce moment)" ?',
            options: ['我学中文', '我在学中文', '我学了中文', '我学中文了'],
            correctIndex: 1,
            explanation: '在 + verbe = action en cours. 我在学中文 = "Je suis en train d\'étudier le chinois".',
          },
        ],
      },
    ],
    avance: [
      {
        id: 'compl_manifeste',
        title: 'Compléments de résultat',
        grammarPoint: 'Verbe + complément de résultat',
        explanation: `Un complément de résultat est un mot ajouté après un verbe pour indiquer le résultat de l'action.

Très courant en chinois ! Exemples :

• 看见 (kàn jiàn) = voir + percevoir → "arriver à voir / apercevoir"
• 听见 (tīng jiàn) = entendre + percevoir → "entendre/ouïr"
• 做完 (zuò wán) = faire + finir → "avoir fini de faire"
• 吃掉 (chī diào) = manger + tomber → "manger complètement / finir son assiette"

La négation utilise 没 : 没看见 (méi kàn jiàn) = "n'a pas vu".
La forme potentielle : 看得见 (kàn de jiàn) = "peut voir", 看不见 (kàn bù jiàn) = "ne peut pas voir".`,
        jpNote: 'Similaire aux verbes composés en japonais (食べ終わる = tabéowaru, "finir de manger"), mais beaucoup plus productif en chinois.',
        examples: [
          { chinese: '我看见他了', pinyin: 'wǒ kàn jiàn tā le', french: 'Je l\'ai vu' },
          { chinese: '你听见了吗？', pinyin: 'nǐ tīng jiàn le ma', french: 'Tu as entendu ?' },
          { chinese: '我吃完饭了', pinyin: 'wǒ chī wán fàn le', french: 'J\'ai fini de manger' },
          { chinese: '作业做完了吗？', pinyin: 'zuòyè zuò wán le ma', french: 'Tu as fini les devoirs ?' },
          { chinese: '这个字我看不清楚', pinyin: 'zhège zì wǒ kàn bù qīngchu', french: 'Je ne vois pas clairement ce caractère' },
        ],
        exercises: [
          {
            id: 'result1',
            type: 'qcm',
            question: 'Que signifie 吃完 (chī wán) ?',
            options: ['Manger rapidement', 'Finir de manger', 'Bien manger', 'Manger encore'],
            correctIndex: 1,
            explanation: '吃 (manger) + 完 (finir) = finir de manger. 完 = achèvement.',
          },
        ],
      },
      {
        id: 'ba_structure',
        title: 'La structure 把 (bǎ)',
        grammarPoint: '把 + objet + verbe — mise en focus',
        explanation: `La structure 把 (bǎ) est unique au chinois. Elle sert à mettre l'objet en avant, montrant qu'il est traité/affecté par l'action.

Structure : Sujet + 把 + Objet + Verbe + Complément

Exemple :
   我喝了水 (wǒ hē le shuǐ) = "J'ai bu de l'eau" (phrase normale)
   我把水喝了 (wǒ bǎ shuǐ hē le) = "J'ai bu l'eau (complètement, l'eau est concernée)"

Quand on utilise 把, l'objet doit être spécifique/défini (pas "de l'eau" mais "l'eau").

Utilisé avec les verbes de déplacement, transformation, résultat.`,
        jpNote: 'N\'a pas d\'équivalent direct en français ni en japonais. C\'est une structure typiquement chinoise. À apprendre comme une formule fixe.',
        examples: [
          { chinese: '请把门打开', pinyin: 'qǐng bǎ mén dǎkāi', french: 'Ouvrez la porte, s\'il vous plaît' },
          { chinese: '我把书放桌上了', pinyin: 'wǒ bǎ shū fàng zhuō shàng le', french: 'J\'ai posé le livre sur la table' },
          { chinese: '你把作业做了吗？', pinyin: 'nǐ bǎ zuòyè zuò le ma', french: 'As-tu fait les devoirs ?' },
        ],
        exercises: [
          {
            id: 'ba1',
            type: 'qcm',
            question: 'Quelle phrase utilise correctement 把 ?',
            options: ['我把喝咖啡', '我把咖啡喝了', '我把咖啡喝', '咖啡我把喝了'],
            correctIndex: 1,
            explanation: 'Structure : 把 + objet (咖啡) + verbe (喝) + complément (了).',
          },
        ],
      },
    ],
  },
};

export default grammarData;
