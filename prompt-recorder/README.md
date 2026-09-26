# Prompt Recorder — krnch-portfolio

Append-only log of the **human prompts** that drove work in this repo, so sessions
are reproducible, auditable and re-evaluatable. The counterpart to `execution/`
(what was *done*).

## Why this exists

`execution/` captures the *what*. Skills capture the *how*. This captures the
**why** — the actual asks, the course corrections, and the decisions they produced.

Useful for:
- replaying a workflow later
- seeing which prompts produced good vs bad outcomes
- spotting recurring asks that deserve to become a skill
- onboarding — the real questions, not the sanitised docs

## Convention

One file per session: `YYYY-MM-DD_short-topic.md`

```markdown
# Session — <topic>
**Date:** YYYY-MM-DD · **Repo:** <repo> · **Outcome:** <one line>

## Prompts
| # | Prompt (verbatim/condensed) | Led to |
|---|---|---|
| 1 | "..." | <file / decision> |

## Decisions
- <decision> — <why>

## Artifacts
- \`path/to/thing\`

## Lessons
- <gotcha worth remembering>
```

## Rules

1. **Verbatim where it matters.** Keep the original wording, including the messy
   phrasing that revealed the real intent. Condense only long pastes.
2. **Never record secrets.** No passwords, tokens, keys, recovery codes or vault
   contents. Redact as `[REDACTED]`.
3. **Append-only.** Don't rewrite history; add a new session file.
4. **Link outcomes.** Every prompt row should point at what it produced.
5. **Capture pivots.** When the direction changes, record it — that's the signal.
