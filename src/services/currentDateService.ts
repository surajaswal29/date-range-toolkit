import { ICurrentDateInfo } from "../types";
import { MONTHS, WEEKS } from "../constants";
import { padZero, isLeapYear, getWeekNumber, getQuarter, getTimezone } from "../utils/dateUtils";

export const getCurrentDateInfo = (): ICurrentDateInfo => {
  const date = new Date();
  const year = date.getFullYear();
  const currentMonth = date.getMonth();

  return {
    todayDate: padZero(date.getDate()),
    weekDay: WEEKS[date.getDay()],
    month: padZero(currentMonth + 1),
    year,
    date: date.toLocaleDateString(["en-UK"]),
    monthName: MONTHS[currentMonth].name,
    monthLength: MONTHS[currentMonth].daysInMonth,
    isLeapYear: isLeapYear(year),
    weekNumber: getWeekNumber(date),
    quarter: getQuarter(date),
    timezone: getTimezone(date),
  };
};
