"use client"

import Collapsible from "@/components/collapsible";
import CalendarBlock from "@/components/dashboard/calendar-block";
import HistoryBlock from "@/components/dashboard/history-block";
import PatientsBlock from "@/components/dashboard/patients-block";
import { Spinner } from "@/components/spinner";
import { useIsClient, useLocalStorage } from "usehooks-ts";

export default function Home() {

  const isClient = useIsClient()

  const [calendarOpened, setCalendarOpened] = useLocalStorage('calendar-opened', true)
  const [historyOpened, setHistoryOpened] = useLocalStorage('history-opened', true)
  const [patientsOpened, setPatientsOpened] = useLocalStorage('patients-opened', true)


  if (!isClient) {
    return <div className="h-44 m-2 lg:m-4">
      <Spinner medium />
    </div>;
  }

  return (
    <main className="flex flex-col space-y-2 min-h-screen items-center p-4 mx-auto my-4 w-full lg:w-8/12">
      <Collapsible isOpen={calendarOpened} title="Calendar" onCollapse={setCalendarOpened}>
        <CalendarBlock/>
      </Collapsible>
      <Collapsible isOpen={historyOpened} title="History" onCollapse={setHistoryOpened}>
        <HistoryBlock/>
      </Collapsible>
      <Collapsible isOpen={patientsOpened} title="Patients" onCollapse={setPatientsOpened}>
        <PatientsBlock/>
      </Collapsible>
    </main>
  );
}
