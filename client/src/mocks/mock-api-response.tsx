import { DateRange } from 'react-day-picker';
import { Filters } from '../lib/use-employee-filters-state';
import employeeStatistics from './employee-statistics.json';

export interface NoOfEmployeesEntry {
    date: string;
    noOfEmployees: number;
}

export interface AverageTenureEntry {
    date: string;
    averageTenure: number;
}

interface Employee {
    id: string;
    tenure: number;
    location: string;
    employmentType: "fulltime" | "parttime" | "contractor" | "intern";
    workArrangement: "hybrid" | "onsite" | "remote";
}

export async function fetchNoOfEmployeesData(filters: Filters): Promise<NoOfEmployeesEntry[]> {
    return fetchEmployeeData(filters, (date, filteredEmployees) => [{
        date: date,
        noOfEmployees: filteredEmployees.length
    }]);
}

export async function fetchAverageTenureData(filters: Filters): Promise<AverageTenureEntry[]> {
    return fetchEmployeeData(filters, (date, filteredEmployees) => [{
        date: date,
        averageTenure: filteredEmployees.reduce((acc, emp) => acc + emp.tenure, 0) / filteredEmployees.length
    }]);
}

export async function fetchEmployeeData<T>(
    filters: Filters,
    callback: (date: string, filteredEmployees: Employee[]) => T[]
): Promise<T[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400)); // 800-1200ms delay
    
    const result: T[] = [];
    
    const dates = Object.keys(employeeStatistics).sort();
    
    for (const date of dates) {

        if(!isDateWithinRange(date, filters.dateRange)) {
            continue;
        }

        const employees = employeeStatistics[date as keyof typeof employeeStatistics] as Employee[];
        
        let filteredEmployees = employees;
        
        if (filters.tenure !== undefined) {
            filteredEmployees = filteredEmployees.filter(emp => emp.tenure === filters.tenure);
        }
        
        if (filters.location !== undefined) {
            filteredEmployees = filteredEmployees.filter(emp => emp.location === filters.location);
        }
        
        if (filters.employmentType !== undefined) {
            filteredEmployees = filteredEmployees.filter(emp => emp.employmentType === filters.employmentType);
        }
        
        if (filters.workArrangement !== undefined) {
            filteredEmployees = filteredEmployees.filter(emp => emp.workArrangement === filters.workArrangement);
        }
        
        const callbackResult = callback(date, filteredEmployees);
        result.push(...callbackResult);
    }
    
    return result;
}

function isDateWithinRange(date: string, dateRange: DateRange | undefined): boolean {
    
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