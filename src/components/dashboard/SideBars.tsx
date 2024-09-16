"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Store, Package, DollarSign, Users, ShoppingCart, Workflow, PackageSearch, LayoutDashboard,BaggageClaim, HandCoins } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import useUi from '@/hook/useUI'
import Link  from 'next/link'

const SideBars = () => {
    const [active, setActive] = useState<string | null>(null)
    const { toggle } = useUi()

    const menuItems = [
        { icon: LayoutDashboard, label: 'DashBoard', path: '/home/dashboard' },
        { icon: Package, label: 'Inventory', path: 'inventory' },
        { icon: DollarSign, label: 'Sale', path: 'sale' },
        { icon: PackageSearch, label: 'Products', path: 'product' },
        { icon: Users, label: 'User', path: 'user' },
        { icon: ShoppingCart, label: 'Purchase', path: 'purchase' },
        { icon: BaggageClaim, label: 'Order', path: 'order' },
        { icon: HandCoins, label: 'Payment', path: 'payment' },
        { icon: Workflow, label: 'Integration', path: 'integration' },
    ]

    const MenuItem = ({ icon: Icon, label, path }: { icon: React.ElementType, label: string, path: string }) => (
        <Link href={`/inventory-management/${path}`}
            className={`flex items-center py-2 px-4 my-2 hover:bg-white hover:text-black transition-colors ${
                active === label ? 'bg-white text-black transition-all ' : ''
            }`}
            onClick={() => setActive(label)}
        >
            <Icon className="mr-2 h-6 w-6" />
            <span className={`${toggle ? 'block' : 'hidden'}`}>{label}</span>
        </Link>
    )

    const SidebarContent = () => (
        <div>
            <div className="flex space-x-3 bg-slate-900 p-3">
                <Button variant="outline" size="icon" className="size-8">
                    <Store />
                </Button>
                <p className={`${toggle ? 'block' : 'hidden'} text-xl md:text-2xl`}>Inventory</p>
            </div>
            <ScrollArea className="h-[calc(100vh-4rem)] mt-3">
                <div>{menuItems.map((item) => <MenuItem key={item.label} {...item} />)}</div>
            </ScrollArea>
        </div>
    )

    return (
        <div className="flex">
            <div className={`bg-slate-800 text-slate-100 min-h-screen relative transition-all ${toggle ? 'w-64' : 'w-16'} `}>
                <SidebarContent />
            </div>
        </div>
    )
}

export default SideBars
