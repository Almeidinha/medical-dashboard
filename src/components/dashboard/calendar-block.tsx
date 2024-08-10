import useDashboardState from '@/hooks/use-dashboard-state';
import React from 'react'
import WeekViewCalendar, { Event } from '../weekViewCalendar/weekViewCalendar';
import { Spinner } from '../spinner';
import { defaultTo } from 'lodash';
import { Status } from '@/lib/types';
import { addMinutes } from 'date-fns';
import { navigate } from '@/lib/helpers/navigate';

const CalendarBlock = () => {

  const { appointments, appointmentsLoading } = useDashboardState.useContainer();

  if (appointmentsLoading) {
    return <Spinner medium />;
  }

  const onEventClick = (event: Event) => {
    navigate(`patient/${event.patientId}`);
  }

  const events: Event[] = defaultTo(appointments, [])
  .filter((appointment) => appointment.status !== Status.CANCELED)
  .map((appointment) => ({
    id: appointment.id.toString(),
    patientId: appointment.patientId,
    title: appointment.description,
    startDate: new Date(appointment.startTime),
    endDate: appointment.endTime ? new Date(appointment.endTime): addMinutes(new Date(appointment.startTime), 60),
  }));

  return (    
    <div className="relative flex-col bg-white bg-clip-border text-gray-700 shadow-md">
      <WeekViewCalendar events={events} onEventClick={onEventClick} />
    </div>
  )
}

export default CalendarBlock
