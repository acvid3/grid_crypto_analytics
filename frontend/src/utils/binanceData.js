const BINANCE_API = 'https://api.binance.com/api/v3';

export async function fetchHistoricalData(symbol, interval, startTime, endTime) {
    const chunkSize = 1000;
    const intervalMs = getIntervalMs(interval);
    const totalDuration = endTime - startTime;
    const totalCandles = Math.floor(totalDuration / intervalMs);

    if (totalCandles <= chunkSize) {
        return fetchKlines(startTime, chunkSize, symbol, interval);
    }

    const chunks = [];
    let currentStart = startTime;

    while (currentStart < endTime) {
        const chunkEnd = Math.min(currentStart + (chunkSize * intervalMs), endTime);
        chunks.push({ start: currentStart, end: chunkEnd });
        currentStart = chunkEnd;
    }

    const results = await Promise.all(
        chunks.map(({ start }) => fetchKlines(start, chunkSize, symbol, interval))
    );

    const allData = results.flat();
    allData.sort((a, b) => a.timestamp - b.timestamp);
    return allData;
}

async function fetchKlines(startTime, limit, symbol, interval) {
    const url = `${BINANCE_API}/klines?symbol=${symbol}&interval=${interval}&startTime=${startTime}&limit=${limit}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Binance API error: ${response.status}`);
    }

    const data = await response.json();
    return data.map(kline => ({
        timestamp: kline[0],
        open: parseFloat(kline[1]),
        high: parseFloat(kline[2]),
        low: parseFloat(kline[3]),
        close: parseFloat(kline[4]),
        volume: parseFloat(kline[5]),
        close_time: kline[6],
    }));
}

export async function fetchAvailableSymbols() {
    const [exchangeInfo, ticker24h] = await Promise.all([
        fetch(`${BINANCE_API}/exchangeInfo`).then(r => r.json()),
        fetch(`${BINANCE_API}/ticker/24hr`).then(r => r.json()),
    ]);

    const usdtSymbols = exchangeInfo.symbols.filter(
        s => s.status === 'TRADING' && s.symbol.endsWith('USDT')
    );

    const tickerMap = {};
    for (const t of ticker24h) {
        if (t.symbol.endsWith('USDT')) {
            tickerMap[t.symbol] = t;
        }
    }

    return usdtSymbols.map(s => ({
        symbol: s.symbol,
        price: parseFloat(tickerMap[s.symbol]?.lastPrice || 0),
        priceChange: parseFloat(tickerMap[s.symbol]?.priceChange || 0),
        priceChangePercent: parseFloat(tickerMap[s.symbol]?.priceChangePercent || 0),
        high24h: parseFloat(tickerMap[s.symbol]?.highPrice || 0),
        low24h: parseFloat(tickerMap[s.symbol]?.lowPrice || 0),
        volume: parseFloat(tickerMap[s.symbol]?.quoteVolume || 0),
        openPrice: parseFloat(tickerMap[s.symbol]?.openPrice || 0),
    })).filter(s => s.price > 0).slice(0, 50);
}

function getIntervalMs(interval) {
    const map = {
        '1m': 60 * 1000,
        '5m': 5 * 60 * 1000,
        '15m': 15 * 60 * 1000,
        '1h': 60 * 60 * 1000,
        '4h': 4 * 60 * 60 * 1000,
        '1d': 24 * 60 * 60 * 1000,
    };
    return map[interval] || 60 * 60 * 1000;
}
