import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs"; // Import for saving files locally, if necessary
import path from "path"; // For file path management

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const contactInfo = formData.get("contactInfo") as string;
    let imageUrl = "";

    const image = formData.get("image") as File | null;
    if (image) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer); // Create a Buffer from ArrayBuffer
      const uint8Array = new Uint8Array(buffer); // Convert Buffer to Uint8Array

      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true }); // Create upload directory if it doesn't exist
      }

      const filePath = path.join(uploadDir, image.name); // Full path to save the image
      fs.writeFileSync(filePath, uint8Array); // Write the Uint8Array to file

      imageUrl = `/uploads/${image.name}`; // Store the relative path
    }

    const createSupplier = await prisma.supplier.create({
      data: {
        name,
        image: imageUrl,
        contactInfo,
      },
    });

    return new NextResponse(JSON.stringify(createSupplier), { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        data: null,
        error: "Internal Server Error",
      }),
      { status: 500 }
    );
  }
};


export const GET = async (req: NextRequest) => {
    try {
        const suppliers = await prisma.supplier.findMany({
            orderBy: {
                name: "asc",
            },
        });
        return new NextResponse(JSON.stringify(suppliers), { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
        });
    }
};
