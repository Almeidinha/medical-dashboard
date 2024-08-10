import React from 'react'
import Table from '../table/table'
import { DataItem } from '../table/components/body';
import { defaultTo } from 'lodash';
import { getBadgeStatus } from '@/lib/helpers/helpers';
import useDashboardState from '@/hooks/use-dashboard-state';
import { Spinner } from '../spinner';
import { navigate } from '@/lib/helpers/navigate';

  const columns = [
    {
      field: "name",
      headerName: "Patient Name",
    },
    {
      field: "status",
      headerName: "Status",
    },
    {
      field: "description",
      headerName: "Description",
    },
  ];

const HistoryBlock = () => {

  const { appointments, appointmentsLoading, patientsLoading,  getPatient } = useDashboardState.useContainer();

  if (patientsLoading || appointmentsLoading) {
    return <Spinner medium />;
  }

  const list: DataItem[] = defaultTo(appointments, []).map((appointment) => {
    const patient = getPatient(appointment.patientId)
    return {
      name: patient?.name,
      patientId: patient?.id,
      status: getBadgeStatus(appointment.status),
      description: appointment.description
    }
  });

  const handleRowClick = (row: DataItem) => {
    navigate(`patient/${row.patientId}`);
  }

  return (
    <div className="relative flex-col bg-white bg-clip-border text-gray-700 shadow-md">
      <Table showHeader={false} columns={columns} data={list} onRowClick={handleRowClick} />
    </div>
  )
}

export default HistoryBlock
