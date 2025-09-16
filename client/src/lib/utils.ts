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
  globalFilters: Filters | null,
  localFilters: Filters | null,
): Filters | null {
  if (globalFilters === null || localFilters === null) {
    return null;
  }

  const result: Filters = { ...globalFilters };

  // Only override global values if local values are not undefined
  const filteredLocal = Object.fromEntries(
    Object.entries(localFilters).filter(([, v]) => v !== undefined),
  ) as Partial<Filters>;

  const merged: Filters = { ...result, ...filteredLocal };

  return merged;
}
