import { IDateLabel, ILast7DaysInfo } from "../types";
import { MONTHS, WEEKS } from "../constants";

export const getLast7DaysInfo = (): ILast7DaysInfo => {
  const today = new Date();
  const fromDate = new Date(today);
  fromDate.setDate(today.getDate() - 6);

  const labels: IDateLabel[] = [];
  let weekendCount = 0;

  // Generate labels for each day in the range
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(fromDate);
    currentDate.setDate(fromDate.getDate() + i);

    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    if (isWeekend) weekendCount++;

    const month = MONTHS[currentDate.getMonth()];

    labels.push({
      label: `${currentDate.getDate()} ${month.name}`,
      date: new Date(currentDate),
      dayName: WEEKS[dayOfWeek],
      dayAbbrev: WEEKS[dayOfWeek].slice(0, 3),
      monthName: month.name,
      monthAbbrev: month.abbreviation.type_1,
      isoDate: currentDate.toISOString().split("T")[0],
      isWeekend,
    });
  }

  return {
    from_date: fromDate.getDate(),
    to_date: today.getDate(),
    fromDate: new Date(fromDate),
    toDate: new Date(today),
    fromISODate: fromDate.toISOString().split("T")[0],
    toISODate: today.toISOString().split("T")[0],
    totalDays: 7,
    weekendDays: weekendCount,
    weekDays: 7 - weekendCount,
    L7D: labels,
  };
};
