#!/usr/bin/env python3
"""
AppCN — Générateur audio via edge-tts + manifest JSON
Usage: python3 scripts/generate-audio.py [--force]

Génère les fichiers MP3 + un manifest.json pour le mapping texte→audio.
Les fichiers sont dans public/audio/ (servis statiquement par Vite).
"""

import os
import sys
import json
import asyncio
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
AUDIO_DIR = ROOT / "public" / "audio"
VOICE_FEMALE = "zh-CN-XiaoxiaoNeural"
VOICE_MALE = "zh-CN-YunxiNeural"

# === Contenu ===
# (type, filename, text, voice, rate)
CONTENT = []

# --- 1. Syllabes ---
SYLLABLES = [
    "mā", "má", "mǎ", "mà", "ma",
    "bā", "pā", "bō", "pō", "bǐ", "pǐ",
    "dā", "tā", "dì", "tì", "dú", "tú",
    "gē", "kē", "gǔ", "kǔ",
    "zhī", "zhí", "zhǐ", "zhì",
    "chī", "chí", "chǐ", "chì",
    "shī", "shí", "shǐ", "shì",
    "rì", "rè", "rén", "rǎn",
    "jī", "jí", "jǐ", "jì",
    "qī", "qí", "qǐ", "qì",
    "xī", "xí", "xǐ", "xì",
    "zā", "cā", "zì", "cì",
    "āi", "ái", "ǎi", "ài",
    "ēi", "éi", "ěi", "èi",
    "āo", "áo", "ǎo", "ào",
    "ān", "án", "ǎn", "àn",
    "ēn", "én", "ěn", "èn",
    "āng", "áng", "ǎng", "àng",
    "yī", "yí", "yǐ", "yì",
    "yú", "wǒ", "nǐ", "tā",
    "hǎo", "xiè", "zài", "jiàn",
    "shì", "xué", "shēng", "lǎo",
    "shuǐ", "chī", "hē", "fàn",
    "māo", "gǒu", "niǎo", "yú",
    "bēi", "běn", "zhāng", "tiáo",
    "gè", "zhǐ", "liǎng", "sān",
    "kāi", "guān", "dǎ", "fàng",
]

for s in SYLLABLES:
    CONTENT.append(("syllable", f"{s}.mp3", s, VOICE_FEMALE, "+0%"))
    CONTENT.append(("syllable_slow", f"{s}_slow.mp3", s, VOICE_FEMALE, "-30%"))

# --- 2. Vocabulaire ---
VOCAB = [
    "你好", "再见", "谢谢", "对不起", "没关系", "请", "不客气", "早上好", "晚上好",
    "爸爸", "妈妈", "哥哥", "姐姐", "妹妹", "朋友",
    "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "百", "千",
    "水", "茶", "咖啡", "米饭", "书", "电话", "电脑", "手表", "衣服", "家",
    "吃", "喝", "苹果", "牛奶", "面包", "肉", "鸡蛋",
    "时间", "今天", "明天", "昨天", "星期", "学校", "老师", "学生",
    "汉语", "英语", "法国", "中国", "日本", "医院", "钱",
    "喜欢", "知道", "认识", "便宜",
    "经济", "社会", "文化", "国际", "关系", "问题", "发展", "学习",
    "决定", "经验", "意思", "特别", "开始", "可以", "应该",
    "因为", "所以", "虽然", "但是", "已经", "可能", "漂亮", "努力",
    "贵", "吃猪肉",
]

for i, hanzi in enumerate(VOCAB):
    wid = f"w{i+1}"
    CONTENT.append(("vocab", f"{wid}.mp3", hanzi, VOICE_FEMALE, "+0%"))
    CONTENT.append(("vocab_slow", f"{wid}_slow.mp3", hanzi, VOICE_FEMALE, "-30%"))

# --- 3. Phrases ---
PHRASES = [
    "你好", "你好吗？", "我很好", "谢谢", "再见",
    "你是学生吗？", "我是学生", "早上好",
    "我叫马克西姆", "我是法国人", "你叫什么名字？",
    "她是医生", "他是老师", "很高兴认识你", "我今年二十岁",
    "我吃饭了", "我饿了", "她去学校了",
    "你喝水吗？", "我喝水", "他睡觉了", "我回家了",
    "你是中国人吗？", "我会说中文",
    "你会说法语吗？", "我说一点中文", "他是日本人",
    "我在学中文",
    "我有一本书", "我没有钱", "你想吃什么？",
    "我想喝茶", "你有车吗？", "我有两个姐姐", "我想去中国",
    "我要去北京", "飞机几点到？", "我在等出租车",
    "这个多少钱？", "有没有房间？", "我迷路了", "请帮我一下",
    "他比我高", "中文比英文难", "你和我一样高",
    "这个更好", "她跑得比我快", "今天比昨天热",
    "这是我的书", "她说得很快", "他高兴地笑了",
    "你说得对", "红色的车", "学中文要学得好",
]

