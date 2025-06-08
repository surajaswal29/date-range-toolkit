# API Reference

This page provides detailed documentation for all the APIs available in Date Range Toolkit.

## Table of Contents

- [Core Concepts](#core-concepts)
- [API Methods](#api-methods)
- [Type Definitions](#type-definitions)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)
- [Browser Support](#browser-support)

## Core Concepts

### Date Range

A date range consists of a start date and an end date. The library ensures that:

- Start date is always before or equal to the end date
- Dates are properly validated
- Time zones are handled correctly

### Preset Ranges

The library includes common preset ranges like:

- Today
- Yesterday
- Last 7 days
- Last 30 days
- This month
- Last month
- Custom range

## API Methods

### Creating Date Ranges

```typescript
// Create a custom date range
const range = dateRange.createRange(startDate, endDate);

// Get preset ranges
const today = dateRange.getToday();
const lastWeek = dateRange.getLastWeek();
const lastMonth = dateRange.getLastMonth();
```

### Date Manipulation

```typescript
// Add days to a date
const newDate = dateRange.addDays(date, numberOfDays);

// Subtract days from a date
const previousDate = dateRange.subtractDays(date, numberOfDays);

// Check if a date is within a range
const isWithin = dateRange.isDateInRange(date, range);
```

### Formatting

```typescript
// Format a date
const formatted = dateRange.format(date, 'YYYY-MM-DD');

// Parse a date string
const parsed = dateRange.parse('2024-03-20', 'YYYY-MM-DD');
```

### Validation

```typescript
// Validate a date range
const isValid = dateRange.isValidRange(range);

// Check if dates overlap
const overlaps = dateRange.doRangesOverlap(range1, range2);
```

### Utilities

```typescript
// Get the duration between dates
const duration = dateRange.getDuration(startDate, endDate);

// Get the difference in days
const days = dateRange.getDifferenceInDays(startDate, endDate);

// Check if dates are the same
const isSame = dateRange.isSameDate(date1, date2);
```

## Type Definitions

```typescript
interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface DurationResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type DateFormat = 'YYYY-MM-DD' | 'MM/DD/YYYY' | 'DD-MM-YYYY' | string;
```

## Error Handling

The library throws specific error types for different scenarios:

```typescript
try {
  const range = dateRange.createRange(invalidDate, endDate);
} catch (error) {
  if (error instanceof InvalidDateError) {
    // Handle invalid date error
  }
}
```

## Best Practices

1. Always validate date ranges before using them
2. Use type definitions for better TypeScript integration
3. Handle timezone differences explicitly when needed
4. Use the built-in formatting methods for consistent output
5. Implement proper error handling

## Browser Support

The library is compatible with all modern browsers and Node.js environments. It requires:

- ES6 support
- Node.js >= 16.0.0
