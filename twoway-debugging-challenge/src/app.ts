import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { trades } from "./data/trades.js";
import { buildMarketSummary, findTradeById, listTrades } from "./services/tradeService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/api/trades", (req, res) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 20);

  const result = listTrades(trades, {
    symbol: typeof req.query.symbol === "string" ? req.query.symbol : undefined,
    side: typeof req.query.side === "string" ? req.query.side : undefined,
    page,
    limit
  });

  res.json({ data: result, page, limit });
});

app.get("/api/trades/:id", (req, res) => {
  const trade = findTradeById(trades, req.params.id);

  if (!trade) {
    res.status(404).json({ error: "Trade not found" });
    return;
  }

  res.json(trade);
});

app.get("/api/summary", (_req, res) => {
  res.json(buildMarketSummary(trades));
});
