

import getCurrentUser from "@/actions/get-current-user";
import EmptyState from "@/components/empty-state";
import getListings from "@/actions/get-listings";
import PropertiesClient from "../../../components/properties/properties-client";
import { redirect } from "next/navigation";


const PropertiesPage = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        redirect('/login')
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