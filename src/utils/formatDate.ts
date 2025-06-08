import { WEEKS } from "../constants";
import { MONTHS } from "../constants";
import { getQuarter, padZero } from "./dateUtils";

import { getWeekNumber } from "./dateUtils";

/**
 * Formats a date according to the specified format string
 * Supported tokens:
 * - YYYY: Full year (e.g., 2024)
 * - YY: Short year (e.g., 24)
 * - MMMM: Full month name (e.g., January)
 * - MMM: Short month name (e.g., Jan)
 * - MM: Month with leading zero (01-12)
 * - M: Month without leading zero (1-12)
 * - DDDD: Full day name (e.g., Monday)
 * - DDD: Short day name (e.g., Mon)
 * - DD: Day with leading zero (01-31)
 * - D: Day without leading zero (1-31)
 * - HH: Hours in 24h format (00-23)
 * - H: Hours in 24h format without leading zero (0-23)
 * - hh: Hours in 12h format (01-12)
 * - h: Hours in 12h format without leading zero (1-12)
 * - mm: Minutes with leading zero (00-59)
 * - m: Minutes without leading zero (0-59)
 * - ss: Seconds with leading zero (00-59)
 * - s: Seconds without leading zero (0-59)
 * - QQ: Quarter (01-04)
 * - Q: Quarter without leading zero (1-4)
 * - WW: Week number with leading zero (01-53)
 * - W: Week number without leading zero (1-53)
 * - a: am/pm marker
 * - A: AM/PM marker
 *
 * @param date - Date to format
 * @param format - Format string using the tokens above
 * @returns Formatted date string
 */
export const formatDate = (date: Date, format: string): string => {
  const hours12 = date.getHours() % 12 || 12;
  const ampm = date.getHours() >= 12 ? "pm" : "am";

  const tokens: { [key: string]: string } = {
    YYYY: date.getFullYear().toString(),
    YY: date.getFullYear().toString().slice(-2),
    MMMM: MONTHS[date.getMonth()].name,
    MMM: MONTHS[date.getMonth()].abbreviation.type_1,
    MM: padZero(date.getMonth() + 1),
    M: (date.getMonth() + 1).toString(),
    DDDD: WEEKS[date.getDay()],
    DDD: WEEKS[date.getDay()].slice(0, 3),
    DD: padZero(date.getDate()),
    D: date.getDate().toString(),
    HH: padZero(date.getHours()),
    H: date.getHours().toString(),
    hh: padZero(hours12),
    h: hours12.toString(),
    mm: padZero(date.getMinutes()),
    m: date.getMinutes().toString(),
    ss: padZero(date.getSeconds()),
    s: date.getSeconds().toString(),
    QQ: padZero(getQuarter(date)),
    Q: getQuarter(date).toString(),
    WW: padZero(getWeekNumber(date)),
    W: getWeekNumber(date).toString(),
    a: ampm,
    A: ampm.toUpperCase(),
  };

  // Sort tokens by length (longest first) to avoid partial replacements
  const sortedTokens = Object.entries(tokens).sort((a, b) => b[0].length - a[0].length);

  return sortedTokens.reduce((result, [token, value]) => {
    return result.replace(new RegExp(token, "g"), value);
  }, format);
};
