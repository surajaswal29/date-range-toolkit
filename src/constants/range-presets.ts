import { IRangePreset } from '../types';

export const RANGE_PRESETS: IRangePreset[] = [
  {
    label: 'Last 7 days',
    value: 7,
    unit: 'day',
  },
  {
    label: 'Last 30 days',
    value: 30,
    unit: 'day',
  },
  {
    label: 'Last 3 months',
    value: 3,
    unit: 'month',
  },
  {
    label: 'Last 6 months',
    value: 6,
    unit: 'month',
  },
  {
    label: 'Last 12 months',
    value: 12,
    unit: 'month',
  },
];
