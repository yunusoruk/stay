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
    title: string
    price: number
    totalPrice: number
    onChangeDate: (value: DateRange) => void
    dateRange: DateRange
    onSubmit: () => void
    disabled?: boolean
    disabledDates: Date[]
}

const ListingReservation: FC<ListingReservationProps> = ({
    title,
    price,
    totalPrice,
    onChangeDate,
    dateRange,
    onSubmit,
    disabled,
    disabledDates
}) => {
    return (
        <Card className='bg-background border-none shadow-none '>
            <CardHeader>
                <CardTitle className='flex flex-row items-center justify-center space-x-2 line-clamp-1 pb-1'>
                    <Label className='text-md '>A night at</Label>
                    <Label className='text-md text-primary'>
                        {title}
                    </Label>
                </CardTitle>
            </CardHeader>
            <Separator className='mb-2' />
            <CardContent className='flex flex-col justify-center items-center'>
                <div className="flex">
                    <DatePicker
                        month={1}
                        value={dateRange as DateRange}
                        disabledDates={disabledDates}
                        onChange={(value) =>
                            onChangeDate(value)}
                    />
                </div>
                <div className="flex mt-6 w-full">
                    <Button
                        disabled={disabled}
                        onClick={onSubmit}
                        className='w-full'
                    >
                        Reserve
                    </Button>
                </div>
            </CardContent>
            <CardFooter className='flex flex-col gap-4'>
                <Separator />
                <div className='w-full flex flex-row items-center'>
                    <Label className='text-lg mt-4 font-semibold'>
                        Per nigth
                    </Label>
                    <Label className='text-lg font-medium  ml-auto mt-4'>
                        $ {price}
                    </Label>
                </div>

                <div className='w-full flex flex-row items-center'>
                    <Label className='text-lg mt-4 font-semibold'>
                        Total
                    </Label>
                    <Label className='text-lg font-medium  ml-auto mt-4'>
                        $ {totalPrice}
                    </Label>
                </div>
            </CardFooter>
        </Card>
    );
}
export default ListingReservation;