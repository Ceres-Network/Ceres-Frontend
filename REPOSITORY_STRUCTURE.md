# Ceres Network dApp - Complete Repository Structure

This document provides an overview of the complete repository structure for the Ceres Network dApp frontend.

## 📁 Directory Structure

```
ceres-app/
├── .github/
│   └── workflows/
│       └── ci.yml                          # GitHub Actions CI pipeline
├── __tests__/                              # Test files
│   ├── components/
│   │   ├── farmer/
│   │   │   └── PolicyStatusBadge.test.tsx
│   │   └── pool/
│   │       └── PoolStatsBar.test.tsx
│   └── lib/
│       ├── format.test.ts
│       └── geohash.test.ts
├── app/                                    # Next.js 14 App Router
│   ├── farmer/
│   │   ├── policy/
│   │   │   └── [id]/
│   │   │       └── page.tsx               # Policy detail page
│   │   ├── register/
│   │   │   └── page.tsx                   # Policy registration page
│   │   └── page.tsx                       # Farmer dashboard
│   ├── oracle/
│   │   └── page.tsx                       # Oracle dashboard
│   ├── pool/
│   │   └── page.tsx                       # LP pool dashboard
│   ├── layout.tsx                         # Root layout with providers
│   └── page.tsx                           # Landing page
├── components/
│   ├── charts/
│   │   ├── RainfallChart.tsx              # Recharts rainfall visualization
│   │   └── UtilisationGauge.tsx           # Pool utilisation gauge
│   ├── farmer/
│   │   ├── GeohashPicker.tsx              # Map-based geohash selector
│   │   ├── GeohashPickerMap.tsx           # Leaflet map component
│   │   ├── PolicyCard.tsx                 # Policy summary card
│   │   ├── PolicyList.tsx                 # Grid of policy cards
│   │   ├── PolicyStatusBadge.tsx          # Status badge component
│   │   └── RegisterPolicyForm.tsx         # Multi-step registration wizard
│   ├── layout/
│   │   ├── Footer.tsx                     # Footer with links
│   │   └── Header.tsx                     # Header with navigation
│   ├── oracle/
│   │   ├── NodeHealthCard.tsx             # Oracle node health stats
│   │   ├── ReadingHistoryTable.tsx        # Reading submission history
│   │   └── ReadingSubmitForm.tsx          # Oracle reading submission form
│   ├── pool/
│   │   ├── DepositForm.tsx                # USDC deposit form
│   │   ├── LPPositionCard.tsx             # User's LP position display
│   │   ├── PoolStatsBar.tsx               # Pool statistics bar
│   │   └── WithdrawForm.tsx               # LP share withdrawal form
│   ├── ui/                                # shadcn/ui primitives
│   │   ├── alert.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── skeleton.tsx
│   │   ├── slider.tsx
│   │   ├── tabs.tsx
│   │   └── toast-context.tsx              # Toast notification system
│   └── wallet/
│       ├── ConnectButton.tsx              # Freighter connect/disconnect
│       └── WalletProvider.tsx             # Wallet context provider
├── hooks/
│   ├── useCeresClient.ts                  # CeresClient singleton hook
│   ├── useOracleReadings.ts               # Oracle data fetching
│   ├── usePolicies.ts                     # Policy data fetching
│   └── usePoolStats.ts                    # Pool statistics fetching
├── lib/
│   ├── ceres-client.ts                    # CeresClient initialization
│   ├── constants.ts                       # Contract addresses & config
│   ├── format.ts                          # Data formatting utilities
│   ├── geohash.ts                         # Geohash encoding/decoding
│   └── utils.ts                           # General utilities (cn)
├── public/
│   └── images/
│       └── .gitkeep
├── styles/
│   └── globals.css                        # Tailwind base + CSS variables
├── .env.example                           # Environment variables template
├── .eslintrc.json                         # ESLint configuration
├── .gitignore                             # Git ignore rules
├── LICENSE                                # MIT License
├── README.md                              # Project documentation
├── next.config.ts                         # Next.js configuration
├── package.json                           # Dependencies and scripts
├── postcss.config.js                      # PostCSS configuration
├── tailwind.config.ts                     # Tailwind CSS configuration
├── tsconfig.json                          # TypeScript configuration
├── vitest.config.ts                       # Vitest test configuration
└── vitest.setup.ts                        # Vitest setup file
```

## 🎯 Key Features Implemented

### Pages (App Router)

1. **Landing Page** (`app/page.tsx`)
   - Hero section with protocol tagline
   - Animated stats ticker
   - "How it works" 4-step visual
   - Features section
   - Call-to-action sections

2. **Farmer Dashboard** (`app/farmer/page.tsx`)
   - Summary statistics (active policies, total coverage, payouts)
   - Policy list with filtering
   - "Register new policy" button

3. **Policy Registration** (`app/farmer/register/page.tsx`)
   - Multi-step wizard (Location → Crop & Season → Coverage → Review)
   - Interactive Leaflet map for geohash selection
   - Form validation with Zod
   - Freighter transaction signing

4. **Policy Detail** (`app/farmer/policy/[id]/page.tsx`)
   - Full policy information display
   - Current oracle readings with color-coded thresholds
   - Rainfall chart with threshold overlay
   - "Evaluate policy" button

5. **LP Pool Dashboard** (`app/pool/page.tsx`)
   - Pool statistics bar
   - Two-tab layout (Deposit/Withdraw)
   - LP position card
   - Utilisation gauge chart

6. **Oracle Dashboard** (`app/oracle/page.tsx`)
   - Reading submission form
   - Reading history table
   - Node health card

### Components

