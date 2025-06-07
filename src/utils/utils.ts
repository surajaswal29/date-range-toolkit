/**
 * Adds leading zero to single digit numbers
 * @param number - The number to pad
 * @returns The padded number as a string
 */
export const padZero = (number: number): string => {
  return number > 9 ? number.toString() : `0${number}`
}

/**
 * Checks if a given year is a leap year
 * @param year - The year to check
 * @returns True if leap year, false otherwise
 */
export const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
 * Gets the number of days in February for a given year
 * @param year - The year to check
 * @returns Number of days in February
 */
export const getFebruaryDays = (year: number): number => {
  return isLeapYear(year) ? 29 : 28
}
