'use client'
import React from 'react'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import useUi from '@/hook/useUI'

const ToggleButton = () => {
    const {setToggle} = useUi()
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