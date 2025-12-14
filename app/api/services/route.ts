import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { ServiceData } from "@/app/data/services";

// POST - Create a new service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      fullDescription,
      logo,
      category,
      tags,
      price,
      rateLimit,
      latency,
      uptime,
      tokensAccepted,
      endpoint,
      docsUrl,
      supportUrl,
      features,
      freeTier,
      pricingTiers,
      requestPackages,
      enterpriseTier,
      apiExplorer,
      provider,
      providerAddress,
    } = body;

    if (!name || !description || !provider) {
      return NextResponse.json(
        { error: "Name, description, and provider are required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const collection = db.collection("services");

    const id =
      name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "") +
      "-" +
      Date.now();

    const newService: ServiceData & { providerAddress: string; createdAt: Date } = {
      id,
      name,
      description,
      fullDescription: fullDescription || "",
      price_ms: parseFloat(price) * 1_000_000 || 0,
      provider,
      providerAddress,
      logo: logo || "",
      category: category || "Other",
      tags: tags || [],
      is_verified: false,
      sla: "99%",
      rateLimit: rateLimit || "",
      latency: latency || "<100ms",
      uptime: uptime || "99%",
      tokensAccepted: tokensAccepted || ["SUI"],
      endpoint: endpoint || "",
      docsUrl: docsUrl || "",
      supportUrl: supportUrl || "",
      features: features || [],
      freeTier: freeTier?.name
        ? {
            name: freeTier.name,
            requests: parseInt(freeTier.requests) || 100,
            features: freeTier.features || [],
            isForever: freeTier.isForever ?? true,
          }
        : undefined,

      pricingTiers:
        pricingTiers?.map((tier: any) => ({
          name: tier.name,
          price: tier.price,
          requests: tier.requests,
          features: tier.features || [],
          type: tier.type || "subscription",
          period: tier.period,
        })) || [],

      requestPackages:
        requestPackages?.map((pkg: any) => ({
          name: `${pkg.requests} Requests`,
          requests: parseInt(pkg.requests) || 0,
          price: `${pkg.price} SUI`,
          pricePerRequest:
            pkg.requests > 0
              ? `${(parseFloat(pkg.price) / parseInt(pkg.requests)).toFixed(6)} SUI/req`
              : undefined,
        })) || [],

      enterpriseTier: enterpriseTier?.name
        ? {
            name: enterpriseTier.name,
            features: enterpriseTier.features || [],
            contactLabel: enterpriseTier.contactLabel || "Contact Sales",
          }
        : undefined,

      acceptingNewUsers: true,
      apiExplorer: apiExplorer?.baseUrl
        ? {
            baseUrl: apiExplorer.baseUrl,
            authHeader: apiExplorer.authHeader || "x-api-key",
            endpoints:
              apiExplorer.endpoints?.map((ep: any) => ({
                id: ep.id,
                name: ep.name,
                method: ep.method,
                path: ep.path,
                description: ep.description,
                queryParams: ep.queryParams || [],
                bodyParams: ep.bodyParams || [],
              })) || [],
          }
        : undefined,
      createdAt: new Date(),
    };

    await collection.insertOne(newService);
    console.log("Created new service:", newService.id);

    return NextResponse.json({ service: newService, created: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}

// GET - List all services or get by id
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const provider = searchParams.get("provider");

    const { db } = await connectToDatabase();
    const collection = db.collection("services");

    if (id) {
      const service = await collection.findOne({ id });
      return NextResponse.json({ service: service || null });
    }

    if (provider) {
      const services = await collection.find({ providerAddress: provider }).toArray();
      return NextResponse.json({ services });
    }

    const services = await collection.find({}).toArray();
    return NextResponse.json({ services });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}
