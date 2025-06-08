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
export { getLast7DaysInfo } from "./services/last7DaysService";
export { formatDate } from "./services/formatDate";

// Utility exports
export { convertTimezone, getTimezone } from "./utils/dateUtils";

// Type exports
export type {
  ICurrentDateInfo,
  IPreviousDateInfo,
  ILast7DaysInfo,
  IDateComparisonResult,
} from "./types";

debugLogger();
