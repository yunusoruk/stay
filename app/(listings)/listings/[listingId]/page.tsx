import getCurrentUser from '@/actions/getCurrentUser';
import getListingById from '@/actions/getListingById';
import EmptyState from '@/components/EmptyState';
import type { FC } from 'react';
import ListingClient from './ListingClient';
import getReservations from '@/actions/getReservations';

interface IParams {
    listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
    // console.log(params);


    const listing = await getListingById(params)
    const reservations = await getReservations(params)
    const currentUser = await getCurrentUser()

    if (!listing) {
        return (
            <EmptyState />
        )
    }
    return (

        <div>
            <ListingClient
                listing={listing}
                reservations={reservations}
                currentUser={currentUser}
            />
        </div>
    );
}
export default ListingPage;