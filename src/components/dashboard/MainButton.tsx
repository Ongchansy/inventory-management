"use client"
import {Button} from "@/components/ui/button";
import useModal from "@/store/useModal";

interface Props {
    title: string
    toggle: () => void
}

const MainButton: React.FC<Props> = ({title, toggle}) => {
    
    return (
        <div>
            <Button
                variant='default'
                size='default'
                onClick={toggle}
            >
                {title}
            </Button>
        </div>
    )
}
export default MainButton