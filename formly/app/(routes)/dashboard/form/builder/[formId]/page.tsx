import React from 'react'
import FormBuilder from '../../../_components/formBuilder'
import BuilderContextProvider from '@/context/builderProvider'

const Builder = () => {

  return (
    <BuilderContextProvider>
      <FormBuilder/>
    </BuilderContextProvider>
  )
}

export default Builder