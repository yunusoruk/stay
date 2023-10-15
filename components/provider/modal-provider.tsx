"use client";

import { useMounted } from "@/hooks/use-mounted";
import SearchModal from "../modals/SearchModal";
import RentModal from "../modals/RentModal";



export const ModalProvider = () => {

    useMounted()


    return (
        <>
            <SearchModal />
            <RentModal />
        </>
    )
}