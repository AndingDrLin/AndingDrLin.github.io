/**
 * Automated course publish script for Latent Note.
 *
 * Runs the full publish pipeline for a course/tutorial:
 *   1. Validate frontmatter for the target directory
 *   2. Run Astro type check
 *   3. Build the site
 *   4. Report results
 *
 * Usage:
 *   node scripts/publish-course.mjs <docGroup-key>
 *
 * Example:
 *   node scripts/publish-course.mjs dsp-notes
 *   node scripts/publish-course.mjs agent-tutorial
 *
 * Exit codes: 0 = all checks passed, 1 = errors found, 2 = usage error
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ── CLI ──────────────────────────────────────────────────────────

const docGroup = process.argv[2];

if (!docGroup || docGroup === '--help' || docGroup === '-h') {
  console.log(`Usage: node scripts/publish-course.mjs <docGroup-key>

Example:
  node scripts/publish-course.mjs dsp-notes
  node scripts/publish-course.mjs agent-tutorial`);
  process.exit(2);
}

const courseDir = path.join(ROOT, 'src/content/notes', docGroup);
if (!fs.existsSync(courseDir)) {
  console.error(`✗ Directory not found: ${courseDir}`);
  process.exit(2);
}

// ── Helpers ──────────────────────────────────────────────────────

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

function step(n, label) {
  console.log(`\n${BOLD}${YELLOW}[Step ${n}]${RESET} ${label}`);
}

function run(label, cmd) {
  try {
    console.log(`  → ${label}...`);
    const output = execSync(cmd, { cwd: ROOT, encoding: 'utf8', timeout: 120_000 });
    console.log(`  ${GREEN}✓${RESET} ${label}`);
    return { ok: true, output };
  } catch (err) {
    console.error(`  ${RED}✗${RESET} ${label}`);
    if (err.stdout) console.error(err.stdout);
    if (err.stderr) console.error(err.stderr);
    return { ok: false, output: (err.stdout || '') + (err.stderr || '') };
  }
}

// ── Pipeline ─────────────────────────────────────────────────────

let failed = false;

console.log(`${BOLD}Publishing course: ${docGroup}${RESET}`);
console.log(`Directory: ${courseDir}`);

// Step 1: Validate frontmatter
step(1, 'Validate frontmatter');
const vResult = run('Frontmatter validation', `node scripts/validate-content.mjs --dir "${courseDir}"`);
if (!vResult.ok) failed = true;

// Step 2: Type check
step(2, 'Astro type check');
const tResult = run('Type check', 'npx astro check');
if (!tResult.ok) failed = true;

// Step 3: Build
step(3, 'Build site');
const bResult = run('Build', 'npm run build');
if (!bResult.ok) failed = true;

// Step 4: Check README links
step(4, 'Check README.md');
const readmePath = path.join(courseDir, 'README.md');
if (fs.existsSync(readmePath)) {
  const readmeContent = fs.readFileSync(readmePath, 'utf8');
  const linkRegex = /\[.*?\]\(\/notes\/[^)]+\)/g;
  const links = readmeContent.match(linkRegex) || [];
  console.log(`  Found ${links.length} internal links in README.md`);

  // Check that linked files exist
  const mdFiles = fs.readdirSync(courseDir)
    .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx?$/, ''));
  let brokenLinks = 0;
  for (const link of links) {
    const slugMatch = link.match(/\/notes\/[^/]+\/([^)]+)\//);
    if (slugMatch) {
      const slug = slugMatch[1];
      if (!mdFiles.includes(slug)) {
        console.warn(`  ${YELLOW}⚠${RESET} Broken link target: ${slug}`);
        brokenLinks++;
      }
    }
  }
  if (brokenLinks === 0) {
    console.log(`  ${GREEN}✓${RESET} All README links resolve to existing files`);
  } else {
    console.warn(`  ${YELLOW}⚠${RESET} ${brokenLinks} broken link(s) in README.md`);
  }
} else {
  console.warn(`  ${YELLOW}⚠${RESET} No README.md found`);
}

// Summary
console.log(`\n${'─'.repeat(50)}`);
if (failed) {
  console.error(`\n${RED}${BOLD}✗ Publish check failed.${RESET} Fix the issues above and re-run.`);
  process.exit(1);
} else {
  console.log(`\n${GREEN}${BOLD}✓ All checks passed.${RESET} Course "${docGroup}" is ready to publish.`);
  console.log(`\nNext steps:`);
  console.log(`  1. Run 'npm run preview' to verify pages visually`);
  console.log(`  2. Review the generated content against source materials`);
  console.log(`  3. Commit and push to main`);
}
