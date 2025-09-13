import { Filters } from '../lib/use-employee-filters-state';
import employeeStatistics from './employee-statistics.json';

export interface NoOfEmployeesEntry {
    date: string;
    employees: number;
}

interface Employee {
    id: string;
    tenure: number;
    location: string;
    employmentType: "fulltime" | "parttime" | "contractor" | "intern";
    workArrangement: "hybrid" | "onsite" | "remote";
}

export async function fetchNoOfEmployeesData(filters: Filters): Promise<NoOfEmployeesEntry[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400)); // 800-1200ms delay
    
    const result: NoOfEmployeesEntry[] = [];
    
    const dates = Object.keys(employeeStatistics).sort();
    
    for (const date of dates) {

        const currentDate = new Date(date);

        if (filters.dateRange?.from) {
            const fromDate = new Date(filters.dateRange.from);
            fromDate.setHours(0, 0, 0, 0); // Normalize to midnight
            if (currentDate < fromDate) {
                continue;
            }
        }

        if (filters.dateRange?.to) {
            const toDate = new Date(filters.dateRange.to);
            toDate.setHours(23, 59, 59, 999); // Normalize to end of day
            if (currentDate > toDate) {
                continue;
            }
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
        
        result.push({
            date: date,
            employees: filteredEmployees.length
        });
    }
    
    return result;
}