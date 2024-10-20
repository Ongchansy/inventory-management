import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
    const id = req.nextUrl.pathname.split("/")[3];
    try {
        const product = await prisma.product.findUnique({
            where: { id },
        });
        return new Response(JSON.stringify(product), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
        });
    }
}


export const DELETE = async (req: NextRequest) => {
    const id = req.nextUrl.pathname.split("/")[3];
    try {
        await prisma.product.delete({
            where: { id },
        });
        return new Response(null, {
            status: 204,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
        });
    }
};

export const PUT = async (req: NextRequest) => {
    const id = req.nextUrl.pathname.split("/")[3];
    const {
        name,
        price,
        image,
        quantity,
    } = await req.json();
    try {
        const updatedProduct = await prisma.product.update({
            where: {
                id,
             },
            data: {
                name,
                price,
                image,
                quantity,
            },
        });
        return new Response(JSON.stringify(updatedProduct), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to update user" }), { status: 500 });
    }
};