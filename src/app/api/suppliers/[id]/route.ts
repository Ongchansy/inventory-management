import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import path from 'path';
import fs from 'fs';

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
    try {
        const {
            name,
            image,
            contactInfo,
        } = await req.json();

        const updatedSupplier = await prisma.supplier.update({
            where: { id },
            data: {
                name,
                image,
                contactInfo,
            },
        });

        return NextResponse.json(updatedSupplier, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update supplier" }, { status: 500 });
    }
};
