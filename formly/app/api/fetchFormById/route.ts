import { prisma } from "@/lib/prismadb"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextResponse } from "next/server"

export async function GET(req: Request){
    try{
        const session = getKindeServerSession()
        const user = await session.getUser()

        if(!user){
            return NextResponse.json(
                {error: "User not found"},
                {status: 401}
            )}

        const { searchParams } = new URL(req.url)
        const formId = searchParams.get("formId")

        if(!formId){
            return NextResponse.json(
                {error: "Form ID not found"},
                {status: 400}
            )
        }

        const form = await prisma.form.findFirst({
            where: {
                userId: user.id,
                formId: formId,
            },
            include: {
                settings: true,
            }
        })

        if(!form){
            return NextResponse.json(
                {error: "Form not found"},
                {status: 404}
            )
        }

        return NextResponse.json({
            data: {
                success: true,
                message: "form fetched successfully",
                form
            }
        })

    } catch(error : any){
        return NextResponse.json(
            {error: error?.message || "Internal server error"},
            {status: 500}
        )
    }
}