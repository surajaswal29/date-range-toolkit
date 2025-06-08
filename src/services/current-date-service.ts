import { IDateInfo } from '../types';
import { getMonthsForYear } from '../constants/months';
import { isLeapYear, padZero } from '../utils/dateUtils';
import { WEEKS } from '../constants/weeks';

export class CurrentDateService {
  private date: Date;
  private currentMonth: number;
  private currentYear: number;
  private months: ReturnType<typeof getMonthsForYear>;

  constructor(date?: Date) {
    this.date = date || new Date();
    this.currentMonth = this.date.getMonth();
    this.currentYear = this.date.getFullYear();
    this.months = getMonthsForYear(this.currentYear);
  }

  private getCurrentMonthData() {
    return this.months[this.currentMonth];
  }

  public getCurrentDateInfo(): IDateInfo {
    const monthData = this.getCurrentMonthData();
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);

    return {
      year: this.currentYear,
      month: padZero(this.currentMonth + 1),
      dayOfWeek: WEEKS[this.date.getDay()].name,
      dayOfMonth: this.date.getDate(),
      monthLength: monthData.daysInMonth,
      monthName: monthData.name,
      monthAbbreviation: monthData.abbreviation,
      quarter: monthData.quarter,
      firstDayOfMonth,
      lastDayOfMonth,
      isLeapYear: isLeapYear(this.currentYear),
      totalWeeksInMonth: Math.ceil((monthData.daysInMonth + firstDayOfMonth.getDay()) / 7),
    };
  }
}
