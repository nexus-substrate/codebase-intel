# codebase-intel

E2E smoke tests for nexus-agents code-intelligence MCP tools:

- `extract_symbols` — pull function/class/type symbols from source files
- `search_codebase` — pattern/symbol/text search with in-memory index
- `repo_analyze` — GitHub repo structure analysis (language, framework, CI)
- `repo_security_plan` — security scanning pipeline recommendation

## Purpose

Pinned input schemas + contract tests. If nexus-agents changes the schema of any of these 4 tools upstream, sync the corresponding definition in `src/schemas.ts` — any drift will fail the test suite.

Part of the `nexus-agents-test` ecosystem. The `ecosystem-smoke.yml` workflow in [nexus-substrate/nexus-agents](https://github.com/nexus-substrate/nexus-agents) discovers this repo via the `nexus-agents-test` topic and runs `npm test` weekly.

## Run

```sh
npm ci
npm test
```

## Sibling repos

See [nexus-agents/ECOSYSTEM.md](https://github.com/nexus-substrate/nexus-agents/blob/main/ECOSYSTEM.md) for the full list.

## License

MIT
