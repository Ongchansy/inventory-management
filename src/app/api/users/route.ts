
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt"
const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
