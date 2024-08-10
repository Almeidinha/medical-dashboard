import { Spinner } from '@/components/spinner';
import { ComposedTabs } from '@/components/tabs'
import { Appointment } from '@/lib/types';
import useAxios from '@/services/useAxios';
import React from 'react'
import AppointmentDetails from './appointment-details';
import { isDefined } from '@/lib/helpers/safe-navigation';
import useDashboardState from '@/hooks/use-dashboard-state';

interface PatientInfoProps { 
  patientId: number
}

const Appointments = (props: PatientInfoProps) => {

  const { appointments, appointmentsLoading } = useDashboardState.useContainer();
  
  
  if (appointmentsLoading) {
    return <div className="h-44 m-2 lg:m-4">
      <Spinner medium />
    </div>;
  }
  
  const data = [
    {
      label: 'Recent',
      content: <AppointmentDetails appointments={appointments.filter(a => a.patientId === props.patientId && new Date(a.startTime) < new Date())}/>,
    },
    {
      label: 'Upcoming',
      content: <AppointmentDetails appointments={appointments.filter(a => a.patientId === props.patientId && new Date(a.startTime) > new Date())}/>,
    },
    {
      label: 'History',
      content: <AppointmentDetails appointments={appointments.filter(a => a.patientId === props.patientId)}/>,
    }
  ]

  return (
    <div className="m-2 flex flex-row lg:m-4">
      <ComposedTabs data={data} />
    </div>
  )
}

export default Appointments