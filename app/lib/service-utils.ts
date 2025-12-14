import { ServiceData } from "@/app/data/services";
import { connectToDatabase } from "./mongodb";

// Get service by ID from MongoDB
export async function getServiceById(id: string): Promise<ServiceData | undefined> {
  try {
    const { db } = await connectToDatabase();
    const mongoService = await db.collection("services").findOne({ id });
    if (mongoService) {
      const { _id, ...service } = mongoService;
      return service as ServiceData;
    }
  } catch (error) {
    console.error("Error fetching service from MongoDB:", error);
  }
  return undefined;
}

// Get all services from MongoDB
export async function getAllServices(): Promise<ServiceData[]> {
  try {
    const { db } = await connectToDatabase();
    const mongoServices = await db.collection("services").find({}).toArray();
    return mongoServices.map(({ _id, ...service }) => service as ServiceData);
  } catch (error) {
    console.error("Error fetching services from MongoDB:", error);
    return [];
  }
}

export function formatPrice(priceMist: number): string {
  const priceInSui = priceMist / 1_000_000_000;
  if (priceInSui >= 1) return priceInSui.toFixed(4);
  if (priceInSui >= 0.001) return (priceInSui * 1000).toFixed(4) + "m";
  return (priceMist / 1_000_000).toFixed(4) + "μ";
}

export function formatSubscriptionAmount(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(4)} SUI`;
  }
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(2)}M MIST`;
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(2)}K MIST`;
  }
  return `${amount} MIST`;
}
