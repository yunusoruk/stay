import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import { prismadb } from "@/lib/prismadb";


interface IParams {
    listingId?: string
}

export async function POST(request: Request, {params}: {params: IParams}) {

    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const {listingId} = params

    if(!listingId || typeof listingId !== 'string'){
        throw new Error('Invalid ID')
    }
    
    let favoriteIDs = [...(currentUser.favoriteIds || [])]

    favoriteIDs.push(listingId)

    const user = await prismadb.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds: favoriteIDs
        }
    })

    return NextResponse.json(user)
}

export async function DELETE(Request:Request, {params}: {params: IParams}) {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const {listingId} = params

    if(!listingId || typeof listingId !== 'string'){
        throw new Error('Invalid ID')
    }
    
    let favoriteIDs = [...(currentUser.favoriteIds || [])]

    favoriteIDs = favoriteIDs.filter(id => id !== listingId)

    const user = await prismadb.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds: favoriteIDs
        }
    })

    return NextResponse.json(user)
}