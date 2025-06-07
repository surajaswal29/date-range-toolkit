import { DateLabel, DateRangeToolkitResult } from "./types"
import { MONTHS } from "./constants/months"
import { WEEKS } from "./constants/weeks"
import { padZero, isLeapYear, getFebruaryDays } from "./utils/utils"

/**
 * Generates custom date information including current date, previous year, and last 7 days
 * @returns Object containing date information
 */
export const getDateRange = (): DateRangeToolkitResult => {
  const date = new Date()
  const year = date.getFullYear()
  const currentMonth = date.getMonth()

  // Update February days based on current year
  MONTHS[1].numOfDays = getFebruaryDays(year)

  const l7d = {
    fromDate: date.getDate() - 6,
    toDate: date.getDate(),
  }

  const date_data = {
    current: {
      todayDate: padZero(date.getDate()),
      weekDay: WEEKS[date.getDay()],
      month: padZero(currentMonth + 1),
      year,
      date: date.toLocaleDateString(["en-UK"]),
      monthName: MONTHS[currentMonth].month,
      monthLength: MONTHS[currentMonth].numOfDays,
      isLeapYear: isLeapYear(year),
    },
    previous: {
      year: year - 1,
      month: padZero(currentMonth === 0 ? 12 : currentMonth),
      monthLength: MONTHS[currentMonth === 0 ? 11 : currentMonth - 1].numOfDays,
      monthName: MONTHS[currentMonth === 0 ? 11 : currentMonth - 1].month,
    },
    allMonths: MONTHS,
  }

  const labels: DateLabel[] = []

  if (l7d.fromDate <= 0) {
    const fromDate = date_data.previous.monthLength + l7d.fromDate

    for (let j = fromDate; j <= date_data.previous.monthLength; j++) {
      labels.push({
        label: `${j} ${date_data.previous.monthName}`,
      })
    }

    for (let i = 1; i <= l7d.toDate; i++) {
      labels.push({
        label: `${i} ${date_data.current.monthName}`,
      })
    }
  } else {
    for (let i = l7d.fromDate; i <= l7d.toDate; i++) {
      labels.push({
        label: `${i} ${date_data.current.monthName}`,
      })
    }
  }

  return {
    ...date_data,
    last7days: {
      from_date: l7d.fromDate,
      to_date: l7d.toDate,
      L7D: labels,
    },
  }
}
