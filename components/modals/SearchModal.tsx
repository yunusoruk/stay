'use client'

import qs from 'query-string'
import { FC, useCallback, useMemo, useState } from 'react';
import useSearchModal from '@/hooks/useSearchModal';
import { useRouter, useSearchParams } from 'next/navigation';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { formatISO } from 'date-fns';
// import Heading from '../navbar/Heading';
import Calender from '../inputs/Calender';
import Counter from '../inputs/Counter';
import Modal from '../Modal';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useModal } from '@/hooks/use-modal-store';
import { Button } from '../ui/button';

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

interface SearchModalProps { }

const SearchModal: FC<SearchModalProps> = ({ }) => {

    const { isOpen, onClose, type } = useModal();

    const router = useRouter()
    const params = useSearchParams()

    const isModalOpen = isOpen && type === "searchModal";

    const [location, setLocation] = useState<CountrySelectValue>()
    const [step, setStep] = useState(STEPS.LOCATION)
    const [guestCount, setGuestCount] = useState(1)
    const [roomCount, setRoomCount] = useState(1)
    const [bathroomCount, setBathroomCount] = useState(1)
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    console.log(location);


    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location])

    const onBack = useCallback(() => {

        setStep((value) => value - 1)
    }, [])

    const onNext = useCallback(() => {

        setStep((value) => value + 1)
    }, [])

    const onSubmit = useCallback(async () => {

        if (step !== STEPS.INFO) {
            return onNext()
        }
        let currentQuery = {}

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount,
        }

        // Turn date values to string so we can use it on URL
        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate)
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true })

        onClose()
        router.push(url)
        setStep(STEPS.LOCATION)

    }, [step, router, guestCount, roomCount, bathroomCount, location, dateRange, onNext, params])

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Search'
        }

        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined
        }

        return 'Back'
    }, [step])

    const handleClose = useCallback(() => {

        onClose()
        setStep(STEPS.LOCATION)

    }, [])

    let bodyContent = (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Where do you want to go?</DialogTitle>
                <DialogDescription>
                    Find the perfect location
                </DialogDescription>
            </DialogHeader>
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
            <div className="flex">

                <Button variant='secondary' className='ml-auto' onClick={onNext}>
                    {actionLabel}
                </Button>
            </div>
        </DialogContent>

    )

    if (step === STEPS.DATE) {
        bodyContent = (

            <DialogContent>
                <DialogTitle>When do you plan to go?</DialogTitle>
                <DialogDescription>
                    Make sure everyone is free
                </DialogDescription>
                <Calender
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}

                />
                <div className="flex">
                    <Button variant='secondary' onClick={onBack}>
                        {secondaryActionLabel}
                    </Button>

                    <Button className='ml-auto' variant='secondary' onClick={onNext}>
                        {actionLabel}
                    </Button>
                </div>
            </DialogContent>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <DialogContent>

                <DialogHeader>
                    <DialogTitle>
                        More information
                    </DialogTitle>
                    <DialogDescription>
                        Find your perfect place!
                    </DialogDescription>
                </DialogHeader>
                <Counter
                    title='Guests'
                    subtitle='How many guests are coming?'
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                />
                <Counter
                    title='Rooms'
                    subtitle='How many rooms do you need?'
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                />
                <Counter
                    title='Bathrooms'
                    subtitle='How many bathrooms do you need?'
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                />
                <div className="flex">
                    <Button variant='secondary' onClick={onBack}>
                        {secondaryActionLabel}
                    </Button>

                    <Button className='ml-auto' onClick={onSubmit}>
                        {actionLabel}
                    </Button>
                </div>

            </DialogContent>
        )
    }


    return (

        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            {bodyContent}
        </Dialog>
    );
}
export default SearchModal;