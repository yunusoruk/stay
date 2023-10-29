import ListingCard from "@/components/listings/listing-card";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
// import Heading from "@/components/navbar/Heading";
import { SafeListing, SafeUser } from "@/types";



interface FavoritesClientProps {
    listings: SafeListing[],
    currentUser: SafeUser | null,
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
    listings,
    currentUser
}) => {
    return (
        <div className="container">
            <PageHeader className="pt-8 pb-4">
                <PageHeaderHeading>Favorites</PageHeaderHeading>
                <PageHeaderDescription>List of places you favorited!</PageHeaderDescription>
            </PageHeader>
            <Separator className="mt-4" />
            <div
                className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
            >
                {listings.map((listing: any) => (
                    <ListingCard
                        currentUser={currentUser}
                        key={listing.id}
                        data={listing}
                    />
                ))}
            </div>
        </div>
    );
}

export default FavoritesClient;