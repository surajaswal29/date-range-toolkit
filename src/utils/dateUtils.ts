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
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  return year % 4 === 0;
};

/**
 * Gets the number of days in February for a given year
 * @param year - Year to check
 * @returns Number of days in February
 */
export const getFebruaryDays = (year: number): number => {
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
