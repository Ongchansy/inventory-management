import React from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
interface SheetProps {
  isOpen?: boolean;
  toggle?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}
const MainSheet = ({
  isOpen,
  toggle,
  title,
  description,
  children,
}: SheetProps) => {
  
    return (
      <div>
      <Sheet open={isOpen} onOpenChange={toggle} >
        <SheetContent>
          <SheetHeader>
            <SheetTitle> 
              {title}
            </SheetTitle>
            <SheetDescription>
            {description}
            </SheetDescription>
          </SheetHeader>
          {children}
        </SheetContent>
      </Sheet>
      </div>
    );
  };


export default MainSheet;