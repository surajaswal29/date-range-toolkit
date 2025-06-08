import { IMonth } from '../types';
import { getFebruaryDays } from '../utils/dateUtils';

export const getMonthsForYear = (year: number = new Date().getFullYear()): IMonth[] => {
  const january: IMonth = {
    id: 1,
    name: 'January',
    abbreviation: {
      type_1: 'Jan',
      type_2: 'JAN',
      type_3: 'jan',
    },
    daysInMonth: 31,
    quarter: 1,
  };

  const february: IMonth = {
    id: 2,
    name: 'February',
    abbreviation: {
      type_1: 'Feb',
      type_2: 'FEB',
      type_3: 'feb',
    },
    daysInMonth: getFebruaryDays(year),
    quarter: 1,
  };

  const march: IMonth = {
    id: 3,
    name: 'March',
    abbreviation: {
      type_1: 'Mar',
      type_2: 'MAR',
      type_3: 'mar',
    },
    daysInMonth: 31,
    quarter: 1,
  };

  const april: IMonth = {
    id: 4,
    name: 'April',
    abbreviation: {
      type_1: 'Apr',
      type_2: 'APR',
      type_3: 'apr',
    },
    daysInMonth: 30,
    quarter: 2,
  };

  const may: IMonth = {
    id: 5,
    name: 'May',
    abbreviation: {
      type_1: 'May',
      type_2: 'MAY',
      type_3: 'may',
    },
    daysInMonth: 31,
    quarter: 2,
  };

  const june: IMonth = {
    id: 6,
    name: 'June',
    abbreviation: {
      type_1: 'Jun',
      type_2: 'JUN',
      type_3: 'jun',
    },
    daysInMonth: 30,
    quarter: 2,
  };

  const july: IMonth = {
    id: 7,
    name: 'July',
    abbreviation: {
      type_1: 'Jul',
      type_2: 'JUL',
      type_3: 'jul',
    },
    daysInMonth: 31,
    quarter: 3,
  };

  const august: IMonth = {
    id: 8,
    name: 'August',
    abbreviation: {
      type_1: 'Aug',
      type_2: 'AUG',
      type_3: 'aug',
    },
    daysInMonth: 31,
    quarter: 3,
  };

  const september: IMonth = {
    id: 9,
    name: 'September',
    abbreviation: {
      type_1: 'Sep',
      type_2: 'SEP',
      type_3: 'sep',
    },
    daysInMonth: 30,
    quarter: 3,
  };

  const october: IMonth = {
    id: 10,
    name: 'October',
    abbreviation: {
      type_1: 'Oct',
      type_2: 'OCT',
      type_3: 'oct',
    },
    daysInMonth: 31,
    quarter: 4,
  };

  const november: IMonth = {
    id: 11,
    name: 'November',
    abbreviation: {
      type_1: 'Nov',
      type_2: 'NOV',
      type_3: 'nov',
    },
    daysInMonth: 30,
    quarter: 4,
  };

  const december: IMonth = {
    id: 12,
    name: 'December',
    abbreviation: {
      type_1: 'Dec',
      type_2: 'DEC',
      type_3: 'dec',
    },
    daysInMonth: 31,
    quarter: 4,
  };

  return [
    january,
    february,
    march,
    april,
    may,
    june,
    july,
    august,
    september,
    october,
    november,
    december,
  ];
};
