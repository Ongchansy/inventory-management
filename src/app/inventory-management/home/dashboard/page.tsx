import { AreaCharts } from '@/components/charts/AreaCharts'
import { ChartComponent } from '@/components/charts/ChartComponent'
import { PieCharts } from '@/components/charts/PieChart'
import DashboardStats from '@/components/dashboard/DashboardStats'
import React from 'react'
import {getServerSession} from 'next-auth/next'
import { redirect } from 'next/navigation'

const page = () => {
  const session = getServerSession()

  if (!session) {
    redirect('/sign-in')
  }
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
      <DashboardStats />

      <div className='mt-4 grid grid-cols-2 gap-4'>
        <PieCharts />
        <ChartComponent />
      </div>
    </div>
  )
}

export default page