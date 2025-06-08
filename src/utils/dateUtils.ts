/**
 * Adds leading zero to single digit numbers
 * @param num - Number to pad
 * @returns Padded number string
 */
export const padZero = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};

/**
 * Checks if a given year is a leap year
 * @param year - Year to check
 * @returns Boolean indicating if it's a leap year
 */
export const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

/**
 * Gets the number of days in February for a given year
 * @param year - Year to check
 * @returns Number of days in February
 */
export const getFebruaryDays = (): number => {
  const year = new Date().getFullYear();

  return isLeapYear(year) ? 29 : 28;
};

/**
 * Gets the ISO week number for a given date
 * @param date - Date to get week number for
 * @returns Week number (1-53)
 */
export const getWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

/**
 * Gets the quarter (1-4) for a given date
 * @param date - Date to get quarter for
 * @returns Quarter number
 */
export const getQuarter = (date: Date): number => {
  return Math.floor(date.getMonth() / 3) + 1;
};

/**
 * Gets the timezone name
 * @returns Timezone string
 */
export const getTimezone = (_date: Date): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

/**
 * Converts a date from one timezone to another
 * @param date - Date to convert
 * @param fromTimezone - Source timezone (e.g., 'America/New_York')
 * @param toTimezone - Target timezone (e.g., 'Asia/Tokyo')
 * @returns Date object in the target timezone
 */
export const convertTimezone = (date: Date, fromTimezone: string, toTimezone: string): Date => {
  const sourceDate = new Date(date.toLocaleString("en-US", { timeZone: fromTimezone }));
  const targetDate = new Date(date.toLocaleString("en-US", { timeZone: toTimezone }));
  const timezoneOffset = targetDate.getTime() - sourceDate.getTime();

  return new Date(date.getTime() + timezoneOffset);
};
