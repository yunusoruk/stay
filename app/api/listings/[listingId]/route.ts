import getCurrentUser from "@/actions/get-current-user"
import { prismadb } from "@/lib/prismadb"
import { NextResponse } from "next/server"

export interface IParams {
    listingId?: string
}

export async function DELETE(request:Request, {params} : {params: IParams}) {
    
    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return NextResponse.error()
    }

    const{listingId} = params

    if(!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID')
    }

    const listing = await prismadb.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    })


return NextResponse.json(listing)


    
}