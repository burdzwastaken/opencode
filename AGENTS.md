# OpenCode Configuration

Personal OpenCode configuration for Matt Burdan (@burdzwastaken).

## Available Agents

Use these specialized agents by mentioning them with `@`:

### Primary Agent

| Agent | Purpose | Model |
|-------|---------|-------|
| `@metaburdz` | Primary orchestrator - architecture, debugging, code review, parallel agent swarms, delegation | Claude Opus 4.5 |

### Core Agents

| Agent | Purpose | Model |
|-------|---------|-------|
| `@explore` | Fast codebase search - find files, patterns, structures (contextual grep) | Claude Haiku 4.5 |
| `@librarian` | External research - official docs (Context7), GitHub code (grep.app), web search (Exa) | Claude Sonnet 4.5 |
| `@principal` | Principal engineering advisor - complex architecture, hard debugging, design review | Claude Opus 4.5 |
| `@frontend` | UI/UX implementation - styling, layout, animation, visual design | Gemini 3 Pro |
| `@docs` | Technical writing - README, API docs, architecture docs, guides | Gemini 3 Pro |
| `@multimodal` | Media analysis - PDFs, images, diagrams, screenshots | Claude Sonnet 4.5 |
| `@quick` | Fast execution - simple tasks, file moves, grep-and-replace, boilerplate | Claude Haiku 4.5 |

### Language Specialists

| Agent | Purpose | Model |
|-------|---------|-------|
| `@go` | Go engineer - net/http, Cobra, sqlc, gRPC, controller-runtime, table-driven tests | Claude Sonnet 4.5 |
| `@zig` | Zig systems programmer - comptime, allocators, eBPF/XDP, C FFI | Claude Sonnet 4.5 |

### Infrastructure & Platform

| Agent | Purpose | Model |
|-------|---------|-------|
| `@k8s` | Kubernetes platform engineer - operators, CRDs, Helm, GKE/EKS, controller-runtime | Claude Sonnet 4.5 |
| `@sre` | Site Reliability Engineer - SLOs, error budgets, incidents, observability, capacity | Claude Opus 4.5 |
| `@terraform` | IaC expert - Terraform modules, state management, AWS/GCP, GitOps | Claude Sonnet 4.5 |
| `@nix` | NixOS/Nix expert - flakes, Home Manager, derivations, overlays | Claude Sonnet 4.5 |
| `@linux` | Linux/Bash/Git wizard - shell scripts, systemd, Docker, advanced Git (bisect, rebase, reflog) | Claude Sonnet 4.5 |
| `@cicd` | CI/CD engineer - GitHub Actions, GitLab CI, ArgoCD, Tekton, Codefresh | Claude Sonnet 4.5 |

### Database & Performance

| Agent | Purpose | Model |
|-------|---------|-------|
| `@postgres` | PostgreSQL wizard - schema design, query optimization, migrations, pgx/sqlc | Claude Sonnet 4.5 |
| `@perf` | Performance engineer - pprof, benchstat, flame graphs, Linux perf tools | Claude Sonnet 4.5 |

### Security & Quality

| Agent | Purpose | Model |
|-------|---------|-------|
| `@security` | AppSec/DFIR - OWASP Top 10, threat modeling, vulnerability analysis, forensics | Claude Opus 4.5 |
| `@testing` | Test strategy - table-driven tests, mockery, Kubernetes controller testing | Claude Sonnet 4.5 |
| `@architect` | Software Architect - system design, distributed systems, API design, ADRs | Claude Opus 4.5 |

## Available Commands

| Command | Description | Agents Used |
|---------|-------------|-------------|
| `/ultrawork <task>` | Maximum performance mode - parallel agent swarms, aggressive TODO tracking | `explore`, `librarian`, `go`, `zig`, `frontend`, `k8s`, `terraform`, `cicd`, `postgres`, `linux`, `nix`, `perf`, `sre`, `security`, `architect`, `principal`, `docs`, `testing` |
| `/search <query>` | Deep search across codebase (explore swarm) and external sources (librarian) | `explore`, `librarian` |
| `/analyze <topic>` | Multi-phase deep analysis with expert consultation | `explore`, `librarian`, `architect`, `security`, `sre`, `perf`, `principal` |
| `/think <problem>` | Extended reasoning mode for complex problems | `explore`, `librarian` |
| `/review <code>` | Comprehensive code review with security, performance, and maintainability focus | `explore`, `principal`, `security`, `sre`, `perf`, `architect`, `testing` |
| `/implement <task>` | End-to-end feature implementation with parallel agent orchestration | `explore`, `librarian`, `architect`, `principal`, `go`, `zig`, `postgres`, `frontend`, `k8s`, `terraform`, `cicd`, `linux`, `nix`, `testing`, `security`, `sre`, `perf` |

