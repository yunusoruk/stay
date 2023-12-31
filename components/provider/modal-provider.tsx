"use client";

import { useMounted } from "@/hooks/use-mounted";
import SearchModal from "../modals/search-modal";
import RentModal from "../modals/rent-modal";



export const ModalProvider = () => {

    useMounted()


    return (
        <>
            <SearchModal />
            <RentModal />
        </>
    )
}