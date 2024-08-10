"use client";

import { defaultTo } from "@/lib/helpers/safe-navigation";
import { Appointment, Patient } from "@/lib/types";
import useAxios from "@/services/useAxios";
import { createContainer } from "unstated-next";


interface DashBoardState {
  getPatient: (patientId: number) => Patient | undefined;
  getPatientLastAppointment: (patientId: number) => Appointment | undefined;
  appointments: Appointment[];
  patients: Patient[];
  appointmentsLoading: boolean;
  patientsLoading: boolean;
  appointmentsError: boolean;
  patientsError: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useDashboardState = (): DashBoardState => {

  
  const {
    data: appointments,
    loading: appointmentsLoading,
    error: appointmentsError,
    refetchData: refetchAppointmentsData
  } = useAxios<Appointment[]>(`${API_URL}/appointments`);

  const {
    data: patients,
    loading: patientsLoading,
    error: patientsError,
    refetchData: refetchPatientsData
  } = useAxios<Patient[]>(`${API_URL}/patients`);



  const getPatient = (patientId: number): Patient | undefined => {
    return patients?.find((patient) => patient.id === patientId);
  }

  const getPatientLastAppointment = (patientId: number): Appointment | undefined => {
    return defaultTo(appointments, [])
      .filter((appointment) => appointment.patientId === patientId && new Date(appointment.startTime) < new Date())
      .reduce<Appointment | undefined>((a, b) => (a?.startTime! > b.startTime ? a : b), undefined);
  }

  return {
    getPatient,
    getPatientLastAppointment,
    appointments: defaultTo(appointments, []),
    patients: defaultTo(patients, []),
    appointmentsError,
    patientsError,
    appointmentsLoading,
    patientsLoading
  }
}

export default createContainer(useDashboardState);