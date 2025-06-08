import { IDateLabel } from "../types";
import { MONTHS, WEEKS } from "../constants";

interface IDateRangeResult {
  fromDate: Date;
  toDate: Date;
  fromISODate: string;
  toISODate: string;
  totalDays: number;
  weekendDays: number;
  weekDays: number;
  labels: IDateLabel[];
}

/**
 * Creates date labels for a given date range
 */
const createDateLabels = (fromDate: Date, toDate: Date): IDateLabel[] => {
  const labels: IDateLabel[] = [];
  const currentDate = new Date(fromDate);

  while (currentDate <= toDate) {
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const month = MONTHS[currentDate.getMonth()];

    labels.push({
      label: `${currentDate.getDate()} ${month.name}`,
      date: new Date(currentDate),
      dayName: WEEKS[dayOfWeek],
      dayAbbrev: WEEKS[dayOfWeek].slice(0, 3),
      monthName: month.name,
      monthAbbrev: month.abbreviation.type_1,
      isoDate: currentDate.toISOString().split("T")[0],
      isWeekend,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return labels;
};

/**
 * Calculates date range information for a given start and end date
 */
const calculateDateRangeInfo = (fromDate: Date, toDate: Date): IDateRangeResult => {
  const labels = createDateLabels(fromDate, toDate);
  const weekendDays = labels.filter((label) => label.isWeekend).length;
  const totalDays = labels.length;

  return {
    fromDate: new Date(fromDate),
    toDate: new Date(toDate),
    fromISODate: fromDate.toISOString().split("T")[0],
    toISODate: toDate.toISOString().split("T")[0],
    totalDays,
    weekendDays,
    weekDays: totalDays - weekendDays,
    labels,
  };
};

/**
 * Gets the last N days date range
 */
export const getLastNDays = (days: number): IDateRangeResult => {
  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setDate(toDate.getDate() - (days - 1));
  return calculateDateRangeInfo(fromDate, toDate);
};

/**
 * Gets the last quarter date range
 */
export const getLastQuarter = (): IDateRangeResult => {
  const today = new Date();
  const currentQuarter = Math.floor(today.getMonth() / 3);
  const fromDate = new Date(today.getFullYear(), currentQuarter * 3 - 3, 1);
  const toDate = new Date(today.getFullYear(), currentQuarter * 3, 0);
  return calculateDateRangeInfo(fromDate, toDate);
};

/**
 * Gets the year to date range
 */
export const getYearToDate = (): IDateRangeResult => {
  const today = new Date();
  const fromDate = new Date(today.getFullYear(), 0, 1);
  return calculateDateRangeInfo(fromDate, today);
};

/**
 * Gets a custom date range
 */
export const getCustomDateRange = (startDate: Date, endDate: Date): IDateRangeResult => {
  return calculateDateRangeInfo(startDate, endDate);
};
