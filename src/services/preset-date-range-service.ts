import { getMonthsForYear } from '../constants/months';
import { RANGE_PRESETS } from '../constants/range-presets';
import { WEEKS } from '../constants/weeks';
import { IDateLabel, IDateRange, IRangePreset } from '../types';

export class PresetDateRangeService {
  private date: Date;
  private months: ReturnType<typeof getMonthsForYear>;

  constructor(date?: Date) {
    this.date = date || new Date();
    this.months = getMonthsForYear(this.date.getFullYear());
  }

  public getRangePresets(): IRangePreset[] {
    return RANGE_PRESETS;
  }

  /**
   * Creates date labels for a given date range
   */
  private createDateLabels(fromDate: Date, toDate: Date): IDateLabel[] {
    const labels: IDateLabel[] = [];
    const currentDate = new Date(fromDate);

    while (currentDate <= toDate) {
      const dayOfWeek = currentDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const currentYear = currentDate.getFullYear();

      // Get months for the current year if it's different from the instance year
      if (currentYear !== this.date.getFullYear()) {
        this.months = getMonthsForYear(currentYear);
      }

      const month = this.months[currentDate.getMonth()];

      labels.push({
        label: `${currentDate.getDate()} ${month.name}`,
        date: new Date(currentDate),
        dayName: WEEKS[dayOfWeek].name,
        dayAbbrev: WEEKS[dayOfWeek].shortName,
        monthName: month.name,
        monthAbbrev: month.abbreviation.type_1,
        isoDate: currentDate.toISOString().split('T')[0],
        isWeekend,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return labels;
  }

  /**
   * Calculates date range information for a given start and end date
   */
  private calculateDateRangeInfo(fromDate: Date, toDate: Date, rangeLabel: string): IDateRange {
    const labels = this.createDateLabels(fromDate, toDate);
    return {
      startDate: fromDate,
      endDate: toDate,
      labels: labels,
      rangeLabel,
    };
  }

  /**
   * Gets the last N days date range
   * @param days Number of days to include in the range
   * @param customLabel Optional custom label for the range
   */
  public getLastNDays(days: number, customLabel?: string): IDateRange {
    const toDate = new Date(this.date);
    const fromDate = new Date(toDate);
    fromDate.setTime(toDate.getTime() - (days - 1) * 24 * 60 * 60 * 1000);
    return this.calculateDateRangeInfo(fromDate, toDate, customLabel || `Last ${days} days`);
  }

  /**
   * Gets the last N months date range
   * @param months Number of months to include in the range
   * @param customLabel Optional custom label for the range
   */
  public getLastNMonths(months: number, customLabel?: string): IDateRange {
    const toDate = new Date(this.date);
    const fromDate = new Date(this.date);
    fromDate.setMonth(toDate.getMonth() - (months - 1));
    return this.calculateDateRangeInfo(fromDate, toDate, customLabel || `Last ${months} months`);
  }

  /**
   * Gets date range based on a preset configuration
   * @param preset The preset configuration to use
   * @param customLabel Optional custom label for the range
   */
  public getPresetRange(preset: IRangePreset, customLabel?: string): IDateRange {
    switch (preset.unit) {
      case 'day':
        return this.getLastNDays(preset.value, customLabel || preset.label);
      case 'month':
        return this.getLastNMonths(preset.value, customLabel || preset.label);
      default:
        throw new Error(`Unsupported preset unit: ${preset.unit}`);
    }
  }

  /**
   * Gets date range by preset label
   * @param label The preset label to look up
   * @param customLabel Optional custom label for the range
   */
  public getRangeByPresetLabel(label: string, customLabel?: string): IDateRange {
    const preset = RANGE_PRESETS.find(p => p.label === label);
    if (!preset) {
      throw new Error(`Preset not found: ${label}`);
    }
    return this.getPresetRange(preset, customLabel);
  }

  /**
   * Gets a custom date range with a specified label
   * @param fromDate Start date of the range
   * @param toDate End date of the range
   * @param customLabel Label for the range
   */
  public getCustomRange(fromDate: Date, toDate: Date, customLabel: string): IDateRange {
    return this.calculateDateRangeInfo(fromDate, toDate, customLabel);
  }
}
