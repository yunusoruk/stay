import useCountries from '@/hooks/use-countries';
import { SafeUser } from '@/types';
import type { FC } from 'react';
import { IconType } from 'react-icons';
import ListingCategory from './listing-category';
import dynamic from 'next/dynamic';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useMounted } from '@/hooks/use-mounted';

const Map = dynamic(() => import('../map'))

interface ListingInfoProps {
    user: SafeUser
    category: {
        icon: IconType
        label: string
        description: string
    } | undefined
    description: string | undefined
    roomCount: number
    bathroomCount: number
    locationValue: string
    guestCount: number
}

const ListingInfo: FC<ListingInfoProps> = ({
    user,
    category,
    description,
    roomCount,
    bathroomCount,
    locationValue,
    guestCount
}) => {

    useMounted()

    const { getByValue } = useCountries()

    const coordinates = getByValue(locationValue)?.latlng

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">

                <div
                    className='
                        text-xl
                        font-semibold
                        flex
                        flex-row
                        items-center
                        gap-2
                    '
                >
                    <Avatar>
                        <AvatarImage src={user?.image as string} alt="@stay" />
                        <AvatarFallback>STAY</AvatarFallback>
                    </Avatar>
                    <div>Hosted by {user?.name}</div>


                </div>
                <div
                    className='
                        flex
                        flex-row
                        items-center
                        gap-4
                        font-light
                        text-muted-foreground
                    '
                >
                    <div>
                        {guestCount} guests
                    </div>
                    <div>
                        {roomCount} rooms
                    </div>
                    <div>
                        {bathroomCount} bathrooms
                    </div>


                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            <div className="text-lg font-light text-muted-foreground">
                {description}
            </div>
            <hr />
            <Map
                center={coordinates}
            />
        </div>
    );
}
export default ListingInfo;