"use client"
import { Button } from '../ui/button'
import { FolderSync } from 'lucide-react'
import SearchInput from '../form/SearchInput'
import ToggleButton from './ToggleButton'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { useSession, signOut } from 'next-auth/react'


const Header = () => {

  const { data: session, status } = useSession()
  
  return (
    <div className='bg-stone-100 shadow-sm drop-shadow-sm h-14 py-4 flex flex-col justify-center px-2 md:px-8'>
        <div className='w-full flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <ToggleButton />

                <Button 
                variant='secondary' 
                size='icon' 
                className='rounded-full h-7 w-7'
                >
                    <FolderSync className='text-gray-500 h-4 w-4' />
                </Button>

                <SearchInput />
            </div>

            <div>
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <p>{session?.user?.email}</p>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href="/inventory-management/home/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Button variant="default" size="default" onClick={() => signOut()}>Sign Out</Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="default" size="default">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              )}
            </div>
        </div>
    </div>
  )
}

export default Header