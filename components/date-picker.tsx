"use client"

import * as React from "react"
import { DateRange } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"


interface DatePickerProps {
    value: DateRange
    disabledDates?: Date[]
    onChange: (value: DateRange) => void
    month?: number
}

export default function DatePicker({
    onChange,
    value,
    disabledDates,
    month
}: DatePickerProps) {

    const disabledDays = [
        { before: new Date() },
        ...disabledDates as Date[]
    ];

    return (
        <div className={cn("")}>
            <Calendar
                initialFocus
                mode="range"
                defaultMonth={value?.from}
                selected={value}
                onSelect={value => onChange(value as DateRange)}
                numberOfMonths={month || 1}
                disabled={disabledDays}

            />
        </div>
    )
}