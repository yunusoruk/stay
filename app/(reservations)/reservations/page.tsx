

import getCurrentUser from '@/actions/get-current-user';
import getReservations from '@/actions/get-reservations';
import EmptyState from '@/components/empty-state';
import type { FC } from 'react';
import ReservationsClient from '../../../components/reservations/reservations-client';
import { redirect } from 'next/navigation';


const ReservationsPage = async () => {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        redirect('/login')
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    })

    if (reservations.length === 0) {
        return (
            <EmptyState
                title="No reservations found"
                subtitle="Looks like you have no reservations on your property."
            />
        )
    }

    return (
        <ReservationsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    );
}
export default ReservationsPage;