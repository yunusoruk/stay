import getCurrentUser from "@/actions/get-current-user";
import EmptyState from "@/components/empty-state";
import FavoritesClient from "../../../components/favorites/favorites-client";
import getFavoriteListings from "@/actions/get-favorites";

const ListingPage = async () => {

    const listings = await getFavoriteListings()
    const currentUser = await getCurrentUser();


    if (listings.length === 0) {
        return (
            <EmptyState
                title="No favorites found"
                subtitle="Looks like you have no favorite listings."
            />
        );
    }
    return (

        <FavoritesClient
            listings={listings}
            currentUser={currentUser}
        />

    );
}

export default ListingPage;