# Runnable newsletter batching diagnostic

[Back to project overview](../README.md) · [View code](newsletter_batches.mjs) · [Architecture](../docs/architecture.md)

This newly written **illustrative model** captures the current newsletter flow's batch size, processed-record offset, and test-mode bypass. It is not an extracted production function or a replacement implementation. All identifiers and outcomes are synthetic, and there is no network or email access.

## Run

Prerequisite: Node.js 20 or later; verified with Node.js 24.5.0. No packages or credentials are required. From the showcase repository root:

```sh
node examples/newsletter_batches.mjs
```

Expected output:

```text
Stable list: 45 recipients; batches 20,20,5; sent 44; failed 1
Mutable list: removing R001 after batch 1 skips R021
PASS 7/7 synthetic diagnostic scenarios
```

## What is checked

Seven distinct scenarios, each executed once: empty list, one recipient, exactly one full batch, a partial second batch, mixed outcomes across three batches, subscriber removal between batches, and test-preview bypass of the bulk ledger. Boundary scenarios reuse generated identifiers; this is not a dataset of unique people or an estimate of reliability.

The removal diagnostic intentionally confirms a limitation: a recorded count is not a stable cursor when the query filters a mutable subscriber list. The other scenarios use fixed lists and deterministic simulated outcomes. They do not validate database policies, authentication, provider behavior, concurrency, or deployment.
