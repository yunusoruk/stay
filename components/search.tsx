'use client';

import { useModal } from '@/hooks/use-modal-store';
import useCountries from '@/hooks/use-countries';
import useSearchModal from '@/hooks/use-search-modal';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi'

const Search = () => {

    const { onOpen } = useModal()
    const params = useSearchParams()
    const { getByValue } = useCountries()

    const locationValue = params?.get('locationValue')
    const startDate = params?.get('startDate')
    const endDate = params?.get('endDate')
    const guestCount = params?.get('guestCount')

    const locationLabel = useMemo(() => {
        if (locationValue) {
            return getByValue(locationValue as string)?.label
        }

        return 'Where are you going?'
    }, [getByValue, locationValue])

    const durationLabel = useMemo(() => {
        if (startDate && endDate) {
            const start = new Date(startDate as string)
            const end = new Date(endDate as string)
            let diff = differenceInDays(end, start)

            if (diff === 0) {
                diff = 1
            }

            return `${diff} Days`
        }

        return 'Check-in date - Check-out date '
    }, [endDate, startDate])

    const guestLabel = useMemo(() => {
        if (guestCount) {
            return `${guestCount} Guests`
        }

        return 'Guest Count'
    }, [guestCount])


    return (
        <div
            onClick={() => onOpen("searchModal")}
            className='
            border-[1px]
            w-full
            md:w-auto
            py-2
            rounded-lg
            shadow-sm
            hover:shadow-md
            transition 
            cursor-pointer 
            '
        >
            <div
                className='
                    flex
                    flex-row
                    items-center
                    justify-between
                '
            >
                <div
                    className='
                    text-sm
                    font-semibold
                    px-6
                '
                >
                    {locationLabel}
                </div>
                <div
                    className='
                    hidden
                    lg:block
                    text-sm
                    font-semibold
                    px-6
                    border-x-[1px]
                    flex-1
                    text-center
                '
                >
                    {durationLabel}
                </div>
                <div
                    className='
                    text-sm
                    pl-6
                    pr-6
                    flex
                    flex-row
                    items-center
                    gap-3
                    border-r-[1px]
                '
                >
                    <div className="hidden font-semibold lg:block">
                        {guestLabel}
                    </div>

                </div>
                <div className="px-6">
                    <div className="p-2 bg-primary rounded-lg text-white">
                        {/* Search */}
                        <BiSearch size={18} />
                    </div>
                </div>

            </div>
        </div>
    );
}
export default Search;