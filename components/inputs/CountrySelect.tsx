'use client'

import type { FC } from 'react';
// import Select from 'react-select';
import useCountries from '@/hooks/useCountries';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from '../ui/scroll-area';

export type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[],
    region: string;
    value: string
}



interface CountrySelectProps {
    value?: CountrySelectValue
    onChange: (value: CountrySelectValue) => void
}

const CountrySelect: FC<CountrySelectProps> = ({ value, onChange }) => {

    const { getAll } = useCountries()

    return (
        <Select onValueChange={(country) => onChange(country as any)} >
            <SelectTrigger >
                <SelectValue placeholder="Choose a country.." />
            </SelectTrigger>
            <SelectContent>
                <ScrollArea className='h-72 '>
                    <SelectGroup>
                        <SelectLabel>Countries</SelectLabel>
                        {getAll().map((country) => (
                            <SelectItem
                                key={country.value}
                                value={country as any}
                            >
                                <div className="flex flex-row space-x-2">
                                    <div className="">
                                        {country.flag}
                                    </div>
                                    <div>
                                        {country.label},
                                        <span className='text-muted-foreground' >{" "}{country.region}</span>
                                    </div>
                                </div>
                            </SelectItem>

                        ))}
                    </SelectGroup>
                </ScrollArea>

            </SelectContent>
        </Select>
    );
}
export default CountrySelect;