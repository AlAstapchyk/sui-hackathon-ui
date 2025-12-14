export interface ApiParamOption {
  id: string;
  label: string;
}

export interface ApiParam {
  name: string;
  type: "string" | "number" | "select";
  default?: string | number;
  options?: ApiParamOption[];
  description?: string;
}

export interface ApiEndpoint {
  id: string;
  name: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
  queryParams?: ApiParam[];
  bodyParams?: ApiParam[];
}

export interface ApiExplorer {
  baseUrl: string;
  authHeader?: string;
  endpoints: ApiEndpoint[];
}

// Service feature displayed on Overview page
export interface ServiceFeature {
  icon: "latency" | "uptime" | "entitlements" | "payments" | "security" | "custom";
  title: string;
  description: string;
}

// Free tier configuration
export interface FreeTier {
  name: string;
  requests: number;
  features: string[];
  isForever?: boolean;
}

// Enterprise tier configuration
export interface EnterpriseTier {
  name: string;
  features: string[];
  contactLabel?: string;
}

// Pricing tier with type
export interface PricingTier {
  name: string;
  price: string;
  requests?: string;
  features?: string[];
  type?: "subscription" | "one-time"; // Optional for backward compat
  period?: string; // "monthly", "yearly", "1K/day"
}

// Request package (one-time purchase)
export interface RequestPackage {
  name: string;
  requests: number;
  price: string;
  pricePerRequest?: string;
}

export interface ServiceData {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  price_ms: number;
  provider: string;
  logo: string;
  providerAvatar?: string;
  category: string;
  tags: string[];
  is_verified?: boolean;
  sla?: string;
  rateLimit?: string;
  tokensAccepted?: string[];
  endpoint?: string;
  docsUrl?: string;
  supportUrl?: string;

  // Configurable features displayed on Overview
  features?: ServiceFeature[];

  // Pricing structure
  freeTier?: FreeTier;
  pricingTiers?: PricingTier[];
  requestPackages?: RequestPackage[];
  enterpriseTier?: EnterpriseTier;

