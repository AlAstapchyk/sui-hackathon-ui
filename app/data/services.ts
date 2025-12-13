export interface ServiceData {
  id: string;
  name: string;
  description: string;
  // Full markdown description for detail page
  fullDescription?: string;
  price_ms: number;
  provider: string;
  providerAvatar?: string;
  category: string;
  tags: string[];
  is_verified?: boolean;
  // Service metadata
  sla?: string;
  rateLimit?: string;
  tokensAccepted?: string[];
  endpoint?: string;
  docsUrl?: string;
  supportUrl?: string;
  // Monthly subscription tiers
  pricingTiers?: {
    name: string;
    price: string;
    requests: string;
    features: string[];
  }[];
  // Request packages (pay-per-use) - can be used alongside or instead of monthly tiers
  requestPackages?: {
    name: string;
    requests: number;
    price: string; // e.g., "0.001 SUI"
    pricePerRequest?: string; // e.g., "0.00001 SUI/req"
  }[];
  // Provider status
  acceptingNewUsers?: boolean;
  // Technical specs
  latency?: string;
  regions?: string[];
  uptime?: string;
}

export const SERVICES: ServiceData[] = [
  {
    id: "blockberry-api",
    name: "Blockberry API",
    description:
      "Open API platform providing extensive indexed blockchain data for Sui - accounts, transactions, DeFi, NFTs, validators, and more.",
    fullDescription: `
Blockberry is an open API platform providing an extensive set of indexed blockchain data that allows developers to build Web-3 applications: DeFis, DEXs, block explorers, supply management platforms, and more.

### What Data We Provide

Apart from general blockchain data like accounts, transactions, validators, coins, and events - we have indexed:

- **Metadata**: Token and coin metadata
- **NFTs & Collections**: Full NFT data with attributes
- **DeFi & DEX**: Protocol TVL, trading activity
- **Validators**: APY, stake, commission data
- **Charts & Analytics**: Historical data visualization

### API Endpoints

- \`/accounts\` - Account balances, activity, objects
- \`/transactions\` - Transaction history and details
- \`/validators\` - Validator info, APY, delegations
- \`/defi\` - DeFi protocol data and TVL
- \`/nfts\` - NFT collections and metadata
- \`/coins\` - Coin info and market data

### Example Request

\`\`\`bash
curl --request POST \\
  --url 'https://api.blockberry.one/sui/v1/defi?page=0&size=20&orderBy=DESC&sortBy=CURRENT_TVL' \\
  --header 'accept: */*' \\
  --header 'content-type: application/json' \\
  --header 'x-api-key: YOUR_API_KEY' \\
  --data '{"categories":"DEX"}'
\`\`\`

### Response Example

\`\`\`json
{
  "content": [
    {
      "name": "Cetus",
      "category": "DEX",
      "currentTvl": 125000000,
      "volume24h": 5000000
    }
  ],
  "totalElements": 42
}
\`\`\`

### Supported Chains

- **Sui Mainnet** - Full indexing
- **Walrus Mainnet** - Storage data
- **Iota Mainnet/Testnet** - Full indexing
- **Mina Mainnet/Devnet** - Full indexing
`,
    price_ms: 500_000,
    provider: "Blockberry",
    providerAvatar: "https://docs.blockberry.one/favicon.ico",
    category: "Indexer",
    tags: ["trending", "top-seller"],
    is_verified: true,
    sla: "99.9%",
    rateLimit: "10K req/min",
    tokensAccepted: ["SUI", "USDC"],
    endpoint: "https://api.blockberry.one/sui/v1",
    docsUrl: "https://docs.blockberry.one/reference/welcome-to-blockberry-api",
    supportUrl: "https://docs.blockberry.one/reference/error-reference",
    acceptingNewUsers: true,
    latency: "<100ms",
    regions: ["Global"],
    uptime: "99.9%",
    pricingTiers: [
      {
        name: "Free",
        price: "Free",
        requests: "10 requests",
        features: ["Basic endpoints", "Community support"],
      },
      {
        name: "Pro",
        price: "0.0005 SUI/s",
        requests: "1K/day",
        features: ["All endpoints", "DeFi data", "Priority support"],
      },
      {
        name: "Enterprise",
        price: "Custom",
        requests: "Unlimited",
        features: ["Dedicated support", "Custom indexing", "SLA guarantee"],
      },
    ],
    requestPackages: [
      {
        name: "Starter Pack",
        requests: 100,
        price: "0.5 SUI",
        pricePerRequest: "0.005 SUI/req",
      },
      {
        name: "Growth Pack",
        requests: 1000,
        price: "4 SUI",
        pricePerRequest: "0.004 SUI/req",
      },
      {
        name: "Scale Pack",
        requests: 10000,
        price: "30 SUI",
        pricePerRequest: "0.003 SUI/req",
      },
    ],
  },
  {
    id: "0x268060691fbe57a86e16d41a8ba0a277441a7566beb9ddb2774430d68ef4a912",
    name: "SuiNode Pro RPC",
    description:
      "Enterprise-grade Sui RPC endpoint with ultra-low latency, 99.99% uptime SLA, and dedicated support.",
    fullDescription: `## Overview

SuiNode Pro RPC provides enterprise-grade access to the Sui blockchain with ultra-low latency and 99.99% uptime SLA.

### Key Features

- **Ultra-low latency**: <10ms average response time globally
- **High throughput**: 10,000+ requests per second
- **Archive access**: Full historical data since genesis
- **WebSocket support**: Real-time subscriptions for events and transactions

### Supported Methods

All standard Sui JSON-RPC methods including:
- \`sui_getObject\`
- \`sui_getTransaction\`
- \`sui_executeTransactionBlock\`
- \`sui_subscribeEvent\`

### Use Cases

Perfect for:
- High-frequency trading bots
- Production dApps requiring reliability
- Analytics platforms needing archive data
- Real-time monitoring dashboards

### Integration

\`\`\`javascript
import { SuiClient } from '@mysten/sui.js';

const client = new SuiClient({
  url: 'https://rpc.suinodepro.io'
});
\`\`\`
`,
    price_ms: 1_000_000,
    provider: "Sui Foundation",
    category: "RPC",
    tags: ["trending", "supercharged"],
    is_verified: true,
    sla: "99.99%",
    rateLimit: "10K req/s",
    tokensAccepted: ["SUI", "USDC"],
    endpoint: "https://rpc.suinodepro.io",
    docsUrl: "https://docs.suinodepro.io",
    supportUrl: "https://support.suinodepro.io",
    acceptingNewUsers: true,
    latency: "<10ms",
    regions: ["US-East", "EU-West", "Asia-Pacific"],
    uptime: "99.99%",
    pricingTiers: [
      {
        name: "Starter",
        price: "Free",
        requests: "100K/month",
        features: ["Basic RPC", "Community support"],
      },
      {
        name: "Pro",
        price: "0.001 SUI/s",
        requests: "Unlimited",
        features: ["All methods", "Priority support", "WebSocket"],
      },
      {
        name: "Enterprise",
        price: "Custom",
        requests: "Unlimited",
        features: ["Dedicated nodes", "SLA guarantee", "24/7 support"],
      },
    ],
  },
  {
    id: "mock-2",
    name: "Index-O-Matic Pro",
    description:
      "Real-time Sui blockchain indexer with GraphQL API for transactions, events, and custom Move structs.",
    fullDescription: `## Overview

Index-O-Matic Pro is a high-performance indexer for the Sui blockchain, providing instant access to on-chain data through a powerful GraphQL API.

### Key Features

- **Real-time indexing**: Sub-second latency from on-chain to API
- **GraphQL API**: Flexible queries with complex filtering
- **Custom indexing**: Index your own Move structs and events
- **Historical data**: Full archive since Sui mainnet launch

### Query Examples

\`\`\`graphql
query GetTransactions {
  transactions(
    filter: { sender: "0x..." }
    first: 10
  ) {
    digest
    timestamp
    effects { status }
  }
}
\`\`\`

### Indexed Data

- Transactions & effects
- Events (all types)
- Object snapshots
- Coin balances
- NFT metadata

### Performance

- 5,000 queries/second
- <100ms p99 latency
- 99.9% uptime SLA
`,
    price_ms: 500_000,
    provider: "IndexLabs",
    category: "Indexer",
    tags: ["top-seller"],
    is_verified: true,
    sla: "99.9%",
    rateLimit: "5K req/s",
    tokensAccepted: ["SUI"],
    docsUrl: "https://docs.indexomatic.io",
    acceptingNewUsers: true,
    latency: "<100ms",
    regions: ["Global CDN"],
  },
  {
    id: "mock-3",
    name: "Walrus Storage Gateway",
    description:
      "Decentralized storage powered by Walrus with on-chain access control and CDN-backed delivery.",
    fullDescription: `## Overview

Walrus Storage Gateway provides decentralized, censorship-resistant storage with seamless Sui blockchain integration.

### Key Features

- **Decentralized storage**: Data stored across Walrus network
- **On-chain ACL**: Access control via Sui objects
- **CDN delivery**: Fast global content delivery
- **Encryption**: Optional client-side encryption

### How It Works

1. Upload file via API or SDK
2. File stored on Walrus network
3. Access token issued as Sui object
4. Retrieve via CDN with valid entitlement

### Supported Formats

- Images (JPEG, PNG, WebP, SVG)
- Documents (PDF, JSON, YAML)
- Media (MP4, MP3)
- Arbitrary blobs up to 1GB

### SDK Example

\`\`\`typescript
import { WalrusClient } from '@walrus/sdk';

const client = new WalrusClient({ wallet });
const blobId = await client.upload(file);
\`\`\`
`,
    price_ms: 200_000,
    provider: "Mysten Labs",
    category: "Storage",
    tags: ["staff-pick", "supercharged"],
    is_verified: true,
    sla: "99.95%",
    rateLimit: "1K req/s",
    tokensAccepted: ["SUI", "WAL"],
    docsUrl: "https://docs.walrus.site",
    supportUrl: "https://discord.gg/walrus",
    acceptingNewUsers: true,
    latency: "<200ms",
    regions: ["Decentralized"],
  },
  {
    id: "mock-4",
    name: "Sui Analytics Dashboard",
    description:
      "Comprehensive on-chain analytics for Sui: DeFi TVL, NFT volumes, DEX activity, and custom metrics.",
    fullDescription: `## Overview

Sui Analytics Dashboard provides comprehensive on-chain analytics with REST API access for DeFi, NFT, and ecosystem metrics.

### Available Metrics

- **DeFi**: TVL, trading volumes, liquidity pools
- **NFTs**: Floor prices, volumes, holder counts
- **DEX**: Swap volumes, price feeds, slippage
- **Network**: TPS, gas prices, validator stats

### API Endpoints

- \`/api/v1/defi/tvl\` - Protocol TVL data
- \`/api/v1/nft/collections\` - NFT collection stats
- \`/api/v1/dex/pairs\` - DEX pair analytics
- \`/api/v1/network/stats\` - Network metrics

### Data Freshness

- Real-time: <1 minute delay
- Historical: Available since mainnet

### Export Formats

- JSON (default)
- CSV
- Parquet
`,
    price_ms: 800_000,
    provider: "ChainPulse",
    category: "Analytics",
    tags: ["trending"],
    is_verified: false,
    sla: "99.5%",
    rateLimit: "500 req/min",
    tokensAccepted: ["SUI", "USDC", "USDT"],
    docsUrl: "https://docs.chainpulse.io",
    acceptingNewUsers: true,
    latency: "<1s",
  },
  {
    id: "mock-5",
    name: "Move Debugger Pro",
    description:
      "Advanced debugging tools for Move smart contracts with step-through execution and vulnerability scanning.",
    fullDescription: `## Overview

Move Debugger Pro provides comprehensive debugging and security analysis tools for Move smart contracts on Sui.

### Features

- **Step-through debugging**: Line-by-line execution
- **Gas profiling**: Identify expensive operations
- **Vulnerability scanning**: Automated security checks
- **Test coverage**: Measure code coverage

### Security Checks

- Reentrancy detection
- Integer overflow/underflow
- Access control issues
- Unchecked external calls

### Integration

Works with:
- VS Code extension
- CLI tool
- CI/CD pipelines
`,
    price_ms: 1_500_000,
    provider: "SecureSui",
    category: "Security",
    tags: ["staff-pick"],
    is_verified: true,
    sla: "99%",
    rateLimit: "100 req/min",
    tokensAccepted: ["SUI"],
    docsUrl: "https://docs.securesui.io",
    acceptingNewUsers: true,
  },
  {
    id: "mock-6",
    name: "Sui Price Oracle",
    description:
      "Decentralized price feeds for 500+ assets with sub-second updates and cryptographic attestations.",
    fullDescription: `## Overview

Sui Price Oracle provides decentralized, reliable price feeds for 500+ assets with cryptographic proofs and multi-source aggregation.

### Features

- **500+ assets**: Crypto, forex, commodities
- **Sub-second updates**: Real-time price data
- **Multi-source**: Aggregated from 10+ exchanges
- **Cryptographic proofs**: Verifiable on-chain

### Supported Assets

- Major cryptocurrencies (BTC, ETH, SUI, etc.)
- Stablecoins (USDC, USDT, DAI)
- DeFi tokens
- NFT floor prices

### On-Chain Integration

\`\`\`move
use oracle::price_feed;

public fun get_price(asset: String): u64 {
    price_feed::get_latest_price(asset)
}
\`\`\`
`,
    price_ms: 300_000,
    provider: "OracleNet",
    category: "Data",
    tags: ["trending", "top-seller"],
    is_verified: true,
    sla: "99.99%",
    rateLimit: "Unlimited",
    tokensAccepted: ["SUI", "USDC"],
    docsUrl: "https://docs.oraclenet.io",
    acceptingNewUsers: true,
    latency: "<500ms",
  },
  {
    id: "mock-7",
    name: "NFT Metadata API",
    description:
      "Instant access to NFT metadata, ownership history, and floor prices for all Sui collections.",
    fullDescription: `## Overview

NFT Metadata API provides comprehensive NFT data including metadata, ownership history, and market analytics for all Sui collections.

### Data Available

- **Metadata**: Name, description, attributes, image
- **Ownership**: Current owner, transfer history
- **Market**: Floor price, last sale, volume

### Collections Indexed

All Sui NFT collections including:
- Prime Machin
- Sui Punks
- Sui Frens
- And 1000+ more

### API Example

\`\`\`bash
curl https://api.nftscan.sui/v1/nft/{object_id}
\`\`\`
`,
    price_ms: 250_000,
    provider: "NFTScan",
    category: "Data",
    tags: [],
    is_verified: false,
    rateLimit: "2K req/s",
    tokensAccepted: ["SUI"],
    acceptingNewUsers: true,
  },
  {
    id: "mock-8",
    name: "Transaction Simulator",
    description:
      "Simulate Sui transactions before execution to preview gas costs, object mutations, and potential errors.",
    fullDescription: `## Overview

Transaction Simulator allows you to dry-run Sui transactions before execution, previewing all effects without spending gas.

### What You Get

- **Gas estimation**: Accurate gas cost prediction
- **Object mutations**: See all object changes
- **Error detection**: Catch errors before execution
- **Event preview**: See emitted events

### Use Cases

- Wallet transaction preview
- Smart contract testing
- Gas optimization
- Error handling

### API

\`\`\`typescript
const result = await simulator.dryRun({
  transaction: tx,
  sender: address
});

console.log(result.gasUsed);
console.log(result.effects);
\`\`\`
`,
    price_ms: 400_000,
    provider: "SimulateSui",
    category: "Compute",
    tags: ["supercharged"],
    is_verified: true,
    sla: "99.9%",
    rateLimit: "1K req/s",
    tokensAccepted: ["SUI", "WAL"],
    docsUrl: "https://docs.simulatesui.io",
    acceptingNewUsers: true,
    latency: "<100ms",
  },
  {
    id: "mock-9",
    name: "Sui Webhooks",
    description:
      "Real-time event notifications for on-chain activity via HTTP callbacks for addresses, contracts, and events.",
    fullDescription: `## Overview

Sui Webhooks provides real-time notifications for on-chain activity, delivering events to your HTTP endpoints as they happen.

### Trigger Types

- **Address activity**: Transactions to/from addresses
- **Contract events**: Specific Move events
- **Object changes**: Object creation/mutation/deletion
- **Coin transfers**: Token transfers

### Webhook Payload

\`\`\`json
{
  "type": "transaction",
  "digest": "...",
  "timestamp": 1699999999,
  "sender": "0x...",
  "effects": { ... }
}
\`\`\`

### Reliability

- Automatic retries (3x)
- Dead letter queue
- Webhook logs & debugging
`,
    price_ms: 350_000,
    provider: "HookStream",
    category: "Indexer",
    tags: ["trending"],
    is_verified: false,
    rateLimit: "500 webhooks",
    tokensAccepted: ["SUI", "USDC"],
    docsUrl: "https://docs.hookstream.io",
    acceptingNewUsers: false,
  },
];
