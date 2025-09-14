import { type Filters } from './use-employee-filters-state';

// Extract the employment type without undefined
type EmploymentType = NonNullable<Filters['employmentType']>;

export const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  fulltime: "Full-time",
  parttime: "Part-time", 
  contractor: "Contractor",
  intern: "Intern"
};

export const EMPLOYMENT_TYPE_OPTIONS = Object.values(EMPLOYMENT_TYPE_LABELS).map(label => ({
  value: label as EmploymentType,
  label: label
}));
