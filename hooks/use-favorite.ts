import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { SafeUser } from "@/types";
import useLoginModal from "./use-login-modal";
import { toast } from "./use-toast";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();

        router.refresh();
        toast({
          description: "Listing added to favorites.",
        });
      } catch (error) {
        toast({
          description: "Something went wrong.",
        });
      }
    },
    [currentUser, listingId, hasFavorited, loginModal, router],
  );

  return {
    toggleFavorite,
    hasFavorited,
  };
};

export default useFavorite;
