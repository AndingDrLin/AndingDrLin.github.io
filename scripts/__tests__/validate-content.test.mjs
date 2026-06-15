import { describe, it, expect, beforeAll } from 'vitest';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const SCRIPT = path.join(ROOT, 'scripts', 'validate-content.mjs');

// Resolve node binary path for environments where 'node' is not in PATH
const NODE = process.execPath;

function run(args = '') {
  try {
    const output = execSync(`"${NODE}" "${SCRIPT}" ${args}`, {
      cwd: ROOT,
      encoding: 'utf8',
      timeout: 30000
    });
    return { exitCode: 0, output };
  } catch (err) {
    return { exitCode: err.status ?? 1, output: (err.stdout || '') + (err.stderr || '') };
  }
}

describe('validate-content.mjs', () => {
  it('validates all content successfully (--blog)', () => {
    const result = run('--blog');
    expect(result.exitCode).toBe(0);
    expect(result.output).toContain('✓');
  });

  it('validates all content successfully (--notes)', () => {
    const result = run('--notes');
    expect(result.exitCode).toBe(0);
    expect(result.output).toContain('✓');
  });

  it('shows help with --help', () => {
    const result = run('--help');
    expect(result.exitCode).toBe(0);
    expect(result.output).toContain('Usage');
  });

  it('rejects --dir with nonexistent directory', () => {
    const result = run('--dir /nonexistent/path');
    expect(result.exitCode).toBe(2);
  });

  it('detects invalid frontmatter in a test file', () => {
    // Create a temporary test file with bad frontmatter
    const tmpDir = path.join(ROOT, 'src', 'content', 'notes', '_test-validation');
    fs.mkdirSync(tmpDir, { recursive: true });

    const tmpFile = path.join(tmpDir, 'bad.md');
    fs.writeFileSync(tmpFile, `---
title: "Test"
description: "Test file"
date: 2026-01-01
tags: [test]
category: "InvalidCategory"
docGroup: "test"
order: 1
draft: false
---
Content here.
`);

    try {
      const result = run(`--dir "${tmpDir}"`);
      expect(result.exitCode).toBe(1);
      expect(result.output).toContain('Invalid category');
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});
