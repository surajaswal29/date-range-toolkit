import { getMonthsForYear } from '../constants/months';
import { RANGE_PRESETS } from '../constants/range-presets';
import { WEEKS } from '../constants/weeks';
import { IDateLabel, IDateRange, IRangePreset } from '../types';

export class PresetDateRangeService {
  private date: Date;
  private months = getMonthsForYear(new Date().getFullYear());

  constructor(date?: Date) {
    this.date = date || new Date();
    if (this.date.getFullYear() !== new Date().getFullYear()) {
      this.months = getMonthsForYear(this.date.getFullYear());
    }
  }

  public getRangePresets = () => RANGE_PRESETS;

  /**
   * Creates date labels for a given date range
   */
  private createDateLabels(fromDate: Date, toDate: Date): IDateLabel[] {
    const labels: IDateLabel[] = [];
    const currentDate = new Date(fromDate);
    const MS_PER_DAY = 86400000;

    while (currentDate <= toDate) {
      const dayOfWeek = currentDate.getDay();
      const month = this.months[currentDate.getMonth()];
      const week = WEEKS[dayOfWeek];

      labels.push({
        label: `${currentDate.getDate()} ${month.name}`,
        date: new Date(currentDate),
        dayName: week.name,
        dayAbbrev: week.shortName,
        monthName: month.name,
        monthAbbrev: month.abbreviation.type_1,
        isoDate: currentDate.toISOString().split('T')[0],
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
      });

      currentDate.setTime(currentDate.getTime() + MS_PER_DAY);
    }

    return labels;
  }

  /**
   * Calculates date range information for a given start and end date
   */
  private calculateDateRangeInfo(fromDate: Date, toDate: Date, rangeLabel: string): IDateRange {
    return {
      startDate: fromDate,
      endDate: toDate,
      labels: this.createDateLabels(fromDate, toDate),
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
    const fromDate = new Date(toDate.getTime() - (days - 1) * 86400000);
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
    return preset.unit === 'day'
      ? this.getLastNDays(preset.value, customLabel || preset.label)
      : this.getLastNMonths(preset.value, customLabel || preset.label);
  }

  /**
   * Gets date range by preset label
   * @param label The preset label to look up
   * @param customLabel Optional custom label for the range
   */
  public getRangeByPresetLabel(label: string, customLabel?: string): IDateRange {
    const preset = RANGE_PRESETS.find(p => p.label === label);
    if (!preset) throw new Error(`Preset not found: ${label}`);
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
