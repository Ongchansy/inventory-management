"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Store, Package, DollarSign, Users, ShoppingCart, Link, ChevronDown, Menu, Box, Tag, Layers, FileText, Repeat, UserCheck, Key, Truck, CheckCircle, Server, Terminal, Code } from 'lucide-react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import useUiStore from '@/store/uiStore'

const SideBar = () => {
    const { toggle } = useUiStore()
    const [active, setActive] = useState<string | null>(null)
    const [openMenus, setOpenMenus] = useState<string[]>([]) // Track multiple open menus

    const handleActive = (item: string) => {
        // If the menu is already open, remove it; if not, add it
        setOpenMenus(prevState => 
            prevState.includes(item) 
                ? prevState.filter(menu => menu !== item) 
                : [...prevState, item]
        )
        setActive(item)
    }

    const handleSubItemActive = (subItem: string) => {
        setActive(subItem)
    }

    // Icons for sub-items added
    const menuItems = [
        {
            icon: Package,
            label: 'Inventory',
            subItems: [
                { label: 'Products', icon: Box },
                { label: 'Categories', icon: Tag },
                { label: 'Stock', icon: Layers }
            ]
        },
        {
            icon: DollarSign,
            label: 'Sale',
            subItems: [
                { label: 'Orders', icon: FileText },
                { label: 'Invoices', icon: DollarSign },
                { label: 'Returns', icon: Repeat }
            ]
        },
        {
            icon: Users,
            label: 'User',
            subItems: [
                { label: 'User List', icon: UserCheck },
                { label: 'User Roles', icon: Key },
                { label: 'Permissions', icon: Key }
            ]
        },
        {
            icon: ShoppingCart,
            label: 'Purchase',
            subItems: [
                { label: 'Purchase Orders', icon: Truck },
                { label: 'Suppliers', icon: CheckCircle },
                { label: 'Received Items', icon: Layers }
            ]
        },
        {
            icon: Link,
            label: 'Integration',
            subItems: [
                { label: 'APIs', icon: Terminal },
                { label: 'Webhooks', icon: Server },
                { label: 'Third-party Apps', icon: Code }
            ]
        },
    ]

    const renderMenuItem = (item: any) => (
        <Collapsible key={item.label} open={openMenus.includes(item.label)}>
            <CollapsibleTrigger
                className={`flex w-full items-center justify-between py-2 px-4 hover:bg-white hover:text-black transition-colors ${
                    active === item.label ? 'bg-white text-black' : ''
                }`}
                onClick={() => handleActive(item.label)}
            >
                <div className="flex items-center">
                    <item.icon className="mr-2 h-6 w-6" />
                    <span className={`${toggle ? 'block' : 'hidden'}`}>{item.label}</span>
                </div>
                <ChevronDown className={`h-4 w-4 ${toggle ? 'block' : 'hidden'} ${openMenus.includes(item.label) ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="pl-8">
                    {item.subItems.map((subItem: any) => (
                        <TooltipProvider key={subItem.label}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div
                                        className={`flex items-center py-2 hover:bg-white hover:text-black transition-colors ${
                                            active === subItem.label ? 'bg-white text-black' : ''
                                        }`}
                                        onClick={() => handleSubItemActive(subItem.label)}
                                    >
                                        <subItem.icon className="mr-2 h-4 w-4" /> {/* Sub-item icon */}
                                        <span className={`${toggle ? 'block' : 'hidden'}`}>{subItem.label}</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{subItem.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))}
                </div>
            </CollapsibleContent>
        </Collapsible>
    )

    const SidebarContent = () => (
        <div>
            <div className="flex space-x-3 bg-slate-900 p-3">
                <Button variant="outline" size="icon" className="size-8">
                    <Store />
                </Button>
                <p className={`${toggle ? 'text-2xl' : 'hidden'}`}>Inventory</p>
            </div>
            <ScrollArea className="h-[calc(100vh-4rem)]">
                <div>{menuItems.map(renderMenuItem)}</div>
            </ScrollArea>
        </div>
    )

    return (
        <>
            {/* Desktop Sidebar */}
            <div className={`${toggle ? 'w-64' : 'w-20'} hidden md:block bg-slate-800 text-slate-100 min-h-screen relative`}>
                <SidebarContent />
            </div>
            {/* Mobile Sidebar with Sheet */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden fixed top-3 pb-1 left-4 z-50">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 bg-slate-800 text-slate-100 p-0">
                    <SidebarContent />
                </SheetContent>
            </Sheet>
        </>
    )
}

export default SideBar
