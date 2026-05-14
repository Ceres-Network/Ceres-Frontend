# Ceres Network Architecture

This document describes the architecture of the Ceres Network system and how the frontend integrates with other components.

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      CERES NETWORK SYSTEM                        │
└─────────────────────────────────────────────────────────────────┘

External Data Sources                 Users
├─ CHIRPS (rainfall)                 ├─ Farmers
├─ NASA POWER (NDVI)                 ├─ Liquidity Providers
└─ Open-Meteo (soil moisture)        └─ Oracle Operators
         │                                    │
         ▼                                    ▼
┌──────────────────────┐            ┌──────────────────────┐
│   Backend Server     │◄─── API ───│  Frontend (Next.js)  │
│  (Separate Repo)     │            │   (This Repo)        │
└──────────┬───────────┘            └──────────┬───────────┘
           │                                   │
           │ Oracle feeds                      │ Direct SDK calls
           │ Event indexing                    │ (user-signed txs)
           │                                   │
           ▼                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│              Soroban Smart Contracts (On-Chain)                  │
│  ┌──────┐  ┌────────┐  ┌────────┐  ┌─────────┐                │
│  │ Pool │  │ Policy │  │ Oracle │  │ Trigger │                 │
│  └──────┘  └────────┘  └────────┘  └─────────┘                 │
└─────────────────────────────────────────────────────────────────┘
                         │
                         │ Contract Events
                         ▼
                  ┌──────────────┐
                  │  PostgreSQL  │
                  │  (Backend)   │
                  └──────────────┘
```

## Components

### 1. Smart Contracts (On-Chain)

**Repository:** [ceres-contracts](https://github.com/Ceres-Network/Ceres-contracts)

Four Soroban smart contracts deployed on Stellar:

- **Pool Contract** — Liquidity pool for insurance capital
  - Deposit/withdraw USDC
  - Lock coverage for active policies
  - Release payouts
  - Track LP shares

- **Policy Contract** — Farmer insurance policies
  - Register new policies
  - Track policy state (Active, Triggered, Expired)
  - Store policy parameters (coverage, thresholds, geohash)

- **Oracle Contract** — Weather data storage
  - Store latest readings per geo-cell
  - Reading types: Rainfall, NDVI, Soil Moisture
  - No authentication (anyone can submit)

- **Trigger Contract** — Payout evaluation
  - Evaluate policies against oracle data
  - Record trigger events
  - Calculate payouts (currently hardcoded)

**State:** Source of truth for all business logic and state

### 2. Backend Server (Off-Chain)

**Repository:** [ceres-backend](https://github.com/Ceres-Network/Ceres-backend)

Node.js/TypeScript backend providing three main services:

#### a) Oracle Feeder
- Scheduled jobs that fetch weather data from external APIs
- Submits readings to the Oracle contract on-chain
- Data sources:
  - CHIRPS — Rainfall data
  - NASA POWER — NDVI (vegetation index)
  - Open-Meteo — Soil moisture

#### b) Event Indexer
- Listens to Soroban contract events via RPC
- Indexes events to PostgreSQL for fast querying
- Soroban RPC has no efficient historical indexing, so this is essential
- Indexed data:
  - Policy registrations
  - Pool deposits/withdrawals
  - Oracle readings
  - Trigger events
  - Payouts

#### c) REST API
- Serves indexed data to the frontend
- Proxies weather lookups (protects API keys)
- Provides historical data and analytics

**State:** Cache/index of on-chain data, not source of truth

### 3. Frontend (This Repository)

**Repository:** [ceres-frontend](https://github.com/Ceres-Network/Ceres-frontend)

Next.js 14 application with hybrid data access:

#### Read Operations (via Backend API)
The frontend fetches historical and indexed data from the backend:

```typescript
// Fast queries using indexed data
GET /api/policies?farmer={address}
GET /api/pool/stats/history
GET /api/oracle/readings?geohash={hash}
GET /api/events/payouts
```

**Why?** Soroban RPC is not optimized for historical queries. The backend indexes events to PostgreSQL for fast reads.

#### Write Operations (via SDK → Contracts)
The frontend submits transactions directly to smart contracts:

```typescript
// User signs transactions via Freighter wallet
ceresClient.registerPolicy(keypair, params)
ceresClient.deposit(keypair, amount)
ceresClient.withdraw(keypair, shares)
```

**Why?** Users maintain custody of their keys and sign their own transactions. This preserves decentralization.

## Data Flow Examples

### Example 1: Farmer Registers a Policy

```
1. Farmer fills form in frontend
2. Frontend calls ceresClient.registerPolicy()
3. Freighter wallet prompts user to sign transaction
4. Transaction submitted directly to Policy contract
5. Policy contract emits PolicyRegistered event
6. Backend event indexer picks up event
7. Backend writes policy to PostgreSQL
8. Frontend refreshes data from backend API
9. Policy appears in farmer's dashboard
```

### Example 2: Oracle Submits Weather Reading

```
1. Backend cron job runs (e.g., every 6 hours)
2. Backend fetches rainfall data from CHIRPS API
3. Backend calls Oracle contract's submit_reading()
4. Oracle contract stores latest reading
5. Oracle contract emits ReadingSubmitted event
6. Backend event indexer picks up event
7. Backend writes reading to PostgreSQL
8. Frontend displays latest reading from backend API
```

### Example 3: Policy Triggers Payout

```
1. Backend evaluates policy against oracle data
2. Backend calls Trigger contract's evaluate_policy()
3. Trigger contract checks rainfall < threshold
4. Trigger contract records trigger event
5. Trigger contract emits PolicyTriggered event
6. Backend event indexer picks up event
7. Backend writes trigger to PostgreSQL
8. Backend webhook notifies farmer (optional)
9. Frontend shows payout in farmer's dashboard
```

## Technology Stack

### Frontend
- **Next.js 14** — React framework with App Router
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **@ceres-network/sdk** — TypeScript SDK for contract interaction
- **@stellar/stellar-sdk** — Stellar blockchain interaction
- **@stellar/freighter-api** — Wallet integration
- **SWR** — Data fetching and caching

### Backend
- **Node.js/TypeScript** — Runtime
- **Express** — REST API framework
- **PostgreSQL** — Event indexing and data storage
- **Redis** — Caching (optional)
- **@stellar/stellar-sdk** — Contract interaction
- **node-cron** — Scheduled oracle feeds

### Smart Contracts
- **Rust** — Contract language
- **Soroban SDK** — Stellar smart contract framework

## Environment Configuration

### Frontend (.env.local)

```env
# Stellar Network
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org

