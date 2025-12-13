import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, User } from "@/app/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address, nickname, name } = body;

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection<User>("frontend");

    const existingUser = await collection.findOne({ address });
    if (existingUser) {
      return NextResponse.json({ user: existingUser, created: false });
    }

    const newUser: User = {
      address,
      nickname: nickname || `User_${address.slice(0, 6)}`,
      name: name || "",
      createdAt: new Date(),
      isProvider: false,
    };

    await collection.insertOne(newUser);
    console.log("Created new user:", newUser.address);

    return NextResponse.json({ user: newUser, created: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection<User>("frontend");

    const user = await collection.findOne({ address });

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
