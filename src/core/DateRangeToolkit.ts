import { IDateInfo, IDateRange, IMonth, IWeek, IRangePreset } from "../types";
import { MONTHS } from "../constants/months";
import { WEEKS } from "../constants/weeks";
import { CurrentDateService } from "../services/current-date-service";
import { PreviousDateService } from "../services/previous-date-service";
import { PresetDateRangeService } from "../services/preset-date-range-service";

/**
 * A toolkit for handling date ranges and date-related operations
 * @example
 * ```typescript
 * const dateRangeToolkit = new DateRangeToolkit();
 * const last7Days = dateRangeToolkit.getLast7Days();
 * console.log(last7Days);
 * ```
 */
export class DateRangeToolkit {
  private date: Date;
  private presetService: PresetDateRangeService;
  private currentDateService: CurrentDateService;
  private previousDateService: PreviousDateService;

  /**
   * Creates an instance of DateRangeToolkit
   * @param date - Optional date parameter that can be a string, Date object, or number
   * @throws {Error} When an invalid date is provided
   */
  constructor(date?: string | Date | number) {
    if (!date) {
      this.date = new Date();
    } else if (date instanceof Date) {
      this.date = new Date(date);
    } else {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date provided");
      }
      this.date = parsedDate;
    }
    this.presetService = new PresetDateRangeService();
    this.currentDateService = new CurrentDateService(this.date);
    this.previousDateService = new PreviousDateService(this.date);
  }

  /**
   * Returns the current date instance
   * @returns A new Date object instance
   */
  public getDate(): Date {
    return new Date(this.date);
  }

  /**
   * Gets information about the current date
   * @returns {IDateInfo} Current date information
   * @example
   * ```typescript
   * {
   *   year: 2025,
   *   month: "January",
   *   dayOfWeek: "Monday",
   *   dayOfMonth: 1,
   *   monthLength: 31,
   *   monthName: "January",
   *   monthAbbreviation: {
   *     type_1: "Jan",
   *     type_2: "JAN",
   *     type_3: "jan"
   *   },
   *   quarter: 1,
   *   firstDayOfMonth: "2025-01-01",
   *   lastDayOfMonth: "2025-01-31",
   *   isLeapYear: false,
   *   weekNumber: 1,
   *   totalWeeksInMonth: 5
   * }
   * ```
   */
  public getCurrentDateInfo(): IDateInfo {
    return this.currentDateService.getCurrentDateInfo();
  }

  /**
   * Gets information about the previous date
   * @returns {IDateInfo} Previous date information
   * @example
   * ```typescript
   * {
   *   year: 2024,
   *   month: "December",
   *   dayOfWeek: "Sunday",
   *   dayOfMonth: 29,
   *   monthLength: 31,
   *   monthName: "December",
   *   monthAbbreviation: {
   *     type_1: "Dec",
   *     type_2: "DEC",
   *     type_3: "dec"
   *   },
   *   quarter: 4,
   *   firstDayOfMonth: "2024-12-01",
   *   lastDayOfMonth: "2024-12-31",
   *   isLeapYear: false,
   *   weekNumber: 1,
   *   totalWeeksInMonth: 5
   * }
   * ```
   */
  public getPreviousDateInfo(): IDateInfo {
    return this.previousDateService.getPreviousDateInfo();
  }

  /**
   * Gets a date range for the last 7 days
   * @param customLabel - Optional custom label for the date range
   * @returns {IDateRange} Date range object for the last 7 days
   * @example
   * ```typescript
   * {
   *   startDate: "2025-01-01",
   *   endDate: "2025-01-07",
   *   rangeLabel: "Last 7 days",
   *   labels: [
   *     {
   *       label: "1 Jan",
   *       date: "2025-01-01",
   *       dayName: "Monday",
   *       dayAbbrev: "Mon",
   *       monthName: "January",
   *       monthAbbrev: "Jan",
   *       isoDate: "2025-01-01",
   *       isWeekend: false
   *     },
   *     ...
   *   ]
   * }
   */
  public getLast7Days(customLabel?: string): IDateRange {
    return this.presetService.getLastNDays(7, customLabel);
  }

  /**
   * Gets a date range for the last 30 days
   * @param customLabel - Optional custom label for the date range
   * @returns {IDateRange} Date range object for the last 30 days
   * @example
   * ```typescript
   * {
   *   startDate: "2025-01-01",
   *   endDate: "2025-01-30",
   *   rangeLabel: "Last 30 days",
   *   labels: [
   *     {
   *       label: "1 Jan",
   *       date: "2025-01-01",
   *       dayName: "Monday",
   *       dayAbbrev: "Mon",
   *       monthName: "January",
   *       monthAbbrev: "Jan",
   *       isoDate: "2025-01-01",
   *       isWeekend: false
   *     },
   *     ...
   *   ]
   * }
   */
  public getLast30Days(customLabel?: string): IDateRange {
    return this.presetService.getLastNDays(30, customLabel);
  }

  /**
   * Gets a date range for the last 3 months
   * @param customLabel - Optional custom label for the date range
   * @returns {IDateRange} Date range object for the last 3 months
   * @example
   * ```typescript
   * {
   *   startDate: "2025-01-01",
   *   endDate: "2025-03-31",
   *   rangeLabel: "Last 3 months",
   *   labels: [
   *     {
   *       label: "1 Jan",
   *       date: "2025-01-01",
   *       dayName: "Monday",
   *       dayAbbrev: "Mon",
   *       monthName: "January",
   *       monthAbbrev: "Jan",
   *       isoDate: "2025-01-01",
   *       isWeekend: false
   *     },
   *     ...
   *   ]
   * }
   */
  public getLast3Months(customLabel?: string): IDateRange {
    return this.presetService.getLastNMonths(3, customLabel);
  }

  /**
   * Gets a date range from the start of the year to the current date
   * @param customLabel - Optional custom label for the date range
   * @returns {IDateRange} Date range object for the year to date
   * @example
   * ```typescript
   * {
   *   startDate: "2025-01-01",
   *   endDate: "2025-12-31",
   *   rangeLabel: "Year to Date",
   *   labels: [
   *     {
   *       label: "1 Jan",
   *       date: "2025-01-01",
   *       dayName: "Monday",
   *       dayAbbrev: "Mon",
   *       monthName: "January",
   *       monthAbbrev: "Jan",
   *       isoDate: "2025-01-01",
   *       isWeekend: false
   *     },
   *     ...
   *   ]
   * }
   */
  public getLastYear(customLabel?: string): IDateRange {
    const startDate = new Date(this.date.getFullYear(), 0, 1);
    return this.presetService.getCustomRange(startDate, this.date, customLabel || "Year to Date");
  }

  /**
   * Creates a custom date range between two dates
   * @param startDate - The start date of the range
   * @param endDate - The end date of the range
   * @param customLabel - Optional custom label for the date range
   * @returns {IDateRange} Custom date range object
   * @example
   * ```typescript
   * {
   *   startDate: "2025-01-01",
   *   endDate: "2025-01-30",
   *   rangeLabel: "Custom Range",
   *   labels: [
   *     {
   *       label: "1 Jan",
   *       date: "2025-01-01",
   *       dayName: "Monday",
   *       dayAbbrev: "Mon",
   *       monthName: "January",
   *       monthAbbrev: "Jan",
   *       isoDate: "2025-01-01",
   *       isWeekend: false
   *     },
   *     ...
   *   ]
   * }
   */
  public getCustomRange(startDate: Date, endDate: Date, customLabel?: string): IDateRange {
    return this.presetService.getCustomRange(startDate, endDate, customLabel || "Custom Range");
  }

  /**
   * Returns an array of month objects containing detailed month information
   * @returns {IMonth[]} An array of month objects with the following structure:
   * @example
   * ```typescript
   * [
   *   {
   *     id: 0,
   *     name: "January",
   *     abbreviation: { type_1: "Jan", type_2: "JAN", type_3: "jan" },
   *     daysInMonth: 31,
   *     quarter: 1
   *   },
   *   {
   *     id: 1,
   *     name: "February",
   *     abbreviation: { type_1: "Feb", type_2: "FEB", type_3: "feb" },
   *     daysInMonth: 28,
   *     quarter: 1
   *   },
   *   ...
   * ]
   * ```
   */
  public getMonths(): IMonth[] {
    return [...MONTHS];
  }

  /**
   * Returns an array of month names
   * @returns {string[]} An array of full month names (e.g., ["January", "February", ...])
   * @example
   * ```typescript
   * ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
   * ```
   */
  public getMonthsLabels(): string[] {
    return MONTHS.map((month) => month.name);
  }

  /**
   * Returns an array of week objects containing week information
   * @returns {IWeek[]} An array of week objects with day names and their short forms
   * @example
   * ```typescript
   * [
   *   { id: 1, name: "Monday", shortName: "Mon" },
   *   { id: 2, name: "Tuesday", shortName: "Tue" },
   *   ...
   * ]
   * ```
   */
  public getWeeks(): IWeek[] {
    return [...WEEKS];
  }

  /**
   * Returns an array of week day names
   * @returns {string[]} An array of full week day names (e.g., ["Monday", "Tuesday", ...])
   * @example
   * ```typescript
   * ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
   * ```
   */
  public getWeeksLabels(): string[] {
    return WEEKS.map((week) => week.name);
  }

  /**
   * Returns an array of preset date range options
   * @returns {IRangePreset[]} An array of preset date range options (e.g., Last 7 days, Last 30 days, etc.)
   * @example
   * ```typescript
   * [
   *   { label: "Last 7 days", value: 7, unit: "day" },
   *   { label: "Last 30 days", value: 30, unit: "day" },
   *   ...
   * ]
   * ```
   */
  public getPresets(): IRangePreset[] {
    return this.presetService.getRangePresets();
  }
}
