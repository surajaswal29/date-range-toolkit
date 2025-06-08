import { createDateRangeToolkit } from "../core/factory";

export const debugLogger = (): void => {
  // Create a toolkit instance with current date
  const now = createDateRangeToolkit();
  console.log("Current date:", now.toString());

  // Create a toolkit instance with a specific date
  const customDate = createDateRangeToolkit("2024-03-15", "YYYY-MM-DD");
  console.log("Custom date:", customDate.toString());

  // Add and subtract time
  console.log("Add 2 days:", customDate.add(2, "days").toString());
  console.log("Subtract 1 month:", customDate.subtract(1, "months").toString());

  // Compare dates
  const comparison = now.compareTo(customDate);
  console.log("Date comparison:", comparison);

  // Get current date info
  const currentInfo = now.current().build();
  console.log("Current date info:", currentInfo);

  // Get last 7 days info
  const last7DaysInfo = now.last7Days().build();
  console.log("Last 7 days info:", last7DaysInfo);

  // Get last 30 days info
  const last30DaysInfo = now.last30Days().build();
  console.log("Last 30 days info:", last30DaysInfo);

  // Get last quarter info
  const lastQuarterInfo = now.lastQuarter().build();
  console.log("Last quarter info:", lastQuarterInfo);

  // Get year to date info
  const yearToDateInfo = now.yearToDate().build();
  console.log("Year to date info:", yearToDateInfo);

  // Debug information
  console.log("Debug info:", now.debug());

  // Invalid date handling
  const invalidDate = createDateRangeToolkit("invalid-date");
  console.log("Is valid date?", invalidDate.isValid());
  console.log("Validation error:", invalidDate.getValidationError());

  // Timezone handling
  try {
    const tokyoTime = now.timezone("Asia/Tokyo");
    console.log("Tokyo time:", tokyoTime.toString());
  } catch (e) {
    console.error("Timezone error:", e);
  }
};
