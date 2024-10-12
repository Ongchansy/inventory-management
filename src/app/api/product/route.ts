import {PrismaClient} from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export const POST = async (req: NextRequest, res: NextResponse) => {

    const {
        
            name,
            description,
            price,
            image,
            quantity,
            categoryId,
            supplierId,
            userId
        
    } = await req.json()
    
    try {
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                image,
                quantity,
                categoryId,
                supplierId,
                userId
            }
        })

        return new NextResponse(JSON.stringify({
            data: product,
            message: "Product created successfully"
        }), { status: 201 })
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({ 
            data: null,
            error: "Internal Server Error"
         }), { status: 500 })

    }
}

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        const products = await prisma.product.findMany()
        return new NextResponse(JSON.stringify({
            data: products,
            message: "Products fetched successfully"
        }), { status: 200 })
    } catch (error) {
        return  new NextResponse(JSON.stringify({
            data: null,
            error: "Internal Server Error"
        }), { status: 500 })
    }
}