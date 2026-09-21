import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { app } from "../src/app.js";

test("GET /api/trades?symbol=eurusd filters trades", async () => {
  const response = await request(app).get("/api/trades").query({ symbol: "eurusd", page: 1, limit: 20 });
  assert.equal(response.status, 200);
  assert.equal(response.body.data.length, 4);
  assert.ok(response.body.data.every((trade: { symbol: string }) => trade.symbol === "EURUSD"));
});

test("GET /api/trades/2 returns the trade", async () => {
  const response = await request(app).get("/api/trades/2");
  assert.equal(response.status, 200);
  assert.equal(response.body.id, 2);
  assert.equal(response.body.symbol, "EURUSD");
});

test("GET /api/summary returns market summary", async () => {
  const response = await request(app).get("/api/summary");
  assert.equal(response.status, 200);
  const eurusd = response.body.find((row: { symbol: string }) => row.symbol === "EURUSD");
  assert.equal(eurusd.bestBid, 1.0815);
  assert.equal(eurusd.bestAsk, 1.0817);
});
