'use client'

import { Range } from 'react-date-range'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import type { FC } from 'react';
import Calender from '../inputs/Calender';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import { Icons } from '../icons';

interface ListingReservationProps {
    price: number
    totalPrice: number
    onChangeDate: (value: Range) => void
    dateRange: Range
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
        // <div
        //     className='

        //         rounded-xl
        //         border-[1px]
        //         overflow-hidden
        //     '
        // >
        //     <div className="flex flex-row items-center gap-1 p-4">
        //         <div className="text-2xl font-semibold">
        //             $ {price}
        //         </div>
        //         <div className="font-light text-neutral-600">
        //             night
        //         </div>
        //     </div>
        //     <hr />
        //     <Calender
        //         value={dateRange}
        //         disabledDates={disabledDates}
        //         onChange={(value) =>
        //             onChangeDate(value.selection)}
        //     />
        //     <hr />
        //     <div className="p-4">
        //         <Button
        //             disabled={disabled}
        //             onClick={onSubmit}
        //         >
        //             Reserve
        //         </Button>
        //     </div>
        //     <div
        //         className='
        //             p-4
        //             flex
        //             flex-row
        //             items-center
        //             justify-between
        //             font-semibold
        //             text-lg
        //         '
        //     >
        //         <div>
        //             Total
        //         </div>

        //         <div>
        //             $ {totalPrice}
        //         </div>
        //     </div>
        // </div>

        <Card>
            <CardHeader>
                <CardTitle className='flex flex-row items-center space-x-2'>
                    <span>
                        $ {price} {' /'}
                    </span>
                    <Icons.moon size={20} className='text-primary' />
                </CardTitle>

            </CardHeader>
            <Separator />
            <CardContent className='flex flex-col justify-center items-center'>
                <Calender
                    value={dateRange}
                    disabledDates={disabledDates}
                    onChange={(value) =>
                        onChangeDate(value.selection)}
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