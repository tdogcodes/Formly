"use client"
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

const FormBlockBox = () => {
    const [search, setSearch] = useState<string>("")

  return (
    <div className='w-full'>
        <div className='flex gap-2 py-4 text-sm'>FormBlockBox</div>
        <Input
        placeholder='Search Blocks'
        className='placeholder:text-gray-400 gray-400 shadow-sm'
        />
    </div>
  )
}

export default FormBlockBox