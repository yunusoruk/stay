import getCurrentUser from '@/actions/get-current-user';
import getListingById from '@/actions/get-listing-by-id';
import EmptyState from '@/components/empty-state';
import type { FC } from 'react';
import ListingClient from '../../../../components/listings/listing-client';
import getReservations from '@/actions/get-reservations';

interface IParams {
    listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {

    const listing = await getListingById(params)
    const reservations = await getReservations(params)
    const currentUser = await getCurrentUser()

    if (!listing) {
        return (
            <EmptyState />
        )
    }
    return (

        <ListingClient
            listing={listing}
            reservations={reservations}
            currentUser={currentUser}
        />
    );
}
export default ListingPage;