/**
 * Données du module Phrases
 * Structure : { id, theme, levels: { debutant|intermediaire|avance: [lesson] } }
 * Chaque leçon : { id, title, grammarPoint, grammarExplanation, jpNote?, phrases: [{ chinese, pinyin, french }] }
 */

const phrasesData = {
  id: 'phrases',
  title: 'Phrases & Grammaire en contexte',
  levels: {
    debutant: [
      {
        id: 'salutations',
        title: 'Salutations de base',
        grammarPoint: 'Ordre SVO et 吗 (question)',
        grammarExplanation: `Le chinois suit l'ordre Sujet-Verbe-Objet (SVO), comme le français.
Pour poser une question oui/non, on ajoute 吗 (ma) à la fin d'une phrase déclarative.
→ Japonais (SOV) : 私は学生です vs Chinois (SVO) : 我是学生 (wǒ shì xuéshēng)`,
        jpNote: 'Contrairement au japonais où le verbe est à la fin, le chinois met le verbe après le sujet, comme le français.',
        phrases: [
          { chinese: '你好', pinyin: 'nǐ hǎo', french: 'Bonjour / Salut' },
          { chinese: '你好吗？', pinyin: 'nǐ hǎo ma', french: 'Comment vas-tu ?' },
          { chinese: '我很好', pinyin: 'wǒ hěn hǎo', french: 'Je vais très bien' },
          { chinese: '谢谢', pinyin: 'xiè xiè', french: 'Merci' },
          { chinese: '再见', pinyin: 'zài jiàn', french: 'Au revoir' },
          { chinese: '你是学生吗？', pinyin: 'nǐ shì xuéshēng ma', french: 'Es-tu étudiant ?' },
          { chinese: '我是学生', pinyin: 'wǒ shì xuéshēng', french: 'Je suis étudiant' },
          { chinese: '早上好', pinyin: 'zǎo shang hǎo', french: 'Bonjour (le matin)' },
        ],
      },
      {
        id: 'presentations',
        title: 'Se présenter',
        grammarPoint: 'Verbe 是 (être) et pronoms',
        grammarExplanation: `Le verbe 是 (shì) signifie "être". Il ne se conjugue pas (une forme pour tout le monde).
Pronoms : 我 (wǒ, je), 你 (nǐ, tu), 他 (tā, il), 她 (tā, elle).
En japonais : は (wa) marque le sujet. En chinois, pas de particule : l'ordre des mots suffit.`,
        jpNote: '你 (nǐ) et 你 (kimi en japonais) sont différents. 他 (tā) = "il" en chinois, "autre" en japonais (même caractère, sens différent !).',
        phrases: [
          { chinese: '我叫马克西姆', pinyin: 'wǒ jiào Mǎkèxīmǔ', french: 'Je m\'appelle Maxime' },
          { chinese: '我是法国人', pinyin: 'wǒ shì Fǎguó rén', french: 'Je suis français' },
          { chinese: '你叫什么名字？', pinyin: 'nǐ jiào shénme míngzì', french: 'Comment t\'appelles-tu ?' },
          { chinese: '她是医生', pinyin: 'tā shì yīshēng', french: 'Elle est médecin' },
          { chinese: '他是老师', pinyin: 'tā shì lǎoshī', french: 'Il est professeur' },
          { chinese: '很高兴认识你', pinyin: 'hěn gāoxìng rènshi nǐ', french: 'Enchanté(e) de te connaître' },
          { chinese: '我今年二十岁', pinyin: 'wǒ jīnnián èrshí suì', french: 'J\'ai 20 ans cette année' },
        ],
      },
      {
        id: 'vie_quotidienne',
        title: 'Vie quotidienne',
        grammarPoint: 'Particule 了 (changement / accompli)',
        grammarExplanation: `了 (le) a deux usages principaux :
1. Accompli : action terminée. 我吃了 (wǒ chī le) = "j'ai mangé"
2. Changement d'état : 我饿了 (wǒ è le) = "j'ai faim (maintenant, alors qu'avant non)"
À ne pas confondre avec le japonais 了 (ryō) qui signifie "comprendre" !`,
        jpNote: 'Le chinois 了 n\'a rien à voir avec le japonais 了解 (ryōkai). 了 (le) en chinois marque un changement ou un accompli.',
        phrases: [
          { chinese: '我吃饭了', pinyin: 'wǒ chī fàn le', french: 'J\'ai mangé' },
          { chinese: '我饿了', pinyin: 'wǒ è le', french: 'J\'ai faim' },
          { chinese: '她去学校了', pinyin: 'tā qù xuéxiào le', french: 'Elle est allée à l\'école' },
          { chinese: '你喝水吗？', pinyin: 'nǐ hē shuǐ ma', french: 'Bois-tu de l\'eau ?' },
          { chinese: '我喝水', pinyin: 'wǒ hē shuǐ', french: 'Je bois de l\'eau' },
          { chinese: '他睡觉了', pinyin: 'tā shuìjiào le', french: 'Il s\'est couché / Il dort' },
          { chinese: '我回家了', pinyin: 'wǒ huí jiā le', french: 'Je suis rentré à la maison' },
        ],
      },
      {
        id: 'nationalites',
        title: 'Nationalités et langues',
        grammarPoint: 'Structure 是 + nom + 人 / 语',
        grammarExplanation: `Pour dire sa nationalité : 是 + [Pays] + 人 (rén, personne).
Pour une langue : [Pays] + 语 (yǔ, langue) ou 文 (wén, écriture).
Exemples : 法国人 (Fǎguó rén, Français), 中文 (Zhōngwén, chinois écrit).`,
        phrases: [
          { chinese: '你是中国人吗？', pinyin: 'nǐ shì Zhōngguó rén ma', french: 'Es-tu chinois ?' },
          { chinese: '我是法国人', pinyin: 'wǒ shì Fǎguó rén', french: 'Je suis français' },
          { chinese: '我会说中文', pinyin: 'wǒ huì shuō Zhōngwén', french: 'Je sais parler chinois' },
          { chinese: '你会说法语吗？', pinyin: 'nǐ huì shuō Fǎyǔ ma', french: 'Sais-tu parler français ?' },
          { chinese: '我说一点中文', pinyin: 'wǒ shuō yīdiǎn Zhōngwén', french: 'Je parle un peu chinois' },
          { chinese: '他是日本人', pinyin: 'tā shì Rìběn rén', french: 'Il est japonais' },
          { chinese: '我在学中文', pinyin: 'wǒ zài xué Zhōngwén', french: 'J\'apprends le chinois' },
        ],
      },
      {
        id: 'avoir_besoin',
        title: 'Avoir et vouloir',
        grammarPoint: '有 (avoir) et 想 (vouloir)',
        grammarExplanation: `有 (yǒu) = avoir / posséder. 没有 (méiyǒu) = ne pas avoir.
想 (xiǎng) = vouloir / penser à (quelque chose).
想 + verbe = avoir envie de faire quelque chose.
Négation : 不 (bù) devant le verbe, sauf pour 有 qui utilise 没.`,
        jpNote: 'Comme en japonais, le verbe reste à la même forme pour toutes les personnes. Pas de conjugaison !',
        phrases: [
          { chinese: '我有一本书', pinyin: 'wǒ yǒu yī běn shū', french: 'J\'ai un livre' },
          { chinese: '我没有钱', pinyin: 'wǒ méiyǒu qián', french: 'Je n\'ai pas d\'argent' },
          { chinese: '你想吃什么？', pinyin: 'nǐ xiǎng chī shénme', french: 'Que veux-tu manger ?' },
          { chinese: '我想喝茶', pinyin: 'wǒ xiǎng hē chá', french: 'Je veux boire du thé' },
          { chinese: '你有车吗？', pinyin: 'nǐ yǒu chē ma', french: 'As-tu une voiture ?' },
          { chinese: '我有两个姐姐', pinyin: 'wǒ yǒu liǎng ge jiějie', french: 'J\'ai deux grandes sœurs' },
          { chinese: '我想去中国', pinyin: 'wǒ xiǎng qù Zhōngguó', french: 'Je veux aller en Chine' },
        ],
      },
    ],
    intermediaire: [
      {
        id: 'voyage',
        title: 'Voyager',
        grammarPoint: 'Verbes directionnels et 在 (être en train de)',
        grammarExplanation: `En chinois, beaucoup de verbes s'utilisent en paire directionnelle :
来 (lái, venir), 去 (qù, aller), 到 (dào, arriver), 回 (huí, retourner).
在 (zài) + verbe = action en cours (progressif).
→ 我在吃饭 (wǒ zài chī fàn) = "Je suis en train de manger".`,
        phrases: [
          { chinese: '我要去北京', pinyin: 'wǒ yào qù Běijīng', french: 'Je veux aller à Pékin' },
          { chinese: '飞机几点到？', pinyin: 'fēijī jǐ diǎn dào', french: 'À quelle heure arrive l\'avion ?' },
          { chinese: '我在等出租车', pinyin: 'wǒ zài děng chūzūchē', french: 'J\'attends un taxi' },
          { chinese: '这个多少钱？', pinyin: 'zhège duōshao qián', french: 'Combien ça coûte ?' },
          { chinese: '有没有房间？', pinyin: 'yǒu méiyǒu fángjiān', french: 'Avez-vous une chambre ?' },
          { chinese: '我迷路了', pinyin: 'wǒ mílù le', french: 'Je me suis perdu' },
          { chinese: '请帮我一下', pinyin: 'qǐng bāng wǒ yīxià', french: 'Aidez-moi s\'il vous plaît' },
        ],
      },
      {
        id: 'comparaison',
        title: 'Faire des comparaisons',
        grammarPoint: 'Structure comparatif : A 比 B + adjectif',
        grammarExplanation: `比 (bǐ) = comparer. Structure : A 比 B + adjectif.
Exemple : 他比我高 (tā bǐ wǒ gāo) = "Il est plus grand que moi".
Pour dire "aussi... que" : 和...一样 (hé... yīyàng).
Pour dire "plus que ça" : 更 (gèng) devant l'adjectif.`,
        phrases: [
          { chinese: '他比我高', pinyin: 'tā bǐ wǒ gāo', french: 'Il est plus grand que moi' },
          { chinese: '中文比英文难', pinyin: 'Zhōngwén bǐ Yīngwén nán', french: 'Le chinois est plus difficile que l\'anglais' },
          { chinese: '你和我一样高', pinyin: 'nǐ hé wǒ yīyàng gāo', french: 'Tu es aussi grand que moi' },
          { chinese: '这个更好', pinyin: 'zhège gèng hǎo', french: 'Celui-ci est meilleur' },
          { chinese: '她跑得比我快', pinyin: 'tā pǎo de bǐ wǒ kuài', french: 'Elle court plus vite que moi' },
          { chinese: '今天比昨天热', pinyin: 'jīntiān bǐ zuótiān rè', french: 'Aujourd\'hui est plus chaud qu\'hier' },
        ],
      },
    ],
    avance: [
      {
        id: 'nuances',
        title: 'Nuances et expressions idiomatiques',
        grammarPoint: 'Particules modales : 的, 得, 地',
        grammarExplanation: `Trois particules se prononcent toutes "de" mais s'écrivent différemment :
的 (de) : possession / modificateur nominal (我的书 = mon livre)
得 (de) : complément de manière/conséquence (跑得快 = courir vite)
地 (de) : adverbe (高兴地说 = dire joyeusement)
Le contexte est crucial pour savoir lequel utiliser !`,
        phrases: [
          { chinese: '这是我的书', pinyin: 'zhè shì wǒ de shū', french: 'C\'est mon livre' },
          { chinese: '她说得很快', pinyin: 'tā shuō de hěn kuài', french: 'Elle parle très vite' },
          { chinese: '他高兴地笑了', pinyin: 'tā gāoxìng de xiào le', french: 'Il a ri joyeusement' },
          { chinese: '你说得对', pinyin: 'nǐ shuō de duì', french: 'Tu as raison (ce que tu dis est correct)' },
          { chinese: '红色的车', pinyin: 'hóngsè de chē', french: 'La voiture rouge' },
          { chinese: '学中文要学得好', pinyin: 'xué Zhōngwén yào xué de hǎo', french: 'Apprendre le chinois, il faut bien l\'apprendre' },
        ],
      },
      {
        id: 'conditionnel',
        title: 'Conditionnel et hypothèse',
        grammarPoint: 'Si conditionnel : 如果...就 (rúguǒ...jiù)',
        grammarExplanation: `如果 (rúguǒ) = "si". 就 (jiù) = "alors" (dans la conséquence).
Structure : 如果 + condition, 就 + conséquence.
Exemple : 如果下雨，我就不去 (rúguǒ xià yǔ, wǒ jiù bù qù) = "S'il pleut, je n'irai pas".`,
        phrases: [
          { chinese: '如果下雨，我就不去', pinyin: 'rúguǒ xià yǔ, wǒ jiù bù qù', french: 'S\'il pleut, je n\'irai pas' },
          { chinese: '如果你来，我就很高兴', pinyin: 'rúguǒ nǐ lái, wǒ jiù hěn gāoxìng', french: 'Si tu viens, je serai très content' },
          { chinese: '你有时间的话，我们一起吃饭', pinyin: 'nǐ yǒu shíjiān de huà, wǒmen yīqǐ chīfàn', french: 'Si tu as le temps, on mange ensemble' },
          { chinese: '就算很难，我也要学', pinyin: 'jiùsuàn hěn nán, wǒ yě yào xué', french: 'Même si c\'est difficile, je veux apprendre' },
          { chinese: '要不是你帮我，我做不完', pinyin: 'yàobùshì nǐ bāng wǒ, wǒ zuò bù wán', french: 'Si tu ne m\'avais pas aidé, je n\'aurais pas fini' },
        ],
      },
    ],
  },
};

export default phrasesData;
