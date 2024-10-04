// import prisma client
import { PrismaClient } from "@prisma/client";
// create prisma client
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
    const { 
      username,
      email,
      password,
      role
    } = await req.json();
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
        role
      },
    });
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
