/**
 * Input/output schemas matching nexus-agents' 4 code-intelligence MCP tools.
 *
 * Keeps these pinned in the test repo so any upstream schema drift
 * surfaces as a schema-match failure here.
 *
 * Mirror of: packages/nexus-agents/src/mcp/tools/{extract_symbols,
 * search_codebase, repo_analyze, repo_security_plan}.ts
 *
 * @module schemas
 */

import { z } from 'zod';

/** extract_symbols input — extract function/class/type symbols from source files. */
export const ExtractSymbolsInputSchema = z.object({
  files: z.array(z.string().min(1).max(500)).min(1).max(100),
  symbolTypes: z
    .array(z.enum(['function', 'class', 'type', 'interface', 'enum']))
    .optional(),
});

/** search_codebase input — search for patterns/symbols across source files. */
export const SearchCodebaseInputSchema = z.object({
  query: z.string().min(1).max(500),
  directory: z.string().min(1).max(500).optional(),
  mode: z.enum(['search', 'summary', 'list']).optional(),
  limit: z.number().int().min(1).max(50).optional(),
});

/** repo_analyze input — analyze GitHub repo structure. */
export const RepoAnalyzeInputSchema = z.object({
  url: z.url().or(z.string().regex(/^[\w.-]+\/[\w.-]+$/)),
  depth: z.enum(['shallow', 'full']).optional(),
});

/** repo_security_plan input — generate security scanning pipeline recommendation. */
export const RepoSecurityPlanInputSchema = z.object({
  url: z.url().or(z.string().regex(/^[\w.-]+\/[\w.-]+$/)),
  includeSecrets: z.boolean().optional(),
});

export type ExtractSymbolsInput = z.infer<typeof ExtractSymbolsInputSchema>;
export type SearchCodebaseInput = z.infer<typeof SearchCodebaseInputSchema>;
export type RepoAnalyzeInput = z.infer<typeof RepoAnalyzeInputSchema>;
export type RepoSecurityPlanInput = z.infer<typeof RepoSecurityPlanInputSchema>;
