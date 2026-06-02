# Grid Crypto Analytics

Grid trading strategy backtester using historical Binance data.

## How it works

Simulates buying crypto when the price drops by a set threshold from the peak price, and selling when it rises by the same threshold.

### Buy Logic

- Tracks `max_price` — highest price since the last completed cycle
- Buy triggers when price drops by `threshold_percent` from `max_price`:
  ```
  level = int((max_price - price) / (max_price * threshold))
  ```
- Each level is bought only once
- At `threshold = 5%`, max 19 purchases (levels 5%–95% from peak)
- Grid resets when all positions are closed — `max_price` updates to current price

### Sell Logic

- Each buy creates a sell order at `buy_price * (1 + threshold)`
- On trigger — profit is realized

## Tech Stack

- **Backend**: Python, FastAPI, aiohttp (async Binance API requests)
- **Frontend**: React, Vite, Recharts

## Running

### Backend

```bash
cd backend
source venv/bin/activate
python run.py
```

Server at http://localhost:8000, Swagger at http://localhost:8000/docs

### Frontend

```bash
cd frontend
npm run dev
```

At http://localhost:3000

## Parameters

| Parameter | Description | Default |
|---|---|---|
| Initial Balance | Starting capital in USDT | 10000 |
| Trade Amount | Amount per trade | 1000 |
| Price Change Threshold | Price change trigger | 5% |
| Commission Rate | Exchange fee | 0.1% |
| Trading Pair | Trading pair | ETHUSDT |
| Time Interval | Candle timeframe | 1h |
