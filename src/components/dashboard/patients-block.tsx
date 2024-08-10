import React from 'react'
import Table from '../table/table'
import useDashboardState from '@/hooks/use-dashboard-state';
import { Spinner } from '../spinner';
import { defaultTo } from '@/lib/helpers/safe-navigation';
import { DataItem } from '../table/components/body';
import { navigate } from '@/lib/helpers/navigate';

const columns = [
  {
    field: "name",
    headerName: "Patient Name",
  },
  {
    field: "document",
    headerName: "Document",
  },
  {
    field: "birthday",
    headerName: "Birthday",
  },
  {
    field: "insurancePlan",
    headerName: "Insurance Plan",
  },
];

const PatientsBlock = () => {
  
  const { patients, patientsLoading } = useDashboardState.useContainer();

  if (patientsLoading || patientsLoading) {
    return <Spinner medium />;
  }

  const list: DataItem[] = defaultTo(patients, []).map((patient) => ({
    name: patient.name,
    patientId: patient.id,
    document: patient.document,
    birthday: patient.birthday,
    insurancePlan: patient.insurancePlan
  }));

  const handleRowClick = (row: DataItem) => {
    navigate(`patient/${row.patientId}`);
  }

  return (
    <div className="relative flex-col bg-white bg-clip-border text-gray-700 shadow-md">
      <Table columns={columns} data={list} onRowClick={handleRowClick} />
    </div>
  )
}

export default PatientsBlock
