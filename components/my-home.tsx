'use client'

import { useModal } from "@/hooks/use-modal-store";
import { Icons } from "./icons";
import { Button } from "./ui/button";

const MyHome = () => {

    const { onOpen } = useModal()

    return (
        <Button
            variant='ghost'
            onClick={() => onOpen('rentModal')}
        >
            <p className="flex flex-row items-center">
                <Icons.home size={16} className="mr-2" />
                My home
            </p>

        </Button>
    );
}

export default MyHome;