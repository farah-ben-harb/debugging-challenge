import type { Trade } from "../types.js";

export const trades: Trade[] = [
  { id: 1, symbol: "EURUSD", side: "BUY",  price: 1.0812, quantity: 100, broker: "Alpha", timestamp: "2026-09-20T08:00:00Z" },
  { id: 2, symbol: " eurusd ", side: "buy", price: 1.0815, quantity: 200, broker: "Beta", timestamp: "2026-09-20T08:02:00Z" },
  { id: 3, symbol: "EURUSD", side: "SELL", price: 1.0819, quantity: 300, broker: "Gamma", timestamp: "2026-09-20T08:03:00Z" },
  { id: 4, symbol: "EURUSD", side: "SELL", price: 1.0817, quantity: 400, broker: "Delta", timestamp: "2026-09-20T08:04:00Z" },
  { id: 5, symbol: "GBPUSD", side: "BUY", price: 1.2687, quantity: 250, broker: "Alpha", timestamp: "2026-09-20T08:05:00Z" },
  { id: 6, symbol: "GBPUSD", side: "SELL", price: 1.2695, quantity: 350, broker: "Beta", timestamp: "2026-09-20T08:06:00Z" },
  { id: 7, symbol: "USDJPY", side: "SELL", price: 148.42, quantity: 500, broker: "Gamma", timestamp: "2026-09-20T08:07:00Z" },
  { id: 8, symbol: "", side: "BUY", price: 1.2, quantity: 100, broker: "Broken", timestamp: "2026-09-20T08:08:00Z" },
  { id: 9, symbol: "EURUSD", side: "HOLD", price: 1.0814, quantity: 100, broker: "Broken", timestamp: "2026-09-20T08:09:00Z" },
  { id: 10, symbol: "GBPUSD", side: "BUY", price: 0, quantity: 100, broker: "Broken", timestamp: "2026-09-20T08:10:00Z" },
  { id: 11, symbol: "USDJPY", side: "BUY", price: 148.10, quantity: 0, broker: "Broken", timestamp: "2026-09-20T08:11:00Z" }
];
