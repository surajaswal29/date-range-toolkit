# 📅 Date Range Toolkit

[![CI](https://github.com/surajaswal29/date-range-toolkit/actions/workflows/ci.yml/badge.svg)](https://github.com/surajaswal29/date-range-toolkit/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/date-range-toolkit.svg)](https://badge.fury.io/js/date-range-toolkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![npm downloads](https://img.shields.io/npm/dm/date-range-toolkit.svg)](https://www.npmjs.com/package/date-range-toolkit)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/date-range-toolkit)](https://bundlephobia.com/package/date-range-toolkit)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)
[![codecov](https://codecov.io/gh/yourusername/date-range-toolkit/branch/main/graph/badge.svg)](https://codecov.io/gh/yourusername/date-range-toolkit)

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

- 🎯 **Preset Date Ranges** - Common ranges like Last 7/30 days, Last Quarter, Year to Date
- 📊 **Custom Range Support** - Create any date range with full type safety
- 📅 **Date Utilities** - Month/Week labels and current date information
- 💪 **TypeScript First** - Built with TypeScript for excellent type safety and IDE support
- 🪶 **Zero Dependencies** - Lightweight and efficient
- 🔒 **Type Safe** - Comprehensive type definitions for all features
- 🔄 **Easily Extendable** - Create custom instances with different base dates or extend the core functionality

## 📦 Installation

Using npm:

```bash
npm install date-range-toolkit
```

Using yarn:

```bash
yarn add date-range-toolkit
```

Using pnpm:

```bash
pnpm add date-range-toolkit
```

## 🚀 Quick Start

```typescript
import { createDateRangeToolkit } from 'date-range-toolkit';

// Create a toolkit instance
const toolkit = createDateRangeToolkit();

// Or create an instance with a specific base date
const customToolkit = createDateRangeToolkit('2024-01-01');

// Get a preset range
const last7Days = toolkit.getLast7Days();
console.log(last7Days);
// Output: { startDate: Date, endDate: Date }

// Create a custom range
const customRange = toolkit.getCustomRange(new Date('2024-01-01'), new Date('2024-12-31'));
```

## 📘 Usage Examples

### Basic Usage

```typescript
import { createDateRangeToolkit } from 'date-range-toolkit';

const toolkit = createDateRangeToolkit();

// Get common preset ranges
const last30Days = toolkit.getLast30Days();
const lastQuarter = toolkit.getLastQuarter();
const yearToDate = toolkit.getYearToDate();

// Get all available presets
const presets = toolkit.getPresets();
// Returns: Array of { label: string, range: IDateRange }
```

### Working with Different Base Dates

```typescript
import { createDateRangeToolkit } from 'date-range-toolkit';

// Create instances with different base dates
const currentToolkit = createDateRangeToolkit(); // Uses current date
const customToolkit = createDateRangeToolkit('2023-12-31'); // Uses end of 2023
const timestampToolkit = createDateRangeToolkit(1704067200000); // Uses timestamp

// Compare ranges from different base dates
const currentLast7Days = currentToolkit.getLast7Days();
const customLast7Days = customToolkit.getLast7Days();
```

### Working with Labels

```typescript
import { createDateRangeToolkit } from 'date-range-toolkit';

const toolkit = createDateRangeToolkit();

// Get month information
const months = toolkit.getMonths();
// Returns: Array of { id: number, name: string, shortName: string }
// Example: { id: 1, name: "January", shortName: "Jan" }

// Get week information
const weeks = toolkit.getWeeks();
// Returns: Array of { id: number, name: string, shortName: string }
// Example: { id: 1, name: "Monday", shortName: "Mon" }
```

### Current Date Information

```typescript
import { createDateRangeToolkit } from 'date-range-toolkit';

const toolkit = createDateRangeToolkit();

const currentInfo = toolkit.getCurrentDateInfo();
// Returns: {
//   date: Date,
//   dayOfWeek: number,
//   dayOfMonth: number,
//   month: number,
//   year: number,
//   quarter: number
// }
```

### React Integration Example

```typescript
import { createDateRangeToolkit } from "date-range-toolkit";
import { useState } from "react";

function DateRangePicker() {
  const toolkit = createDateRangeToolkit();
  const [dateRange, setDateRange] = useState(toolkit.getLast7Days());

  const handlePresetClick = (preset: string) => {
    switch (preset) {
      case "7days":
        setDateRange(toolkit.getLast7Days());
        break;
      case "30days":
        setDateRange(toolkit.getLast30Days());
        break;
      case "quarter":
        setDateRange(toolkit.getLastQuarter());
        break;
      // ... other cases
    }
  };

  return (
    <div>
      <button onClick={() => handlePresetClick("7days")}>Last 7 Days</button>
      <button onClick={() => handlePresetClick("30days")}>Last 30 Days</button>
      {/* ... other UI elements */}
    </div>
  );
}
```

### Extending Functionality

```typescript
import { DateRangeToolkit } from 'date-range-toolkit';

class CustomDateRangeToolkit extends DateRangeToolkit {
  // Add custom methods
  getLast14Days() {
    const endDate = this.getCurrentDate();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 14);
    return { startDate, endDate };
  }

  // Override existing methods
  getLast7Days() {
    const range = super.getLast7Days();
    // Add custom logic here
    return range;
  }
}

// Use your custom toolkit
const customToolkit = new CustomDateRangeToolkit();
const last14Days = customToolkit.getLast14Days();
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

## 📊 Project Status

- ✅ Active development
- 🔄 Regular updates
- 👥 Growing community
- 📈 Stable API

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/date-range-toolkit)
- [GitHub Repository](https://github.com/surajaswal29/date-range-toolkit)
- [Issue Tracker](https://github.com/surajaswal29/date-range-toolkit/issues)
- [Wiki](https://github.com/surajaswal29/date-range-toolkit/wiki)

## 📈 Stats

![GitHub stars](https://img.shields.io/github/stars/surajaswal29/date-range-toolkit?style=social)
![GitHub forks](https://img.shields.io/github/forks/surajaswal29/date-range-toolkit?style=social)
![GitHub issues](https://img.shields.io/github/issues/surajaswal29/date-range-toolkit)
![GitHub pull requests](https://img.shields.io/github/issues-pr/surajaswal29/date-range-toolkit)
