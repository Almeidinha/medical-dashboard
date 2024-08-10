
export interface Appointment {
  id: number,
  patientId: number,
  specialty: Specialty,
  type: AppointmentType,
  description: string,
  notes: string,
  status: Status,
  startTime: Date,
  endTime: Date
}

export interface Patient {
  id: number,
  name: string,
  document: string,
  healthSystemId: string,
  birthday: Date,
  insurancePlan: InsurancePlan
}

export enum Specialty { 
  NEUROLOGY = 'neurology',
  CARDIOLOGY = 'cardiology',
  GENERAL = 'general'
}

export enum AppointmentType {
  FIRST_VISIT = 'firstVisit',
  FOLLOW_UP = 'followUp',
  CHECK_UP = 'checkUp',
  EXAM = 'exam',
  SURGERY = 'surgery',
}

export enum Status {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELED = 'cancelled',
  ABSENT = 'absent'
}

export enum InsurancePlan {
  REGIONAL = 'Regional',
  NATIONAL_BASIC = 'National Basic',
  NATIONAL_PREMIUM = 'National Premium',
  INTERNATIONAL = 'International',
  DIAMOND = 'Diamond'
}