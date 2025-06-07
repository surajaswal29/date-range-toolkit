/// <reference types="node" />
import { getDateRange } from "./index"
import type { DateRangeToolkitResult } from "./index"

describe("getDateRange", () => {
  let originalDate: typeof Date

  beforeEach(() => {
    // Store the original Date
    originalDate = Date
  })

  afterEach(() => {
    // Restore original Date
    global.Date = originalDate
  })

  test("returns correct structure", () => {
    const result: DateRangeToolkitResult = getDateRange()

    expect(result).toHaveProperty("current")
    expect(result).toHaveProperty("previous")
    expect(result).toHaveProperty("allMonths")
    expect(result).toHaveProperty("last7days")

    expect(result.current).toHaveProperty("todayDate")
    expect(result.current).toHaveProperty("weekDay")
    expect(result.current).toHaveProperty("month")
    expect(result.current).toHaveProperty("year")
    expect(result.current).toHaveProperty("date")
    expect(result.current).toHaveProperty("monthName")
    expect(result.current).toHaveProperty("monthLength")
    expect(result.current).toHaveProperty("isLeapYear")
  })

  test("handles leap year correctly", () => {
    // Mock date to be in a leap year
    const mockDate = new Date(2024, 1, 15) // February 15, 2024
    global.Date = class extends Date {
      constructor() {
        super()
        return mockDate
      }
    } as typeof Date

    const result = getDateRange()
    expect(result.current.isLeapYear).toBe(true)
    expect(result.allMonths[1].numOfDays).toBe(29) // February should have 29 days
  })

  test("handles month transition in last 7 days", () => {
    // Mock date to be at start of month
    const mockDate = new Date(2024, 1, 2) // February 2, 2024
    global.Date = class extends Date {
      constructor() {
        super()
        return mockDate
      }
    } as typeof Date

    const result = getDateRange()
    expect(result.last7days.L7D).toHaveLength(7)
    expect(result.last7days.L7D[0].label).toContain("January") // First label should be from January
    expect(result.last7days.L7D[6].label).toContain("February") // Last label should be from February
  })

  test("formats numbers correctly with leading zeros", () => {
    const mockDate = new Date(2024, 0, 5) // January 5, 2024
    global.Date = class extends Date {
      constructor() {
        super()
        return mockDate
      }
    } as typeof Date

    const result = getDateRange()
    expect(result.current.todayDate).toBe("05")
    expect(result.current.month).toBe("01")
  })

  test("calculates previous month correctly at year boundary", () => {
    const mockDate = new Date(2024, 0, 15) // January 15, 2024
    global.Date = class extends Date {
      constructor() {
        super()
        return mockDate
      }
    } as typeof Date

    const result = getDateRange()
    expect(result.previous.year).toBe(2023)
    expect(result.previous.month).toBe("12")
    expect(result.previous.monthName).toBe("December")
  })
})
