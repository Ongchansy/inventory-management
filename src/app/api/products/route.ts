import uploadImageFile from "@/helper/file-upload"
import {PrismaClient} from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export const POST = async (req: NextRequest, res: NextResponse) => {

    const formData = await req.formData()

    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseInt(formData.get('price') as string)
    const quantity = parseInt(formData.get('quantity') as string)
    const categoryId = formData.get('categoryId') as string;
    const supplierId = formData.get('supplierId') as string
    const userId = formData.get('userId') as string
    const image = formData.get('image') as File

    let imageUrl = await uploadImageFile(image)

    
    try {
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                image: imageUrl,
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
        })
        return new NextResponse(JSON.stringify((products)), { status: 200 })
    } catch (error) {
        return  new NextResponse(JSON.stringify({
            data: null,
            error: "Internal Server Error"
        }), { status: 500 })
    }
}