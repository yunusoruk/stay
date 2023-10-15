'use client'

import ListingCard from '@/components/listings/ListingCard';
import { SafeListing, SafeReservation, SafeUser } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useState } from 'react';
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';


interface PropertiesClientProps {
    listings: SafeListing[]
    currentUser?: SafeUser | null
}

const PropertiesClient: FC<PropertiesClientProps> = ({
    listings,
    currentUser
}) => {

    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id: string) => {
        setDeletingId(id)

        axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast({
                    description: "Listing successfully deleted."
                })
                router.refresh()
            })
            .catch((error) => {
                toast({
                    description: "Something went wrong."
                })
            })
            .finally(() => {
                setDeletingId('')
            })

    }, [router])

    return (
        <div className='container'>

            <PageHeader className="pt-8 pb-4">
                <PageHeaderHeading>Properties</PageHeaderHeading>
                <PageHeaderDescription>List of your properties</PageHeaderDescription>
            </PageHeader>
            <Separator className="mt-4" />
            <div
                className='
                    mt-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4 
                    xl:grid-cols-5 
                    2xl:grid-cols-6 
                    gap-8
                '
            >
                {listings.map((listing: any) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        onAction={onCancel}
                        disabled={deletingId === listing.id}
                        actionLabel='Remove listing'
                        currentUser={currentUser}
                    />
                ))}

            </div>
        </div>
    );
}
export default PropertiesClient;