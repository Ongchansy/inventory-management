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

// Utility function to handle file upload (reusable)
async function uploadImageFile(image: File | null): Promise<string | null> {
    if (!image) return null;

    const arrayBuffer = await image.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, image.name);
    fs.writeFileSync(filePath, uint8Array);
    
    return `/uploads/${image.name}`;
}


export const PUT = async (req: NextRequest) => {
    const id = req.nextUrl.pathname.split("/")[3];
    try {
        // Use FormData to handle the incoming request
        const formData = await req.formData();
        
        const name = formData.get('name') as string;
        const contactInfo = formData.get('contactInfo') as string;
        const image = formData.get('image') as File; // Handle image from FormData

        let imageUrl: string | null = null;
        
        if (image) {
            imageUrl = await uploadImageFile(image);
        }

        const updatedSupplier = await prisma.supplier.update({
            where: { id },
            data: {
                name,
                image: imageUrl,
                contactInfo,
            },
        });

        return NextResponse.json(updatedSupplier, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update supplier" }, { status: 500 });
    }
};
