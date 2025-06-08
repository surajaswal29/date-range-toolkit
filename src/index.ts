import { debugLogger } from "./examples/basic-usage";

// Core exports
export { DateRangeToolkit } from "./core/DateRangeToolkit";
export { createDateRangeToolkit } from "./core/factory";
export type { IDateRangeToolkitResult } from "./types";

// Constants
export { MONTHS } from "./constants";

// Service exports
export { getCurrentDateInfo } from "./services/currentDateService";
export { getPreviousDateInfo } from "./services/previousDateService";
export {
  getLast7DaysInfo,
  getLastNDays,
  getLastQuarter,
  getYearToDate,
  getCustomDateRange,
} from "./services/presetDateRangeService";

// Utility exports
export { formatDate } from "./utils/formatDate";
export { convertTimezone, getTimezone } from "./utils/dateUtils";

// Type exports
export type {
  ICurrentDateInfo,
  IPreviousDateInfo,
  IDateComparisonResult,
  IBaseDateRange,
  INumericDateRange,
  IDateRange,
  ILast7DaysInfo,
  ILast30DaysInfo,
  ILastQuarterInfo,
  IYearToDateInfo,
  ICustomRangeInfo,
} from "./types";

debugLogger();
