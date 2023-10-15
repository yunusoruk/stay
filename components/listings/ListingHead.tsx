import useCountries from '@/hooks/useCountries';
import { SafeUser } from '@/types';
import type { FC } from 'react';
import Image from 'next/image';
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { Separator } from '../ui/separator';
import HeartButton from '../HeartButton';

interface ListingHeadProps {
    title: string
    imageSrc: string
    locationValue: string
    id: string
    currentUser?: SafeUser | null
}

const ListingHead: FC<ListingHeadProps> = ({
    title,
    imageSrc,
    locationValue,
    id,
    currentUser
}) => {

    const { getByValue } = useCountries()

    const location = getByValue(locationValue)

    return (
        <>

            <PageHeader className="pt-8 pb-4">
                <PageHeaderHeading>{title}</PageHeaderHeading>
                <PageHeaderDescription>{`${location?.region}, ${location?.label}`}</PageHeaderDescription>
            </PageHeader>
            <Separator className="mt-4" />
            <div
                className='
                    w-full
                    h-[60vh]
                    overflow-hidden
                    rounded-xl
                    relative
                    mt-4
                '
            >
                <Image
                    alt='Image'
                    src={imageSrc}
                    fill
                    className='object-cover w-full'
                />
                <div className="absolute top-5 right-5">
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>

            </div>
        </>
    );
}
export default ListingHead;