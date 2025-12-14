# Infra Service Discovery and Onchain Payments

A modular platform on Sui for discovering infrastructure services and verifiable onchain payments.

## 🚀 Overview

**MVP Goal**: Solve infrastructure discovery and monetization on Sui.

- **Registration & Management**: Providers can register services and view usage dashboards.
- **Smart Discovery**: Filter and search services with rich metadata (pricing, docs, etc).
- **Interactive API Explorer**: Test API routes directly from the documentation interface.
- **Onchain Payments**: Pay for requests and subscriptions using Sui Objects.
- **Request Validation**: Proxy sidecar to enforce entitlement access.

## 🛠 Tech Stack

- **Frontend**: Next.js 16, Tailwind CSS v4, Motion.
- **Blockchain**: Sui dApp Kit, Sui TS SDK.
- **Data**: MongoDB.

## 📂 Website Structure

- **Home (`/`)**: Service discovery portal with search and filtering.
- **Service Details (`/service/[id]`)**: Comprehensive view with pricing tiers, documentation, and API explorer.
- **Provider Dashboard (`/provider`)**: Management interface for service providers.
- **Create Service (`/provider/create`)**: Flow for listing new infrastructure services.

## ⚡ Quick Start

```bash
git clone https://github.com/yourusername/sui-infra-platform.git
cd sui-infra-platform
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🔧 Env Config

```env
NEXT_PUBLIC_SUI_NETWORK=testnet
NEXT_PUBLIC_PACKAGE_ID=
NEXT_PUBLIC_REGISTRY_ID=
NEXT_PUBLIC_PROXY_URL=
MONGODB_URI=
```
