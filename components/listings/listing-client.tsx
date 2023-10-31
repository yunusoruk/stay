'use client'

import ListingHead from '@/components/listings/listing-head';
import ListingInfo from '@/components/listings/listing-info';
import ListingReservation from '@/components/listings/listing-reservation';
import useLoginModal from '@/hooks/use-login-modal';
import { SafeListing, SafeReservation, SafeUser } from '@/types';
import axios from 'axios';
import { differenceInDays, eachDayOfInterval, setDate } from 'date-fns';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { DateRange } from 'react-day-picker';
import { categories } from '@/config/categories';


const initialDateRange = {
    from: new Date(),
    to: new Date(),
}

interface ListingClientProps {
    reservations?: SafeReservation[]
    listing: SafeListing & {
        user: SafeUser
    }
    currentUser?: SafeUser | null
}

const ListingClient: FC<ListingClientProps> = ({
    reservations = [],
    listing,
    currentUser
}) => {

    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation: any) => {
            const rangeOfBookedDates = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });
            dates = [...dates, ...rangeOfBookedDates];
        });
        return dates;
    }, [reservations]);

    const category = useMemo(() => {
        return categories.find((items) =>
            items.label === listing.category);
    }, [listing.category]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<DateRange>(initialDateRange);



    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        setIsLoading(true);

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange?.from,
            endDate: dateRange?.to,
            listingId: listing?.id
        })
            .then(() => {
                toast({
                    description: "Listing successfully reserved."
                })
                setDateRange(initialDateRange);
                router.push('/trips')
            })
            .catch(() => {
                toast({
                    description: 'Something went wrong'
                })
            })
            .finally(() => {
                setIsLoading(false);
            })
    },
        [
            totalPrice,
            dateRange,
            listing?.id,
            router,
            currentUser,
            loginModal
        ]);

    useEffect(() => {
        if (dateRange?.from && dateRange?.to) {
            const dayCount = differenceInDays(
                dateRange?.to,
                dateRange?.from
            );

            if (dayCount && listing.price) {
                setTotalPrice((dayCount + 1) * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

    return (
        <div className="container">
            <div>
                <div className="flex flex-col gap-2">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div
                        className='
                            grid
                            grid-cols-1
                            lg:grid-cols-6
                            xl:grid-cols-7
                            2xl:grid-cols-8
                            md:gap-10
                            mt-6
                        '
                    >
                        <div className="2xl:col-span-6 xl:col-span-5 lg:col-span-4">
                            <ListingInfo
                                user={listing.user}
                                category={category}
                                description={listing.description}
                                roomCount={listing.roomCount}
                                guestCount={listing.guestCount}
                                bathroomCount={listing.bathroomCount}
                                locationValue={listing.locationValue}
                            />
                        </div>
                        <div
                            className='order-first mb-10 lg:order-last lg:col-span-2'
                        >
                            <ListingReservation
                                title={listing.title}
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ListingClient;