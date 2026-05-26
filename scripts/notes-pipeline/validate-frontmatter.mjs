import fs from 'node:fs';
import path from 'node:path';

const CATEGORIES = [
  'AI Tools',
  '3D Vision',
  'Agents',
  'Research Notes',
  'Essays',
  'Tutorials',
  '课程学习'
];

const args = process.argv.slice(2);
const targetDir = args[0];

if (!targetDir) {
  console.error('Usage: node scripts/notes-pipeline/validate-frontmatter.mjs <notes-directory>');
  process.exit(1);
}

const resolvedDir = path.resolve(targetDir);
if (!fs.existsSync(resolvedDir) || !fs.statSync(resolvedDir).isDirectory()) {
  console.error(`Directory not found: ${resolvedDir}`);
  process.exit(1);
}

const files = fs.readdirSync(resolvedDir).filter((name) => name.endsWith('.md')).sort();
if (files.length === 0) {
  console.error('No markdown files found.');
  process.exit(1);
}

const errors = [];
let readmeExists = false;

for (const file of files) {
  const filePath = path.join(resolvedDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const fileErrors = [];

  const match = content.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) {
    errors.push({ file, messages: ['Missing YAML frontmatter block (--- ... ---).'] });
    continue;
  }

  const frontmatter = match[1];
  const isReadme = /^readme\.md$/i.test(file);
  if (isReadme) readmeExists = true;

  const parsed = {
    title: extractString(frontmatter, 'title'),
    description: extractString(frontmatter, 'description'),
    date: extractDate(frontmatter, 'date'),
    tags: extractArray(frontmatter, 'tags'),
    category: extractString(frontmatter, 'category'),
    docGroup: extractString(frontmatter, 'docGroup'),
    draft: extractBoolean(frontmatter, 'draft'),
    order: extractNumber(frontmatter, 'order')
  };

  if (parsed.title == null) fileErrors.push('Missing or invalid field: title (string).');
  if (parsed.description == null) fileErrors.push('Missing or invalid field: description (string).');
  if (parsed.date == null) fileErrors.push('Missing or invalid field: date (YYYY-MM-DD).');
  if (parsed.tags == null) fileErrors.push('Missing or invalid field: tags (array).');
  if (parsed.category == null) {
    fileErrors.push('Missing or invalid field: category (string).');
  } else if (!CATEGORIES.includes(parsed.category)) {
    fileErrors.push(`Invalid category "${parsed.category}". Allowed: ${CATEGORIES.join(', ')}`);
  }
  if (parsed.docGroup == null) fileErrors.push('Missing or invalid field: docGroup (string).');
  if (parsed.draft == null) fileErrors.push('Missing or invalid field: draft (boolean).');

  if (isReadme) {
    if (parsed.order !== -1) fileErrors.push('README.md must have order: -1.');
  } else if (parsed.order == null) {
    fileErrors.push('Missing or invalid field: order (number).');
  }

  if (fileErrors.length > 0) {
    errors.push({ file, messages: fileErrors });
  }
}

if (!readmeExists) {
  errors.push({ file: 'README.md', messages: ['README.md is required in the course directory.'] });
}

if (errors.length === 0) {
  console.log(`Validated ${files.length} files in ${resolvedDir}: all good.`);
  process.exit(0);
}

for (const item of errors) {
  console.error(`\n${item.file}`);
  for (const message of item.messages) {
    console.error(`  - ${message}`);
  }
}

console.error(`\nValidation failed with ${errors.length} file issue(s).`);
process.exit(1);

function extractString(source, key) {
  const match = source.match(new RegExp(`^${key}\\s*:\\s*"([^"]*)"\\s*$`, 'm'));
  return match ? match[1] : null;
}

function extractDate(source, key) {
  const match = source.match(new RegExp(`^${key}\\s*:\\s*(\\d{4}-\\d{2}-\\d{2})\\s*$`, 'm'));
  return match ? match[1] : null;
}

function extractNumber(source, key) {
  const match = source.match(new RegExp(`^${key}\\s*:\\s*(-?\\d+(?:\\.\\d+)?)\\s*$`, 'm'));
  return match ? Number(match[1]) : null;
}

function extractBoolean(source, key) {
  const match = source.match(new RegExp(`^${key}\\s*:\\s*(true|false)\\s*$`, 'm'));
  return match ? match[1] === 'true' : null;
}

function extractArray(source, key) {
  const match = source.match(new RegExp(`^${key}\\s*:\\s*\\[([^\\]]*)\\]\\s*$`, 'm'));
  if (!match) return null;
  const items = match[1]
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  return items;
}
