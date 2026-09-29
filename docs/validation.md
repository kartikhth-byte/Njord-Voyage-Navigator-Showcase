# Validation and evidence

[Back to project overview](../README.md) · [Aggregate evidence](../evidence/metrics.json) · [Run the example](../examples/README.md)

## Source review

Reviewed on 2026-09-29 at private source revision `c8731a652d8ef2241b4bf51ae35f91ed0e4f0dec`. This identifier anchors the review; the source is not publicly linked or accessible through this showcase. The public example is fully inspectable.

The repository README is a technology list, not a product specification. Review therefore used the route registry, page implementations, package lockfile, edge functions, SQL migrations, and configuration. No applicable AGENTS.md was found. No test/spec files, evaluation dataset, or committed CI workflow was found; the GitHub Actions API reported zero workflow runs at review time. This does not establish that no external or manual testing has ever occurred.

| Check | Result and scope |
|---|---|
| Routes | 37 declarations: 15 administrative, 21 other explicit, 1 catch-all |
| Functions | 7 source entrypoints; deployment not verified |
| Migrations | 35 SQL files; not 35 tables or deployed changes |
| Build | One local run; exit 0 |
| Lint | One local run; exit 1; 28 errors, 18 warnings |
| Example | 7 synthetic scenarios; 7 passed, 0 failed |

Inventory method: count route declarations in `src/App.tsx`, edge-function entrypoints in the functions directory, and SQL files in the migrations directory. Exact source-path patterns are recorded in [the aggregate evidence](../evidence/metrics.json). Each scenario runs once per example invocation.

## Application checks actually conducted

Dependencies were installed with `npm ci --ignore-scripts --no-audit --no-fund`. Runtime: Node.js 24.5.0 and npm 11.5.1. The Vite production build completed and emitted a large-chunk warning. Its main JavaScript output was 882.57 kB (245.40 kB gzip), as reported by Vite; this is a build artifact size, not a measured page-load time.

ESLint found 28 errors and 18 warnings. The application was not changed to repair these existing issues during showcase preparation. A passing build does not imply passing lint, complete type safety, end-to-end correctness, accessibility, or secure live policies.

No live mail was sent, applicant record created, database mutation executed, or production administrative interface accessed. Backend workflows were inspected statically. Applied migration state, secrets, provider connectivity, and frontend hosting were not verified against a deployment.

## Synthetic diagnostic

The public [Node.js example](../examples/newsletter_batches.mjs) uses only generated IDs and deterministic simulated outcomes. It covers empty and boundary batches, failure accounting, changing list membership, and test-mode isolation. The 45-recipient scenario contains 45 distinct generated IDs, each attempted once, with one injected failure. Other scenarios reuse generated IDs; the seven scenarios are not seven independent production trials.

The mutable-list scenario is a passing diagnostic **of a limitation**: an unsubscribe between batches can shift a count-based offset and skip a recipient. This is not a claim that production delivery was measured, nor a claim that the limitation has been fixed.

## Evidence that is not available

No defensible metrics for user volume, hiring outcomes, delivery rates, latency percentiles, uptime, cost savings, or business impact were available in the inspected repository. Company counters and marketing copy are not treated as software performance evidence. Historical migrations and unused components are not counted as proof of live features. Proposed improvements remain proposed.

## Publication review

Only newly written documentation, the illustrative code, an aggregate JSON summary, and a minimal ignore file were selected. Environment values, personal data, raw logs, infrastructure identifiers, original media, and Git history were excluded. No product screenshots or demo are published because a reviewed synthetic product environment was unavailable. GitHub rendering checks are recorded separately after publication.
