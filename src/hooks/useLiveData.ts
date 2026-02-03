import { useState, useCallback } from 'react';
import {
  getApiKey, fetchQuote, fetchExpirations, fetchOptionsChain,
  calculateDTE, findNearestExpiration, findNearestStrike,
  type OptionData,
} from '../services/tradierApi';

export interface LiveDataResult {
  stockPrice: number;
  strike: number;
  iv: number;
  dte: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  optionPrice: number;
  symbol: string;
}

export function useLiveData() {
  const [loading, setLoading] = useState(false);
  const [liveSymbol, setLiveSymbol] = useState('');
  const [error, setError] = useState('');
  const hasKey = !!getApiKey();

  const fetchData = useCallback(async (
    symbol: string,
    optionType: 'call' | 'put' = 'call',
    minDTE: number = 14,
  ): Promise<LiveDataResult | null> => {
    if (!symbol.trim() || !getApiKey()) return null;
    setLoading(true);
    setError('');

    try {
      const [quote, exps] = await Promise.all([
        fetchQuote(symbol.toUpperCase()),
        fetchExpirations(symbol.toUpperCase()),
      ]);

      const nearest = findNearestExpiration(exps, minDTE);
      if (!nearest) throw new Error('No expirations found');

      const chain = await fetchOptionsChain(quote.symbol, nearest);
      const opts = optionType === 'call' ? chain.calls : chain.puts;

      if (opts.length === 0) throw new Error('No options data');

      const atm = findNearestStrike(opts, quote.price);
      if (!atm) throw new Error('No ATM option found');

      setLiveSymbol(quote.symbol);
      setLoading(false);

      return {
        stockPrice: quote.price,
        strike: atm.strike,
        iv: atm.iv > 0 ? Math.round(atm.iv) : 30,
        dte: calculateDTE(nearest),
        delta: atm.delta,
        gamma: atm.gamma,
        theta: atm.theta,
        vega: atm.vega,
        optionPrice: atm.last || (atm.bid + atm.ask) / 2,
        symbol: quote.symbol,
      };
    } catch (e: any) {
      setError(e.message || 'Fetch failed');
      setLoading(false);
      return null;
    }
  }, []);

  return { fetchData, loading, liveSymbol, error, hasKey };
}
