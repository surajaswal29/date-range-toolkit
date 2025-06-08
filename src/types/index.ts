export interface IMonth {
  name: string;
  abbreviation: {
    type_1: string; // Title Case (e.g., Jan)
    type_2: string; // UPPERCASE (e.g., JAN)
    type_3: string; // lowercase (e.g., jan)
  };
  daysInMonth: number;
  quarter: number;
}

export interface IDateLabel {
  label: string;
  date: Date;
  dayName: string;
  dayAbbrev: string;
  monthName: string;
  monthAbbrev: string;
  isoDate: string;
  isWeekend: boolean;
}

export interface IDateFormatOptions {
  format?: string;
  locale?: string;
  timezone?: string;
}

export interface IDateRangeOptions {
  startDate?: Date;
  endDate?: Date;
  preset?: "last7days" | "last30days" | "lastQuarter" | "yearToDate" | "custom";
  excludeWeekends?: boolean;
  excludeHolidays?: boolean;
}

export interface Holiday {
  date: Date;
  name: string;
  type: "public" | "bank" | "custom";
  recurring?: boolean;
}

export interface ICurrentDateInfo {
  todayDate: string;
  weekDay: string;
  month: string;
  year: number;
  date: string;
  monthName: string;
  monthLength: number;
  isLeapYear: boolean;
  weekNumber: number;
  quarter: number;
  timezone: string;
}

// Base interface for all date ranges
export interface IBaseDateRange {
  fromDate: Date;
  toDate: Date;
  fromISODate: string;
  toISODate: string;
  totalDays: number;
  weekendDays: number;
  weekDays: number;
  labels: IDateLabel[];
}

// Numeric version of the range (used internally)
export interface INumericDateRange {
  from_date: number;
  to_date: number;
}

// Combined interface for all range types
export interface IDateRange extends IBaseDateRange, INumericDateRange {}

// Specific preset interfaces extending the base range
export interface ILast7DaysInfo extends IDateRange {}
export interface ILast30DaysInfo extends IDateRange {}
export interface ILastQuarterInfo extends IDateRange {}
export interface IYearToDateInfo extends IDateRange {}
export interface ICustomRangeInfo extends IDateRange {}

export interface IPreviousDateInfo {
  year: number;
  month: string;
  monthLength: number;
  monthName: string;
}

export interface IDateRangeToolkitResult {
  current?: ICurrentDateInfo;
  previous?: IPreviousDateInfo;
  last7days?: ILast7DaysInfo;
  last30days?: ILast30DaysInfo;
  lastQuarter?: ILastQuarterInfo;
  yearToDate?: IYearToDateInfo;
  customRange?: ICustomRangeInfo;
  allMonths?: IMonth[];
}

export interface IDateComparisonResult {
  equal: boolean;
  before: boolean;
  after: boolean;
  diffInDays: number;
  diffInMonths: number;
  diffInYears: number;
}

export type DateUnit = "day" | "week" | "month" | "quarter" | "year";

export interface DateMathOptions {
  unit: DateUnit;
  amount: number;
  roundTo?: DateUnit;
}
