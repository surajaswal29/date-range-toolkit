import { DateRangeToolkit } from "./DateRangeToolkit";

/**
 * Create a new DateRangeToolkit instance
 * @param date - Optional date string or Date object
 * @returns A new DateRangeToolkit instance
 */
export const createDateRangeToolkit = (date?: string | Date | number): DateRangeToolkit =>
  new DateRangeToolkit(date);
