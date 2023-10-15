import type { FC } from 'react';
import { IconType } from 'react-icons';

interface ListingCategoryProps {
    icon: IconType
    label: string
    description: string
}

const ListingCategory: FC<ListingCategoryProps> = ({
    icon: Icon,
    label,
    description
}) => {
    return (
        <div className='flex flex-col gap-6'>
            <div className="flex flex-row items-center gap-4">
                <Icon size={40} className='text-muted-foreground' />
                <div className="flex flex-col">
                    <div className="text-lg font-semibold">
                        {label}
                    </div>
                    <div className="text-muted-foreground font-light">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ListingCategory;