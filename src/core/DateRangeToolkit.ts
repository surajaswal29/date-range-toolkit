import {
  IDateRangeToolkitResult,
  ICurrentDateInfo,
  IPreviousDateInfo,
  IDateComparisonResult,
  IDateRangeOptions,
  IDateRange,
  IMonth,
} from "../types";
import { MONTHS } from "../constants";
import { getCurrentDateInfo } from "../services/currentDateService";
import { getPreviousDateInfo } from "../services/previousDateService";
import { formatDate } from "../utils/formatDate";
import { convertTimezone, getTimezone } from "../utils/dateUtils";
import {
  getLastNDays,
  getLastQuarter,
  getYearToDate,
  getCustomDateRange,
  getLast7DaysInfo,
} from "../services/presetDateRangeService";

export class DateRangeToolkit {
  private _format: string = "MM/DD/YYYY HH:mm:ss a";
  private _timezone: string = getTimezone(new Date());
  private _date: Date = new Date();
  private _current: ICurrentDateInfo | null = null;
  private _previous: IPreviousDateInfo | null = null;
  private _last7days: IDateRange | null = null;
  private _last30days: IDateRange | null = null;
  private _lastQuarter: IDateRange | null = null;
  private _yearToDate: IDateRange | null = null;
  private _customRange: IDateRange | null = null;
  private _allMonths: IMonth[] = MONTHS;
  private _isValid: boolean = true;
  private _invalidReason: string = "";
  private _options: IDateRangeOptions = {};

  /**
   * Creates a new DateRangeToolkit instance
   * @param date - Optional date string or Date object
   * @param format - Optional format string for parsing the date
   */
  constructor(date?: string | Date | number, format?: string) {
    if (date) {
      if (date instanceof Date) {
        this._date = new Date(date);
      } else if (typeof date === "number") {
        this._date = new Date(date);
      } else {
        try {
          this._date = new Date(date);
          if (isNaN(this._date.getTime())) {
            throw new Error("Invalid date");
          }
        } catch (e) {
          this._isValid = false;
          this._invalidReason = "Invalid date string provided";
          this._date = new Date();
        }
      }
    }
    if (format) {
      this._format = format;
    }
  }

  /**
   * Set the format for the date
   * @param format - The format to set
   * @returns this instance for method chaining
   */
  public format(format: string = "MM/DD/YYYY HH:mm:ss a"): DateRangeToolkit {
    this._format = format;
    return this;
  }

  /**
   * Get the formatted date string
   * @returns Formatted date string
   */
  public toString(): string {
    return formatDate(this._date, this._format);
  }

  /**
   * Set the timezone for the date
   * @param timezone - The timezone to set
   * @returns this instance for method chaining
   */
  public timezone(timezone: string): DateRangeToolkit {
    try {
      // Test if timezone is valid
      Intl.DateTimeFormat(undefined, { timeZone: timezone });
      this._date = convertTimezone(this._date, this._timezone, timezone);
      this._timezone = timezone;
    } catch (e) {
      this._isValid = false;
      this._invalidReason = `Invalid timezone: ${timezone}`;
    }
    return this;
  }

  /**
   * Get current date information
   * @returns this instance for method chaining
   */
  public current(): DateRangeToolkit {
    this._current = getCurrentDateInfo();
    return this;
  }

  /**
   * Get previous year's date information
   * @returns this instance for method chaining
   */
  public previous(): DateRangeToolkit {
    this._previous = getPreviousDateInfo();
    return this;
  }

  /**
   * Get last 7 days information
   * @returns this instance for method chaining
   */
  public last7Days(): DateRangeToolkit {
    this._last7days = getLast7DaysInfo();
    return this;
  }

  /**
   * Get all months information
   * @returns this instance for method chaining
   */
  public months(): DateRangeToolkit {
    this._allMonths = MONTHS;
    return this;
  }

  /**
   * Add a specified amount of time to the date
   * @param amount - The amount to add
   * @param unit - The unit of time ('years'|'months'|'days'|'hours'|'minutes'|'seconds')
   * @returns this instance for method chaining
   */
  public add(
    amount: number,
    unit: "years" | "months" | "days" | "hours" | "minutes" | "seconds",
  ): DateRangeToolkit {
    const newDate = new Date(this._date);
    switch (unit) {
      case "years":
        newDate.setFullYear(newDate.getFullYear() + amount);
        break;
      case "months":
        newDate.setMonth(newDate.getMonth() + amount);
        break;
      case "days":
        newDate.setDate(newDate.getDate() + amount);
        break;
      case "hours":
        newDate.setHours(newDate.getHours() + amount);
        break;
      case "minutes":
        newDate.setMinutes(newDate.getMinutes() + amount);
        break;
      case "seconds":
        newDate.setSeconds(newDate.getSeconds() + amount);
        break;
    }
    this._date = newDate;
    return this;
  }

