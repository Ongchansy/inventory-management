'use client'
import React from 'react'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import useUiStore from '@/store/uiStore'

const ToggleButton = () => {
    const {setToggle} = useUiStore()
  return (
    <div>
            <Button 
             value='toggle' 
             variant='secondary' 
             size='icon' 
             className='rounded-full h-7 w-7 '
             onClick={() => setToggle()}
             >
                <Menu className='text-gray-500 h-4 w-4' />
            </Button>
    </div>
  )
}

export default ToggleButton