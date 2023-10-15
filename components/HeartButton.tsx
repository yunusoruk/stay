'use client'

import { SafeUser } from '@/types';

import type { FC } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useFavorite from '@/hooks/useFavorite';
import { cn } from '@/lib/utils';

interface HeartButtonProps {
    listingId: string
    currentUser?: SafeUser | null
}

const HeartButton: FC<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {

    const { hasFavorited, toggleFavorite } = useFavorite({
        listingId,
        currentUser
    });


    return (
        <div
            onClick={toggleFavorite}
            className='
                relative
                hover:opacity-80
                transition
                cursor-pointer
            '
        >
            <AiOutlineHeart
                size={28}
                className={cn(" absolute -top-[2px] -right-[2px]",
                    hasFavorited ? 'fill-primary ' : 'fill-muted-foreground'
                )}
            />
            <AiFillHeart size={24} className={hasFavorited ? 'fill-primary ' : 'fill-muted-foreground'} />
        </div>
    );
}
export default HeartButton;