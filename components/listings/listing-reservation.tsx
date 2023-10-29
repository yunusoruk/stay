'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import type { FC } from 'react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import { Icons } from '../icons';
import DatePicker from '../date-picker';
import { DateRange } from 'react-day-picker';

interface ListingReservationProps {
    price: number
    totalPrice: number
    onChangeDate: (value: DateRange) => void
    dateRange: DateRange
    onSubmit: () => void
    disabled?: boolean
    disabledDates: Date[]
}

const ListingReservation: FC<ListingReservationProps> = ({
    price,
    totalPrice,
    onChangeDate,
    dateRange,
    onSubmit,
    disabled,
    disabledDates
}) => {
    return (
        <Card className='bg-background'>
            <CardHeader>
                <CardTitle className='flex flex-row items-center space-x-2'>
                    <Label className='text-md'>
                        {`$${price} per night`}
                    </Label>
                </CardTitle>

            </CardHeader>
            <Separator />
            <CardContent className='flex flex-col justify-center items-center'>
                <DatePicker
                    value={dateRange as DateRange}
                    disabledDates={disabledDates}
                    onChange={(value) =>
                        onChangeDate(value)}
                />

                <div
                    className='w-full flex flex-row items-center'
                >
                    <Label className='text-lg mt-4 font-semibold'>
                        Total
                    </Label>
                    <Label className='text-lg font-medium  ml-auto mt-4'>
                        $ {totalPrice}
                    </Label>
                </div>
            </CardContent>
            <Separator />
            <CardFooter className='flex flex-col gap-4'>
                <div className="flex mt-6 w-full">
                    <Button
                        disabled={disabled}
                        onClick={onSubmit}
                        className='w-full'
                    >
                        Reserve
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
export default ListingReservation;