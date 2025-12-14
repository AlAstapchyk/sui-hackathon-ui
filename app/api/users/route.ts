import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";

export interface User {
  address: string;
  nickname: string;
  name: string;
  createdAt: Date;
}

// POST /api/users - Create or get user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address, nickname, name } = body;

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection<User>("users");

    const existingUser = await collection.findOne({ address });
    if (existingUser) {
      return NextResponse.json({ user: existingUser, created: false });
    }

    const newUser: User = {
      address,
      nickname: nickname || `User_${address.slice(0, 6)}`,
      name: name || "",
      createdAt: new Date(),
    };

    await collection.insertOne(newUser);
    console.log("Created new user:", newUser.address);

    return NextResponse.json({ user: newUser, created: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

// GET /api/users - Get user by address
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection<User>("users");

    const user = await collection.findOne({ address });

    return NextResponse.json({ user: user || null });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

// PATCH /api/users - Update user
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { address, nickname, name } = body;

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection<User>("users");

    const updateData: Partial<User> = {};
    if (nickname) updateData.nickname = nickname;
    if (name) updateData.name = name;

    const result = await collection.updateOne({ address }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = await collection.findOne({ address });
    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
