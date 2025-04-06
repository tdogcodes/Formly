import React from 'react'
import { fetchFormStats } from '@/actions/form.actions';
import StatsCards from './_components/statsCards';
import { Separator } from '@/components/ui/separator';
import CreateForm from './_components/createForm';

const Dashboard = () => {

  return (
    <div className="w-full md:pt-8">
      <div className='w-full max-w-6xl mx-auto px-2 md:px-4 lg:px-0 pt-1'>{/* Form Status */}
        <section className='stats-section w-full'>
          <div className='w-full flex items-center justify-between py-5'>
            <h1 className='text-3xl tracking-tight font-semibold'>Dashboard</h1>
            <CreateForm/>
          </div>
          <StatsListsWrap/>
        </section>
        <Separator className='!border[#eee] !bg-primary my-4'/>
      </div>
      {/* All Form */}

      <section className='w-full pt-7 pb-10 max-w-6xl mx-auto px-2 md:px-4 lg:px-0'>
        <div className='w-full flex items-center mb-4'>
          <h5 className='text-xl tracking-tight justify-start font-semibold'>All Forms</h5>
        </div>
        <div className='flex items-center justify-center'>
          No forms created  
        </div>
      </section>
    </div>
  )
}

async function StatsListsWrap() {
  const stats = await fetchFormStats()
  return <StatsCards loading={false} data={stats}/>
}

export default Dashboard