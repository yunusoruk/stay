import getCurrentUser from "@/actions/get-current-user"
import { prismadb } from "@/lib/prismadb"
import { NextResponse } from "next/server"


export async function POST(request:any) {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const body = await request.json()

    const{ 
        totalPrice,
        startDate,
        endDate,
        listingId
    } = body

    if(!totalPrice|| !startDate || !endDate || !listingId){
        return NextResponse.error()
    }


    const listingAndReservation = await prismadb.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    startDate: startDate,
                    endDate: endDate,
                    totalPrice: totalPrice,
                    userId: currentUser.id
                }
            }
            
    }
}
)


    return NextResponse.json(listingAndReservation)

}