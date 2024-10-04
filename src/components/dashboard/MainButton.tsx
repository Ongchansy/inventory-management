"use client"
import {Button} from "@/components/ui/button";
import useModal from "@/store/useModal";

const MainButton = () => {
    const {toggleModal} = useModal()
    return (
        <div>
            <Button
                variant='default'
                size='default'
                onClick={toggleModal}
            >
                Add User
            </Button>
        </div>
    )
}
export default MainButton