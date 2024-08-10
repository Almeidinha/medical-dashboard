import {
  Locale,
  format,
  getDay,
  getHours,
  getMinutes,
  isSameWeek,
} from "date-fns";
import { Days } from "../lib/use-weekview";
import { Event } from "../weekViewCalendar";
import useDashboardState from "@/hooks/use-dashboard-state";

interface EventGridProps {
  days: Days;
  events?: Event[];
  locale?: Locale;
  minuteStep: number;
  rowHeight: number;
  onEventClick?: (event: Event) => void;
}

const EventGrid = (props: EventGridProps) => {

  const {
    days,
    events,
    locale,
    minuteStep,
    rowHeight,
    onEventClick,
  } = props;

  const { getPatient } = useDashboardState.useContainer();

  const WEEK_STARTS_ON = 1;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${days[0].cells.length}, minmax(${rowHeight}px, 1fr))`,
      }}
    >
      {(events || [])
        .filter((event) => isSameWeek(days[0].date, event.startDate))
        .map((event) => {
          const start =
            getHours(event.startDate) * 2 - 12 +
            1 +
            Math.floor(getMinutes(event.startDate) / minuteStep);
          const end =
            getHours(event.endDate) * 2 - 12 +
            1 +
            Math.ceil(getMinutes(event.endDate) / minuteStep);

          const paddingTop =
            ((getMinutes(event.startDate) % minuteStep) / minuteStep) *
            rowHeight;

          const paddingBottom =
            (rowHeight -
              ((getMinutes(event.endDate) % minuteStep) / minuteStep) *
                rowHeight) %
            rowHeight;

          return (
            <div
              key={event.id}
              className="relative flex mt-[1px] transition-all"
              style={{
                gridRowStart: start,
                gridRowEnd: end,
                gridColumnStart: getDay(event.startDate) - WEEK_STARTS_ON + 1,
                gridColumnEnd: "span 1",
              }}
            >
              <span
                className="absolute inset-1 flex flex-col overflow-y-auto rounded-md p-2 text-xs leading-5 bg-blue-400 border border-transparent border-dashed hover:bg-blue-100 transition cursor-pointer"
                style={{
                  top: paddingTop + 4,
                  bottom: paddingBottom + 4,
                }}
                onClick={() => onEventClick?.(event)}
              >
                <p className="text-white leading-4 text-center">
                  {getPatient(event.patientId)?.name}
                  {/*format(new Date(event.startDate), "H:mm", {
                    weekStartsOn: WEEK_STARTS_ON,
                    locale,
                  })}
                  -
                  {format(new Date(event.endDate), "H:mm", {
                    weekStartsOn: WEEK_STARTS_ON,
                    locale,
                  })*/}
                </p>
                <p className="font-normal text-white text-sm text-center">{event.title}</p>
              </span>
            </div>
          );
        })}
    </div>
  );
}

export default EventGrid;