import {PrismaClient} from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export const POST = async (req: NextRequest, res: NextResponse) => {

    const {
        name,
        description
        
    } = await req.json()
    
    try {
        const category = await prisma.category.create({
            data: {
                name,
                description
            }
        })

        return new NextResponse(JSON.stringify(category), { status: 201 })
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
        const categories = await prisma.category.findMany({
            orderBy: {
                name: "asc"
            },
            include: {
                products: true
            }
        })
        return new NextResponse(JSON.stringify((categories)), { status: 200 })
    } catch (error) {
        return  new NextResponse(JSON.stringify({
            data: null,
            error: "Internal Server Error"
        }), { status: 500 })
    }
}