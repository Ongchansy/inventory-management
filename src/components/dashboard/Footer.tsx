"use client"
import useUi from '@/hook/useUI'
import React from 'react'

const Footer = () => {
    const {toggle} = useUi()
  return (
    <footer className={`bg-stone-50 py-4 shadow fixed bottom-0 ${toggle ?  ' w-[calc(100%-256px)]' : 'w-[calc(100%-64px)]'}`}>
        <div className='flex h-full items-center justify-between px-2 md:px-8'>
            <div>
                <p className='text-sm font-medium uppercase'>Developed By Ong Chansy</p>
            </div>
            <div>
                <p className='text-sm font-medium uppercase'>©Copyright 2024</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer