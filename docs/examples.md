# Examples

This page provides practical examples of using Date Range Toolkit in various scenarios.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Working with Preset Ranges](#working-with-preset-ranges)
- [Custom Date Ranges](#custom-date-ranges)
- [Date Formatting](#date-formatting)
- [Date Calculations](#date-calculations)
- [Integration Examples](#integration-examples)

## Basic Usage

### Initialize the Library

```typescript
import { DateRangeToolkit } from '@date-range/toolkit';

const dateRange = new DateRangeToolkit();
```

### Simple Date Range Creation

```typescript
// Create a date range for the current week
const today = new Date();
const weekRange = dateRange.createRange(dateRange.startOfWeek(today), dateRange.endOfWeek(today));

// Check if a date falls within the range
const isInRange = dateRange.isDateInRange(new Date(), weekRange);
```

## Working with Preset Ranges

### Get Common Date Ranges

```typescript
// Get today's range
const todayRange = dateRange.getToday();
console.log(todayRange);
// Output: { startDate: 2024-03-20T00:00:00.000Z, endDate: 2024-03-20T23:59:59.999Z }

// Get last 7 days
const lastWeek = dateRange.getLastNDays(7);
console.log(lastWeek);
// Output: Range from 7 days ago to today

// Get current month
const thisMonth = dateRange.getCurrentMonth();
console.log(thisMonth);
// Output: Range from first day to last day of current month
```

### Custom Preset Ranges

```typescript
// Create a custom preset for last quarter
const lastQuarter = dateRange.createCustomPreset({
  name: 'Last Quarter',
  getRangeFn: () => {
    const today = new Date();
    const startDate = dateRange.subtractMonths(today, 3);
    return dateRange.createRange(startDate, today);
  },
});

// Use the custom preset
const quarterRange = lastQuarter.getRangeFn();
```

## Custom Date Ranges

### Working with Specific Dates

```typescript
// Create a range between specific dates
const startDate = new Date('2024-01-01');
const endDate = new Date('2024-12-31');
const yearRange = dateRange.createRange(startDate, endDate);

// Validate the range
if (dateRange.isValidRange(yearRange)) {
  console.log('Valid year range!');
}
```

### Range Manipulation

```typescript
// Extend a range by days
const extendedRange = dateRange.extendRange(yearRange, 5);

// Shrink a range
const shrunkRange = dateRange.shrinkRange(yearRange, 5);

// Split a range into months
const monthlyRanges = dateRange.splitRangeByMonth(yearRange);
```

## Date Formatting

### Different Format Options

```typescript
const date = new Date('2024-03-20');

// Basic formatting
console.log(dateRange.format(date, 'YYYY-MM-DD'));
// Output: 2024-03-20

// Custom formatting
console.log(dateRange.format(date, 'DD/MM/YYYY'));
// Output: 20/03/2024

// With time
console.log(dateRange.format(date, 'YYYY-MM-DD HH:mm:ss'));
// Output: 2024-03-20 00:00:00
```

## Date Calculations

### Duration Calculations

```typescript
// Calculate duration between dates
const duration = dateRange.getDuration(new Date('2024-03-01'), new Date('2024-03-20'));
console.log(duration);
// Output: { days: 19, hours: 0, minutes: 0, seconds: 0 }

// Get business days
const businessDays = dateRange.getBusinessDays(new Date('2024-03-01'), new Date('2024-03-20'));
console.log(businessDays);
// Output: Number of business days excluding weekends
```

## Integration Examples

### React Component Example

```typescript
import React, { useState } from 'react';
import { DateRangeToolkit } from '@date-range/toolkit';

const DateRangePicker: React.FC = () => {
  const dateRange = new DateRangeToolkit();
  const [range, setRange] = useState(dateRange.getToday());

  const handlePresetClick = (preset: string) => {
    switch (preset) {
      case 'today':
        setRange(dateRange.getToday());
        break;
      case 'week':
        setRange(dateRange.getLastNDays(7));
        break;
      case 'month':
        setRange(dateRange.getCurrentMonth());
        break;
    }
  };

  return (
    <div>
      <button onClick={() => handlePresetClick('today')}>Today</button>
      <button onClick={() => handlePresetClick('week')}>Last 7 Days</button>
      <button onClick={() => handlePresetClick('month')}>This Month</button>

      <div>
        Selected Range:
        {dateRange.format(range.startDate, 'YYYY-MM-DD')} to
        {dateRange.format(range.endDate, 'YYYY-MM-DD')}
      </div>
    </div>
  );
};

export default DateRangePicker;
```

### Vue.js Component Example

```typescript
<template>
  <div>
    <button @click="handlePresetClick('today')">Today</button>
    <button @click="handlePresetClick('week')">Last 7 Days</button>
    <button @click="handlePresetClick('month')">This Month</button>

    <div>
      Selected Range:
      {{ formatDate(range.startDate) }} to {{ formatDate(range.endDate) }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { DateRangeToolkit } from '@date-range/toolkit';

export default defineComponent({
  setup() {
    const dateRange = new DateRangeToolkit();
    const range = ref(dateRange.getToday());

    const handlePresetClick = (preset: string) => {
      switch (preset) {
        case 'today':
          range.value = dateRange.getToday();
          break;
        case 'week':
          range.value = dateRange.getLastNDays(7);
          break;
        case 'month':
          range.value = dateRange.getCurrentMonth();
          break;
      }
    };

    const formatDate = (date: Date) => {
      return dateRange.format(date, 'YYYY-MM-DD');
    };

    return {
      range,
      handlePresetClick,
      formatDate,
    };
  },
});
</script>
```

For more specific examples or advanced usage, please refer to the [API Reference](./api-reference.md) or open an issue on GitHub.
