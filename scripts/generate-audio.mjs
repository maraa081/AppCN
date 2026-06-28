/**
 * Script de génération audio via edge-tts
 * Usage: node scripts/generate-audio.mjs
 *
 * Extrait tout le contenu des modules et génère les fichiers MP3
 * via edge-tts (CLI Python). Ignore les fichiers déjà existants.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const AUDIO_DIR = resolve(ROOT, 'public/audio');

// Voix edge-tts disponibles
const VOICES = {
  female: 'zh-CN-XiaoxiaoNeural',
  male: 'zh-CN-YunxiNeural',
};

// Collecte toutes les phrases des data files
function collectContent() {
  const items = [];

  // === 1. Syllabes pinyin du module Prononciation ===
  const pronData = readJsFile('src/modules/Pronunciation/data.js');
  if (pronData) {
    const syllables = new Set();
    const extractSyllables = (obj) => {
      if (!obj) return;
      if (Array.isArray(obj.syllables)) {
        obj.syllables.forEach(s => {
          if (s.pinyin) syllables.add(s.pinyin);
        });
      }
      if (obj.levels) {
        Object.values(obj.levels).forEach(level => {
          if (Array.isArray(level)) {
            level.forEach(lesson => extractSyllables(lesson));
          }
        });
      }
    };
    extractSyllables(pronData);
    syllables.forEach(pinyin => {
      items.push({
        type: 'syllable',
        id: pinyin,
        text: pinyin,
        voice: VOICES.female,
        subdir: 'syllable',
        filename: `${pinyin}.mp3`,
      });
    });
  }

  // === 2. Mots de vocabulaire ===
  const vocabData = readJsFile('src/modules/Vocabulary/data.js');
  if (vocabData && Array.isArray(vocabData.words)) {
    vocabData.words.forEach(word => {
      if (word.hanzi) {
        items.push({
          type: 'vocab',
          id: word.id,
          text: word.hanzi,
          voice: VOICES.female,
          subdir: 'vocab',
          filename: `${word.id}.mp3`,
        });
        // Version lente
        items.push({
          type: 'vocab_slow',
          id: word.id,
          text: word.hanzi,
          voice: VOICES.female,
          subdir: 'vocab',
          filename: `${word.id}_slow.mp3`,
          rate: '-30%',
        });
      }
    });
  }

  // === 3. Phrases du module Phrases ===
  const phraseData = readJsFile('src/modules/Phrases/data.js');
  if (phraseData && phraseData.levels) {
    let phraseIdx = 0;
    Object.entries(phraseData.levels).forEach(([level, lessons]) => {
      if (Array.isArray(lessons)) {
        lessons.forEach(lesson => {
          if (Array.isArray(lesson.phrases)) {
            lesson.phrases.forEach((phrase, pidx) => {
              if (phrase.chinese) {
                const id = `${lesson.id}_${pidx}`;
                items.push({
                  type: 'phrase',
                  id,
                  text: phrase.chinese,
                  voice: VOICES.female,
                  subdir: 'phrase',
                  filename: `${id}.mp3`,
                });
                // Version lente
                items.push({
                  type: 'phrase_slow',
                  id,
                  text: phrase.chinese,
                  voice: VOICES.female,
                  subdir: 'phrase',
                  filename: `${id}_slow.mp3`,
                  rate: '-30%',
                });
                phraseIdx++;
              }
            });
          }
        });
      }
    });
  }

  // === 4. Paires minimales (les deux mots de chaque paire) ===
  if (pronData) {
    const extractPairs = (obj) => {
      if (!obj) return;
      if (obj.levels) {
        Object.values(obj.levels).forEach(level => {
          if (Array.isArray(level)) {
            level.forEach(lesson => {
              if (Array.isArray(lesson.pairs)) {
                lesson.pairs.forEach((pair, idx) => {
                  ['a', 'b'].forEach(side => {
                    const p = pair[side];
                    if (p && p.pinyin) {
                      items.push({
                        type: 'pair',
                        id: `pair_${lesson.id}_${idx}_${side}`,
                        text: p.pinyin,
                        voice: VOICES.male,
                        subdir: 'pair',
                        filename: `pair_${lesson.id}_${idx}_${side}.mp3`,
                      });
                      items.push({
                        type: 'pair_slow',
                        id: `pair_${lesson.id}_${idx}_${side}`,
                        text: p.pinyin,
                        voice: VOICES.male,
                        subdir: 'pair',
                        filename: `pair_${lesson.id}_${idx}_${side}_slow.mp3`,
                        rate: '-30%',
                      });
                    }
                  });
                });
              }
            });
          }
        });
      }
    };
    extractPairs(pronData);
  }

  return items;
}

/**
 * Lit un fichier JS de data et essaie d'en extraire l'objet
 * en remplaçant l'export par un JSON via require dynamique.
 * Fallback: regex extraction du contenu textuel.
 */
function readJsFile(relPath) {
  const fullPath = resolve(ROOT, relPath);
  if (!existsSync(fullPath)) {
    console.warn(`⚠️  Fichier non trouvé: ${relPath}`);
    return null;
  }

  try {
    const content = readFileSync(fullPath, 'utf-8');
    // Extraction basique pour les structures connues
    return parseJsData(content);
  } catch (e) {
    console.warn(`⚠️  Erreur lecture ${relPath}: ${e.message}`);
    return null;
  }
}

