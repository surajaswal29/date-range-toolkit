import { IPreviousDateInfo } from "../types";
import { MONTHS } from "../constants";
import { padZero } from "../utils/dateUtils";

export const getPreviousDateInfo = (): IPreviousDateInfo => {
  const date = new Date();
  const year = date.getFullYear();
  const currentMonth = date.getMonth();

  return {
    year: year - 1,
    month: padZero(currentMonth === 0 ? 12 : currentMonth),
    monthLength: MONTHS[currentMonth === 0 ? 11 : currentMonth - 1].daysInMonth,
    monthName: MONTHS[currentMonth === 0 ? 11 : currentMonth - 1].name,
  };
};
