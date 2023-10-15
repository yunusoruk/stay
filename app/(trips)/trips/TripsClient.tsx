'use client'

import ListingCard from '@/components/listings/ListingCard';
import { SafeReservation, SafeUser } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useState } from 'react';
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

interface TripsClientProps {
    reservations: SafeReservation[]
    currentUser?: SafeUser | null
}

const TripsClient: FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {

    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

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

    return (
        <div className='container'>

            <PageHeader className="pt-8 pb-4">
                <PageHeaderHeading>Trips</PageHeaderHeading>
                <PageHeaderDescription>Where you&apos;ve been and where you&apos;re going?</PageHeaderDescription>
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
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel='Cancel reservation'
                        currentUser={currentUser}
                    />
                ))}

            </div>
        </div>
    );
}
export default TripsClient;