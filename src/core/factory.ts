import { DateRangeToolkit } from "./DateRangeToolkit";

/**
 * Create a new DateRangeToolkit instance
 * @param date - Optional date string or Date object
 * @param format - Optional format string for parsing the date
 * @returns A new DateRangeToolkit instance
 */
export const createDateRangeToolkit = (
  date?: string | Date | number,
  format?: string,
): DateRangeToolkit => new DateRangeToolkit(date, format);
