/**
 * Smoke tests for code-intelligence MCP tool schemas.
 *
 * If any of these tool schemas drift in nexus-agents, sync this file.
 * A failure here = your upstream tool contract changed.
 */
import { describe, it, expect } from 'vitest';
import {
  ExtractSymbolsInputSchema,
  SearchCodebaseInputSchema,
  RepoAnalyzeInputSchema,
  RepoSecurityPlanInputSchema,
} from './schemas.js';

describe('extract_symbols input schema', () => {
  it('accepts a single file', () => {
    const r = ExtractSymbolsInputSchema.safeParse({ files: ['src/index.ts'] });
    expect(r.success).toBe(true);
  });

  it('accepts symbolTypes filter', () => {
    const r = ExtractSymbolsInputSchema.safeParse({
      files: ['src/a.ts'],
      symbolTypes: ['class', 'interface'],
    });
    expect(r.success).toBe(true);
  });

  it('rejects empty files array', () => {
    const r = ExtractSymbolsInputSchema.safeParse({ files: [] });
    expect(r.success).toBe(false);
  });

  it('rejects >100 files (bulk DoS guard)', () => {
    const files = Array(101).fill('x.ts');
    const r = ExtractSymbolsInputSchema.safeParse({ files });
    expect(r.success).toBe(false);
  });

  it('rejects unknown symbolType values', () => {
    const r = ExtractSymbolsInputSchema.safeParse({
      files: ['x.ts'],
      symbolTypes: ['fictional_type'],
    });
    expect(r.success).toBe(false);
  });
});

describe('search_codebase input schema', () => {
  it('accepts minimal query', () => {
    const r = SearchCodebaseInputSchema.safeParse({ query: 'foo' });
    expect(r.success).toBe(true);
  });

  it('accepts all modes', () => {
    for (const mode of ['search', 'summary', 'list'] as const) {
      const r = SearchCodebaseInputSchema.safeParse({ query: 'x', mode });
      expect(r.success).toBe(true);
    }
  });

  it('rejects limit > 50', () => {
    const r = SearchCodebaseInputSchema.safeParse({ query: 'x', limit: 51 });
    expect(r.success).toBe(false);
  });

  it('rejects empty query', () => {
    const r = SearchCodebaseInputSchema.safeParse({ query: '' });
    expect(r.success).toBe(false);
  });
});

describe('repo_analyze input schema', () => {
  it('accepts full GitHub URL', () => {
    const r = RepoAnalyzeInputSchema.safeParse({
      url: 'https://github.com/owner/repo',
    });
    expect(r.success).toBe(true);
  });

  it('accepts owner/repo short form', () => {
    const r = RepoAnalyzeInputSchema.safeParse({ url: 'owner/repo' });
    expect(r.success).toBe(true);
  });

  it('rejects malformed input', () => {
    const r = RepoAnalyzeInputSchema.safeParse({ url: 'not-a-url-or-slug' });
    expect(r.success).toBe(false);
  });

  it('accepts depth variants', () => {
    for (const depth of ['shallow', 'full'] as const) {
      const r = RepoAnalyzeInputSchema.safeParse({ url: 'a/b', depth });
      expect(r.success).toBe(true);
    }
  });
});

describe('repo_security_plan input schema', () => {
  it('accepts URL input', () => {
    const r = RepoSecurityPlanInputSchema.safeParse({
      url: 'https://github.com/a/b',
    });
    expect(r.success).toBe(true);
  });

  it('accepts includeSecrets flag', () => {
    const r = RepoSecurityPlanInputSchema.safeParse({
      url: 'a/b',
      includeSecrets: true,
    });
    expect(r.success).toBe(true);
  });
});
