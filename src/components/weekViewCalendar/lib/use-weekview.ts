import {
  addDays,
  eachDayOfInterval,
  eachMinuteOfInterval,
  endOfDay,
  startOfDay,
  startOfWeek,
  isToday,
  format,
  Day,
  Locale,
} from "date-fns";

export default function useWeekView({
  initialDate,
  minuteStep = 30,
  weekStartsOn = 1,
  locale,
  disabledDay,
}:
  | {
      initialDate?: Date;
      minuteStep?: number;
      weekStartsOn?: Day;
      locale?: Locale;
      disabledCell?: (date: Date) => boolean;
      disabledDay?: (date: Date) => boolean;
      disabledWeek?: (startDayOfWeek: Date) => boolean;
    }
  | undefined = {}) {
  
  const startOfTheWeek = startOfWeek(startOfDay(initialDate || new Date()), { weekStartsOn })
  
  const days = eachDayOfInterval({
    start: startOfTheWeek,
    end: addDays(startOfTheWeek, 4),
  }).map((day) => ({
    date: day,
    isToday: isToday(day),
    name: format(day, "EEEE", { locale }),
    shortName: format(day, "EEE", { locale }),
    dayOfMonth: format(day, "d", { locale }),
    dayOfMonthWithZero: format(day, "dd", { locale }),
    dayOfMonthWithSuffix: format(day, "do", { locale }),
    disabled: disabledDay ? disabledDay(day) : false,
    cells: eachMinuteOfInterval(
      {
        start: startOfDay(day).setHours(6),
        end: endOfDay(day).setHours(18),
      },
      {
        step: minuteStep,
      }
    ).map((hour) => ({
      date: hour,
      hour: format(hour, "HH", { locale }),
      minute: format(hour, "mm", { locale }),
      hourAndMinute: format(hour, "HH:mm", { locale }),
    })),
  }));

  const weekNumber = format(days[0].date, "w", { locale });

  return {
    days,
    weekNumber,
  };
}

export type Days = ReturnType<typeof useWeekView>["days"];
export type Cell = Days[number]["cells"][number];
