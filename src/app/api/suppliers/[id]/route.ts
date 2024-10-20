import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
    const id = req.nextUrl.pathname.split("/")[3];
    try {
        const Supplier = await prisma.supplier.findUnique({
            where: { id },
        });
        return new Response(JSON.stringify(Supplier), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
        });
    }
}


export const DELETE = async (req: NextRequest) => {
    const id = req.nextUrl.pathname.split("/")[3];
    try {
        await prisma.supplier.delete({
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
        image,
        contactInfo
    } = await req.json();
    try {
        const updatedSupplier = await prisma.supplier.update({
            where: {
                id,
             },
            data: {
                name,
                image,
                contactInfo
            },
        });
        return new Response(JSON.stringify(updatedSupplier), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to update user" }), { status: 500 });
    }
};