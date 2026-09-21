# Debugging & Improvement Challenge — 60 minutes

You joined an existing trading dashboard. It runs, but several things are wrong.

Reported symptoms:
1. Normalized symbols may have wrong casing.
2. Zero price / zero quantity trades may be accepted.
3. Symbol filtering should be case-insensitive.
4. Pagination page 1 is wrong.
5. Recent trades should appear before older ones.
6. GET /api/trades/2 returns 404 even though trade 2 exists.
7. EURUSD summary has wrong best bid / best ask.
8. The browser symbol filter does not work reliably.

Workflow:
- inspect architecture
- npm install
- npm test
- npm run typecheck
- npm run dev
- reproduce bugs
- form a hypothesis before editing
- fix in small steps
- rerun relevant tests
- add one regression test
- commit frequently

Useful endpoints:
- /api/trades
- /api/trades?symbol=eurusd
- /api/trades?page=1&limit=2
- /api/trades/2
- /api/summary