#### Farmer Components
- `PolicyCard` — Summary card for a single policy
- `PolicyList` — Grid of policy cards with loading states
- `RegisterPolicyForm` — Multi-step registration wizard
- `PolicyStatusBadge` — Active/Triggered/Expired pill
- `GeohashPicker` — Map-based geohash selector with Leaflet

#### Pool Components
- `PoolStatsBar` — Total capital, locked, utilisation display
- `DepositForm` — USDC deposit with share preview
- `WithdrawForm` — LP share withdrawal with USDC preview
- `LPPositionCard` — User's share balance and USD value

#### Oracle Components
- `ReadingSubmitForm` — Submit rainfall/NDVI readings
- `ReadingHistoryTable` — Last 20 submissions with status
- `NodeHealthCard` — Submissions count and tracked cells

#### Charts
- `RainfallChart` — Recharts line chart with threshold overlay
- `UtilisationGauge` — Pie chart showing pool utilisation

### Hooks

- `useCeresClient` — Singleton CeresClient access
- `usePolicies` — Fetch farmer policies with SWR (60s refresh)
- `usePoolStats` — Live pool stats with 15s polling
- `useLPPosition` — User's LP position with 15s refresh
- `useOracleReadings` — Oracle reading history (30s refresh)
- `useAggregatedReadings` — Aggregated readings per geo-cell
- `useNodeHealth` — Oracle node health statistics

### Utilities

- `lib/format.ts` — Format USDC, shares, rainfall, NDVI, timestamps
- `lib/geohash.ts` — Encode/decode geohash, cell bounds, GeoJSON conversion
- `lib/constants.ts` — Contract addresses, network config, crop types
- `lib/ceres-client.ts` — CeresClient singleton initialization

### Wallet Integration

- `WalletProvider` — React context for Freighter wallet state
- `ConnectButton` — Connect/disconnect with network validation
- All transactions use `freighter.signTransaction()` then broadcast
- Friendly error handling for user-rejected transactions

## 🧪 Testing

Tests written with Vitest + React Testing Library:

- `PoolStatsBar.test.tsx` — Component rendering and data display
- `PolicyStatusBadge.test.tsx` — Badge variant rendering
- `format.test.ts` — All formatting functions (USDC, shares, rainfall, NDVI)
- `geohash.test.ts` — Geohash encoding/decoding utilities

## 🚀 CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`):
- Type checking (`tsc --noEmit`)
- Linting (`eslint`)
- Testing (`vitest run`)
- Building (`next build`)
- Node 20 with npm cache
- Runs on push and PR to main

## 📦 Dependencies

### Core
- Next.js 14 (App Router)
- React 18
- TypeScript 5

### Stellar/Blockchain
- @stellar/stellar-sdk
- @stellar/freighter-api
- @ceres-network/sdk (workspace package)

### UI/Styling
- Tailwind CSS
- shadcn/ui components
- lucide-react (icons)
- class-variance-authority

### Data Fetching
- SWR (data fetching and caching)

### Forms
- react-hook-form
- zod
- @hookform/resolvers

### Visualization
- recharts
- leaflet
- react-leaflet
- ngeohash

### Utilities
- date-fns
- clsx
- tailwind-merge

### Testing
- vitest
- @testing-library/react
- @testing-library/jest-dom
- jsdom

## 🎨 Design System

### Theme
- Dark-first design with green accents (#22c55e)
- Agricultural/earthy tone
- CSS variables for easy light mode toggle

### Responsive
- Mobile-first approach
- Works on 375px+ screens
- Map picker collapses to text input on mobile

### Loading States
- Skeleton loaders (not spinners)
- Inline error banners with retry buttons
- Toast notifications for transactions

### Accessibility
- All interactive elements keyboard navigable
- ARIA labels on icon-only buttons
- Semantic HTML structure

## 🔐 Security & Best Practices

- No `any` types in TypeScript
- All contract return types from SDK
- Strict TypeScript mode enabled
- Named exports only (no default-only exports)
- `use client` directive only where needed
- Leaflet imported with `dynamic(..., { ssr: false })`
- Environment variables validated at runtime

## 📝 Documentation

- Comprehensive README with quickstart guide
- Inline code comments for complex logic
- JSDoc comments on utility functions
- Environment variable template (`.env.example`)
- Repository structure documentation (this file)

## 🔗 Integration Points

### SDK Integration
- CeresClient initialized with contract addresses from env
- All contract calls go through the SDK
- Transaction building and signing handled by SDK + Freighter

### Contract Interaction Pattern
```typescript
// Build transaction
const tx = await client.registerPolicy({ ... });

// Sign with Freighter
const signedXdr = await signTransaction(tx.toXDR(), {
  networkPassphrase: client.networkPassphrase,
});

// Submit transaction
const result = await client.submitTransaction(signedXdr);
```

## 🎯 Next Steps

To use this repository:

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local`
3. Add your contract addresses to `.env.local`
4. Run development server: `npm run dev`
5. Connect Freighter wallet on Stellar Testnet
6. Start using the dApp!

---

**Repository Status**: ✅ Complete and ready for deployment

All files have been generated according to the specification. The repository includes:
- ✅ All pages (landing, farmer, pool, oracle)
- ✅ All components (farmer, pool, oracle, charts, UI)
- ✅ All hooks (policies, pool stats, oracle readings)
- ✅ All utilities (format, geohash, constants)
- ✅ Wallet integration (Freighter)
- ✅ Tests (Vitest + React Testing Library)
- ✅ CI/CD (GitHub Actions)
- ✅ Documentation (README, this file)
- ✅ Configuration (Next.js, TypeScript, Tailwind, ESLint)
