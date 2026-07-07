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

RATES = [("", "-20%"), ("_slow", "-40%"), ("_native", "+0%")]

for s in SYLLABLES:
    for sfx, rate in RATES:
        CONTENT.append(("syllable" + sfx, f"{s}{sfx}.mp3", s, VOICE_FEMALE, rate))

# --- 2. Vocabulaire (lecture dynamique depuis data.js, avec vrais IDs) ---
VOCAB_ENTRIES = []
vocab_path = ROOT / "src/modules/Vocabulary/data.js"
try:
    import re
    with open(vocab_path, "r", encoding="utf-8") as f:
        js_content = f.read()
    matches = re.findall(r"id:\s*'(w\d+)'[^}]*?hanzi:\s*'([^']+)'", js_content, re.DOTALL)
    seen = set()
    for wid, hanzi in matches:
        if wid not in seen:
            seen.add(wid)
            VOCAB_ENTRIES.append((wid, hanzi))
    print(f"   {len(VOCAB_ENTRIES)} mots de vocabulaire chargés depuis data.js")
except Exception as e:
    print(f"   ⚠️  Erreur chargement vocabulaire: {e}")
    VOCAB_ENTRIES = [("w1", "你好")]

for wid, hanzi in VOCAB_ENTRIES:
    for sfx, rate in RATES:
        CONTENT.append(("vocab" + sfx, f"{wid}{sfx}.mp3", hanzi, VOICE_FEMALE, rate))

# --- 3. Phrases (lecture dynamique depuis data.js) ---
PHRASES = []
phrase_path = ROOT / "src/modules/Phrases/data.js"
try:
    import re
    with open(phrase_path, "r", encoding="utf-8") as f:
        js_content = f.read()
    matches = re.findall(r"chinese:\s*'([^']+)'", js_content)
    seen = set()
    for txt in matches:
        if txt not in seen:
            seen.add(txt)
            PHRASES.append(txt)
    print(f"   {len(PHRASES)} phrases chargées depuis Phrases/data.js")
except Exception as e:
    print(f"   ⚠️  Erreur chargement phrases: {e}")
    PHRASES = ["你好"]

for i, text in enumerate(PHRASES):
    pid = f"p{i+1}"
    for sfx, rate in RATES:
        CONTENT.append(("phrase" + sfx, f"{pid}{sfx}.mp3", text, VOICE_FEMALE, rate))

# --- 4. Paires minimales (voix masculine) ---
PAIRS = [
    "mā", "mǎ", "mǎi", "mài", "shū", "shù",
    "shuì", "shuǐ", "xī", "xì",
    "nǐ hǎo", "ní hǎo", "bù duì", "bú duì",
]

for i, pinyin in enumerate(PAIRS):
    for sfx, rate in RATES:
        CONTENT.append(("pair" + sfx, f"pair_{i}{sfx}.mp3", pinyin, VOICE_MALE, rate))

# --- 5. Extra (phrases avancées) ---
# --- 5.5 Grammaire — exemples (voix féminine) ---
GRAMMAR_EXAMPLES = [
    ("我看书", "grammar_ex_1"),
    ("她做饭", "grammar_ex_2"),
    ("我喜欢猫", "grammar_ex_3"),
    ("我不吃辣", "grammar_ex_4"),
    ("我不吃猪肉", "grammar_ex_5"),
    ("他没来上课", "grammar_ex_6"),
    ("我没有车", "grammar_ex_7"),
    ("这个不好吃", "grammar_ex_8"),
    ("我不去", "grammar_ex_9"),
    ("你去不去？", "grammar_ex_10"),
    ("这是什么？", "grammar_ex_11"),
    ("他是谁？", "grammar_ex_12"),
    ("你在哪里？", "grammar_ex_13"),
    ("为什么？", "grammar_ex_14"),
    ("一个人", "grammar_ex_15"),
    ("两只猫", "grammar_ex_16"),
    ("三本书", "grammar_ex_17"),
    ("一杯水", "grammar_ex_18"),
    ("一张桌子", "grammar_ex_19"),
    ("五条鱼", "grammar_ex_20"),
]

for text, gid in GRAMMAR_EXAMPLES:
    for sfx, rate in RATES:
        CONTENT.append(("grammar" + sfx, f"{gid}{sfx}.mp3", text, VOICE_FEMALE, rate))


EXTRA = [
    "我喜欢学习中文", "请把门打开", "我把书放在桌上了",
    "如果下雨我就不去", "你的作业做完了吗？",
    "我昨天买了一本书", "你怎么去学校？",
    "一个星期有七天", "请问厕所在哪里？",
    "这个菜太好吃了",
]

for i, text in enumerate(EXTRA):
    eid = f"e{i+1}"
    for sfx, rate in RATES:
        CONTENT.append(("extra" + sfx, f"{eid}{sfx}.mp3", text, VOICE_FEMALE, rate))


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
