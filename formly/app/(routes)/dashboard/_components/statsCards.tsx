import { fetchFormStats } from '@/actions/form.actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader } from 'lucide-react'
import React from 'react'

const StatsCards = (Props: {
    data: Awaited<ReturnType<typeof fetchFormStats>>,
    loading: boolean
}) => {

    const { data, loading } = Props
  return (
    <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
        <Card className='bg-white'> {/* Total Forms */}
            <CardHeader className='pb-2'>
                <CardDescription>Total Forms</CardDescription>
                <CardTitle className='text-4xl'>
                    {loading ? <Loader className='h-[36px] animate-spin'/>
                     : data?.totalForms || 0}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-sm text-muted-foreground'>All forms you own</p>
            </CardContent>
        </Card>
        <Card className='bg-white'> {/* Responses */}
            <CardHeader className='pb-2'>
                <CardDescription>Total Responses</CardDescription>
                <CardTitle className='text-4xl'>
                    {loading ? <Loader className='h-[36px] animate-spin'/>
                     : data?.totalResponses || 0}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-sm text-muted-foreground'>Responses submitted for your forms</p>
            </CardContent>
        </Card>
        <Card className='bg-white'> {/* Conversion Rate */}
            <CardHeader className='pb-2'>
                <CardDescription>Conversion Rate</CardDescription>
                <CardTitle className='text-4xl'>
                    {loading ? <Loader className='h-[36px] animate-spin'/>
                     : data?.conversionRate?.toFixed(1) || 0}%
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-sm text-muted-foreground'>% of views that resulted in responses</p>
            </CardContent>
        </Card>
        <Card className='bg-white'> {/* Engagement Rate */}
            <CardHeader className='pb-2'>
                <CardDescription>Engagement Rate</CardDescription>
                <CardTitle className='text-4xl'>
                    {loading ? <Loader className='h-[36px] animate-spin'/>
                     : data?.engagementRate?.toFixed(1) || 0}%
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-sm text-muted-foreground'>% of forms that received responses</p>
            </CardContent>
        </Card>
    </div>
  )
}

export default StatsCards