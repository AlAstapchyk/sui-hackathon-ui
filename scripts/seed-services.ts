// Script to seed hardcoded services into MongoDB
// Run with: npx tsx scripts/seed-services.ts

import "dotenv/config";
import { MongoClient } from "mongodb";
import { SERVICES } from "../app/data/services";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Error: MONGODB_URI not found in .env file");
  process.exit(1);
}

async function seedServices() {
  console.log("Connecting to MongoDB...");
  const client = new MongoClient(MONGODB_URI ?? "");

  try {
    await client.connect();
    const db = client.db("sui-hackathon");
    const collection = db.collection("services");

    console.log(`Found ${SERVICES.length} services to seed`);

    // Check existing services
    const existingCount = await collection.countDocuments();
    console.log(`Existing services in MongoDB: ${existingCount}`);

    // Insert or update each service
    for (const service of SERVICES) {
      const result = await collection.updateOne(
        { id: service.id },
        {
          $set: {
            ...service,
            providerAddress: "0x0000000000000000000000000000000000000000", // System services
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );

      if (result.upsertedCount > 0) {
        console.log(`✓ Inserted: ${service.name}`);
      } else if (result.modifiedCount > 0) {
        console.log(`↻ Updated: ${service.name}`);
      } else {
        console.log(`- Unchanged: ${service.name}`);
      }
    }

    const finalCount = await collection.countDocuments();
    console.log(`\nDone! Total services in MongoDB: ${finalCount}`);
  } catch (error) {
    console.error("Error seeding services:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedServices();
