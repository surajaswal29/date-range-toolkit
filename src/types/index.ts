export interface IMonth {
  id: number;
  name: string;
  abbreviation: {
    type_1: string; // Title Case (e.g., Jan)
    type_2: string; // UPPERCASE (e.g., JAN)
    type_3: string; // lowercase (e.g., jan)
  };
  daysInMonth: number;
  quarter: number;
}

export interface IDateInfo {
  year: number;
  month: string;
  dayOfWeek: string;
  dayOfMonth: number;
  monthLength: number;
  monthName: string;
  monthAbbreviation: {
    type_1: string;
    type_2: string;
    type_3: string;
  };
  quarter: number;
  firstDayOfMonth: Date;
  lastDayOfMonth: Date;
  isLeapYear: boolean;
  weekNumber: number;
  totalWeeksInMonth: number;
}

export interface IWeek {
  id: number;
  name: string;
  shortName: string;
}

export interface IRangePreset {
  label: string;
  value: number;
  unit: "day" | "week" | "month" | "year";
}

export interface IDateRange {
  startDate: Date; // e.g., "2025-01-01"
  endDate: Date; // e.g., "2025-01-07"
  rangeLabel: string; // e.g., "Last 7 days"
  labels: IDateLabel[]; // e.g., [{ label: "1 Jan", date: "2025-01-01", dayName: "Monday", dayAbbrev: "Mon", monthName: "January", monthAbbrev: "Jan", isoDate: "2025-01-01", isWeekend: false }, ...]
}

export interface IDateLabel {
  label: string; // e.g., "1 Jan"
  date: Date; // e.g., "2025-01-01"
  dayName: string; // e.g., "Monday"
  dayAbbrev: string; // e.g., "Mon"
  monthName: string; // e.g., "January"
  monthAbbrev: string; // e.g., "Jan"
  isoDate: string; // e.g., "2025-01-01"
  isWeekend: boolean; // e.g., true
}
