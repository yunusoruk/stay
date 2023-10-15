'use client'

import type { FC } from 'react';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

interface CalenderProps {
    value: Range
    disabledDates?: Date[]
    onChange: (value: RangeKeyDict) => void
}

const Calender: FC<CalenderProps> = ({
    value,
    disabledDates,
    onChange
}) => {
    return (
        <DateRange
            rangeColors={["#262626"]}
            ranges={[value]}
            date={new Date()}
            onChange={onChange}
            direction='vertical'
            showDateDisplay={false}
            minDate={new Date()}
            disabledDates={disabledDates}
            className='border rounded-md '
            classNames={{
                calendarWrapper: "w-full flex justify-center",
                dateDisplayWrapper: 'bg-red-500',
                dateRangeWrapper: 'bg-black',      // Adds space between months
                // predefinedRangesWrapper: 'hidden',  // Hides predefined range choices
                monthAndYearWrapper: 'text-center font-semibold', // Centers the month/year display and makes it bold
            }}
        />
    );
}
export default Calender;