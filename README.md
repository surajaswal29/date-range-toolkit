# 📅 Date Range Toolkit

[![CI](https://github.com/surajaswal29/date-range-tk/actions/workflows/ci.yml/badge.svg)](https://github.com/surajaswal29/date-range-tk/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/date-range-tk.svg)](https://badge.fury.io/js/date-range-tk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![npm downloads](https://img.shields.io/npm/dm/date-range-tk.svg)](https://www.npmjs.com/package/date-range-tk)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/date-range-tk)](https://bundlephobia.com/package/date-range-tk)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)
[![codecov](https://codecov.io/gh/surajaswal29/date-range-tk/branch/main/graph/badge.svg)](https://codecov.io/gh/surajaswal29/date-range-tk)

A lightweight, zero-dependency TypeScript library for effortlessly managing date ranges in your applications. Whether you need preset ranges like "Last 7 Days" or custom date ranges with full TypeScript support, Date Range Toolkit has got you covered.

## 🤔 Why Date Range Toolkit?

Working with date ranges in JavaScript/TypeScript applications often involves:

- 📝 Writing repetitive code for common date range calculations
- 🐛 Dealing with edge cases and timezone issues
- 🔄 Managing different date formats and conversions
- 🏗️ Building custom utilities for each project
- ⚠️ Handling date manipulation without introducing bugs

Date Range Toolkit solves these challenges by providing:

- 🎯 A clean, intuitive API for common date range operations
- ✨ Pre-built, tested solutions for common date range scenarios
- 🔒 Type-safe implementations to prevent runtime errors
- 🚀 Zero dependencies to keep your bundle size small
- 🔄 Extensible architecture for custom requirements

## 💡 Use Cases

- **Analytics Dashboards**: Implement date range filters (Last 7 days, Last month, Custom range), generate time series data points, create consistent date range presets across different views

- **Financial Applications**: Calculate fiscal quarters and year-to-date ranges, generate monthly/quarterly reports, handle business day calculations

- **Booking Systems**: Manage reservation date ranges, calculate availability windows, handle check-in/check-out date logic

- **Content Management**: Schedule content publication windows, manage campaign durations, track content validity periods

- **E-commerce**: Handle sale period calculations, manage promotion timeframes, calculate delivery windows

- **Project Management**: Track sprint durations, calculate project timelines, manage milestone dates

- **Data Visualization**: Generate consistent date range labels, create time-based chart axes, handle data grouping by time periods

## ✨ Features

- 🎯 **Preset Date Ranges**
  - Last 7 days
  - Last 30 days
  - Last 3 months
  - Last 6 months
  - Last 12 months
- 📊 **Rich Date Information**
  - Full month details (name, abbreviations in 3 formats, days count, quarter)
  - Week information (full name, abbreviation)
  - Date labels with weekend detection
- 📅 **Comprehensive Date Utilities**
  - Month information with multiple abbreviation formats (Title Case, UPPERCASE, lowercase)
  - Week day information with full and short names
  - Quarter information
  - Leap year detection
  - First/Last day of month
- 💪 **TypeScript First** - Built with TypeScript for excellent type safety and IDE support
- 🪶 **Zero Dependencies** - Lightweight and efficient
- 🔒 **Type Safe** - Comprehensive type definitions for all features

## 📦 Installation

Using npm:

```bash
npm install date-range-tk
```

Using yarn:

```bash
yarn add date-range-tk
```

Using pnpm:

```bash
pnpm add date-range-tk
```

## 📊 Bundle Size

The library is optimized for size and performance:

- ESM build (index.esm.js): ~1.83 kB
- CommonJS build (index.cjs): ~1.91 kB
- IIFE build (index.global.js): ~1.89 kB

All builds are minified, tree-shakeable, and brotli-compressed for optimal delivery!

## 🔌 Module Format Support

### ESM (ECMAScript Modules)

```javascript
import { createDateRangeToolkit } from 'date-range-tk';

const toolkit = createDateRangeToolkit();
const last7Days = toolkit.getLast7Days();
```

### CommonJS

```javascript
const { createDateRangeToolkit } = require('date-range-tk');

const toolkit = createDateRangeToolkit();
const last7Days = toolkit.getLast7Days();
```

### Browser via CDN (Global/IIFE)

```html
<!-- Add this in your HTML -->
<script src="https://unpkg.com/date-range-tk/dist/index.global.js"></script>

<script>
  // The library is available as 'DateRangeToolkit'
  const toolkit = DateRangeToolkit.createDateRangeToolkit();
  const last7Days = toolkit.getLast7Days();
</script>
```

### TypeScript

```typescript
import { createDateRangeToolkit, IDateRange } from 'date-range-tk';

const toolkit = createDateRangeToolkit();
const range: IDateRange = toolkit.getLast7Days();
```

## 📚 Detailed Usage Examples

### ESM in Modern Environments

```javascript
// Named imports - recommended for tree-shaking
import { createDateRangeToolkit, formatDate } from 'date-range-tk';

// Import specific types (in TypeScript)
import type { IDateRange, DateRangePreset } from 'date-range-tk';

// Example with React and tree-shaking
import { createDateRangeToolkit, formatDate } from 'date-range-tk';
import { useState, useEffect } from 'react';

function DateRangePicker() {
  const [range, setRange] = useState(null);
  const toolkit = createDateRangeToolkit();

  useEffect(() => {
    // Only the used methods will be included in the bundle
    const last7Days = toolkit.getLast7Days();
    const formattedStart = formatDate(last7Days.startDate, 'YYYY-MM-DD');
    setRange(last7Days);
  }, []);

  return (
    <div>
      <span>Start: {range?.startDate.toISOString()}</span>
      <span>End: {range?.endDate.toISOString()}</span>
    </div>
  );
}
```

### CommonJS in Node.js

```javascript
// Require the entire library
const DateRangeToolkit = require('date-range-tk');

// Or destructure specific functions
const { createDateRangeToolkit, formatDate } = require('date-range-tk');

// Example with Express.js
const express = require('express');
const { createDateRangeToolkit } = require('date-range-tk');

const app = express();
const toolkit = createDateRangeToolkit();

app.get('/api/dateranges/last-week', (req, res) => {
  const range = toolkit.getLast7Days();
  res.json({
    startDate: range.startDate.toISOString(),
    endDate: range.endDate.toISOString(),
  });
});
```

### Browser (UMD) with Different Loading Strategies

```html
<!-- Option 1: Load from CDN -->
<script src="https://unpkg.com/date-range-tk/dist/index.global.js"></script>

<!-- Option 2: Load from specific version -->
<script src="https://unpkg.com/date-range-tk@1.0.0/dist/index.global.js"></script>

<!-- Option 3: Load with async/defer -->
<script async defer src="https://unpkg.com/date-range-tk/dist/index.global.js"></script>

<script>
  // Wait for load if using async
  window.addEventListener('load', () => {
    const toolkit = DateRangeToolkit.createDateRangeToolkit();

    // Basic usage
    const last7Days = toolkit.getLast7Days();

    // Update UI
    document.getElementById('startDate').textContent = last7Days.startDate.toLocaleDateString();
    document.getElementById('endDate').textContent = last7Days.endDate.toLocaleDateString();

    // Handle user interactions
    document.getElementById('rangePicker').addEventListener('change', event => {
      const preset = event.target.value;
      let range;

      switch (preset) {
        case '7days':
          range = toolkit.getLast7Days();
          break;
        case '30days':
          range = toolkit.getLast30Days();
          break;
        case 'quarter':
          range = toolkit.getLastQuarter();
          break;
      }

      updateDateDisplay(range);
    });
  });
</script>
```

### TypeScript with Full Type Safety

```typescript
import {
  createDateRangeToolkit,
  type IDateRange,
  type DateRangePreset,
  type DateFormat,
} from 'date-range-tk';

// Create strongly-typed custom preset
interface CustomDateRange extends IDateRange {
  label: string;
  color?: string;
}

class DateRangeManager {
  private toolkit = createDateRangeToolkit();
  private activeRange: IDateRange | null = null;

  constructor(initialDate?: Date | string) {
    if (initialDate) {
      this.toolkit = createDateRangeToolkit(initialDate);
    }
  }

  public getRange(preset: DateRangePreset): CustomDateRange {
    let range: IDateRange;

    switch (preset) {
      case 'LAST_7_DAYS':
        range = this.toolkit.getLast7Days();
        return { ...range, label: 'Last 7 Days', color: '#007bff' };
      case 'LAST_30_DAYS':
        range = this.toolkit.getLast30Days();
        return { ...range, label: 'Last 30 Days', color: '#28a745' };
      default:
        throw new Error(`Unsupported preset: ${preset}`);
    }
  }

  public setCustomRange(startDate: Date, endDate: Date): void {
    this.activeRange = this.toolkit.getCustomRange(startDate, endDate);
  }
}
```

## 🌟 Best Practices for Different Environments

### Modern Web Applications (React, Vue, Angular)

```typescript
// 1. Use named imports for better tree-shaking
import { createDateRangeToolkit } from 'date-range-tk';

// 2. Create a singleton instance if used across components
// dateService.ts
export const dateToolkit = createDateRangeToolkit();

// 3. Use in components
import { dateToolkit } from './dateService';
import type { IDateRange } from 'date-range-tk';

function MyComponent() {
  const range: IDateRange = dateToolkit.getLast7Days();
  // ...
}
```

### Node.js Applications

```javascript
// 1. Use CommonJS require at the top level
const { createDateRangeToolkit } = require('date-range-tk');

// 2. Initialize once and reuse
const toolkit = createDateRangeToolkit();
module.exports = toolkit;

// 3. Handle timezone considerations
const toolkit = createDateRangeToolkit({
  timezone: 'UTC', // if working with specific timezone
});
```

### Browser Applications

```html
<!-- 1. Load in the <head> with defer for better performance -->
<head>
  <script defer src="https://unpkg.com/date-range-tk/dist/index.global.js"></script>
</head>

<!-- 2. Version pinning for stability -->
<script src="https://unpkg.com/date-range-tk@1.0.0/dist/index.global.js"></script>

<!-- 3. Local fallback for offline support -->
<script>
  function loadDateRangeToolkit() {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/date-range-tk/dist/index.global.js';
    script.onerror = () => {
      // Fallback to local copy
      script.src = '/assets/js/date-range-tk.global.js';
    };
    document.head.appendChild(script);
  }
</script>
```

### Build Tools (Webpack, Rollup, Vite)

```javascript
// webpack.config.js
module.exports = {
  // ... other config
  resolve: {
    mainFields: ['module', 'main'], // Prefer ESM version
  },
  optimization: {
    usedExports: true, // Enable tree-shaking
  },
};

// vite.config.js
export default {
  optimizeDeps: {
    include: ['date-range-tk'], // Pre-bundle for better performance
  },
};
```

## 🚀 Quick Start

```typescript
import { createDateRangeToolkit } from 'date-range-tk';

// Create a toolkit instance
const toolkit = createDateRangeToolkit();

// Get a preset range
const last7Days = toolkit.getLast7Days();
console.log(last7Days);
/* Output:
{
  startDate: Date,
  endDate: Date,
  rangeLabel: "Last 7 days",
  labels: [
    {
      label: "1 Jan",
      date: "2024-01-01",
      dayName: "Monday",
      dayAbbrev: "Mon",
      monthName: "January",
      monthAbbrev: "Jan",
      isoDate: "2024-01-01",
      isWeekend: false
    },
    // ... more dates
  ]
}
*/

// Get month information
const months = toolkit.getMonths();
/* Output example:
{
  id: 1,
  name: "January",
  abbreviation: {
    type_1: "Jan",  // Title Case
    type_2: "JAN",  // UPPERCASE
    type_3: "jan"   // lowercase
  },
  daysInMonth: 31,
  quarter: 1
}
*/

// Get week information
const weeks = toolkit.getWeeks();
/* Output example:
{
  id: 0,
  name: "Sunday",
  shortName: "Sun"
}
*/

// Get detailed date information
const dateInfo = toolkit.getDateInfo(new Date());
/* Output:
{
  year: 2024,
  month: "01",
  dayOfWeek: "Monday",
  dayOfMonth: 1,
  monthLength: 31,
  monthName: "January",
  monthAbbreviation: {
    type_1: "Jan",
    type_2: "JAN",
    type_3: "jan"
  },
  quarter: 1,
  firstDayOfMonth: Date,
  lastDayOfMonth: Date,
  isLeapYear: true,
  totalWeeksInMonth: 5
}
*/
```

## 📘 Usage Examples

### Working with Preset Ranges

```typescript
import { createDateRangeToolkit } from 'date-range-tk';

const toolkit = createDateRangeToolkit();

// Available preset ranges
const last7Days = toolkit.getLast7Days();
const last30Days = toolkit.getLast30Days();
const last3Months = toolkit.getLast3Months();
const last6Months = toolkit.getLast6Months();
const last12Months = toolkit.getLast12Months();

// Each range includes:
console.log(last7Days);
/*
{
  startDate: Date,
  endDate: Date,
  rangeLabel: "Last 7 days",
  labels: [
    {
      label: "1 Jan",
      date: Date,
      dayName: "Monday",
      dayAbbrev: "Mon",
      monthName: "January",
      monthAbbrev: "Jan",
      isoDate: "2024-01-01",
      isWeekend: false
    },
    // ... more dates
  ]
}
*/
```

### Working with Month Information

```typescript
import { createDateRangeToolkit } from 'date-range-tk';

const toolkit = createDateRangeToolkit();

// Get months for current year
const months = toolkit.getMonths();

// Get months for specific year (handles leap years)
const months2024 = toolkit.getMonths(2024);

// Month information includes:
console.log(months[0]);
/*
{
  id: 1,
  name: "January",
  abbreviation: {
    type_1: "Jan",  // Title Case
    type_2: "JAN",  // UPPERCASE
    type_3: "jan"   // lowercase
  },
  daysInMonth: 31,
  quarter: 1
}
*/
```

### Working with Week Information

```typescript
import { createDateRangeToolkit } from 'date-range-tk';

const toolkit = createDateRangeToolkit();

// Get week information
const weeks = toolkit.getWeeks();

console.log(weeks);
/*
[
  { id: 0, name: "Sunday", shortName: "Sun" },
  { id: 1, name: "Monday", shortName: "Mon" },
  { id: 2, name: "Tuesday", shortName: "Tue" },
  { id: 3, name: "Wednesday", shortName: "Wed" },
  { id: 4, name: "Thursday", shortName: "Thu" },
  { id: 5, name: "Friday", shortName: "Fri" },
  { id: 6, name: "Saturday", shortName: "Sat" }
]
*/
```

### Getting Detailed Date Information

```typescript
import { createDateRangeToolkit } from 'date-range-tk';

const toolkit = createDateRangeToolkit();

// Get comprehensive information about a date
const dateInfo = toolkit.getDateInfo(new Date());

console.log(dateInfo);
/*
{
  year: 2024,
  month: "01",
  dayOfWeek: "Monday",
  dayOfMonth: 1,
  monthLength: 31,
  monthName: "January",
  monthAbbreviation: {
    type_1: "Jan",
    type_2: "JAN",
    type_3: "jan"
  },
  quarter: 1,
  firstDayOfMonth: Date,
  lastDayOfMonth: Date,
  isLeapYear: true,
  totalWeeksInMonth: 5
}
*/
```

## 📚 API Reference

### Factory Function

| Function                        | Description                    | Parameters                        | Return Type        |
| ------------------------------- | ------------------------------ | --------------------------------- | ------------------ |
| `createDateRangeToolkit(date?)` | Creates a new toolkit instance | `date?: string \| Date \| number` | `DateRangeToolkit` |

### Date Range Methods

| Method                       | Description                          | Return Type  |
| ---------------------------- | ------------------------------------ | ------------ |
| `getLast7Days()`             | Returns date range for last 7 days   | `IDateRange` |
| `getLast30Days()`            | Returns date range for last 30 days  | `IDateRange` |
| `getLastQuarter()`           | Returns date range for last quarter  | `IDateRange` |
| `getYearToDate()`            | Returns range from year start to now | `IDateRange` |
| `getCustomRange(start, end)` | Returns custom date range            | `IDateRange` |

### Utility Methods

| Method                 | Description                  | Return Type          |
| ---------------------- | ---------------------------- | -------------------- |
| `getMonths()`          | Returns month information    | `IMonth[]`           |
| `getWeeks()`           | Returns week information     | `IWeek[]`            |
| `getCurrentDateInfo()` | Returns current date details | `ICurrentDateInfo`   |
| `getPresets()`         | Returns all preset ranges    | `IDateRangePreset[]` |

### Type Definitions

```typescript
interface IDateRange {
  startDate: Date;
  endDate: Date;
}

interface IMonth {
  id: number;
  name: string;
  shortName: string;
}

interface IWeek {
  id: number;
  name: string;
  shortName: string;
}

interface IDateRangePreset {
  label: string;
  range: IDateRange;
}

interface ICurrentDateInfo {
  date: Date;
  dayOfWeek: number;
  dayOfMonth: number;
  month: number;
  year: number;
  quarter: number;
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Special thanks to all our contributors and the open source community.

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/date-range-tk)
- [GitHub Repository](https://github.com/surajaswal29/date-range-tk)
- [Issue Tracker](https://github.com/surajaswal29/date-range-tk/issues)
- [Wiki](https://github.com/surajaswal29/date-range-tk/wiki)

## 📈 Stats

![GitHub stars](https://img.shields.io/github/stars/surajaswal29/date-range-tk?style=social)
![GitHub forks](https://img.shields.io/github/forks/surajaswal29/date-range-tk?style=social)
![GitHub issues](https://img.shields.io/github/issues/surajaswal29/date-range-tk)
![GitHub pull requests](https://img.shields.io/github/issues-pr/surajaswal29/date-range-tk)