  /**
   * Subtract a specified amount of time from the date
   * @param amount - The amount to subtract
   * @param unit - The unit of time ('years'|'months'|'days'|'hours'|'minutes'|'seconds')
   * @returns this instance for method chaining
   */
  public subtract(
    amount: number,
    unit: "years" | "months" | "days" | "hours" | "minutes" | "seconds",
  ): DateRangeToolkit {
    return this.add(-amount, unit);
  }

  /**
   * Compare this date with another date
   * @param date - Date to compare with
   * @returns Comparison result object
   */
  public compareTo(date: Date | string | DateRangeToolkit): IDateComparisonResult {
    const compareDate = date instanceof DateRangeToolkit ? date._date : new Date(date);
    const thisTime = this._date.getTime();
    const compareTime = compareDate.getTime();

    const diffInMillis = thisTime - compareTime;
    const diffInDays = Math.floor(diffInMillis / (1000 * 60 * 60 * 24));
    const diffInMonths =
      (this._date.getFullYear() - compareDate.getFullYear()) * 12 +
      (this._date.getMonth() - compareDate.getMonth());
    const diffInYears = this._date.getFullYear() - compareDate.getFullYear();

    return {
      equal: thisTime === compareTime,
      before: thisTime < compareTime,
      after: thisTime > compareTime,
      diffInDays,
      diffInMonths,
      diffInYears,
    };
  }

  /**
   * Check if the date is valid
   * @returns boolean indicating if the date is valid
   */
  public isValid(): boolean {
    return this._isValid && !isNaN(this._date.getTime());
  }

  /**
   * Get the validation error message if the date is invalid
   * @returns Error message or empty string if valid
   */
  public getValidationError(): string {
    return this._isValid ? "" : this._invalidReason;
  }

  /**
   * Get the native Date object
   * @returns The underlying Date object
   */
  public toDate(): Date {
    return new Date(this._date);
  }

  /**
   * Set date range options
   * @param options - The options to set
   * @returns this instance for method chaining
   */
  public setOptions(options: IDateRangeOptions): DateRangeToolkit {
    this._options = options;
    return this;
  }

  /**
   * Get last 30 days information
   * @returns this instance for method chaining
   */
  public last30Days(): DateRangeToolkit {
    this._last30days = getLastNDays(30);
    return this;
  }

  /**
   * Get last quarter information
   * @returns this instance for method chaining
   */
  public lastQuarter(): DateRangeToolkit {
    this._lastQuarter = getLastQuarter();
    return this;
  }

  /**
   * Get year to date information
   * @returns this instance for method chaining
   */
  public yearToDate(): DateRangeToolkit {
    this._yearToDate = getYearToDate();
    return this;
  }

  /**
   * Get custom date range information
   * @param startDate - Start date
   * @param endDate - End date
   * @returns this instance for method chaining
   */
  public customRange(startDate: Date, endDate: Date): DateRangeToolkit {
    this._customRange = getCustomDateRange(startDate, endDate);
    return this;
  }

  /**
   * Build and return the final result
   * @returns Object containing all requested date information
   */
  public build(): Partial<IDateRangeToolkitResult> {
    if (!this._isValid) {
      throw new Error(`Invalid date: ${this._invalidReason}`);
    }

    const result: Partial<IDateRangeToolkitResult> = {};

    if (this._current) result.current = this._current;
    if (this._previous) result.previous = this._previous;
    if (this._last7days) result.last7days = this._last7days;
    if (this._last30days) result.last30days = this._last30days;
    if (this._lastQuarter) result.lastQuarter = this._lastQuarter;
    if (this._yearToDate) result.yearToDate = this._yearToDate;
    if (this._customRange) result.customRange = this._customRange;
    if (this._allMonths) result.allMonths = this._allMonths;

    return result;
  }

  /**
   * Get debug information about the current state
   * @returns Debug information object
   */
  public debug(): object {
    return {
      date: this._date,
      format: this._format,
      timezone: this._timezone,
      isValid: this._isValid,
      invalidReason: this._invalidReason,
      hasCurrentInfo: !!this._current,
      hasPreviousInfo: !!this._previous,
      hasLast7DaysInfo: !!this._last7days,
      hasLast30DaysInfo: !!this._last30days,
      hasLastQuarterInfo: !!this._lastQuarter,
      hasYearToDateInfo: !!this._yearToDate,
      hasCustomRangeInfo: !!this._customRange,
      hasMonthsInfo: !!this._allMonths,
    };
  }
}
