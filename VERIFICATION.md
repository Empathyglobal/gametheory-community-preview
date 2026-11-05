# Verification

Checked 2026-11-05 for this standalone community source preview.

## Passed

- All 11 inline scripts parse with Node's JavaScript VM.
- 420 complete model sessions: 60 seeds across each of seven games.
- 2,249 round-invariant checks.
- 5,047 function-result comparisons against the audited original model, with timestamps normalized.
- Original engine script is byte-identical to the source version.
- 93 embedded SVG images checked; no original raster images or audio data remain.
- All 17 detected literal storage operations use the community namespace.
- No fetch, XMLHttpRequest, WebSocket, sendBeacon, postMessage, embedded parent export, service worker, remote resource URL, backend SDK or audio decoder in the standalone game.
- CSP denies connection, media, plugin and form destinations.
- About page has no scripts or external resources.
- Source scan found no email contacts, passwords or service credentials. No live data was queried or exported.

## Browser testing gap

Full browser QA has not been completed. Chromium could not start in the verification environment because the environment rejected a required socket operation. No screenshot, actual network recording or browser interaction result is claimed.

Rendering, mobile layouts, keyboard and screen-reader accessibility, Back/Forward, leave/cancel, repeated sessions, clipboard, history clearing and storage-disabled behavior still require browser verification. Static absence of network APIs and CSP are useful checks, not proof of runtime behavior or complete security.

## Model-test scope

Covers termination and single completion; input immutability on most transition paths; Shoal resources; Collection budgets and holdings; City voting and distributions; Signal cooperative/individual outcomes; Envelope send/return accounting; Constellation node payoffs; Lantern teams and outcomes.

These samples are not exhaustive fuzzing or proof of correctness. Retaining model behavior also retains any pre-existing model defects.
