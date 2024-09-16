import Footer from "@/components/dashboard/Footer"
import Header from "@/components/dashboard/Header"
import SideBars from "@/components/dashboard/SideBars"
import { FC, ReactNode } from "react"

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <SideBars />
            <main className="flex flex-col w-full ">
                <Header />
                <div className="overflow-y-auto relative">

                    <div className="flex-grow ">
                        <div className="p-2 md:p-8">
                            {children}
                        </div>
                        <Footer />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Layout