# Smart Contract Addresses
NEXT_PUBLIC_POOL_CONTRACT=C...
NEXT_PUBLIC_POLICY_CONTRACT=C...
NEXT_PUBLIC_ORACLE_CONTRACT=C...
NEXT_PUBLIC_TRIGGER_CONTRACT=C...

# USDC Asset
NEXT_PUBLIC_USDC_ASSET_CODE=USDC
NEXT_PUBLIC_USDC_ISSUER=G...

# Backend API (required)
NEXT_PUBLIC_API_URL=https://api.ceres.network
```

### Backend (.env)

See [ceres-backend](https://github.com/Ceres-Network/Ceres-backend) for backend configuration.

## Development Workflow

### Local Development Setup

1. **Deploy Smart Contracts**
   ```bash
   cd ceres-contracts
   # Follow deployment instructions
   # Note contract addresses
   ```

2. **Start Backend**
   ```bash
   cd ceres-backend
   # Configure .env with contract addresses
   npm install
   npm run dev
   # Backend runs on http://localhost:3001
   ```

3. **Start Frontend**
   ```bash
   cd ceres-frontend
   # Configure .env.local
   npm install
   npm run dev
   # Frontend runs on http://localhost:3000
   ```

### Testing

- **Frontend tests:** `npm run test` (Vitest)
- **Backend tests:** See backend repository
- **Contract tests:** See contracts repository

## Known Limitations

| Feature | Status | Notes |
|---------|--------|-------|
| Actual USDC transfers | ❌ Not implemented | Pool tracks numbers only |
| Trigger → pool payout | ❌ Not implemented | Cross-contract call missing |
| Oracle authentication | ❌ Not implemented | Anyone can submit readings |
| Oracle history | ❌ Not implemented | Only latest value stored |
| Payout calculation | ❌ Hardcoded | Fixed 5,000 USDC payout |
| Policy expiry | ❌ Manual | State must be set manually |

## Security Considerations

### Frontend
- Users sign all transactions via Freighter wallet
- Private keys never leave the user's browser
- All write operations require user approval

### Backend
- API keys for weather services stored securely
- Oracle feeder keypair stored in environment variables
- PostgreSQL credentials protected
- Rate limiting on API endpoints (recommended)

### Smart Contracts
- No authentication on oracle submissions (known gap)
- Pool withdrawals blocked when capital is locked
- Policy state transitions controlled by contract logic

## Deployment

### Frontend
- Deploy to Vercel, Netlify, or similar
- Set environment variables in deployment platform
- Ensure `NEXT_PUBLIC_API_URL` points to production backend

### Backend
- Deploy to cloud provider (AWS, GCP, DigitalOcean)
- Set up PostgreSQL database
- Configure environment variables
- Set up cron jobs for oracle feeder

### Smart Contracts
- Deploy to Stellar Testnet or Mainnet
- Use Soroban CLI or deployment scripts
- Update frontend and backend with contract addresses

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

## Resources

- [Stellar Documentation](https://developers.stellar.org/)
- [Soroban Documentation](https://soroban.stellar.org/docs)
- [Freighter Wallet](https://www.freighter.app/)
- [Ceres Network Repositories](https://github.com/Ceres-Network)
