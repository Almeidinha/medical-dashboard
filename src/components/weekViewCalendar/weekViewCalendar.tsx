"use client"

import { Locale } from 'date-fns';
import React from 'react'
import useWeekView from './lib/use-weekview';
import DaysHeader from './components/days-header';
import Grid from './components/grid';
import EventGrid from './components/event-grid';


export type Event = {
  id: string;
  patientId: number;
  title: string;
  startDate: Date;
  endDate: Date;
};

interface WeekViewCalendarProps { 
  minuteStep?: number;
  locale?: Locale;
  rowHeight?: number;
  events?: Event[];
  onEventClick?: (event: Event) => void;
}

const WeekViewCalendar = (props: WeekViewCalendarProps) => {

  const {
    minuteStep = 30,
    locale,
    rowHeight = 80,
    events,
    onEventClick,
  } = props;
  
  const { days } = useWeekView({
    minuteStep,
    locale,
  });
  
  return <div className="flex flex-col w-full h-full">
    <div className="flex flex-col flex-1 overflow-hidden select-none">
      <div className="flex flex-col flex-1 isolate overflow-auto">
        <div className="flex flex-col flex-none min-w-[800px]">
          <DaysHeader days={days} />
          <div className="grid grid-cols-1 grid-rows-1">
            <div className="row-start-1 col-start-1">
              <Grid
                days={days}
                rowHeight={rowHeight}
              />
            </div>
            <div className="row-start-1 col-start-1">
              <EventGrid
                days={days}
                events={events}
                locale={locale}
                minuteStep={minuteStep}
                rowHeight={rowHeight}
                onEventClick={onEventClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default WeekViewCalendar
