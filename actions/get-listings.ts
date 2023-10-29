import { prismadb } from "@/lib/prismadb";

export interface IListingParrams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}


export default async function getListings(
    params: IListingParrams
){

    try {

        const {
            userId,
            roomCount, 
            guestCount, 
            bathroomCount, 
            locationValue,
            startDate,
            endDate,
            category,
          } = params;


        let query: any = {}

        if (userId) {
            query.userId = userId;
          }
      
        if (category) {
            query.category = category;
            }

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }
        if (guestCount) {
            query.roomCount = {
                gte: +guestCount
            }
        }
        if (bathroomCount) {
            query.roomCount = {
                //greater than or equal
                gte: +bathroomCount
            }
        }

        if(locationValue) {
            query.locationValue = locationValue
        }

        if(startDate && endDate) {
            // reverse filtering
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: {gte: startDate},
                                startDate: {lte: startDate}
                            },
                            {
                                startDate: {lte: endDate},
                                endDate: {gte: endDate}
                            }
                        ]
                    }
                }
            }
        }


        const listings = await prismadb?.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        })

        const safeListings = listings.map(listing => ({
            ...listing,
            createdAt: listing.createdAt.toISOString()
        }))

        return safeListings
        
    } catch (error: any) {
        throw new Error(error)
    }
}