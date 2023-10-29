

import getCurrentUser from "@/actions/get-current-user";
import EmptyState from "@/components/empty-state";
import getListings from "@/actions/get-listings";
import PropertiesClient from "../../../components/properties/properties-client";


const PropertiesPage = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please login"
            />
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    })

    if (listings.length === 0) {
        return (
            <EmptyState
                title="No properties found"
                subtitle="Looks like you have no properties."
            />
        )
    }


    return (
        <PropertiesClient
            listings={listings}
            currentUser={currentUser}
        />
    )

}

export default PropertiesPage