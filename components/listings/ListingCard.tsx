'use client'

import useCountries from '@/hooks/useCountries';
import { SafeUser, SafeListing, SafeReservation } from '@/types';
import { Listing, Reservation } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useMemo } from 'react';
import { format } from 'date-fns'
import Image from 'next/image';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import HeartButton from '../HeartButton';
// import HeartButton from '../HeartButton';

interface ListingCardProps {
    data: SafeListing
    reservation?: SafeReservation
    disabled?: boolean
    actionLabel?: string
    actionId?: string
    currentUser?: SafeUser | null
    onAction?: (id: string) => void
}

const ListingCard: FC<ListingCardProps> = ({
    data,
    reservation,
    disabled,
    actionId = '',
    actionLabel,
    currentUser,
    onAction
}) => {

    const router = useRouter()
    const { getByValue } = useCountries()
    const location = getByValue(data.locationValue)

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if (disabled) {
            return
        }
        onAction?.(actionId)
    }, [actionId, onAction, disabled])

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice
        }
        return data.price
    }, [data.price, reservation])

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null
        }
        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)

        return `${format(start, 'PP')} - ${format(end, 'PP')}`

    }, [reservation])



    return (

        <div
            onClick={() => router.push(`/listings/${data.id}`)}
            className='col-span-1 cursor-pointer group'>
            <div className="flex flex-col gap-2 w-full">
                <div className="
                    aspect-square 
                    w-full 
                    relative 
                    overflow-hidden 
                    rounded-xl
                ">
                    <Image
                        fill
                        alt='listing'
                        src={data.imageSrc}
                        className='
                                object-cover
                                h-full
                                w-full
                                group-hover:scale-110
                                transition
                            '
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location?.region}, {location?.label}
                </div>
                <div className="font-light text-muted-foreground">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        $ {price}
                    </div>
                    {!reservationDate && (
                        <div className="font-light">per night</div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        onClick={handleCancel}

                    >{actionLabel}</Button>
                )}
            </div>
        </div>

    );
}
export default ListingCard;