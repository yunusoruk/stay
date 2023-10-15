import { prismadb } from '@/lib/prismadb'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(
    request: Request
    ) {
        const body = await request.json()
        const { email, password, name } = body

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        })

        return NextResponse.json(user)

    }