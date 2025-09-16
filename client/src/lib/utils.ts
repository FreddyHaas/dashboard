import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type Filters } from '../hooks/use-employee-filters-state';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Merges global and local filters, with local filters taking precedence over global ones.
 * This function creates a new object with all properties from global filters,
 *
 * @param globalFilters - The global filter state
 * @param localFilters - The local filter state (takes precedence when not undefined)
 * @returns A new Filters object with merged values
 */
export function resolveFilters(
  globalFilters: Filters,
  localFilters: Filters,
): Filters {
  const result: Filters = { ...globalFilters };

  // Only override global values if local values are not undefined
  (Object.keys(localFilters) as Array<keyof Filters>).forEach((key) => {
    if (localFilters[key] !== undefined) {
      (result as any)[key] = localFilters[key];
    }
  });

  return result;
}
