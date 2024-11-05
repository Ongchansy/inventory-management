import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import uploadImageFile from "@/helper/file-upload";

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

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const price = parseInt(formData.get("price") as string);
    const quantity = parseInt(formData.get("quantity") as string);
    const userId = formData.get("userId") as string;
    const categoryId = formData.get("categoryId") as string;
    const supplierId = formData.get("supplierId") as string;
    const image = formData.get("image") as File;

    let imageUrl = await uploadImageFile(image)

    try {
        const updatedProduct = await prisma.product.update({
            where: {
                id,
             },
            data: {
                name,
                price,
                image: imageUrl,
                quantity,
                userId,
                categoryId,
                supplierId
            },
        });
        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to update user" }), { status: 500 });
    }
};

// async function uploadImageFile(image: File | null): Promise<string | null> {
//     if (!image) return null;

//     const arrayBuffer = await image.arrayBuffer();
//     const uint8Array = new Uint8Array(arrayBuffer);
//     const uploadDir = path.join(process.cwd(), 'public/uploads');

//     if (!fs.existsSync(uploadDir)) {
//         fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     const filePath = path.join(uploadDir, image.name);
//     fs.writeFileSync(filePath, uint8Array);
    
//     return `/uploads/${image.name}`;
// }


// export const PUT = async (req: NextRequest) => {
//     const id = req.nextUrl.pathname.split("/")[3];
//     try {
//         // Use FormData to handle the incoming request
//         const formData = await req.formData();
        
//         const name = formData.get('name') as string;
//         const contactInfo = formData.get('contactInfo') as string;
//         const image = formData.get('image') as File; // Handle image from FormData

//         let imageUrl: string | null = null;
        
//         if (image) {
//             imageUrl = await uploadImageFile(image);
//         }

//         const updatedSupplier = await prisma.supplier.update({
//             where: { id },
//             data: {
//                 name,
//                 image: imageUrl,
//                 contactInfo,
//             },
//         });

//         return NextResponse.json(updatedSupplier, { status: 200 });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: "Failed to update supplier" }, { status: 500 });
//     }
// };
