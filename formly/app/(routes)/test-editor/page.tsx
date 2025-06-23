import React from 'react'
import BuilderContextProvider from '@/context/builderProvider'
import FormBuilder from './_components/formBuilder'

const Builder = () => {

  return (
    <BuilderContextProvider>
      <FormBuilder/>
    </BuilderContextProvider>
  )
}

export default Builder