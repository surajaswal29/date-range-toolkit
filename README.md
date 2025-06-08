# DateRangeToolkit

A powerful and flexible date range utility for React, Next.js, and Node.js applications.

## Installation

```bash
npm install custom-dates-npm
# or
yarn add custom-dates-npm
# or
pnpm add custom-dates-npm
```

## Features

- 📅 Easy date range management
- 🌍 Timezone support
- 🔄 Common date range presets (Last 7 days, Last 30 days, Last Quarter, Year to Date)
- ⚛️ React hook for easy integration
- 🔧 Customizable date formatting
- 📊 Date comparison utilities
- 💪 TypeScript support

## Usage Examples

### React/Next.js Usage with Hook

```tsx
import { useDateRange } from "custom-dates-npm/react";

// Example custom date range component
function CustomDateRange() {
  const { dateRange, setDateRange, isLoading, error } = useDateRange({
    defaultRange: "last7days",
    format: "MM/DD/YYYY",
    timezone: "UTC",
  });

  const handleRangeChange = (type) => {
    setDateRange(type);
  };

  if (error) return <div>Error: {error}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <select onChange={(e) => handleRangeChange(e.target.value)}>
        <option value="last7days">Last 7 Days</option>
        <option value="last30days">Last 30 Days</option>
        <option value="lastQuarter">Last Quarter</option>
        <option value="yearToDate">Year to Date</option>
      </select>

      {dateRange.last7days && (
        <div>
          <p>From: {dateRange.last7days.fromDate.toLocaleDateString()}</p>
          <p>To: {dateRange.last7days.toDate.toLocaleDateString()}</p>
          <p>Total Days: {dateRange.last7days.totalDays}</p>
        </div>
      )}
    </div>
  );
}

// Example with custom date range
function CustomRangePicker() {
  const { dateRange, setDateRange } = useDateRange();

  const handleCustomRange = (startDate, endDate) => {
    setDateRange("custom", startDate, endDate);
  };

  return (
    <div>
      <button onClick={() => handleCustomRange(new Date("2024-01-01"), new Date("2024-12-31"))}>Set Year 2024</button>

      {dateRange.customRange && (
        <div>
          <p>Start: {dateRange.customRange.fromDate.toLocaleDateString()}</p>
          <p>End: {dateRange.customRange.toDate.toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}
```

### Node.js Usage

```javascript
const { DateRangeToolkit } = require("custom-dates-npm");

// Create a new instance
const dateRange = new DateRangeToolkit().format("MM/DD/YYYY").timezone("America/New_York").last7Days().build();

console.log(dateRange);
```

### Advanced Usage with Custom Range

```typescript
import { DateRangeToolkit } from "custom-dates-npm";

const toolkit = new DateRangeToolkit().format("YYYY-MM-DD").customRange(new Date("2024-01-01"), new Date("2024-12-31")).build();

const { fromDate, toDate, totalDays, weekDays, weekendDays } = toolkit.customRange;
```

### Date Comparison

```typescript
import { DateRangeToolkit } from "custom-dates-npm";

const date1 = new DateRangeToolkit(new Date("2024-01-01"));
const date2 = new DateRangeToolkit(new Date("2024-02-01"));

const comparison = date1.compareTo(date2);
console.log(comparison.diffInDays); // Outputs the difference in days
```

## API Reference

### useDateRange Hook Options

```typescript
interface UseDateRangeOptions {
  defaultRange?: "last7days" | "last30days" | "lastQuarter" | "yearToDate" | "custom";
  format?: string;
  timezone?: string;
  defaultStartDate?: Date;
  defaultEndDate?: Date;
}
```

### DateRangeToolkit Methods

- `format(format: string)`: Set date format
- `timezone(timezone: string)`: Set timezone
- `current()`: Get current date info
- `previous()`: Get previous year's info
- `last7Days()`: Get last 7 days info
- `last30Days()`: Get last 30 days info
- `lastQuarter()`: Get last quarter info
- `yearToDate()`: Get year to date info
- `customRange(startDate: Date, endDate: Date)`: Get custom date range
- `build()`: Build and return the final result

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
