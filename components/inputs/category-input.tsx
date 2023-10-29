"use client"

import type { FC } from 'react';
import { IconType } from 'react-icons';

interface CategoryInputProps {
    icon: IconType
    label: string
    selected?: boolean
    onClick: (value: string) => void
}

const CategoryInput: FC<CategoryInputProps> = ({
    icon: Icon,
    label,
    selected,
    onClick
}) => {
    return (
        <div
            onClick={() => { onClick(label) }}
            className={`
                rounded-lg
                border
                border-dashed
                p-4
                flex
                flex-col
                gap-3
                transition
                cursor-pointer
                ${selected ? 'border-primary' : ''}
            `}
        >
            <Icon size={27} />
            <div className="font-semibold">
                {label}
            </div>

        </div>
    );
}
export default CategoryInput;