import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import uploadImageFile from "@/helper/file-upload";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  try {
    const {
      name,
      image,
      contactInfo,
    } = await req.json();
    

    const createSupplier = await prisma.supplier.create({
      data: {
        name,
        image,
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