  acceptingNewUsers?: boolean;
  latency?: string;
  uptime?: string;
  apiExplorer?: ApiExplorer;
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
`,
    price_ms: 500_000,
    provider: "Blockberry",
    logo: "https://docs.blockberry.one/favicon.ico",
    providerAvatar: "https://docs.blockberry.one/favicon.ico",
    category: "Indexer",
    tags: ["trending", "top-seller", "verified"],
    is_verified: true,
    sla: "99.9%",
    rateLimit: "10K req/min",
    tokensAccepted: ["SUI", "USDC"],
    endpoint: "https://api.blockberry.one/sui/v1",
    docsUrl: "https://docs.blockberry.one/reference/welcome-to-blockberry-api",
    supportUrl: "https://docs.blockberry.one/reference/error-reference",
    acceptingNewUsers: true,
    latency: "<100ms",
    uptime: "99.9%",
    // Service Features displayed on Overview
    features: [
      { icon: "latency", title: "Low Latency", description: "<100ms response" },
      { icon: "uptime", title: "High Availability", description: "99.9% uptime" },
      {
        icon: "entitlements",
        title: "On-Chain Entitlements",
        description: "Verified access via Sui",
      },
      { icon: "payments", title: "Multi-Token Payments", description: "SUI, USDC" },
    ],
    // Free Tier
    freeTier: {
      name: "Free Tier",
      requests: 10,
      features: ["Basic endpoints", "Community support"],
      isForever: true,
    },
    // Pricing Tiers (subscriptions)
    pricingTiers: [
      {
        name: "Pro",
        price: "0.0005 SUI/s",
        requests: "1K/day",
        features: ["All endpoints", "DeFi data", "Priority support"],
        type: "subscription",
        period: "monthly",
      },
    ],
    // Enterprise Tier
    enterpriseTier: {
      name: "Enterprise",
      features: ["Dedicated support", "Custom indexing", "SLA guarantee"],
      contactLabel: "Contact Sales",
    },
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
    apiExplorer: {
      baseUrl: "https://api.blockberry.one/sui/v1",
      authHeader: "x-api-key",
      endpoints: [
        {
          id: "getDefis",
          name: "getDefis",
          method: "POST",
          path: "/defi",
          description: "Get a list of all DeFis provided by DefiLlama",
          queryParams: [
            { name: "page", type: "number", default: 0 },
            { name: "size", type: "number", default: 20 },
            {
              name: "orderBy",
              type: "select",
              default: "DESC",
              options: [
                { id: "DESC", label: "Descending" },
                { id: "ASC", label: "Ascending" },
              ],
            },
            {
              name: "sortBy",
              type: "select",
              default: "CURRENT_TVL",
              options: [
                { id: "CURRENT_TVL", label: "Current TVL" },
                { id: "VOLUME_24H", label: "Volume 24H" },
                { id: "CHANGE_24H", label: "Change 24H" },
              ],
            },
          ],
          bodyParams: [
            {
              name: "categories",
              type: "select",
              options: [
                { id: "DEX", label: "DEX" },
                { id: "Lending", label: "Lending" },
                { id: "Bridge", label: "Bridge" },
                { id: "Yield", label: "Yield" },
                { id: "CDP", label: "CDP" },
                { id: "Derivatives", label: "Derivatives" },
                { id: "Liquid Staking", label: "Liquid Staking" },
              ],
            },
          ],
        },
        {
          id: "getDex",
          name: "getDex",
          method: "POST",
          path: "/defi/dex",
          description: "Get detailed DEX information",
          queryParams: [
            { name: "page", type: "number", default: 0 },
            { name: "size", type: "number", default: 20 },
          ],
        },
        {
          id: "getPackages",
          name: "getPackages",
          method: "GET",
          path: "/packages",
          description: "Get all packages",
          queryParams: [
            { name: "page", type: "number", default: 0 },
            { name: "size", type: "number", default: 20 },
          ],
        },
      ],
    },
  },
  {
    id: "quicknode-sui",
    name: "QuickNode Sui RPC",
    description:
      "The most performant end-to-end development platform. Instant access to Sui Mainnet, Testnet, and Devnet.",
    fullDescription: `## Overview

QuickNode provides a globally distributed, high-performance node network for Sui. It includes advanced developer tools like Graph API, Streams, and Functions.

### Key Features

- **Elastic APIs**: Auto-scaling infrastructure that handles spikes.
- **Streams**: Real-time data streaming for smart contract events.
- **Marketplace Add-ons**: One-click integrations for additional tools.

### Supported Methods
Full JSON-RPC support including:
- \`sui_getObject\`
- \`sui_moveCall\`
- \`sui_getEvents\`

### Integration

\`\`\`javascript
const solana = new QuickNode.Client({
  network: 'sui-mainnet',
  apiKey: 'YOUR_API_KEY'
});
\`\`\`
`,
    price_ms: 1_000_000,
    provider: "QuickNode",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGgLQz_slSGFrafFM9QK3iL1Ecu4YCT_EFIg&s",
    category: "RPC",
    tags: ["infrastructure", "enterprise", "popular"],
    is_verified: true,
    sla: "99.99%",
    rateLimit: "Unlimited (Tiered)",
    tokensAccepted: ["SUI", "USDC"],
    endpoint: "https://api.quicknode.com/sui",
    docsUrl: "https://marketplace.quicknode.com/explore/blockchain-data-and-analytics-apis",
    acceptingNewUsers: true,
    latency: "<20ms",
    pricingTiers: [
      {
        name: "Discover",
        price: "Free",
        requests: "10M Credits",
        features: ["Standard Support", "Core RPC"],
      },
      {
        name: "Build",
        price: "$49/mo",
        requests: "500M Credits",
        features: ["Archive Data", "Faster Response"],
      },
    ],
  },
  {
    id: "blockeden-api",
    name: "BlockEden API",
    description:
      "A suite of APIs for Aptos and Sui developers. Power your dApps with reliable RPC and Indexer services.",
    fullDescription: `## Overview

BlockEden.xyz provides a unified API dashboard for high-performance blockchains like Sui and Aptos.

### Services

- **Sui RPC**: Standard JSON-RPC interface.
- **Sui Indexer**: Query transactions and events via GraphQL.
- **Global CDN**: Nodes distributed across 12 regions.

### Usage

\`\`\`bash
curl https://api.blockeden.xyz/sui/YOUR_KEY \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "id": 1, "method": "sui_getTotalTransactionNumber", "params": []}'
\`\`\`
`,
    price_ms: 400_000,
    provider: "BlockEden",
    logo: "https://www.datocms-assets.com/166214/1758969781-1696041330-project-icon_blockeden.png?auto=format&fit=max&w=1200",
    category: "RPC",
    tags: ["developer-tools", "api"],
    is_verified: true,
    sla: "99.9%",
    rateLimit: "2000 req/s",
    tokensAccepted: ["SUI"],
    endpoint: "https://api.blockeden.xyz/sui",
    docsUrl: "https://blockeden.xyz/sui/",
    acceptingNewUsers: true,
    pricingTiers: [
      {
        name: "Public",
        price: "Free",
        requests: "Limited",
        features: ["Shared Nodes"],
      },
      {
        name: "Growth",
        price: "$40/mo",
        requests: "20M req/mo",
        features: ["Dedicated Gateway", "Analytics"],
      },
    ],
  },
  {
    id: "ankr-rpc",
    name: "Ankr RPC Service",
    description:
      "Connect to Sui with a distributed network of nodes. The most popular decentralized RPC aggregator.",
    fullDescription: `## Overview

Ankr provides a geo-distributed network of Sui nodes, ensuring that your users always connect to the closest and fastest node available.

### Features

- **Global Load Balancing**: Automatically routes requests to the healthiest nodes.
- **WebSocket Support**: Subscribe to on-chain changes in real-time.
- **Hybrid Infrastructure**: Combines bare-metal and cloud servers.

### Endpoint

\`https://rpc.ankr.com/sui\`
`,
    price_ms: 600_000,
    provider: "Ankr",
    logo: "https://images.seeklogo.com/logo-png/39/2/ankr-logo-png_seeklogo-398585.png",
    category: "RPC",
    tags: ["decentralized", "infrastructure"],
    is_verified: true,
    sla: "99.99%",
    rateLimit: "Flexible",
    tokensAccepted: ["ANKR", "SUI", "USDC"],
    endpoint: "https://rpc.ankr.com/sui",
    docsUrl: "https://www.ankr.com/docs/rpc-service/chains/chains-api/sui/",
    acceptingNewUsers: true,
    latency: "<50ms",
    pricingTiers: [
      {
        name: "Premium",
        price: "Pay-as-you-go",
        requests: "Unlimited",
        features: ["Global Distribution", "Priority Traffic"],
      },
    ],
  },
  {
    id: "the-graph",
    name: "The Graph",
    description:
      "The indexing and query layer of the decentralized web. Build and publish open APIs (subgraphs).",
    fullDescription: `## Overview

The Graph is the standard for indexing blockchain data. Developers build "Subgraphs" that define how data should be ingested and queried via GraphQL.

### Supported Features

- **GraphQL API**: Query exactly the data you need.
- **Hosted Service**: Managed indexing for high uptime.
- **Decentralized Network**: Unstoppable API powered by indexers.

### Query Example

\`\`\`graphql
{
  swaps(first: 5) {
    id
    sender
    amountIn
    amountOut
  }
}
\`\`\`
`,
    price_ms: 300_000,
    provider: "The Graph",
    logo: "https://cryptologos.cc/logos/the-graph-grt-logo.png",
    category: "Indexer",
    tags: ["query", "graphql", "essential"],
    is_verified: true,
    sla: "99.9%",
    tokensAccepted: ["GRT", "SUI"],
    docsUrl: "https://thegraph.com/docs/en/supported-networks/",
    acceptingNewUsers: true,
    pricingTiers: [
      {
        name: "Query Fees",
        price: "Variable",
        requests: "Per-query",
        features: ["Decentralized Indexing", "GraphQL"],
      },
    ],
  },
  {
    id: "dune-analytics",
    name: "Dune Analytics",
    description:
      "Unlock on-chain data with SQL. Create dashboards, visualize Sui metrics, and share insights.",
    fullDescription: `## Overview

Dune allows anyone to query Sui blockchain data using simple SQL. Convert raw on-chain data into beautiful charts and dashboards.

### Sui Tables

- \`sui.transactions\`
- \`sui.events\`
- \`sui.validators\`

### API Access

Integrate Dune charts directly into your application using the Dune API.
`,
    price_ms: 700_000,
    provider: "Dune",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQHc05hZLAac1w/company-logo_200_200/B56ZpZ3PIsJsAM-/0/1762444243894/dune_analytics_logo?e=2147483647&v=beta&t=CnrKnORxhMw4IkZI6d_3JMjmRPwjNzDoqaVVtAQZ0Nw",
    category: "Analytics",
    tags: ["data", "visualization", "sql"],
    is_verified: true,
    sla: "99.5%",
    tokensAccepted: ["USDC"],
    docsUrl: "https://dune.com/data?category=canonical&namespace=sui",
    acceptingNewUsers: true,
    pricingTiers: [
      {
        name: "Free",
        price: "Free",
        requests: "Limited API",
        features: ["Community Dashboards", "Standard SQL"],
      },
      {
        name: "Plus",
        price: "$399/mo",
        requests: "CSV Exports",
        features: ["Private Queries", "Faster Execution"],
      },
    ],
  },
  {
    id: "akash-network",
    name: "Akash Network",
    description:
      "The Supercloud for AI and compute. Deploy Docker containers on a decentralized marketplace at 85% lower cost.",
    fullDescription: `## Overview

Akash is a decentralized cloud computing marketplace. It connects those who need computing power (tenants) with those who have excess computing capacity (providers).

### Why Use Akash?

- **Cost Savings**: Significantly cheaper than AWS/GCP.
- **Permissionless**: No KYC, just deploy via CLI or Template.
- **Sui Nodes**: Perfect for running dedicated Sui validators or full nodes.

### Deploy

\`\`\`yaml
services:
  web:
    image: nginx
    expose:
      - port: 80
        as: 80
\`\`\`
`,
    price_ms: 300_000,
    provider: "Akash Network",
    logo: "https://assets.coingecko.com/coins/images/12785/large/akash-logo.png",
    category: "Compute",
    tags: ["decentralized", "cloud", "ai"],
    is_verified: true,
    sla: "99.9%",
    tokensAccepted: ["AKT", "USDC"],
    docsUrl: "https://akash.network/",
    acceptingNewUsers: true,
    pricingTiers: [
      {
        name: "Marketplace",
        price: "Bid-based",
        requests: "Hourly",
        features: ["Docker Support", "Shell Access"],
      },
    ],
  },
  {
    id: "walrus-storage",
    name: "Walrus Storage",
    description:
      "Decentralized storage network by Mysten Labs. Store blobs efficiently and secure them with Sui smart contracts.",
    fullDescription: `## Overview

Walrus provides a robust layer for storing large data files (blobs) that are too expensive to keep directly on the Sui blockchain.

### Key Features

- **Sui Integration**: Manage file permissions using Sui Objects.
- **Redundancy**: Data is erasure-coded and distributed.
- **Low Cost**: Highly competitive pricing for archival data.

### Use Cases

- NFT Media (Images/Video)
- dApp Hosting
- AI Datasets
`,
    price_ms: 250_000,
    provider: "Mysten Labs",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbiGb-G_KsIcCG_4pQNEwoKJUWFywbr-NAUQ&s",
    category: "Storage",
    tags: ["storage", "official", "mysten"],
    is_verified: true,
    sla: "99.9%",
    tokensAccepted: ["SUI", "WAL"],
    docsUrl: "https://docs.walrus.site/",
    acceptingNewUsers: true,
    pricingTiers: [
      {
        name: "Standard",
        price: "Per GB",
        requests: "Storage size",
        features: ["Global Replication", "Fast Retrieval"],
      },
    ],
  },
  {
    id: "filecoin-storage",
    name: "Filecoin",
    description:
      "The world's largest decentralized storage network. An open market for storing data reliably and cheaply.",
    fullDescription: `## Overview

Filecoin is a peer-to-peer network that stores files, with built-in economic incentives to ensure files are stored reliably over time.

### Features

- **Verifiable Storage**: Cryptographic proofs ensure your data is safe.
- **Massive Scale**: Exabytes of capacity available.
- **Sui Archival**: Ideal for long-term blockchain history storage.
`,
    price_ms: 200_000,
    provider: "Protocol Labs",
    logo: "https://cryptologos.cc/logos/filecoin-fil-logo.png",
    category: "Storage",
    tags: ["archival", "decentralized"],
    is_verified: true,
    sla: "99.9%",
    tokensAccepted: ["FIL"],
    docsUrl: "https://filecoin.io/",
    acceptingNewUsers: true,
    pricingTiers: [
      {
        name: "Storage Deal",
        price: "Market Rate",
        requests: "Per Deal",
        features: ["Cold Storage", "Retrievability"],
      },
    ],
  },
  {
    id: "storj-io",
    name: "Storj",
    description:
      "Fast, secure, and S3-compatible decentralized cloud object storage. Encrypted by default.",
    fullDescription: `## Overview

Storj DCS (Decentralized Cloud Storage) encrypts, shards, and distributes data across nodes around the world. It is S3 compatible, making it easy to switch from AWS.

### Features

- **S3 Compatible**: Works with existing tools like MinIO or AWS CLI.
- **End-to-End Encryption**: Only you hold the keys.
- **High Speed**: Downloads segments in parallel from multiple nodes.
`,
    price_ms: 220_000,
    provider: "Storj",
    logo: "https://assets.coingecko.com/coins/images/949/large/storj.png",
    category: "Storage",
    tags: ["s3", "fast", "secure"],
    is_verified: true,
    sla: "99.95%",
    tokensAccepted: ["STORJ", "USDC"],
    docsUrl: "https://www.storj.io/",
    acceptingNewUsers: true,
    pricingTiers: [
      {
        name: "Free Tier",
        price: "Free",
        requests: "25GB Storage",
        features: ["25GB Bandwidth", "S3 Access"],
      },
      {
        name: "Pro",
        price: "$4/TB",
        requests: "Monthly",
        features: ["Unlimited Scaling", "Priority Support"],
      },
    ],
  },
];