/**
 * Parse simplifié des data files JS en extrayant les infos essentielles
 * via regex. Suffisant pour extraire le texte à synthétiser.
 */
function parseJsData(content) {
  const result = {};

  // Détecter les mots de vocabulaire
  if (content.includes('words:')) {
    result.words = [];
    const wordRegex = /id:\s*'([^']+)'[^}]*hanzi:\s*'([^']+)'/g;
    let match;
    while ((match = wordRegex.exec(content)) !== null) {
      result.words.push({ id: match[1], hanzi: match[2] });
    }
  }

  // Détecter les syllabes
  if (content.includes('syllables:')) {
    result.syllables = [];
    const sylRegex = /pinyin:\s*'([^']+)'/g;
    let match;
    while ((match = sylRegex.exec(content)) !== null) {
      result.syllables.push({ pinyin: match[1] });
    }
  }

  // Détecter les phrases
  if (content.includes('chinese:')) {
    result.phrases = [];
    const phraseRegex = /chinese:\s*'([^']+)'/g;
    let match;
    while ((match = phraseRegex.exec(content)) !== null) {
      result.phrases.push({ text: match[1] });
    }
  }

  // Détecter les niveaux/leçons
  if (content.includes('levels:')) {
    result.levels = {};
    const levelRegex = /(debutant|intermediaire|avance):\s*\[/g;
    while ((match = levelRegex.exec(content)) !== null) {
      result.levels[match[1]] = true;
    }
  }

  // Détecter les paires
  if (content.includes('pairs:')) {
    result.pairs = [];
    const pairARegex = /a:\s*\{[^}]*pinyin:\s*'([^']+)'/g;
    const pairBRegex = /b:\s*\{[^}]*pinyin:\s*'([^']+)'/g;
    let match;
    while ((match = pairARegex.exec(content)) !== null) {
      result.pairs.push({ a: { pinyin: match[1] } });
    }
    // Même approche pour B (simplifié)
  }

  return result;
}

/**
 * Extrait les infos de leçons depuis le contenu du module Phrases
 */
function extractPhraseLessons(content) {
  const lessons = [];
  const lessonRegex = /id:\s*'([^']+)'[^}]*phrases:\s*\[([\s\S]*?)\]/g;
  let match;
  while ((match = lessonRegex.exec(content)) !== null) {
    const lessonId = match[1];
    const phrases = [];
    const chineseRegex = /chinese:\s*'([^']+)'/g;
    let pmatch;
    while ((pmatch = chineseRegex.exec(match[2])) !== null) {
      phrases.push({ chinese: pmatch[1] });
    }
    if (phrases.length > 0) {
      lessons.push({ id: lessonId, phrases });
    }
  }
  return lessons;
}

/**
 * Génère un fichier audio avec edge-tts
 */
async function generateAudio(item, force = false) {
  const outDir = resolve(AUDIO_DIR, item.subdir);
  const outFile = resolve(outDir, item.filename);

  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }

  if (existsSync(outFile) && !force) {
    return { status: 'skipped', file: item.filename };
  }

  const rate = item.rate || '+0%';
  const cmd = `edge-tts --voice ${item.voice} --text "${escapeShell(item.text)}" --rate=${rate} --write-media "${outFile}"`;

  try {
    execSync(cmd, { timeout: 30000, stdio: 'pipe' });
    return { status: 'generated', file: item.filename };
  } catch (e) {
    return { status: 'error', file: item.filename, error: e.message };
  }
}

function escapeShell(s) {
  return s.replace(/"/g, '\\"').replace(/\n/g, ' ').replace(/'/g, "'\\''");
}

/**
 * Point d'entrée
 */
async function main() {
  console.log('🔊 AppCN — Génération audio via edge-tts');
  console.log(`   Voix: ${VOICES.female} (femme) + ${VOICES.male} (homme)\n`);

  const items = collectContent();
  console.log(`📋 ${items.length} fichiers audio à générer\n`);

  let generated = 0;
  let skipped = 0;
  let errors = 0;
  let batch = 0;
  const BATCH_SIZE = 5;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const result = await generateAudio(item);

    if (result.status === 'generated') {
      generated++;
      console.log(`✅ [${i + 1}/${items.length}] ${item.type}: ${item.filename}`);
    } else if (result.status === 'skipped') {
      skipped++;
    } else {
      errors++;
      console.log(`❌ [${i + 1}/${items.length}] ${item.type}: ${item.filename} — ${result.error}`);
    }

    // Petite pause entre les lots pour éviter de surcharger
    batch++;
    if (batch >= BATCH_SIZE) {
      batch = 0;
      await new Promise(r => setTimeout(r, 500));
    }
  }

  console.log(`\n📊 Résumé:`);
  console.log(`   Générés: ${generated}`);
  console.log(`   Skippés: ${skipped}`);
  console.log(`   Erreurs: ${errors}`);
  console.log(`   Total:   ${items.length}`);
}

main().catch(console.error);