## Plugins

| Plugin | Description |
|--------|-------------|
| `audit-log` | Logs all bash commands, file writes, and edits to `.opencode/logs/` |
| `comment-checker` | Warns when code files have excessive comments (>30%) |
| `env-protection` | Blocks reading sensitive files (.env, credentials, secrets, .bash_history) |
| `notify` | Desktop notifications when session is idle or permission is needed |

## MCP Tools

The following external tools are available:

- **context7**: Official library documentation lookup
- **grep_app**: GitHub code search across millions of repositories
- **github**: GitHub Copilot MCP - issues, PRs, repos
- **playwright**: Browser automation for testing
- **time**: Time utilities
- **memory**: Persistent knowledge graph for cross-session context
- **sequential-thinking**: Structured multi-step reasoning for complex problems
- **exa**: Web search with AI-powered results

## Agent Deployment Strategy

### Cost Tiers

| Tier | Agents | Cost | When to Use |
|------|--------|------|-------------|
| **Free** | Direct tools (`glob`, `grep`, `lsp_*`, `ast_grep`) | Free | Known scope, single patterns |
| **Cheap** | `@explore`, `@quick` | Low | Codebase search, simple tasks |
| **Medium** | `@librarian`, domain specialists | Medium | Research, implementation |
| **Expensive** | `@principal`, `@security`, `@sre`, `@architect` | High | Architecture, security, hard debugging |

### Background vs Foreground

| Deployment | Agents | Pattern |
|------------|--------|---------|
| **Background swarm** | `@explore`, `@librarian` | Fire 2-3 in parallel, collect results later |
| **Foreground delegation** | Domain specialists | Sequential or parallel based on dependencies |
| **Escalation only** | `@principal` | After 2+ failures or for architecture decisions |

### Example Swarm Pattern

```
# Phase 1: Launch reconnaissance (background)
background_task(agent="explore", prompt="Find auth patterns...")
background_task(agent="explore", prompt="Find error handling...")
background_task(agent="librarian", prompt="JWT best practices...")

# Phase 2: Direct work while swarm runs
glob("**/auth/**/*.ts")
read("/src/middleware/auth.ts")

# Phase 3: Collect results
background_output(task_id=...)

# Phase 4: Delegate implementation
@go Implement JWT middleware...
@frontend Create login page...

# Phase 5: Cleanup
background_cancel(all=true)
```

## Workflow Tips

1. **Start complex tasks with `/ultrawork`** - enables parallel agent swarms
2. **Use `@explore` for internal search** - it's contextual grep for your codebase
3. **Use `@librarian` for external research** - docs, GitHub examples, best practices
4. **Use `@metaburdz` for debugging** - orchestrates the right specialists
5. **Use `@principal` sparingly** - expensive but high-quality for hard problems
6. **Fire explore/librarian in parallel** - they're cheap and fast
7. **Complete all TODOs** - never stop until the task is fully done
8. **Verify before completing** - `lsp_diagnostics`, tests, build

## Code Standards

- Follow existing project conventions
- Write clean, self-documenting code
- Minimize unnecessary comments
- Include proper error handling
- Write tests for new functionality
- Never use `as any`, `@ts-ignore`, or suppress type errors
- Run `make all` or equivalent before declaring done

## Agent Quick Reference

### When to Use Each Agent

| Task | Agent |
|------|-------|
| Find code in our codebase | `@explore` |
| Find examples in OSS | `@librarian` |
| Write Go code | `@go` |
| Write Zig code | `@zig` |
| Design a system | `@architect` |
| Review architecture | `@principal` |
| Kubernetes manifests | `@k8s` |
| Terraform modules | `@terraform` |
| CI/CD workflows | `@cicd` |
| Database schema | `@postgres` |
| Security review | `@security` |
| Performance analysis | `@perf` |
| SLO/SLI design | `@sre` |
| Test strategy | `@testing` |
| UI/UX styling | `@frontend` |
| Documentation | `@docs` |
| NixOS config | `@nix` |
| Shell scripts | `@linux` |
| Simple refactors | `@quick` |
| Analyze images/PDFs | `@multimodal` |
