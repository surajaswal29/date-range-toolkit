import { IMonth, IDateInfo } from "../types";
import { MONTHS } from "../constants/months";
import { padZero, getWeekNumber, isLeapYear } from "../utils/dateUtils";
import { WEEKS } from "../constants/weeks";

export class PreviousDateService {
  private date: Date;
  private currentMonth: number;
  private currentYear: number;
  private previousMonth: number;
  private previousYear: number;

  constructor(date?: Date) {
    this.date = date || new Date();
    this.currentMonth = this.date.getMonth();
    this.currentYear = this.date.getFullYear();
    this.previousMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
    this.previousYear = this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
  }

  private getPreviousMonthData(): IMonth {
    return MONTHS[this.previousMonth];
  }

  public getPreviousDateInfo(): IDateInfo {
    const previousMonthData = this.getPreviousMonthData();
    const firstDayOfPreviousMonth = new Date(this.previousYear, this.previousMonth, 1);
    const lastDayOfPreviousMonth = new Date(this.previousYear, this.previousMonth + 1, 0);

    return {
      year: this.previousYear,
      month: padZero(this.previousMonth + 1),
      dayOfWeek: WEEKS[this.date.getDay()].name,
      dayOfMonth: this.date.getDate(),
      monthLength: previousMonthData.daysInMonth,
      monthName: previousMonthData.name,
      monthAbbreviation: previousMonthData.abbreviation,
      quarter: previousMonthData.quarter,
      firstDayOfMonth: firstDayOfPreviousMonth,
      lastDayOfMonth: lastDayOfPreviousMonth,
      isLeapYear: isLeapYear(this.previousYear),
      weekNumber: getWeekNumber(lastDayOfPreviousMonth),
      totalWeeksInMonth: Math.ceil(
        (previousMonthData.daysInMonth + firstDayOfPreviousMonth.getDay()) / 7,
      ),
    };
  }
}
