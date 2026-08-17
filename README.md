# TradeDeck MVP

Mobile-first Vercel dashboard for monitoring MT4, MT5 and cTrader accounts.

## Current MVP
- Portfolio equity and daily P&L
- Account cards for MT5/cTrader demo accounts
- Drawdown usage and prop-account risk screen
- `/api/accounts` demo feed
- `/api/collector` authenticated ingest contract for collector/EA bridge

## Run
```bash
npm install
npm run dev
```

## Collector API
Set `COLLECTOR_TOKEN` in Vercel environment variables.

POST `/api/collector`
Header: `x-collector-token: <token>`
Content-Type: `application/json`

## Next wiring step
Persist collector payloads in a database/KV and make `/api/accounts` read the latest payload per account instead of demo data. cTrader can then be integrated via Open API; MT4/MT5 can send via an EA/bridge running in the terminal.
