# Execution Log — krnch-portfolio

What was actually **done** in this repo: runbooks, results, paths, and the fixes
behind them. The counterpart to `prompt-recorder/` (what was *asked*).

## Why this exists

Chat scrolls away. Terminal history is lost. Six months later nobody remembers
which command produced which result, or why an approach was abandoned. This folder
is the durable record.

## Convention

One file per run or work session:

```
YYYY-MM-DD_short-topic.md
data/YYYY-MM-DD_HHMM_<artifact>.{md,json,csv}   # timestamped machine-readable output
```

Template:

```markdown
# <What was done>

**Date:** YYYY-MM-DD · **Operator:** <who> · **Outcome:** <one line>

## Why
<the problem that triggered this>

## Approach
<diagram or steps; note alternatives rejected and why>

## Paths
| What | Path |
|---|---|
| input | \`/absolute/path\` |
| output | \`/absolute/path\` |

## Results
<table with real numbers>

## Issues hit & fixes
| # | Issue | Root cause | Fix |
|---|---|---|---|

## Next steps
- [ ] ...

## Reproduce
\`\`\`bash
<exact commands>
\`\`\`
```

## Rules

1. **Absolute paths.** "the output folder" is useless later.
2. **Real numbers.** Sizes, durations, counts, scores — not "much faster".
3. **Record failures.** The fix matters less than the root cause.
4. **Timestamp raw data** in `data/` so future runs can be *diffed*, not re-read.
5. **No secrets.** Redact tokens, keys and credentials as `[REDACTED]`.
6. **Reproduce section is mandatory** — if it can't be re-run, it isn't done.
