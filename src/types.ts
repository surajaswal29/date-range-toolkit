export interface MonthInfo {
  month: string
  shortName: string
  numOfDays: number
  weeks: number
}

export interface DateLabel {
  label: string
}

export interface CurrentDateInfo {
  todayDate: string
  weekDay: string
  month: string
  year: number
  date: string
  monthName: string
  monthLength: number
  isLeapYear: boolean
}

export interface PreviousDateInfo {
  year: number
  month: string
  monthLength: number
  monthName: string
}

export interface Last7DaysInfo {
  from_date: number
  to_date: number
  L7D: DateLabel[]
}

export interface DateRangeToolkitResult {
  current: CurrentDateInfo
  previous: PreviousDateInfo
  allMonths: MonthInfo[]
  last7days: Last7DaysInfo
}
