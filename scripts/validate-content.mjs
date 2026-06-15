/**
 * Content frontmatter validation for Latent Note.
 *
 * Validates all content in src/content/blog/ and src/content/notes/
 * against the schema rules defined in src/content.config.ts.
 *
 * Reads CATEGORIES, NOTE_COURSES, and NOTE_TUTORIALS dynamically
 * from src/consts.ts to avoid manual sync.
 *
 * Usage:
 *   node scripts/validate-content.mjs              # validate everything
 *   node scripts/validate-content.mjs --blog        # blog only
 *   node scripts/validate-content.mjs --notes       # notes only
 *   node scripts/validate-content.mjs --dir <path>  # specific directory
 *
 * Exit codes: 0 = pass, 1 = validation errors, 2 = usage error
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ── Read allowed values from src/consts.ts ───────────────────────

function extractConstArray(content, name) {
  // Match: export const NAME = [ ... ] as const;
  const regex = new RegExp(
    `export\\s+const\\s+${name}\\s*=\\s*\\[([\\s\\S]*?)\\]\\s*as\\s+const`,
    'm'
  );
  const match = content.match(regex);
  if (!match) return [];

  // Extract quoted strings from the array body
  const items = [];
  const stringRegex = /['"]([^'"]+)['"]/g;
  let m;
  while ((m = stringRegex.exec(match[1])) !== null) {
    items.push(m[1]);
  }
  return items;
}

function extractConstObjectKeys(content, name) {
  // Match: export const NAME = { 'key1': ..., 'key2': ... } as const;
  const regex = new RegExp(
    `export\\s+const\\s+${name}\\s*=\\s*\\{([\\s\\S]*?)\\}\\s*as\\s+const`,
    'm'
  );
  const match = content.match(regex);
  if (!match) return [];

  const keys = [];
  const keyRegex = /^\s*['"](\w[\w-]*)['"]\s*:/gm;
  let m;
  while ((m = keyRegex.exec(match[1])) !== null) {
    keys.push(m[1]);
  }
  return keys;
}

const constsPath = path.join(ROOT, 'src/consts.ts');
const constsSource = fs.readFileSync(constsPath, 'utf8');

const CATEGORIES = extractConstArray(constsSource, 'CATEGORIES');
const NOTE_COURSES = extractConstObjectKeys(constsSource, 'NOTE_COURSES');
const NOTE_TUTORIALS = extractConstObjectKeys(constsSource, 'NOTE_TUTORIALS');
const REGISTERED_DOC_GROUPS = new Set([...NOTE_COURSES, ...NOTE_TUTORIALS]);

if (CATEGORIES.length === 0) {
  console.error('⚠ Could not read CATEGORIES from src/consts.ts. Check the file format.');
  process.exit(2);
}

// ── CLI args ─────────────────────────────────────────────────────

const args = process.argv.slice(2);
let mode = 'all';
let customDir = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--blog') mode = 'blog';
  else if (args[i] === '--notes') mode = 'notes';
  else if (args[i] === '--dir' && args[i + 1]) { customDir = args[++i]; mode = 'dir'; }
  else if (args[i] === '--help' || args[i] === '-h') {
    console.log(`Usage: node scripts/validate-content.mjs [--blog|--notes|--dir <path>]`);
    process.exit(0);
  }
}

// ── Frontmatter parser (using gray-matter) ───────────────────────

function parseFrontmatter(content) {
  try {
    const { data } = matter(content);
    return Object.keys(data).length > 0 ? data : null;
  } catch {
    return null;
  }
}

// ── Validators ───────────────────────────────────────────────────

function validateBase(file, fm) {
  const errors = [];

  if (!fm.title || typeof fm.title !== 'string') {
    errors.push('Missing or invalid field: title (string).');
  }
  if (!fm.description || typeof fm.description !== 'string') {
    errors.push('Missing or invalid field: description (string).');
  }
  if (!fm.date || !(/^\d{4}-\d{2}-\d{2}$/.test(fm.date) || fm.date instanceof Date)) {
    errors.push('Missing or invalid field: date (YYYY-MM-DD).');
  }
  if (!Array.isArray(fm.tags)) {
    errors.push('Missing or invalid field: tags (array).');
  }
  if (!fm.category) {
    errors.push('Missing or invalid field: category.');
  } else if (!CATEGORIES.includes(fm.category)) {
    errors.push(`Invalid category "${fm.category}". Allowed: ${CATEGORIES.join(', ')}`);
  }
  if (fm.source && typeof fm.source === 'string' && !/^https?:\/\//.test(fm.source)) {
    errors.push(`Invalid source URL "${fm.source}". Must start with http:// or https://.`);
  }

  return errors;
}

function validateNote(file, fm, isReadme, { isRegistered = false, dirName = '' } = {}) {
  const errors = validateBase(file, fm);

  if (!fm.docGroup || typeof fm.docGroup !== 'string') {
    errors.push('Missing or invalid field: docGroup (string).');
  }

  // Cross-check: if directory is registered, docGroup should match
  if (isRegistered && dirName && fm.docGroup && fm.docGroup !== dirName) {
    errors.push(`docGroup "${fm.docGroup}" does not match registered directory name "${dirName}".`);
  }

  if (fm.draft == null || typeof fm.draft !== 'boolean') {
    errors.push('Missing or invalid field: draft (boolean).');
  }

  if (isReadme) {
    if (fm.order !== -1) {
      errors.push('README.md must have order: -1.');
    }
  } else if (isRegistered && (fm.order == null || typeof fm.order !== 'number')) {
    // Only require order for notes in registered course/tutorial directories
    errors.push('Missing or invalid field: order (number).');
  }

  return errors;
}

function validateBlog(file, fm) {
  const errors = validateBase(file, fm);

  if (fm.draft == null || typeof fm.draft !== 'boolean') {
    errors.push('Missing or invalid field: draft (boolean).');
  }

  return errors;
}

// ── Directory scanner ────────────────────────────────────────────

function collectMdFiles(dir) {
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    .sort()
    .map(f => ({ name: f, path: path.join(dir, f) }));
}

function validateDirectory(dir, validator, { requireReadme = false, isRegistered = false, dirName = '' } = {}) {
  const files = collectMdFiles(dir);
  const errors = [];
  let hasReadme = false;
  const orderValues = [];

  for (const { name, path: filePath } of files) {
    const isReadme = /^readme\.md$/i.test(name);
    if (isReadme) hasReadme = true;

    const content = fs.readFileSync(filePath, 'utf8');
    const fm = parseFrontmatter(content);

    if (!fm) {
      errors.push({ file: name, messages: ['Missing YAML frontmatter block (--- ... ---).'] });
      continue;
    }

    const fileErrors = validator(name, fm, isReadme, { isRegistered, dirName });
    if (fileErrors.length > 0) {
      errors.push({ file: name, messages: fileErrors });
    }

    // Collect order values for duplicate/gap checking
    if (!isReadme && typeof fm.order === 'number') {
      orderValues.push({ file: name, order: fm.order });
    }
  }

  if (requireReadme && !hasReadme) {
    errors.push({ file: 'README.md', messages: ['README.md is required in the course/tutorial directory.'] });
  }

  // Check for duplicate order values
  if (orderValues.length > 1) {
    const seen = new Map();
    for (const { file, order } of orderValues) {
      if (seen.has(order)) {
        errors.push({
          file,
          messages: [`Duplicate order value ${order} (also used in ${seen.get(order)}).`]
        });
      } else {
        seen.set(order, file);
      }
    }
  }

  return errors;
}

// ── Main ─────────────────────────────────────────────────────────

let totalErrors = [];
let totalFiles = 0;

// Blog
if (mode === 'all' || mode === 'blog') {
  const blogDir = path.join(ROOT, 'src/content/blog');
  if (fs.existsSync(blogDir)) {
    const relDir = 'src/content/blog';
    const entries = fs.readdirSync(blogDir, { withFileTypes: true });

    // Flat blog files
    const flatFiles = entries.filter(e => e.isFile() && (e.name.endsWith('.md') || e.name.endsWith('.mdx')));
    if (flatFiles.length > 0) {
      const errors = validateDirectory(blogDir, validateBlog);
      totalFiles += flatFiles.length;
      if (errors.length > 0) {
        totalErrors.push({ dir: relDir, errors });
      }
    }

    // Subdirectories (if any)
    const subdirs = entries.filter(e => e.isDirectory());
    for (const sub of subdirs) {
      const subPath = path.join(blogDir, sub.name);
      const subFiles = collectMdFiles(subPath);
      if (subFiles.length > 0) {
        const errors = validateDirectory(subPath, validateBlog);
        totalFiles += subFiles.length;
        if (errors.length > 0) {
          totalErrors.push({ dir: `${relDir}/${sub.name}`, errors });
        }
      }
    }
  }
}

// Notes
if (mode === 'all' || mode === 'notes' || mode === 'dir') {
  const notesDir = mode === 'dir' ? path.resolve(customDir) : path.join(ROOT, 'src/content/notes');

  if (!fs.existsSync(notesDir)) {
    console.error(`Directory not found: ${notesDir}`);
    process.exit(2);
  }

  if (mode === 'dir') {
    // Validate a specific directory as a course/tutorial
    const relDir = path.relative(ROOT, notesDir);
    const dirBaseName = path.basename(notesDir);
    const isRegistered = REGISTERED_DOC_GROUPS.has(dirBaseName);
    const errors = validateDirectory(notesDir, validateNote, { requireReadme: true, isRegistered, dirName: dirBaseName });
    const files = collectMdFiles(notesDir);
    totalFiles += files.length;
    if (errors.length > 0) {
      totalErrors.push({ dir: relDir, errors });
    }
  } else {
    // Walk all subdirectories under src/content/notes/
    const entries = fs.readdirSync(notesDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const subPath = path.join(notesDir, entry.name);
      const relDir = `src/content/notes/${entry.name}`;
      const files = collectMdFiles(subPath);

      if (files.length === 0) continue;
      totalFiles += files.length;

      // Check if this is a registered course/tutorial → require order + README
      const isRegistered = REGISTERED_DOC_GROUPS.has(entry.name);
      const errors = validateDirectory(subPath, validateNote, { requireReadme: isRegistered, isRegistered, dirName: entry.name });

      if (errors.length > 0) {
        totalErrors.push({ dir: relDir, errors });
      }
    }
  }
}

// ── Output ───────────────────────────────────────────────────────

if (totalErrors.length === 0) {
  console.log(`✓ Validated ${totalFiles} content files: all good.`);
  process.exit(0);
}

let issueCount = 0;
for (const { dir, errors } of totalErrors) {
  console.error(`\n📁 ${dir}`);
  for (const { file, messages } of errors) {
    console.error(`  ${file}`);
    for (const msg of messages) {
      console.error(`    - ${msg}`);
      issueCount++;
    }
  }
}

console.error(`\n✗ Validation failed: ${issueCount} issue(s) across ${totalErrors.length} directory(ies).`);
process.exit(1);
