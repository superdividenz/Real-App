import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role } = await request.json();

    const user = await prisma.user.create({
      data: {
        email,
        password, // In production, hash this!
        name,
        role: role || "client",
      },
    });

    return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    console.error('User creation error:', error);
    return NextResponse.json({ error: "User creation failed" }, { status: 400 });
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true }
    });
    return NextResponse.json({ users });
  } catch (error) {
    console.error('User fetch error:', error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}