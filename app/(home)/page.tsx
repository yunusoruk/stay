import getCurrentUser from "@/actions/get-current-user";
import getListings, { IListingParrams } from "@/actions/get-listings";
import EmptyState from "@/components/empty-state";
import ListingCard from "@/components/listings/listing-card";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";

interface HomeProps {
    searchParams: IListingParrams
}

export default async function Home({ searchParams }: HomeProps) {

    const listings = await getListings(searchParams)
    const currentUser = await getCurrentUser()

    if (listings.length === 0) {
        return (
            <EmptyState showReset />
        )
    }

    return (
        <div className="container">
            <PageHeader className="page-header pb-4 pt-8">
                <PageHeaderHeading className="hidden md:block">
                    Find your next stay
                </PageHeaderHeading>
                <PageHeaderHeading className="md:hidden">Find your next stay</PageHeaderHeading>
                <PageHeaderDescription>
                    Search low prices on hotels, homes and much more...
                </PageHeaderDescription>
            </PageHeader>
            <Separator className="mt-4" />
            <div
                className="pt-10 grid  grid-cols-1  sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings.map((listing: any) => {
                    return (
                        <ListingCard
                            currentUser={currentUser}
                            key={listing.id}
                            data={listing}
                        />
                    )
                })}
            </div>
        </div>
    )
}
