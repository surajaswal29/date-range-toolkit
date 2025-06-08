import { DateRangeToolkit } from '../core/DateRangeToolkit';

describe('DateRangeToolkit Utility Methods', () => {
  let toolkit: DateRangeToolkit;

  beforeEach(() => {
    toolkit = new DateRangeToolkit(new Date('2024-03-15'));
  });

  describe('Months Information', () => {
    it('should return all months with correct structure', () => {
      const months = toolkit.getMonths();
      expect(months).toHaveLength(12);
      months.forEach((month, index) => {
        expect(month).toEqual({
          id: index + 1,
          name: expect.any(String),
          abbreviation: {
            type_1: expect.any(String),
            type_2: expect.any(String),
            type_3: expect.any(String),
          },
          daysInMonth: expect.any(Number),
          quarter: expect.any(Number),
        });
        expect(month.daysInMonth).toBeGreaterThanOrEqual(28);
        expect(month.daysInMonth).toBeLessThanOrEqual(31);
        expect(month.quarter).toBeGreaterThanOrEqual(1);
        expect(month.quarter).toBeLessThanOrEqual(4);
      });
    });

    it('should return correct days in month for February in leap year', () => {
      const months = toolkit.getMonths();
      const february = months.find(m => m.id === 2);
      expect(february?.daysInMonth).toBe(29); // 2024 is a leap year
    });

    it('should return month labels in correct order', () => {
      const labels = toolkit.getMonthsLabels();
      expect(labels).toEqual([
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]);
    });

    it('should have correct month abbreviations', () => {
      const months = toolkit.getMonths();
      const march = months.find(m => m.id === 3);
      expect(march?.abbreviation).toEqual({
        type_1: 'Mar',
        type_2: 'MAR',
        type_3: 'mar',
      });
    });

    it('should assign correct quarters to months', () => {
      const months = toolkit.getMonths();
      const quarterAssignments = [
        { monthIds: [1, 2, 3], quarter: 1 },
        { monthIds: [4, 5, 6], quarter: 2 },
        { monthIds: [7, 8, 9], quarter: 3 },
        { monthIds: [10, 11, 12], quarter: 4 },
      ];

      quarterAssignments.forEach(({ monthIds, quarter }) => {
        monthIds.forEach(id => {
          const month = months.find(m => m.id === id);
          expect(month?.quarter).toBe(quarter);
        });
      });
    });
  });

  describe('Weeks Information', () => {
    it('should return all weeks with correct structure', () => {
      const weeks = toolkit.getWeeks();
      expect(weeks).toHaveLength(7);
      weeks.forEach((week, index) => {
        expect(week).toEqual({
          id: index,
          name: expect.any(String),
          shortName: expect.any(String),
        });
      });
    });

    it('should return week labels in correct order', () => {
      const labels = toolkit.getWeeksLabels();
      expect(labels).toEqual([
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ]);
    });

    it('should have consistent week day names and short names', () => {
      const weeks = toolkit.getWeeks();
      weeks.forEach(week => {
        expect(week.shortName.length).toBeLessThan(week.name.length);
        expect(week.name.toLowerCase().startsWith(week.shortName.toLowerCase())).toBe(true);
      });
    });

    it('should have unique week IDs', () => {
      const weeks = toolkit.getWeeks();
      const ids = weeks.map(week => week.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(weeks.length);
    });
  });

  describe('Presets', () => {
    it('should return valid presets', () => {
      const presets = toolkit.getPresets();
      expect(presets.length).toBeGreaterThan(0);
      presets.forEach(preset => {
        expect(preset).toEqual({
          label: expect.any(String),
          value: expect.any(Number),
          unit: expect.stringMatching(/^(day|week|month|year)$/),
        });
        expect(preset.value).toBeGreaterThan(0);
      });
    });

    it('should have unique preset labels', () => {
      const presets = toolkit.getPresets();
      const labels = presets.map(preset => preset.label);
      const uniqueLabels = new Set(labels);
      expect(uniqueLabels.size).toBe(presets.length);
    });

    it('should have valid unit values', () => {
      const validUnits = ['day', 'week', 'month', 'year'];
      const presets = toolkit.getPresets();
      presets.forEach(preset => {
        expect(validUnits).toContain(preset.unit);
      });
    });

    it('should have reasonable preset values', () => {
      const presets = toolkit.getPresets();
      presets.forEach(preset => {
        switch (preset.unit) {
          case 'day':
            expect(preset.value).toBeLessThanOrEqual(90); // Max 90 days
            break;
          case 'week':
            expect(preset.value).toBeLessThanOrEqual(52); // Max 52 weeks
            break;
          case 'month':
            expect(preset.value).toBeLessThanOrEqual(12); // Max 12 months
            break;
          case 'year':
            expect(preset.value).toBeLessThanOrEqual(5); // Max 5 years
            break;
        }
      });
    });
  });

  describe('Date Formatting', () => {
    it('should format dates consistently', () => {
      const info = toolkit.getCurrentDateInfo();

      expect(info.monthName).toBe('March');
      expect(info.monthAbbreviation.type_1).toBe('Mar');
      expect(info.dayOfWeek).toBe('Friday');
      expect(info.month).toBe('03');
      expect(info.dayOfMonth).toBe(15);
    });

    it('should handle different date formats', () => {
      const dates = [
        '2024-03-15',
        '2024/03/15',
        '03-15-2024',
        '03/15/2024',
        new Date('2024-03-15').toISOString(),
      ];

      dates.forEach(date => {
        const dateToolkit = new DateRangeToolkit(date);
        const info = dateToolkit.getCurrentDateInfo();
        expect(info.year).toBe(2024);
        expect(info.month).toBe('03');
        expect(info.dayOfMonth).toBe(15);
      });
    });
  });
});
