'use client'

import type { FC } from 'react';
import Select from 'react-select';
import useCountries from '@/hooks/useCountries';

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
        <div>
            <Select
                placeholder="Nereye gidiyorsun?"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as CountrySelectValue)}
                formatOptionLabel={(option: any) => (
                    <div className='flex flex-row items-center gap-3'>
                        <div>{option.flag}</div>
                        <div>{option.label}, <span className='text-muted-foreground ml-1' >{option.region}</span></div>
                    </div>

                )}
                classNames={{
                    control: () => ' p-1 border-2 border-dahsed',
                    input: () => 'text-lg',
                    option: () => 'text-lg'
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6'
                    }
                })}
            />
        </div>
    );
}
export default CountrySelect;