for i, text in enumerate(PHRASES):
    pid = f"p{i+1}"
    CONTENT.append(("phrase", f"{pid}.mp3", text, VOICE_FEMALE, "+0%"))
    CONTENT.append(("phrase_slow", f"{pid}_slow.mp3", text, VOICE_FEMALE, "-30%"))

# --- 4. Paires minimales (voix masculine) ---
PAIRS = [
    "mā", "mǎ", "mǎi", "mài", "shū", "shù",
    "shuì", "shuǐ", "xī", "xì",
    "nǐ hǎo", "ní hǎo", "bù duì", "bú duì",
]

for i, pinyin in enumerate(PAIRS):
    CONTENT.append(("pair", f"pair_{i}.mp3", pinyin, VOICE_MALE, "+0%"))
    CONTENT.append(("pair_slow", f"pair_{i}_slow.mp3", pinyin, VOICE_MALE, "-30%"))

# --- 5. Extra (phrases avancées) ---
EXTRA = [
    "我喜欢学习中文", "请把门打开", "我把书放在桌上了",
    "如果下雨我就不去", "你的作业做完了吗？",
    "我昨天买了一本书", "你怎么去学校？",
    "一个星期有七天", "请问厕所在哪里？",
    "这个菜太好吃了",
]

for i, text in enumerate(EXTRA):
    eid = f"e{i+1}"
    CONTENT.append(("extra", f"{eid}.mp3", text, VOICE_FEMALE, "+0%"))
    CONTENT.append(("extra_slow", f"{eid}_slow.mp3", text, VOICE_FEMALE, "-30%"))


async def generate_one(entry, force=False):
    """Génère un fichier audio avec edge-tts."""
    dtype, filename, text, voice, rate = entry
    subdir = AUDIO_DIR / dtype
    out_file = subdir / filename
    subdir.mkdir(parents=True, exist_ok=True)

    if out_file.exists() and not force:
        return "skipped"

    cmd = [
        "edge-tts",
        "--voice", voice,
        "--text", text,
        "--rate", rate,
        "--write-media", str(out_file),
    ]

    try:
        proc = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        await proc.wait()
        if proc.returncode == 0:
            return "generated"
        else:
            err = (await proc.stderr.read()).decode()[:100]
            return f"error: {err}"
    except Exception as e:
        return f"error: {e}"


async def main():
    import argparse
    parser = argparse.ArgumentParser(description="Génère les fichiers audio pour AppCN")
    parser.add_argument("--force", action="store_true", help="Régénère tout")
    parser.add_argument("--voice", choices=["female", "male", "both"], default="both")
    args = parser.parse_args()

    print(f"🔊 AppCN — Génération audio edge-tts")
    print(f"   Voix: {VOICE_FEMALE} (f) + {VOICE_MALE} (m)")
    print(f"   {len(CONTENT)} fichiers\n")

    generated = 0
    skipped = 0
    errors = 0
    manifest = []

    for i, entry in enumerate(CONTENT):
        dtype, filename, text, voice, rate = entry

        # Filtrer par voix
        if args.voice == "female" and voice != VOICE_FEMALE:
            skipped += 1
            continue
        if args.voice == "male" and voice != VOICE_MALE:
            skipped += 1
            continue

        result = await generate_one(entry, args.force)

        # Ajouter au manifest (même si skipped — le fichier existe)
        manifest.append({
            "text": text,
            "path": f"{dtype}/{filename}",
            "type": dtype,
            "slow": "_slow" in filename,
        })

        if result == "generated":
            generated += 1
            rlabel = "lent" if rate == "-30%" else "normal"
            print(f"✅ [{i+1:3d}/{len(CONTENT)}] {dtype:15s} {rlabel:6s} | {text:20s}")
        elif result == "skipped":
            skipped += 1
        else:
            errors += 1
            print(f"❌ [{i+1:3d}/{len(CONTENT)}] {dtype:15s} | {text:20s} → {result}")

        if generated % 3 == 0 and result == "generated":
            await asyncio.sleep(0.3)

    # Écrire le manifest JSON
    manifest_path = AUDIO_DIR / "manifest.json"
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    print(f"\n📄 Manifest écrit: {manifest_path} ({len(manifest)} entrées)")

    print(f"\n📊 Résumé:")
    print(f"   ✅ Générés: {generated}  ⏭️  Skippés: {skipped}  ❌ Erreurs: {errors}")
    print(f"   📦 Total: {len(CONTENT)} fichiers → {AUDIO_DIR}")


if __name__ == "__main__":
    asyncio.run(main())
