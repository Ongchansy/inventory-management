import { AreaCharts } from '@/components/charts/AreaCharts'
import { ChartComponent } from '@/components/charts/ChartComponent'
import { PieCharts } from '@/components/charts/PieChart'
import DashboardStats from '@/components/dashboard/DashboardStats'
import { DatePicker } from '@/components/dashboard/DatePicker'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
      <h1 className='md:text-4xl text-2xl font-bold'>Inventory Management System</h1>

      <div className='mt-4'>
        <div className='flex justify-between flex-wrap my-5 space-y-4 sm:flex-nowrap'>
          <h2 className='md:text-2xl text-xl font-bold '>Dashboard</h2>
          <DatePicker />
        </div>
        <DashboardStats />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
        <ChartComponent />
        <PieCharts />
        <AreaCharts />
      </div>
    </div>
  )
}

export default Dashboard