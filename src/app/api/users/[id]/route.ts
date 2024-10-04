// import prisma client
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
// create prisma client
const prisma = new PrismaClient();


// DELETE method
export const DELETE = async (req: NextRequest) => {
    const id = req.nextUrl.pathname.split("/")[3];
    try {
        await prisma.user.delete({ where: { id } });
        return new Response(null, { status: 204 }); // No Content
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to delete user" }), { status: 500 });
    }
};

// UPDATE method
export const PUT = async (req: NextRequest) => {
    const id = req.nextUrl.pathname.split("/")[3];
    const {
        username,
        email,
        password,
        role
    } = await req.json();
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id,
             },
            data: {
                username,
                email,
                password,
                role
            },
        });
        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to update user" }), { status: 500 });
    }
};

// GET method
export const GET = async (req: NextRequest) => {
    const id = req.nextUrl.pathname.split("/")[3];
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to get user" }), { status: 500 });
    }
};
