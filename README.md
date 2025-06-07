# date-range-toolkit

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/) [![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com) [![Version](https://img.shields.io/badge/Version-1.0.0-blue)](https://github.com/surajaswal29/date-range-toolkit/releases) [![License](https://img.shields.io/badge/License-ISC-green)](https://opensource.org/licenses/ISC) [![Downloads](https://img.shields.io/github/downloads/surajaswal29/date-range-toolkit/latest/total.svg)](https://github.com/surajaswal29/date-range-toolkit/releases) [![Contributors](https://img.shields.io/github/contributors/surajaswal29/date-range-toolkit.svg)](https://github.com/surajaswal29/date-range-toolkit/graphs/contributors) [![GitHub Issues](https://img.shields.io/github/issues/surajaswal29/date-range-toolkit.svg)](https://github.com/surajaswal29/date-range-toolkit/issues)

A comprehensive toolkit for handling date ranges, providing rich date metadata, calendar utilities, and customizable date range generation. Written in TypeScript for better type safety and developer experience.

## Key Features

- Dynamic calculation of the current date, including day of the week, month, year, and leap year status
- Generation of a date range for the last 7 days, with customizable labels
- Full TypeScript support with type definitions
- Consideration of month lengths and leap years in date calculations
- Robust handling of month transitions and year boundaries

## Installation

```bash
npm install date-range-toolkit
```

## Usage

### TypeScript
```typescript
import { getDateRange, DateRangeToolkitResult } from 'date-range-toolkit';

// Get date-related information
const dateInfo: DateRangeToolkitResult = getDateRange();

// Access properties from the returned object
console.log(dateInfo);
```

### JavaScript
```javascript
const { getDateRange } = require('date-range-toolkit');

// Get date-related information
const dateInfo = getDateRange();

// Access properties from the returned object
console.log(dateInfo);
```

## Return Type Structure

```typescript
interface DateRangeToolkitResult {
  current: {
    todayDate: string;      // Day of month with leading zero
    weekDay: string;        // Day of week (e.g., "Monday")
    month: string;          // Month with leading zero
    year: number;          // Current year
    date: string;          // Full date in UK format
    monthName: string;     // Full month name
    monthLength: number;   // Days in current month
    isLeapYear: boolean;   // Leap year status
  };
  previous: {
    year: number;         // Previous year
    month: string;        // Previous month with leading zero
    monthLength: number;  // Days in previous month
    monthName: string;    // Previous month name
  };
  allMonths: Array<{      // Information about all months
    month: string;
    shortName: string;
    numOfDays: number;
    weeks: number;
  }>;
  last7days: {
    from_date: number;    // Start of 7-day range
    to_date: number;      // End of 7-day range
    L7D: Array<{         // Last 7 days' labels
      label: string;     // Format: "DD MonthName"
    }>;
  };
}
```

## Example Output

```javascript
{
  current: {
    todayDate: '07',
    weekDay: 'Sunday',
    month: '01',
    year: 2024,
    date: '07/01/2024',
    monthName: 'January',
    monthLength: 31,
    isLeapYear: true
  },
  previous: {
    year: 2023,
    month: '12',
    monthLength: 31,
    monthName: 'December'
  },
  allMonths: [
    { month: 'January', shortName: 'Jan', numOfDays: 31, weeks: 5 },
    { month: 'February', shortName: 'Feb', numOfDays: 29, weeks: 4 },
    // ... other months
  ],
  last7days: {
    from_date: 1,
    to_date: 7,
    L7D: [
      { label: '1 January' },
      { label: '2 January' },
      { label: '3 January' },
      { label: '4 January' },
      { label: '5 January' },
      { label: '6 January' },
      { label: '7 January' }
    ]
  }
}
```

## Development

### Setup
```bash
git clone https://github.com/surajaswal29/date-range-toolkit.git
cd date-range-toolkit
npm install
```

### Build
```bash
npm run build
```

### Test
```bash
npm test
```

### Lint
```bash
npm run lint
```

### Format Code
```bash
npm run format
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Author

[Suraj Aswal](https://github.com/surajaswal29)

## Repository

[GitHub Repository](https://github.com/surajaswal29/date-range-toolkit)
