'use client'
import React, { useState } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import Builder from './builder'

const FormBuilder = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div>
        <SidebarProvider
        open={isSidebarOpen} 
        onOpenChange={setIsSidebarOpen} 
        className='h-[calc(100vhg_-_65px)]'
        style={{"--sidebar-width": "300px",
                "--sidebar-height": "40px",
        } as React.CSSProperties}>
            <Builder { ... { isSidebarOpen}}/>
        </SidebarProvider>
    </div>
  )
}

export default FormBuilder