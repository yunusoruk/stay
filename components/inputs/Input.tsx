'use client'

import type { FC } from 'react';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi'
import { Input as NewInput } from '@/components/ui/input'
import { Label } from '../ui/label';

interface InputProps {
    id: string
    label: string
    type?: string
    disabled?: boolean
    formatPrice?: boolean
    required?: boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
}

const Input: FC<InputProps> = ({
    id,
    label,
    type = 'text',
    disabled,
    formatPrice,
    required,
    register,
    errors,
}) => {
    return (
        <div className='w-full relative'>
            {formatPrice && (
                <BiDollar
                    size={18}
                    className='
                        text-muted-foreground
                        absolute
                        top-5
                        left-2
                    '
                />
            )}
            <Label className='p-1'>
                {label}
            </Label>
            <NewInput
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder={label}
                type={type}
                className='mt-1'
            />

        </div>
    );
}
export default Input;