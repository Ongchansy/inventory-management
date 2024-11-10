import {PrismaClient} from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export const POST = async (req: NextRequest, res: NextResponse) => {

    const body = await req.json()
    const { name, description, price, image, quantity, categoryId, supplierId, userId } = body

    
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

        return new NextResponse(JSON.stringify(product), { status: 201 })
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
        const products = await prisma.product.findMany({
            orderBy: {
                name: "asc"
            },
            include: {
                category: true,
                supplier: true,
                user: true
            }
        })
        return new NextResponse(JSON.stringify((products)), { status: 200 })
    } catch (error) {
        return  new NextResponse(JSON.stringify({
            data: null,
            error: "Internal Server Error"
        }), { status: 500 })
    }
}