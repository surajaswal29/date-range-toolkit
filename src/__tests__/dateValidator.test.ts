import { isValidDate } from '../utils/dateValidator';

describe('isValidDate', () => {
  test('should validate regular dates correctly', () => {
    expect(isValidDate('2024-01-01')).toBe(true);
    expect(isValidDate('2024-12-31')).toBe(true);
    expect(isValidDate('2024-06-15')).toBe(true);
  });

  test('should handle different date formats', () => {
    expect(isValidDate(new Date('2024-01-01'))).toBe(true);
    expect(isValidDate('2024/01/01')).toBe(true);
    expect(isValidDate('01/01/2024')).toBe(true);
    expect(isValidDate(new Date().getTime())).toBe(true);
  });

  test('should validate leap years correctly', () => {
    // Valid leap year dates
    expect(isValidDate('2024-02-29')).toBe(true);
    expect(isValidDate('2000-02-29')).toBe(true);
    expect(isValidDate('2400-02-29')).toBe(true);

    // Invalid leap year dates
    expect(isValidDate('2023-02-29')).toBe(false);
    expect(isValidDate('2100-02-29')).toBe(false);
  });

  test('should validate days in months correctly', () => {
    // Valid days
    expect(isValidDate('2024-04-30')).toBe(true);
    expect(isValidDate('2024-01-31')).toBe(true);

    // Invalid days
    expect(isValidDate('2024-04-31')).toBe(false);
    expect(isValidDate('2024-06-31')).toBe(false);
    expect(isValidDate('2024-09-31')).toBe(false);
    expect(isValidDate('2024-11-31')).toBe(false);
  });

  test('should handle year range limits', () => {
    // Valid range
    expect(isValidDate('1900-01-01')).toBe(true);
    expect(isValidDate('9999-12-31')).toBe(true);

    // Invalid range
    expect(isValidDate('1899-12-31')).toBe(false);
    expect(isValidDate('10000-01-01')).toBe(false);
  });

  test('should handle invalid dates and formats', () => {
    expect(isValidDate('invalid-date')).toBe(false);
    expect(isValidDate('2024-13-01')).toBe(false);
    expect(isValidDate('2024-00-01')).toBe(false);
    expect(isValidDate('2024-01-00')).toBe(false);
    expect(isValidDate('')).toBe(false);
    expect(isValidDate('null')).toBe(false);
    expect(isValidDate('undefined')).toBe(false);
  });
});
