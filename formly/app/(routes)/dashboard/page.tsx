import React from 'react'
import { Button } from "@/components/ui/button";
import { Loader, PlusIcon } from 'lucide-react';
import { fetchFormStats } from '@/actions/form.actions';
import StatsCards from './_components/statsCards';

const Dashboard = () => {

  

  return (
    <div className="w-full pt-8">
      <div className='w-full max-w-6xl mx-auto px-2 md:px-4 lg:px-0 pt-1'>{/* Form Status */}
        <section className='stats-section w-full'>
          <div className='w-full flex items-center justify-between py-5'>
            <h1 className='text-3xl tracking-tight font-semibold'>Dashboard</h1>
            <Button variant="outline" className='!font-medium !bg-primary text-white hover:text-white/50 gap-1'>
            <PlusIcon/>
            Create a form
            </Button>
          </div>
          <StatsListsWrap/>
        </section>
      </div>
    </div>
  )
}

async function StatsListsWrap() {
  const stats = await fetchFormStats()
  return <StatsCards loading={false} data={stats}/>
}

export default Dashboard