"use client"
import Footer from "@/components/dashboard/Footer"
import Header from "@/components/dashboard/Header"
import SideBars from "@/components/dashboard/SideBars"
import { FC, ReactNode } from "react"
import { useSession } from "next-auth/react"

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {

    const { data: session, status } = useSession()



    return (
        <div className="flex h-screen ">
            <SideBars />
            <main className="flex flex-col w-full overflow-hidden ">
                <Header />
                <div className="overflow-y-auto relative">

                    <div className="flex-grow ">
                        <div className="p-2 md:p-8">
                            {status === "loading" ? (
                                <div>Loading...</div>
                            ) : session ? (
                                <div>{children}</div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                        <Footer />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Layout