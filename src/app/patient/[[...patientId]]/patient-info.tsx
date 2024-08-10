import Card from '@/components/card';
import { Spinner } from '@/components/spinner';
import useDashboardState from '@/hooks/use-dashboard-state';
import { toPascalCase } from '@/lib/helpers/helpers';
import { getIdFromParameters } from '@/lib/helpers/safe-navigation';
import { differenceInCalendarYears, format } from 'date-fns';
import { useParams } from 'next/navigation';
import React from 'react'

interface PatientInfoProps { 
  patientId: number
}

const calculateAge = (date: Date) => {    
  const age = differenceInCalendarYears(new Date(), date);
  return `${age} y/o`;
}

const PatientInfo = (props: PatientInfoProps) => {

  const params = useParams()
  const patientId = getIdFromParameters(params, 'patientId')
  
  const { getPatient, getPatientLastAppointment, patientsLoading, patientsError } = useDashboardState.useContainer();

  if (patientsLoading) {
    return <div className="min-h-44 m-2 lg:m-4">
      <Spinner medium />
    </div>;
  }

  const patient = getPatient(patientId!)
  const appointment = getPatientLastAppointment(patientId!);

  if (patientsError || !patient) {
    return <span>Ooops, Could not find patient with id {patientId}</span>;
  }



  return (
    <div className="min-h-44 grid grid-cols-1 m-2 gap-4 flex flex-row lg:grid-cols-3 lg:m-4">
      <Card
        className="basis-1/3" 
        header='Patient Info' 
        title={patient.name}
        footer={
          <div className="flex justify-between">
            <div className="text-left">{patient.document}</div>
            <div className="text-right">{calculateAge(patient.birthday!)}</div>
          </div>
        }  
      />
      <Card
      className="basis-1/3" 
      header='Plan Info' 
      title={patient.insurancePlan}
      footer={
        <div className="flex justify-between">
          <div className="text-left">{patient.healthSystemId}</div>
        </div>
      }  
    />
    {appointment && <Card
      className="basis-1/3" 
      header='Last Appointment' 
      title={toPascalCase(appointment.specialty)}
      footer={
        <div className="flex justify-between">
          <div className="text-left">{format(appointment.startTime, "Pp")}</div>
        </div>
      }  
    />}
  </div>
  )
}

export default PatientInfo
