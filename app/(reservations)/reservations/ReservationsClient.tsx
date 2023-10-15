'use client'

import ListingCard from '@/components/listings/ListingCard';
import { SafeReservation, SafeUser } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useState } from 'react';
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

interface ReservationsClientProps {
    reservations: SafeReservation[]
    currentUser?: SafeUser | null
}

const ReservationsClient: FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {

    //router
    const router = useRouter()

    const [deletingId, setDeletingId] = useState('')
    //onCancel and states

    const onCancel = useCallback((id: string) => {
        setDeletingId(id)
        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast({
                    description: "Reservation successfully cancelled."
                })
                router.refresh()
            })
            .catch((error) => {
                toast({
                    description: 'Something went wrong'
                })
            })
            .finally(() => {
                setDeletingId('')
            })
    }, [router])
    //container heading listingcard

    return (
        <div className='container'>

            <PageHeader className="pt-8 pb-4">
                <PageHeaderHeading>Reservations</PageHeaderHeading>
                <PageHeaderDescription>Booking on your properties</PageHeaderDescription>
            </PageHeader>
            <Separator className="mt-4" />

            <div
                className='
                    mt-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4 
                    xl:grid-cols-5 
                    2xl:grid-cols-6 
                    gap-8
                '
            >
                {reservations.map((reservation: any) => (
                    <ListingCard
                        reservation={reservation}
                        data={reservation.listing}
                        key={reservation.id}
                        disabled={reservation.id === deletingId}
                        actionId={reservation.id}
                        onAction={onCancel}
                        actionLabel='Cancel guest reservation'
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </div>
    );
}
export default ReservationsClient;