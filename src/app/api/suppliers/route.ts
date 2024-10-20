import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest, res: NextResponse) => {

    const {
        name,
        image,
        contactInfo,
        products,
        
    } = await req.json()
    
    try {
        const createSupplier = await prisma.supplier.create({
            data: {
                name,
                image,
                contactInfo,
                products,
            }
        })

        return new NextResponse(JSON.stringify(createSupplier), { status: 201 })
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({ 
            data: null,
            error: "Internal Server Error"
         }), { status: 500 })

    }
}

export const GET = async (req: NextRequest) => {
    try {
        const supplier = await prisma.supplier.findMany({
            orderBy: {
                name: "asc"
            }
        })
        return new Response(JSON.stringify(supplier), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
        });
    }
}

