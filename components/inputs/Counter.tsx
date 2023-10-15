'use client'

import { FC, useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterProps {
    title: string
    subtitle: string
    value: number
    onChange: (value: number) => void
}

const Counter: FC<CounterProps> = ({ title, subtitle, value, onChange }) => {

    const onAdd = useCallback(() => {
        onChange(value + 1)
    }, [onChange, value])

    const onReduce = useCallback(() => {
        if (value === 1) {
            return;
        }
        onChange(value - 1)
    }, [onChange, value])

    return (
        <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-col'>
                <div className="font-medium">
                    {title}
                </div>
                <div className="font-light text-sm text-muted-foreground">
                    {subtitle}
                </div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <div
                    onClick={onReduce}
                    className='
                        w-10
                        h-10
                        rounded-full
                        border-[1px]
                        flex
                        items-center
                        justify-center
                        text-muted-foreground
                        cursor-pointer
                        hover:opacity-80
                        transition
                    '
                >
                    <AiOutlineMinus />
                </div>
                <div className="font-lig text-xl text-muted-foreground">
                    {value}
                </div>
                <div
                    onClick={onAdd}
                    className='
                        w-10
                        h-10
                        rounded-full
                        border-[1px]
                        
                        flex
                        items-center
                        justify-center
                        text-muted-foreground
                        cursor-pointer
                        hover:opacity-80
                        transition
                    '
                >
                    <AiOutlinePlus />
                </div>
            </div>
        </div>
    );
}
export default Counter;