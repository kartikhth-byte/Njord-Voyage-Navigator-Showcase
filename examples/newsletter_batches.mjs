/**
 * Illustrative diagnostic, not production code.
 * Models a processed-record offset over a mutable active list.
 * No network calls, personal data, persistence, or credentials.
 */
import assert from 'node:assert/strict';

const BATCH_SIZE = 20;
const recipients = (count) => Array.from(
  { length: count }, (_, i) => `R${String(i + 1).padStart(3, '0')}`,
);

function processBatch(active, ledger, fail = new Set()) {
  const batch = active.slice(ledger.length, ledger.length + BATCH_SIZE);
  for (const id of batch) {
    ledger.push({ id, status: fail.has(id) ? 'failed' : 'sent' });
  }
  return batch.length;
}

function processStableList(count, fail = new Set()) {
  const active = recipients(count);
  const ledger = [];
  const sizes = [];
  while (ledger.length < active.length) {
    sizes.push(processBatch(active, ledger, fail));
  }
  assert.equal(new Set(ledger.map((row) => row.id)).size, count);
  return { ledger, sizes };
}

function preview(id) {
  // Test mode bypasses the bulk send ledger in the application.
  return { recipient: id, test: true, bulkLedger: [] };
}

const scenarios = [
  () => assert.deepEqual(processStableList(0), { ledger: [], sizes: [] }),
  () => assert.deepEqual(processStableList(1).sizes, [1]),
  () => assert.deepEqual(processStableList(20).sizes, [20]),
  () => assert.deepEqual(processStableList(21).sizes, [20, 1]),
  () => {
    const { ledger, sizes } = processStableList(45, new Set(['R007']));
    const sent = ledger.filter((row) => row.status === 'sent').length;
    const failed = ledger.filter((row) => row.status === 'failed').length;
    assert.deepEqual(sizes, [20, 20, 5]);
    assert.deepEqual([sent, failed, ledger.length], [44, 1, 45]);
    console.log(`Stable list: 45 recipients; batches ${sizes}; sent ${sent}; failed ${failed}`);
  },
  () => {
    let active = recipients(45);
    const ledger = [];
    processBatch(active, ledger);
    active = active.filter((id) => id !== 'R001');
    processBatch(active, ledger);
    processBatch(active, ledger);
    const missing = active.filter((id) => !ledger.some((row) => row.id === id));
    assert.deepEqual(missing, ['R021']);
    assert.equal(ledger.length, 44);
    console.log(`Mutable list: removing R001 after batch 1 skips ${missing[0]}`);
  },
  () => assert.deepEqual(preview('PREVIEW'), {
    recipient: 'PREVIEW', test: true, bulkLedger: [],
  }),
];

for (const scenario of scenarios) scenario();
console.log(`PASS ${scenarios.length}/${scenarios.length} synthetic diagnostic scenarios`);
