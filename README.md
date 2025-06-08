# Date Range Toolkit

A comprehensive toolkit for handling date ranges, providing rich date metadata, calendar utilities, and customizable date range generation. Works in any JavaScript environment including Node.js, browsers, and modern frameworks.

## Features

- 📅 Rich date range generation and manipulation
- 🌍 Timezone support
- 🔄 Flexible date formatting
- 📊 Date metadata and comparisons
- 🎯 Tree-shakeable exports
- 📦 Multiple bundle formats (ESM, CommonJS, UMD)
- 💪 Written in TypeScript with full type support

## Installation

```bash
npm install date-range-toolkit
# or
yarn add date-range-toolkit
# or
pnpm add date-range-toolkit
```

## Usage

### ES Modules / TypeScript

```typescript
import { createDateRangeToolkit, getCurrentDateInfo } from "date-range-toolkit";

// Create a toolkit instance
const toolkit = createDateRangeToolkit();

// Get current date information
const currentDate = getCurrentDateInfo();
console.log(currentDate);

// Get a custom date range
const range = toolkit.getCustomDateRange("2024-01-01", "2024-12-31");
```

### CommonJS

```javascript
const { createDateRangeToolkit } = require("date-range-toolkit");

const toolkit = createDateRangeToolkit();
// ... rest of the code
```

### Browser (UMD)

```html
<script src="https://unpkg.com/date-range-toolkit"></script>
<script>
  const toolkit = DateRangeToolkit.createDateRangeToolkit();
  // ... use the toolkit
</script>
```

### React Example

```jsx
import { useEffect, useState } from "react";
import { getCurrentDateInfo, getLastNDays } from "date-range-toolkit";

function DateRangeComponent() {
  const [dateInfo, setDateInfo] = useState(null);

  useEffect(() => {
    const current = getCurrentDateInfo();
    const last7Days = getLastNDays(7);
    setDateInfo({ current, last7Days });
  }, []);

  return (
    <div>
      <h2>Date Information</h2>
      <pre>{JSON.stringify(dateInfo, null, 2)}</pre>
    </div>
  );
}
```

## API Reference

### Core Functions

- `createDateRangeToolkit()`: Creates a new toolkit instance
- `getCurrentDateInfo()`: Get current date metadata
- `getPreviousDateInfo()`: Get previous date information
- `getLastNDays(n: number)`: Get date range for last N days

### Utility Functions

- `formatDate(date: Date, format: string)`: Format dates
- `convertTimezone(date: Date, timezone: string)`: Convert dates between timezones
- `getTimezone()`: Get current timezone

### Types

The package includes comprehensive TypeScript definitions for all functions and objects:

```typescript
import type { IDateRange, ICurrentDateInfo, ICustomRangeInfo } from "date-range-toolkit";
```

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

ISC License - See [LICENSE](LICENSE) for details.
