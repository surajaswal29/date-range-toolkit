import { isLeapYear } from './dateUtils';

/**
 * Validates if a given date string, Date object, or timestamp is a valid date
 * Handles edge cases like:
 * - Invalid date strings
 * - Leap years
 * - Invalid days for specific months
 * - Date range limits (1900-01-01 to 9999-12-31)
 *
 * @param date - The date to validate (can be string, Date object, or timestamp)
 * @returns {boolean} - True if the date is valid, false otherwise
 */
export function isValidDate(date: string | Date | number): boolean {
  try {
    // If it's a string, first check if it matches the expected format
    if (typeof date === 'string') {
      // Check if the date string matches YYYY-MM-DD format
      const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
      const match = date.match(dateRegex);
      if (match) {
        const [, yearStr, monthStr, dayStr] = match;
        const year = parseInt(yearStr, 10);
        const month = parseInt(monthStr, 10) - 1; // Convert to 0-based month
        const day = parseInt(dayStr, 10);

        // Check year range (1900-01-01 to 9999-12-31)
        if (year < 1900 || year > 9999) {
          return false;
        }

        // Check month range (1-12)
        if (month < 0 || month > 11) {
          return false;
        }

        // Array of days in each month (non-leap year)
        const daysInMonth: Record<number, number> = {
          0: 31, // January
          1: 28, // February
          2: 31, // March
          3: 30, // April
          4: 31, // May
          5: 30, // June
          6: 31, // July
          7: 31, // August
          8: 30, // September
          9: 31, // October
          10: 30, // November
          11: 31, // December
        };

        // Adjust February for leap years
        if (month === 1 && isLeapYear(year)) {
          daysInMonth[1] = 29;
        }

        // Check if the day is valid for the given month
        if (day < 1 || day > daysInMonth[month]) {
          return false;
        }

        // Create a date object and verify the components match
        const dateObj = new Date(year, month, day);
        return (
          dateObj.getFullYear() === year &&
          dateObj.getMonth() === month &&
          dateObj.getDate() === day
        );
      }
    }

    // For Date objects and timestamps
    const dateToValidate = date instanceof Date ? new Date(date) : new Date(date);

    // Check if the date is invalid
    if (isNaN(dateToValidate.getTime())) {
      return false;
    }

    // Extract date components
    const year = dateToValidate.getFullYear();
    const month = dateToValidate.getMonth();
    const day = dateToValidate.getDate();

    // Check year range (1900-01-01 to 9999-12-31)
    if (year < 1900 || year > 9999) {
      return false;
    }

    // Array of days in each month (non-leap year)
    const daysInMonth: Record<number, number> = {
      0: 31, // January
      1: 28, // February
      2: 31, // March
      3: 30, // April
      4: 31, // May
      5: 30, // June
      6: 31, // July
      7: 31, // August
      8: 30, // September
      9: 31, // October
      10: 30, // November
      11: 31, // December
    };

    // Adjust February for leap years
    if (isLeapYear(year)) {
      daysInMonth[1] = 29;
    }

    // Check if the day is valid for the given month
    return day > 0 && day <= daysInMonth[month];
  } catch (error) {
    return false;
  }
}
