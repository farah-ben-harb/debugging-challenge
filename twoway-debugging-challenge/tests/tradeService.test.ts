import test from "node:test";
import assert from "node:assert/strict";
import { buildMarketSummary, findTradeById, listTrades, normalizeTrade } from "../src/services/tradeService.js";

const sampleTrades = [
  { id: 1, symbol: "EURUSD", side: "BUY", price: 1.1, quantity: 100, broker: "A", timestamp: "2026-09-20T08:00:00Z" },
  { id: 2, symbol: " eurusd ", side: "buy", price: 1.2, quantity: 200, broker: "B", timestamp: "2026-09-20T08:02:00Z" },
  { id: 3, symbol: "EURUSD", side: "SELL", price: 1.4, quantity: 300, broker: "C", timestamp: "2026-09-20T08:03:00Z" },
  { id: 4, symbol: "EURUSD", side: "SELL", price: 1.3, quantity: 400, broker: "D", timestamp: "2026-09-20T08:04:00Z" }
];

test("normalizeTrade normalizes symbol and side", () => {
  const result = normalizeTrade(sampleTrades[1]);
  assert.equal(result?.symbol, "EURUSD");
  assert.equal(result?.side, "BUY");
});

test("normalizeTrade rejects zero price and zero quantity", () => {
  assert.equal(normalizeTrade({ id: 10, symbol: "EURUSD", side: "BUY", price: 0, quantity: 10, broker: "A", timestamp: "2026-09-20T08:00:00Z" }), null);
  assert.equal(normalizeTrade({ id: 11, symbol: "EURUSD", side: "BUY", price: 1, quantity: 0, broker: "A", timestamp: "2026-09-20T08:00:00Z" }), null);
});

test("listTrades filters symbol case-insensitively", () => {
  const result = listTrades(sampleTrades, { symbol: "eurusd" });
  assert.equal(result.length, 4);
});

test("listTrades returns first page when page=1", () => {
  const result = listTrades(sampleTrades, { page: 1, limit: 2 });
  assert.deepEqual(result.map((trade) => trade.id), [4, 3]);
});

test("findTradeById accepts route-style string ids", () => {
  const result = findTradeById(sampleTrades, "2");
  assert.equal(result?.id, 2);
});

test("buildMarketSummary calculates best prices", () => {
  const result = buildMarketSummary(sampleTrades);
  assert.deepEqual(result, [{
    symbol: "EURUSD",
    bestBid: 1.2,
    bestAsk: 1.3,
    totalQuantity: 1000,
    tradeCount: 4
  }]);
});

test("listTrades returns the correct second page", () => {
  const result = listTrades(sampleTrades, {
    page: 2,
    limit: 2
  });

  assert.deepEqual(
    result.map((trade) => trade.id),
    [2, 1]
  );
});