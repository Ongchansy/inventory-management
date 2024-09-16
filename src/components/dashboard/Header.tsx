
import React from 'react'
import { Button } from '../ui/button'
import { FolderSync } from 'lucide-react'
import SearchInput from '../form/SearchInput'
import ToggleButton from './ToggleButton'

const Header = () => {
  return (
    <div className='bg-stone-100 shadow-sm drop-shadow-sm h-14 py-4 flex flex-col justify-center px-2 md:px-8'>
        <div className='w-full'>
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
        </div>
    </div>
  )
}

export default Header