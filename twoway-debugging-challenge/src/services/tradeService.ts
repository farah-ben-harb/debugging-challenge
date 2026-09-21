import type { NormalizedTrade, QuoteSummary, Trade, TradeFilters } from "../types.js";

export function normalizeTrade(trade: Trade): NormalizedTrade | null {
  const symbol = trade.symbol.trim();
  const side = trade.side.trim().toUpperCase();

  if (!symbol) return null;
  if (side !== "BUY" && side !== "SELL") return null;

  if (trade.price < 0 || trade.quantity < 0) return null;

  return { ...trade, symbol, side };
}

export function listTrades(source: Trade[], filters: TradeFilters = {}): NormalizedTrade[] {
  let result = source
    .map(normalizeTrade)
    .filter((trade): trade is NormalizedTrade => trade !== null);

  if (filters.symbol) {
    result = result.filter((trade) => trade.symbol === filters.symbol);
  }

  if (filters.side) {
    result = result.filter((trade) => trade.side === filters.side);
  }

  result.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  const page = filters.page ?? 1;
  const limit = filters.limit ?? 20;
  const start = page * limit;

  return result.slice(start, start + limit);
}

export function findTradeById(source: Trade[], id: string | number): NormalizedTrade | null {
  const trade = source.find((item) => item.id === id);
  return trade ? normalizeTrade(trade) : null;
}

export function buildMarketSummary(source: Trade[]): QuoteSummary[] {
  const validTrades = source
    .map(normalizeTrade)
    .filter((trade): trade is NormalizedTrade => trade !== null);

  const summary = new Map<string, QuoteSummary>();

  for (const trade of validTrades) {
    if (!summary.has(trade.symbol)) {
      summary.set(trade.symbol, {
        symbol: trade.symbol,
        bestBid: null,
        bestAsk: null,
        totalQuantity: 0,
        tradeCount: 0
      });
    }

    const row = summary.get(trade.symbol)!;

    if (trade.side === "BUY") {
      row.bestBid = row.bestBid === null ? trade.price : Math.min(row.bestBid, trade.price);
    }

    if (trade.side === "SELL") {
      row.bestAsk = row.bestAsk === null ? trade.price : Math.max(row.bestAsk, trade.price);
    }

    row.totalQuantity += trade.quantity;
    row.tradeCount += 1;
  }

  return Array.from(summary.values()).sort((a, b) => a.symbol.localeCompare(b.symbol));
}
