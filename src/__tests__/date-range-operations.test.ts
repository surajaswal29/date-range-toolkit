import { DateRangeToolkit } from '../core/DateRangeToolkit';

describe('DateRangeToolkit Date Range Operations', () => {
  const fixedDate = new Date('2024-03-15'); // Friday, March 15, 2024
  let toolkit: DateRangeToolkit;

  beforeEach(() => {
    toolkit = new DateRangeToolkit(fixedDate);
  });

  describe('Last 7 Days Range', () => {
    it('should return correct last 7 days range', () => {
      const range = toolkit.getLast7Days();
      expect(range).toEqual({
        startDate: expect.any(Date),
        endDate: expect.any(Date),
        rangeLabel: 'Last 7 days',
        labels: expect.arrayContaining([
          expect.objectContaining({
            isWeekend: expect.any(Boolean),
            date: expect.any(Date),
            label: expect.any(String),
            dayName: expect.any(String),
            dayAbbrev: expect.any(String),
            monthName: expect.any(String),
            monthAbbrev: expect.any(String),
            isoDate: expect.any(String),
          }),
        ]),
      });
      expect(range.labels).toHaveLength(7);
      expect(range.startDate.getTime()).toBeLessThan(range.endDate.getTime());
    });

    it('should handle custom label in last 7 days range', () => {
      const customLabel = 'Custom 7 Days';
      const range = toolkit.getLast7Days(customLabel);
      expect(range.rangeLabel).toBe(customLabel);
    });

    it('should include correct weekend flags', () => {
      const range = toolkit.getLast7Days();
      const weekendDays = range.labels.filter(day => day.isWeekend);
      expect(weekendDays.length).toBe(2); // Should have 2 weekend days
    });

    it('should handle month transition in 7-day range', () => {
      const monthEndToolkit = new DateRangeToolkit('2024-04-02');
      const range = monthEndToolkit.getLast7Days();
      const hasLastMonth = range.labels.some(
        day => new Date(day.date).getMonth() === 2 // March (0-based)
      );
      expect(hasLastMonth).toBe(true);
    });
  });

  describe('Last 30 Days Range', () => {
    it('should return correct last 30 days range', () => {
      const range = toolkit.getLast30Days();
      expect(range.labels).toHaveLength(30);
      expect(range.startDate.getTime()).toBeLessThan(range.endDate.getTime());

      range.labels.forEach(label => {
        const date = new Date(label.date);
        const day = date.getDay();
        expect(label.isWeekend).toBe(day === 0 || day === 6);
      });
    });

    it('should handle year transition in 30-day range', () => {
      const yearStartToolkit = new DateRangeToolkit('2024-01-15');
      const range = yearStartToolkit.getLast30Days();
      const hasLastYear = range.labels.some(day => new Date(day.date).getFullYear() === 2023);
      expect(hasLastYear).toBe(true);
    });

    it('should have correct number of weekend days', () => {
      const range = toolkit.getLast30Days();
      const weekendDays = range.labels.filter(day => day.isWeekend);
      expect(weekendDays.length).toBeGreaterThanOrEqual(8); // At least 8 weekend days in 30 days
      expect(weekendDays.length).toBeLessThanOrEqual(10); // At most 10 weekend days in 30 days
    });
  });

  describe('Last 3 Months Range', () => {
    it('should return correct last 3 months range', () => {
      const range = toolkit.getLast3Months();
      const monthsDiff =
        range.endDate.getMonth() +
        12 * range.endDate.getFullYear() -
        (range.startDate.getMonth() + 12 * range.startDate.getFullYear());
      expect(monthsDiff).toBe(2); // Difference should be 2 (3 months inclusive)
    });

    it('should handle quarter boundaries', () => {
      const quarterStartToolkit = new DateRangeToolkit('2024-04-01');
      const range = quarterStartToolkit.getLast3Months();
      expect(range.labels[0].date.getMonth()).toBe(1); // February
      expect(range.labels[range.labels.length - 1].date.getMonth()).toBe(3); // April
    });

    it('should handle year transition in 3-month range', () => {
      const yearStartToolkit = new DateRangeToolkit('2024-02-15');
      const range = yearStartToolkit.getLast3Months();
      const hasLastYear = range.labels.some(day => new Date(day.date).getFullYear() === 2023);
      expect(hasLastYear).toBe(true);
    });
  });

  describe('Custom Range', () => {
    it('should return correct custom range', () => {
      const startDate = new Date('2024-03-01');
      const endDate = new Date('2024-03-15');
      const range = toolkit.getCustomRange(startDate, endDate, 'Custom Range');
      expect(range.labels).toHaveLength(15);

      let previousDate = new Date(range.labels[0].date).getTime();
      range.labels.slice(1).forEach(label => {
        const currentDate = new Date(label.date).getTime();
        expect(currentDate).toBeGreaterThan(previousDate);
        previousDate = currentDate;
      });
    });

    it('should handle invalid date ranges', () => {
      const startDate = new Date('2024-03-15');
      const endDate = new Date('2024-03-01');
      expect(() => toolkit.getCustomRange(startDate, endDate, 'Invalid Range')).toThrow(
        'End date must be greater than or equal to start date'
      );
    });

    it('should handle same start and end date', () => {
      const date = new Date('2024-03-15');
      const range = toolkit.getCustomRange(date, date, 'Single Day');
      expect(range.labels).toHaveLength(1);
      expect(range.startDate).toEqual(range.endDate);
    });

    it('should handle long date ranges', () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-12-31');
      const range = toolkit.getCustomRange(startDate, endDate, 'Full Year');
      expect(range.labels.length).toBe(366); // 2024 is a leap year
    });
  });

  describe('Edge Cases', () => {
    it('should handle DST transitions', () => {
      // US DST transition dates for 2024
      const dstStartToolkit = new DateRangeToolkit('2024-03-10');
      const dstEndToolkit = new DateRangeToolkit('2024-11-03');

      const springRange = dstStartToolkit.getLast7Days();
      const fallRange = dstEndToolkit.getLast7Days();

      expect(springRange.labels).toHaveLength(7);
      expect(fallRange.labels).toHaveLength(7);
    });

    it('should handle leap year day in ranges', () => {
      const leapYearToolkit = new DateRangeToolkit('2024-03-01');
      const range = leapYearToolkit.getLast7Days();
      const hasLeapDay = range.labels.some(day => day.isoDate === '2024-02-29');
      expect(hasLeapDay).toBe(true);
    });
  });
});
