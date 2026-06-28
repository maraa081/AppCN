/**
 * Données du module Vocabulaire
 * Chaque mot : { id, hanzi, pinyin, french, theme, level, jpKanji?, jpNote?, jpSameReading? }
 * jpKanji indique si le hanzi est identique/similaire à un kanji japonais
 * jpNote donne une info comparative
 */

const vocabularyData = {
  id: 'vocabulary',
  title: 'Vocabulaire',
  themes: {
    salutations: { name: 'Salutations & Politesse', icon: '👋' },
    famille: { name: 'Famille & Relations', icon: '👨‍👩‍👧‍👧' },
    quotidien: { name: 'Vie quotidienne', icon: '☕' },
    nombres: { name: 'Nombres & Quantité', icon: '🔢' },
    nourriture: { name: 'Nourriture & Boissons', icon: '🍜' },
    voyage: { name: 'Voyage & Direction', icon: '✈️' },
    travail: { name: 'Travail & Études', icon: '💼' },
    nature: { name: 'Nature & Corps', icon: '🌿' },
    couleurs: { name: 'Couleurs & Formes', icon: '🎨' },
  },
  words: [
    // === DÉBUTANT — Salutations ===
    { id: 'w1', hanzi: '你好', pinyin: 'nǐ hǎo', french: 'Bonjour / Salut', theme: 'salutations', level: 'debutant' },
    { id: 'w2', hanzi: '再见', pinyin: 'zài jiàn', french: 'Au revoir', theme: 'salutations', level: 'debutant' },
    { id: 'w3', hanzi: '谢谢', pinyin: 'xiè xiè', french: 'Merci', theme: 'salutations', level: 'debutant' },
    { id: 'w4', hanzi: '对不起', pinyin: 'duì bu qǐ', french: 'Pardon / Désolé', theme: 'salutations', level: 'debutant' },
    { id: 'w5', hanzi: '没关系', pinyin: 'méi guān xì', french: 'Pas de problème / De rien', theme: 'salutations', level: 'debutant', jpKanji: true, jpNote: '关系 (guānxì) = relation. En japonais 関係 = kankei. Sens proche !' },
    { id: 'w6', hanzi: '请', pinyin: 'qǐng', french: 'S\'il vous plaît / Inviter', theme: 'salutations', level: 'debutant', jpKanji: true, jpNote: '知らせ (shirase) au Japon, mais 请 (qǐng) en chinois = "inviter / s\'il vous plaît". Même caractère que 請 en japonais !' },
    { id: 'w7', hanzi: '不客气', pinyin: 'bú kè qì', french: 'De rien (litt. pas poli)', theme: 'salutations', level: 'debutant' },
    { id: 'w8', hanzi: '早上好', pinyin: 'zǎo shang hǎo', french: 'Bonjour (matin)', theme: 'salutations', level: 'debutant' },
    { id: 'w9', hanzi: '晚上好', pinyin: 'wǎn shang hǎo', french: 'Bonsoir', theme: 'salutations', level: 'debutant' },

    // === DÉBUTANT — Famille ===
    { id: 'w10', hanzi: '爸爸', pinyin: 'bà ba', french: 'Papa', theme: 'famille', level: 'debutant', jpKanji: true, jpNote: 'Même caractère qu\'en japonais ! En chinois, prononcé bà, en japonais 父 (chichi/とう). La redoublement 爸爸 est typiquement chinois.' },
    { id: 'w11', hanzi: '妈妈', pinyin: 'mā ma', french: 'Maman', theme: 'famille', level: 'debutant', jpKanji: true, jpNote: 'Comme 父, 母 se dit mā en chinois, はは (haha) en japonais.' },
    { id: 'w12', hanzi: '哥哥', pinyin: 'gē ge', french: 'Grand frère', theme: 'famille', level: 'debutant', jpKanji: true, jpNote: '兄 (ani/にい) en japonais. Même racine mais prononciation totalement différente.' },
    { id: 'w13', hanzi: '姐姐', pinyin: 'jiě jie', french: 'Grande sœur', theme: 'famille', level: 'debutant' },
    { id: 'w14', hanzi: '妹妹', pinyin: 'mèi mei', french: 'Petite sœur', theme: 'famille', level: 'debutant' },
    { id: 'w15', hanzi: '朋友', pinyin: 'péng yǒu', french: 'Ami(e)', theme: 'famille', level: 'debutant', jpKanji: true, jpNote: '友人 (yūjin) en japonais. Même caractère 友 mais en chinois c\'est 朋友 (péngyou), en japonais 友達 (tomodachi).' },

    // === DÉBUTANT — Nombres ===
    { id: 'w16', hanzi: '一', pinyin: 'yī', french: 'Un', theme: 'nombres', level: 'debutant', jpKanji: true, jpNote: '一 = un partout, mais lecture chinoise yī vs japonaise ichi/ひと' },
    { id: 'w17', hanzi: '二', pinyin: 'èr', french: 'Deux', theme: 'nombres', level: 'debutant', jpKanji: true, jpNote: '二 = deux, èr vs ni/ふた' },
    { id: 'w18', hanzi: '三', pinyin: 'sān', french: 'Trois', theme: 'nombres', level: 'debutant', jpKanji: true },
    { id: 'w19', hanzi: '四', pinyin: 'sì', french: 'Quatre', theme: 'nombres', level: 'debutant', jpKanji: true, jpNote: '四 = 4, sì vs shi/よん' },
    { id: 'w20', hanzi: '五', pinyin: 'wǔ', french: 'Cinq', theme: 'nombres', level: 'debutant', jpKanji: true },
    { id: 'w21', hanzi: '六', pinyin: 'liù', french: 'Six', theme: 'nombres', level: 'debutant', jpKanji: true, jpNote: '六 = 6, liù vs roku/む' },
    { id: 'w22', hanzi: '七', pinyin: 'qī', french: 'Sept', theme: 'nombres', level: 'debutant', jpKanji: true },
    { id: 'w23', hanzi: '八', pinyin: 'bā', french: 'Huit', theme: 'nombres', level: 'debutant', jpKanji: true },
    { id: 'w24', hanzi: '九', pinyin: 'jiǔ', french: 'Neuf', theme: 'nombres', level: 'debutant', jpKanji: true },
    { id: 'w25', hanzi: '十', pinyin: 'shí', french: 'Dix', theme: 'nombres', level: 'debutant', jpKanji: true },
    { id: 'w26', hanzi: '百', pinyin: 'bǎi', french: 'Cent', theme: 'nombres', level: 'debutant', jpKanji: true, jpNote: '百 = cent, bǎi vs hyaku' },
    { id: 'w27', hanzi: '千', pinyin: 'qiān', french: 'Mille', theme: 'nombres', level: 'debutant', jpKanji: true },

    // === DÉBUTANT — Vie quotidienne ===
    { id: 'w28', hanzi: '水', pinyin: 'shuǐ', french: 'Eau', theme: 'quotidien', level: 'debutant', jpKanji: true, jpNote: '水 = eau, shuǐ vs mizu/すい' },
    { id: 'w29', hanzi: '茶', pinyin: 'chá', french: 'Thé', theme: 'quotidien', level: 'debutant', jpKanji: true, jpNote: '茶 = thé, chá vs cha. Même caractère, prononciation proche !' },
    { id: 'w30', hanzi: '咖啡', pinyin: 'kā fēi', french: 'Café', theme: 'quotidien', level: 'debutant', jpKanji: false },
    { id: 'w31', hanzi: '米饭', pinyin: 'mǐ fàn', french: 'Riz cuit', theme: 'quotidien', level: 'debutant' },
    { id: 'w32', hanzi: '书', pinyin: 'shū', french: 'Livre', theme: 'quotidien', level: 'debutant', jpKanji: true, jpNote: '书 (simplifié) = 書 (trad/jp). shū vs sho/かく' },
    { id: 'w33', hanzi: '电话', pinyin: 'diàn huà', french: 'Téléphone', theme: 'quotidien', level: 'debutant' },
    { id: 'w34', hanzi: '电脑', pinyin: 'diàn nǎo', french: 'Ordinateur', theme: 'quotidien', level: 'debutant' },
    { id: 'w35', hanzi: '手表', pinyin: 'shǒu biǎo', french: 'Montre (poignet)', theme: 'quotidien', level: 'debutant' },
    { id: 'w36', hanzi: '衣服', pinyin: 'yī fu', french: 'Vêtements', theme: 'quotidien', level: 'debutant' },
    { id: 'w37', hanzi: '家', pinyin: 'jiā', french: 'Maison / Famille', theme: 'quotidien', level: 'debutant', jpKanji: true, jpNote: '家 = maison, jiā vs ie/うち/か. Même caractère mais usage un peu différent.' },

    // === DÉBUTANT — Nourriture ===
    { id: 'w38', hanzi: '吃', pinyin: 'chī', french: 'Manger', theme: 'nourriture', level: 'debutant' },
    { id: 'w39', hanzi: '喝', pinyin: 'hē', french: 'Boire', theme: 'nourriture', level: 'debutant' },
    { id: 'w40', hanzi: '苹果', pinyin: 'píng guǒ', french: 'Pomme', theme: 'nourriture', level: 'debutant' },
    { id: 'w41', hanzi: '牛奶', pinyin: 'niú nǎi', french: 'Lait', theme: 'nourriture', level: 'debutant' },
    { id: 'w42', hanzi: '面包', pinyin: 'miàn bāo', french: 'Pain', theme: 'nourriture', level: 'debutant' },
    { id: 'w43', hanzi: '肉', pinyin: 'ròu', french: 'Viande', theme: 'nourriture', level: 'debutant', jpKanji: true, jpNote: '肉 = viande, ròu vs niku. Kanji identique.' },
    { id: 'w44', hanzi: '鸡蛋', pinyin: 'jī dàn', french: 'Œuf (de poule)', theme: 'nourriture', level: 'debutant' },

    // === INTERMÉDIAIRE ===
    { id: 'w45', hanzi: '时间', pinyin: 'shí jiān', french: 'Temps (durée)', theme: 'quotidien', level: 'intermediaire' },
    { id: 'w46', hanzi: '今天', pinyin: 'jīn tiān', french: 'Aujourd\'hui', theme: 'quotidien', level: 'intermediaire', jpKanji: true, jpNote: '今日 en japonais = kyō/こんにち. 今天 (jīntiān) en chinois. Même idée ("ce jour"), lecture différente.' },
    { id: 'w47', hanzi: '明天', pinyin: 'míng tiān', french: 'Demain', theme: 'quotidien', level: 'intermediaire', jpKanji: true, jpNote: '明日 = ashita/明 day demain aussi ! En chinois míngtiān.' },
    { id: 'w48', hanzi: '昨天', pinyin: 'zuó tiān', french: 'Hier', theme: 'quotidien', level: 'intermediaire' },
    { id: 'w49', hanzi: '星期', pinyin: 'xīng qī', french: 'Semaine', theme: 'quotidien', level: 'intermediaire' },
    { id: 'w50', hanzi: '学校', pinyin: 'xué xiào', french: 'École', theme: 'travail', level: 'intermediaire', jpKanji: true, jpNote: '学校 = gakkō en japonais, xuéxiào en chinois. Mêmes caractères !' },
    { id: 'w51', hanzi: '老师', pinyin: 'lǎo shī', french: 'Professeur', theme: 'travail', level: 'intermediaire' },
    { id: 'w52', hanzi: '学生', pinyin: 'xué shēng', french: 'Étudiant', theme: 'travail', level: 'intermediaire', jpKanji: true, jpNote: '学生 = gakusei en japonais, xuéshēng en chinois. Mêmes caractères !' },
    { id: 'w53', hanzi: '汉语', pinyin: 'hàn yǔ', french: 'Langue chinoise', theme: 'travail', level: 'intermediaire' },
    { id: 'w54', hanzi: '英语', pinyin: 'yīng yǔ', french: 'Langue anglaise', theme: 'travail', level: 'intermediaire' },
    { id: 'w55', hanzi: '法国', pinyin: 'fǎ guó', french: 'France', theme: 'voyage', level: 'intermediaire' },
    { id: 'w56', hanzi: '中国', pinyin: 'zhōng guó', french: 'Chine', theme: 'voyage', level: 'intermediaire', jpKanji: true, jpNote: '中国 = ちゅうごく (chūgoku) en japonais ! Mêmes caractères.' },
    { id: 'w57', hanzi: '日本', pinyin: 'rì běn', french: 'Japon', theme: 'voyage', level: 'intermediaire', jpKanji: true, jpNote: '日本 = にほん (nihon) en japonais. Mêmes caractères exacts.' },
    { id: 'w58', hanzi: '医院', pinyin: 'yī yuàn', french: 'Hôpital', theme: 'voyage', level: 'intermediaire', jpKanji: true, jpNote: '医院 = いいん (iin) en japonais. Mêmes caractères !' },
    { id: 'w59', hanzi: '钱', pinyin: 'qián', french: 'Argent', theme: 'voyage', level: 'intermediaire', jpKanji: true, jpNote: '钱 (simplifié) = 錢 (trad/jp). En japonais 金 (kane/きん) est plus courant pour "argent".' },
    { id: 'w60', hanzi: '贵', pinyin: 'guì', french: 'Cher (prix élevé)', theme: 'voyage', level: 'intermediaire', jpKanji: true, jpNote: '貴 (trad) = noble/cher. Même sens en japonais (貴い = toutoi, précieux).' },
    { id: 'w61', hanzi: '便宜', pinyin: 'pián yi', french: 'Bon marché', theme: 'voyage', level: 'intermediaire' },
    { id: 'w62', hanzi: '喜欢', pinyin: 'xǐ huān', french: 'Aimer / Apprécier', theme: 'quotidien', level: 'intermediaire' },
    { id: 'w63', hanzi: '知道', pinyin: 'zhī dào', french: 'Savoir / Connaître (fait)', theme: 'quotidien', level: 'intermediaire' },
    { id: 'w64', hanzi: '认识', pinyin: 'rèn shi', french: 'Connaître (qqn)', theme: 'quotidien', level: 'intermediaire', jpKanji: true, jpNote: '認識 (ninshiki) en japonais = "reconnaissance". 认识 (rènshi) en chinois = "connaître (qqn)".' },

    // === AVANCÉ ===
    { id: 'w65', hanzi: '经济', pinyin: 'jīng jì', french: 'Économie', theme: 'travail', level: 'avance', jpKanji: true, jpNote: '経済 = keizai en japonais. Mêmes caractères !' },
    { id: 'w66', hanzi: '社会', pinyin: 'shè huì', french: 'Société', theme: 'travail', level: 'avance', jpKanji: true, jpNote: '社会 = shakai en japonais. Mêmes caractères !' },
    { id: 'w67', hanzi: '文化', pinyin: 'wén huà', french: 'Culture', theme: 'travail', level: 'avance', jpKanji: true, jpNote: '文化 = bunka en japonais. Mêmes caractères !' },
    { id: 'w68', hanzi: '国际', pinyin: 'guó jì', french: 'International', theme: 'travail', level: 'avance', jpKanji: true, jpNote: '国際 = kokusai en japonais. 国际 est la version simplifiée.' },
    { id: 'w69', hanzi: '关系', pinyin: 'guān xì', french: 'Relation / Lien', theme: 'travail', level: 'avance', jpKanji: true, jpNote: '関係 = kankei en japonais. Mêmes caractères (关 est la version simplifiée de 關).' },
    { id: 'w70', hanzi: '问题', pinyin: 'wèn tí', french: 'Problème / Question', theme: 'travail', level: 'avance', jpKanji: true, jpNote: '問題 = mondai en japonais. Mêmes caractères (问 simplifié de 問).' },
    { id: 'w71', hanzi: '发展', pinyin: 'fā zhǎn', french: 'Développement', theme: 'travail', level: 'avance', jpKanji: true, jpNote: '発展 = hatten en japonais. Sens proche mais usage différent.' },
    { id: 'w72', hanzi: '学习', pinyin: 'xué xí', french: 'Étudier / Apprendre', theme: 'travail', level: 'avance', jpKanji: true, jpNote: '学習 = gakushū en japonais. Mêmes caractères !' },
    { id: 'w73', hanzi: '决定', pinyin: 'jué dìng', french: 'Décider / Décision', theme: 'quotidien', level: 'avance', jpKanji: true, jpNote: '決定 = kettei en japonais. Mêmes caractères !' },
    { id: 'w74', hanzi: '经验', pinyin: 'jīng yàn', french: 'Expérience', theme: 'travail', level: 'avance', jpKanji: true, jpNote: '経験 = keiken en japonais. Mêmes caractères (验 simplifié de 驗).' },
    { id: 'w75', hanzi: '意思', pinyin: 'yì si', french: 'Sens / Signification', theme: 'quotidien', level: 'avance', jpKanji: true, jpNote: '意思 = ishi en japonais = "intention". En chinois = "sens/signification". Attention au faux ami !' },
    { id: 'w76', hanzi: '特别', pinyin: 'tè bié', french: 'Spécial / Particulièrement', theme: 'quotidien', level: 'avance' },
    { id: 'w77', hanzi: '开始', pinyin: 'kāi shǐ', french: 'Commencer', theme: 'quotidien', level: 'avance', jpKanji: true, jpNote: '開始 = kaishi en japonais. Mêmes caractères !' },
    { id: 'w78', hanzi: '可以', pinyin: 'kě yǐ', french: 'Pouvoir / Être permis', theme: 'quotidien', level: 'avance' },
    { id: 'w79', hanzi: '应该', pinyin: 'yīng gāi', french: 'Devoir (il faut)', theme: 'quotidien', level: 'avance' },
    { id: 'w80', hanzi: '因为', pinyin: 'yīn wèi', french: 'Parce que', theme: 'quotidien', level: 'avance' },
    { id: 'w81', hanzi: '所以', pinyin: 'suǒ yǐ', french: 'Donc / C\'est pourquoi', theme: 'quotidien', level: 'avance' },
    { id: 'w82', hanzi: '虽然', pinyin: 'suī rán', french: 'Bien que', theme: 'quotidien', level: 'avance' },
    { id: 'w83', hanzi: '但是', pinyin: 'dàn shì', french: 'Mais / Cependant', theme: 'quotidien', level: 'avance', jpKanji: true, jpNote: '但し (tadashi) en japonais = "toutefois". Même caractère, usage proche !' },
    { id: 'w84', hanzi: '已经', pinyin: 'yǐ jīng', french: 'Déjà', theme: 'quotidien', level: 'avance', jpKanji: true, jpNote: '已經 = sudeni en japonais. En chinois = "déjà", même sens !' },
    { id: 'w85', hanzi: '可能', pinyin: 'kě néng', french: 'Peut-être / Possible', theme: 'quotidien', level: 'avance', jpKanji: true, jpNote: '可能 = kanō en japonais. Mêmes caractères !' },
    { id: 'w86', hanzi: '漂亮', pinyin: 'piào liang', french: 'Beau / Jolie', theme: 'quotidien', level: 'avance' },
    { id: 'w87', hanzi: '努力', pinyin: 'nǔ lì', french: 'Faire des efforts / Studieux', theme: 'travail', level: 'avance', jpKanji: true, jpNote: '努力 = doryoku en japonais. Mêmes caractères, même sens !' },
  ],
};

export default vocabularyData;
