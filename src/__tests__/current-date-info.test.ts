import { DateRangeToolkit } from '../core/DateRangeToolkit';

describe('DateRangeToolkit Current Date Information', () => {
  const fixedDate = new Date('2024-03-15'); // Friday, March 15, 2024
  const leapYearDate = new Date('2024-02-29'); // Leap year date
  const yearEndDate = new Date('2024-12-31'); // Year end date
  let toolkit: DateRangeToolkit;

  beforeEach(() => {
    toolkit = new DateRangeToolkit(fixedDate);
  });

  it('should return correct current date info', () => {
    const info = toolkit.getCurrentDateInfo();
    expect(info).toEqual({
      year: 2024,
      month: '03',
      dayOfWeek: 'Friday',
      dayOfMonth: 15,
      monthLength: 31,
      monthName: 'March',
      monthAbbreviation: {
        type_1: 'Mar',
        type_2: 'MAR',
        type_3: 'mar',
      },
      quarter: 1,
      firstDayOfMonth: expect.any(Date),
      lastDayOfMonth: expect.any(Date),
      isLeapYear: true,
      totalWeeksInMonth: expect.any(Number),
    });
    expect(info.firstDayOfMonth.getDate()).toBe(1);
    expect(info.lastDayOfMonth.getDate()).toBe(31);
  });

  it('should handle leap year date correctly', () => {
    const leapToolkit = new DateRangeToolkit(leapYearDate);
    const info = leapToolkit.getCurrentDateInfo();
    expect(info).toEqual(
      expect.objectContaining({
        year: 2024,
        month: '02',
        monthLength: 29,
        isLeapYear: true,
      })
    );
  });

  it('should handle year end date correctly', () => {
    const yearEndToolkit = new DateRangeToolkit(yearEndDate);
    const info = yearEndToolkit.getCurrentDateInfo();
    expect(info).toEqual(
      expect.objectContaining({
        year: 2024,
        month: '12',
        dayOfMonth: 31,
        quarter: 4,
      })
    );
  });

  // Additional test cases
  it('should handle first day of the year', () => {
    const newYearToolkit = new DateRangeToolkit('2024-01-01');
    const info = newYearToolkit.getCurrentDateInfo();
    expect(info).toEqual(
      expect.objectContaining({
        year: 2024,
        month: '01',
        dayOfMonth: 1,
        quarter: 1,
      })
    );
  });

  it('should handle last day of each quarter', () => {
    const quarterEndDates = [
      { date: '2024-03-31', quarter: 1 },
      { date: '2024-06-30', quarter: 2 },
      { date: '2024-09-30', quarter: 3 },
      { date: '2024-12-31', quarter: 4 },
    ];

    quarterEndDates.forEach(({ date, quarter }) => {
      const quarterToolkit = new DateRangeToolkit(date);
      const info = quarterToolkit.getCurrentDateInfo();
      expect(info.quarter).toBe(quarter);
      expect(info.lastDayOfMonth.getDate()).toBe(new Date(date).getDate());
    });
  });

  it('should handle weekend days correctly', () => {
    const weekendDates = [
      { date: '2024-03-16', expectedDay: 'Saturday' },
      { date: '2024-03-17', expectedDay: 'Sunday' },
    ];

    weekendDates.forEach(({ date, expectedDay }) => {
      const weekendToolkit = new DateRangeToolkit(date);
      const info = weekendToolkit.getCurrentDateInfo();
      expect(info.dayOfWeek).toBe(expectedDay);
    });
  });

  it('should handle month transitions correctly', () => {
    const transitionDates = [
      { date: '2024-03-31', nextDate: '2024-04-01' },
      { date: '2024-12-31', nextDate: '2025-01-01' },
    ];

    transitionDates.forEach(({ date, nextDate }) => {
      const currentToolkit = new DateRangeToolkit(date);
      const nextToolkit = new DateRangeToolkit(nextDate);

      const currentInfo = currentToolkit.getCurrentDateInfo();
      const nextInfo = nextToolkit.getCurrentDateInfo();

      expect(currentInfo.lastDayOfMonth.getDate()).toBe(new Date(date).getDate());
      expect(nextInfo.firstDayOfMonth.getDate()).toBe(1);
    });
  });
});
