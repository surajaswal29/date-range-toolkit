import { MonthInfo } from "../types"

export const MONTHS: MonthInfo[] = [
  { month: "January", shortName: "Jan", numOfDays: 31, weeks: 5 },
  { month: "February", shortName: "Feb", numOfDays: 28, weeks: 4 }, // Default for non-leap years
  { month: "March", shortName: "Mar", numOfDays: 31, weeks: 5 },
  { month: "April", shortName: "Apr", numOfDays: 30, weeks: 5 },
  { month: "May", shortName: "May", numOfDays: 31, weeks: 5 },
  { month: "June", shortName: "Jun", numOfDays: 30, weeks: 5 },
  { month: "July", shortName: "Jul", numOfDays: 31, weeks: 5 },
  { month: "August", shortName: "Aug", numOfDays: 31, weeks: 5 },
  { month: "September", shortName: "Sep", numOfDays: 30, weeks: 5 },
]
