import { DateRange } from 'react-day-picker';
import { Filters } from '../hooks/use-employee-filters-state';
import employeeStatistics from './employee-statistics.json';

export interface NoOfEmployeesEntry {
  date: string;
  noOfEmployees: number;
}

export interface AverageTenureEntry {
  date: string;
  averageTenure: number;
}

export interface EmployeeTypeEntry {
  employmentType: string;
  noOfEmployees: number;
}

interface Employee {
  id: string;
  tenure: number;
  location: string;
  employmentType: 'fulltime' | 'parttime' | 'contractor' | 'intern';
  workArrangement: 'hybrid' | 'onsite' | 'remote';
}

export async function fetchNoOfEmployeesData(
  filters: Filters,
): Promise<NoOfEmployeesEntry[]> {
  console.log('fetchNoOfEmployeesData', filters);
  return extractEmployeeData(filters, (date, filteredEmployees) => [
    {
      date: date,
      noOfEmployees: filteredEmployees.length,
    },
  ]);
}

export async function fetchAverageTenureData(
  filters: Filters,
): Promise<AverageTenureEntry[]> {
  console.log('fetchAverageTenureData', filters);
  return extractEmployeeData(filters, (date, filteredEmployees) => [
    {
      date: date,
      averageTenure:
        filteredEmployees.reduce((acc, emp) => acc + emp.tenure, 0) /
        filteredEmployees.length,
    },
  ]);
}

export async function fetchEmployeeEmploymentTypeData(
  filters: Filters,
): Promise<EmployeeTypeEntry[]> {
  console.log('fetchEmployeeEmploymentTypeData', filters);
  return extractEmployeeData<EmployeeTypeEntry>(
    filters,
    (_, filteredEmployees) => {
      const employmentTypeCount: Record<string, number> = {};
      filteredEmployees.forEach((emp) => {
        employmentTypeCount[emp.employmentType] =
          (employmentTypeCount[emp.employmentType] || 0) + 1;
      });
      return Object.entries(employmentTypeCount).map(
        ([employmentType, count]) => ({
          employmentType: employmentType,
          noOfEmployees: count,
        }),
      );
    },
    true,
  );
}

export async function extractEmployeeData<T>(
  filters: Filters,
  callback: (date: string, filteredEmployees: Employee[]) => T[],
  fetchLatestDateOnly: boolean = false,
): Promise<T[]> {
  // Simulate API delay
  await new Promise((resolve) =>
    setTimeout(resolve, 800 + Math.random() * 400),
  ); // 800-1200ms delay

  const result: T[] = [];

  const dates = Object.keys(employeeStatistics).sort();

  const filteredDates = filterDates(
    dates,
    filters.dateRange,
    fetchLatestDateOnly,
  );

  for (const date of filteredDates) {
    const employees = employeeStatistics[
      date as keyof typeof employeeStatistics
    ] as Employee[];
    const filteredEmployees = filterEmployees(employees, filters);

    const callbackResult = callback(date, filteredEmployees);
    result.push(...callbackResult);
  }

  return result;
}

function filterEmployees(employees: Employee[], filters: Filters): Employee[] {
  let filteredEmployees = employees;

  if (filters.tenure !== undefined) {
    filteredEmployees = filteredEmployees.filter(
      (emp) => emp.tenure > filters.tenure!,
    );
  }

  if (filters.location !== undefined) {
    filteredEmployees = filteredEmployees.filter(
      (emp) => emp.location === filters.location,
    );
  }

  if (filters.employmentType !== undefined) {
    filteredEmployees = filteredEmployees.filter(
      (emp) => emp.employmentType === filters.employmentType,
    );
  }

  if (filters.workArrangement !== undefined) {
    filteredEmployees = filteredEmployees.filter(
      (emp) => emp.workArrangement === filters.workArrangement,
    );
  }

  return filteredEmployees;
}

function filterDates(
  dates: string[],
  dateRange: DateRange | undefined,
  fetchLatestDateOnly: boolean,
): string[] {
  if (fetchLatestDateOnly) {
    if (dateRange !== undefined && dateRange.to !== undefined) {
      const lastDate = dates.filter((date) => isSameDate(date, dateRange.to!));
      return lastDate.length > 0 ? lastDate : [];
    } else {
      return dates.slice(-1);
    }
  }

  if (dateRange === undefined) {
    return dates;
  }

  return dates.filter((date) => isDateWithinRange(date, dateRange));
}

function isDateWithinRange(
  date: string,
  dateRange: DateRange | undefined,
): boolean {
  const currentDate = new Date(date);

  if (dateRange?.from) {
    const fromDate = new Date(dateRange.from);
    fromDate.setHours(0, 0, 0, 0); // Normalize to midnight
    if (currentDate < fromDate) {
      return false;
    }
  }

  if (dateRange?.to) {
    const toDate = new Date(dateRange.to);
    toDate.setHours(23, 59, 59, 999); // Normalize to end of day
    if (currentDate > toDate) {
      return false;
    }
  }

  return true;
}

function isSameDate(date1: string, date2: Date) {
  const date1Date = new Date(date1);
  date1Date.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  return date1Date.getTime() === date2.getTime();
}
