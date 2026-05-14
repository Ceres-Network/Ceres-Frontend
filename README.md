# Ceres Network Frontend

> ⚠️ **Work in Progress**: This project is under active development. Features may be incomplete or subject to change.

The React/Next.js frontend for the Ceres Network decentralised parametric crop insurance protocol on Stellar/Soroban.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)

## Overview

Ceres Network provides parametric crop insurance powered by smart contracts on Stellar. The dApp enables:

- **Farmers** — Register farm plots, purchase coverage, monitor policy status, and receive automatic payouts
- **Liquidity Providers** — Deposit/withdraw USDC into the shared pool and track LP share value
- **Oracle Operators** — Submit weather readings and vegetation health data for geo-cells

## Architecture

Ceres Network uses a **hybrid architecture** combining on-chain smart contracts with off-chain services:

### Smart Contracts (On-Chain)
- Pool, Policy, Oracle, and Trigger contracts deployed on Soroban
- Source of truth for all state and business logic
- Users sign transactions directly via Freighter wallet

### Backend API (Off-Chain)
- **Event Indexer** — Indexes contract events to PostgreSQL for fast historical queries
- **Oracle Feeder** — Automated weather data submission from CHIRPS, NASA POWER, and Open-Meteo
- **REST API** — Serves indexed data and proxies weather lookups with protected API keys
- Repository: [ceres-backend](https://github.com/Ceres-Network/Ceres-backend)

### Frontend (This Repository)
- **Reads** from backend API for historical data (policies, events, statistics)
- **Writes** directly to smart contracts via CeresClient SDK (user-signed transactions)
- Supports Freighter wallet for transaction signing

📖 **For detailed architecture documentation, see [ARCHITECTURE.md](ARCHITECTURE.md)**

## 🚧 Project Status

This is an **open-source project** under active development. We welcome contributions from the community!

### Current Status

- ✅ Project structure and basic setup
- ✅ Core UI components (buttons, cards, forms)
- ✅ Wallet integration (Freighter connection)
- ✅ Page layouts and routing
- 🚧 Policy registration (planned)
- 🚧 Pool deposit/withdrawal (planned)
- 🚧 Oracle reading submission (planned)
- 🚧 Smart contract integration (in progress)
- 🚧 Data fetching and state management (in progress)
- 📋 Charts and visualizations (planned)
- 📋 Form validation (planned)
- 📋 End-to-end testing (planned)
- 📋 Production deployment (planned)

See our [GitHub Issues](https://github.com/ceres-network/Ceres-Frontend/issues) for detailed progress and roadmap.

## Features

- ✅ **No Claims Process** — Payouts trigger automatically based on oracle data
- ✅ **No Agents** — Smart contracts handle everything
- ✅ **Parametric** — Triggers based on measurable weather data
- ✅ **Stellar-Native** — Fast, low-cost transactions

## Screenshots

_Coming soon_

## Prerequisites

- **Node.js 20+**
- **Freighter browser extension** — [Install Freighter](https://www.freighter.app/)
- **Stellar Testnet account** with test XLM — [Get test XLM](https://laboratory.stellar.org/#account-creator?network=test)

## Quickstart

1. **Clone the repository**

```bash
git clone https://github.com/Ceres-Network/Ceres-Frontend.git
cd Ceres-Frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment**

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:

```env
# Stellar Network Configuration
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org

# Smart Contract Addresses
NEXT_PUBLIC_POOL_CONTRACT=C...
NEXT_PUBLIC_POLICY_CONTRACT=C...
NEXT_PUBLIC_ORACLE_CONTRACT=C...
NEXT_PUBLIC_TRIGGER_CONTRACT=C...

# USDC Asset Configuration
NEXT_PUBLIC_USDC_ASSET_CODE=USDC
NEXT_PUBLIC_USDC_ISSUER=G...

# Backend API (required for data fetching)
NEXT_PUBLIC_API_URL=https://api.ceres.network
```

> **Note:** The backend API is required for the frontend to function properly. See [ceres-backend](https://github.com/Ceres-Network/Ceres-backend) for setup instructions.

4. **Run development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Local Development Setup

To run the full stack locally:

1. **Deploy smart contracts** using the [ceres-contracts](https://github.com/Ceres-Network/Ceres-contracts) repository
2. **Run the backend** using the [ceres-backend](https://github.com/Ceres-Network/Ceres-backend) repository
3. **Update `.env.local`** with your local configuration:
   - Contract addresses from step 1
   - `NEXT_PUBLIC_API_URL=http://localhost:3001` (or your backend port)
   - `NEXT_PUBLIC_SOROBAN_RPC_URL` pointing to your local Soroban RPC endpoint
4. **Start the frontend** with `npm run dev`

## Project Structure

```
Ceres-Frontend/
├── app/                    # Next.js 14 App Router pages
│   ├── farmer/            # Farmer dashboard and policy pages
│   ├── pool/              # LP pool dashboard
│   ├── oracle/            # Oracle node dashboard
│   └── layout.tsx         # Root layout with providers
├── components/
│   ├── farmer/            # Farmer-specific components
│   ├── pool/              # Pool-specific components
│   ├── oracle/            # Oracle-specific components
│   ├── charts/            # Data visualization components
│   ├── layout/            # Header, Footer
│   ├── wallet/            # Wallet connection components
│   └── ui/                # shadcn/ui primitives
├── hooks/                 # React hooks for data fetching
├── lib/                   # Utilities and SDK client
├── styles/                # Global CSS and Tailwind config
└── __tests__/             # Vitest tests
```

## Tech Stack

- **Next.js 14** — App Router with TypeScript
- **Tailwind CSS** — Styling with shadcn/ui components
- **@stellar/stellar-sdk** — Stellar blockchain interaction
- **@stellar/freighter-api** — Wallet integration
- **SWR** — Data fetching and caching
- **React Hook Form + Zod** — Form validation
- **Recharts** — Data visualization
- **Leaflet** — Interactive maps for geohash selection
- **Vitest** — Unit testing

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run type-check   # TypeScript type checking
```

## Testing

Tests are written using Vitest and React Testing Library:

```bash
npm run test
```

Test coverage includes:
- Component rendering and interaction
- Utility function correctness
- Form validation logic
- Data formatting functions

## 🤝 Contributing

We love contributions! Ceres Network is an open-source project and we welcome contributions of all kinds:

- 🐛 Bug reports and fixes
- ✨ New features and enhancements
- 📝 Documentation improvements
- 🎨 UI/UX improvements
- 🧪 Tests and test coverage
- 💡 Ideas and suggestions

Please read our [Contributing Guide](CONTRIBUTING.md) to get started. We have a list of [good first issues](https://github.com/ceres-network/ceres-app/labels/good%20first%20issue) perfect for newcomers!

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and add tests
4. Ensure all tests pass (`npm run test`)
5. Commit using [Conventional Commits](https://www.conventionalcommits.org/) (`git commit -m 'feat: add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## Related Repositories

- [ceres-contracts](https://github.com/Ceres-Network/Ceres-contracts) — Soroban smart contracts (Pool, Policy, Oracle, Trigger)
- [ceres-backend](https://github.com/Ceres-Network/Ceres-backend) — Event indexer, oracle feeder, and REST API

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🌟 Contributors

Thanks to all the people who have contributed to this project!

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- This section will be automatically updated -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

Want to be listed here? Check out our [Contributing Guide](CONTRIBUTING.md)!

## 💬 Community & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/Ceres-Network/Ceres-Frontend/issues)
- **GitHub Discussions**: [Ask questions and share ideas](https://github.com/Ceres-Network/Ceres-Frontend/discussions)

## 🙏 Acknowledgments

- Built on [Stellar](https://stellar.org/) blockchain
- Powered by [Soroban](https://soroban.stellar.org/) smart contracts
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## ⚖️ Disclaimer

This software is provided "as is", without warranty of any kind. This is experimental software under active development. Use at your own risk.

---

Built with ❤️ by the Ceres Network community on Stellar

**[⬆ back to top](#ceres-network-dapp)**
