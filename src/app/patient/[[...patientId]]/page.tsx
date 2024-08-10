"use client"

import { getIdFromParameters } from '@/lib/helpers/safe-navigation'
import { useParams } from 'next/navigation'
import React from 'react'
import PatientInfo from './patient-info';
import Appointments from './appointments';
import BackButton from '@/components/back-button/back-button';


const PatientPage = () => {

  const params = useParams()
  const patientId = getIdFromParameters(params, 'patientId')

  return (
    <>
      <BackButton/>
      <PatientInfo patientId={patientId!}/>    
      <Appointments patientId={patientId!}/>
    </>
  )
}

export default PatientPage
