
import { DataItem } from '@/components/table/components/body'
import Table from '@/components/table/table'
import { getBadgeStatus } from '@/lib/helpers/helpers'
import { Appointment } from '@/lib/types'
import { format } from 'date-fns'
import React from 'react'

interface AppointmentDetailsProps {
  appointments: Appointment[]
}

const AppointmentDetails = (props: AppointmentDetailsProps) => {

  const columns = [
    {
      field: "date",
      headerName: "Date",
    },
    {
      field: "type",
      headerName: "Type",
    },
    {
      field: "status",
      headerName: "Status",
    },
  ];

  const list: DataItem[] = props.appointments.map((appointment) => ({
    date: format(appointment.startTime, "Pp"),
    type: appointment.type,
    status: getBadgeStatus(appointment.status),
  }));


  return (
    <Table columns={columns} data={list} showHeader={false} paginated={false} striped={false} />
  )
}

export default AppointmentDetails
