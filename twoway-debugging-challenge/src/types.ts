export type Side = "BUY" | "SELL";

export interface Trade {
  id: number;
  symbol: string;
  side: Side | string;
  price: number;
  quantity: number;
  broker: string;
  timestamp: string;
}

export interface NormalizedTrade extends Omit<Trade, "side"> {
  side: Side;
}

export interface QuoteSummary {
  symbol: string;
  bestBid: number | null;
  bestAsk: number | null;
  totalQuantity: number;
  tradeCount: number;
}

export interface TradeFilters {
  symbol?: string;
  side?: string;
  page?: number;
  limit?: number;
}
