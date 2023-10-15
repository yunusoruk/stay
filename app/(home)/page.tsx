import getCurrentUser from "@/actions/getCurrentUser";
import getListings, { IListingParrams } from "@/actions/getListings";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listings/ListingCard";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

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
                {/* <Link
                    href="/collabrator"
                    className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
                >
                    🎉 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
                    <span className="sm:hidden">Mülakat deneyimine ne dersin?</span>
                    <span className="hidden sm:inline">
                        Mülakat deneyimine ne dersin?
                    </span>
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link> */}
                <PageHeaderHeading className="hidden md:block">
                    Find your next stay
                </PageHeaderHeading>
                <PageHeaderHeading className="md:hidden">Examples</PageHeaderHeading>
                <PageHeaderDescription>
                    Search low prices on hotels, homes and much more...
                </PageHeaderDescription>
            </PageHeader>
            <Separator className="mt-4" />
            <div
                className="
        pt-10
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
