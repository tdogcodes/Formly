'use client'
import React, { useState } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import Builder from './builder'
import { useBuilder } from '@/context/builderProvider'
import Loader from '@/components/Loader'
import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import BuilderDragOverlay from './builderDragOverlay'

const FormBuilder = () => {

  const { formData, loading } = useBuilder()
  const isPublished = formData?.published

  if(loading){
    return (
      <div className='w-full flex h-56 items-center justify-center'>
        <Loader />
      </div>
    )
  }  
  
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(isPublished ? false : true)
  
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8,
    }
  })

  return (
    <DndContext sensors={useSensors(mouseSensor)}>
      <BuilderDragOverlay/>
      <div>
          <SidebarProvider
            open={isSidebarOpen}
            onOpenChange={setIsSidebarOpen}
            className="h-[calc(100vh_-_64px)]"
            style={
              {
                "--sidebar-width": "300px",
                "--sidbar-height": "40px",
              } as React.CSSProperties
            }
          >
            <Builder {...{ isSidebarOpen }} />
          </SidebarProvider>
      </div>
    </DndContext>
  )
}

export default FormBuilder