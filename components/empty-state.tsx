'use client'

import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { Button } from './ui/button';
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";

interface EmptyStateProps {
    title?: string
    subtitle?: string
    showReset?: boolean
}

const EmptyState: FC<EmptyStateProps> = ({
    title = 'No exact matches',
    subtitle = 'Try changing or removing some of your filters',
    showReset
}) => {
    const router = useRouter()

    return (

        <div
            className='
                h-[60vh]
                flex
                flex-col
                gap-2
                justify-center
                items-center

            '
        >
            <PageHeader className="mt-8">
                <PageHeaderHeading>{title}</PageHeaderHeading>
                <PageHeaderDescription>{subtitle}</PageHeaderDescription>
            </PageHeader>
            <div className="w-48 mt-4">
                {showReset && (
                    <Button
                        variant='outline'
                        onClick={() => router.push('/')}
                    >
                        Remove all filters
                    </Button>
                )}
            </div>
        </div>
    );
}
export default EmptyState;