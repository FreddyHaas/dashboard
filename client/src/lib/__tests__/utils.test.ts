import { type Filters } from '../../hooks/use-employee-filters-state';
import { resolveFilters } from '../utils';

describe('mergeFilters', () => {
  const createMockFilters = (overrides: Partial<Filters> = {}): Filters => ({
    dateRange: undefined,
    tenure: undefined,
    location: undefined,
    employmentType: undefined,
    workArrangement: undefined,
    ...overrides,
  });

  it('should return local filters when global filters are empty', () => {
    const globalFilters = createMockFilters();
    const localFilters = createMockFilters({
      location: 'New York',
      employmentType: 'fulltime',
    });

    const result = resolveFilters(globalFilters, localFilters);

    expect(result).toEqual(localFilters);
  });

  it('should return global filters when local filters are empty', () => {
    const globalFilters = createMockFilters({
      location: 'San Francisco',
      tenure: 5,
    });
    const localFilters = createMockFilters(); // All undefined values

    const result = resolveFilters(globalFilters, localFilters);

    expect(result).toEqual(globalFilters);
  });

  it('should merge filters with local filters taking precedence', () => {
    const globalFilters = createMockFilters({
      location: 'San Francisco',
      tenure: 5,
      employmentType: 'fulltime',
      workArrangement: 'hybrid',
    });
    const localFilters = createMockFilters({
      location: 'New York',
      employmentType: 'contractor',
      // tenure and workArrangement remain undefined, so global values are used
    });

    const result = resolveFilters(globalFilters, localFilters);

    expect(result).toEqual({
      dateRange: undefined,
      location: 'New York', // local overrides global
      tenure: 5, // from global (local is undefined)
      employmentType: 'contractor', // local overrides global
      workArrangement: 'hybrid', // from global (local is undefined)
    });
  });

  it('should handle partial local filters correctly', () => {
    const globalFilters = createMockFilters({
      location: 'San Francisco',
      tenure: 3,
      employmentType: 'fulltime',
    });
    const localFilters = createMockFilters({
      location: 'Remote',
      // Other properties remain undefined, so global values are used
    });

    const result = resolveFilters(globalFilters, localFilters);

    expect(result).toEqual({
      dateRange: undefined,
      location: 'Remote', // local overrides global
      tenure: 3, // from global (local is undefined)
      employmentType: 'fulltime', // from global (local is undefined)
      workArrangement: undefined,
    });
  });

  it('should not mutate the original filter objects', () => {
    const globalFilters = createMockFilters({
      location: 'San Francisco',
      tenure: 5,
    });
    const localFilters = createMockFilters({
      location: 'New York',
    });

    const originalGlobal = { ...globalFilters };
    const originalLocal = { ...localFilters };

    resolveFilters(globalFilters, localFilters);

    expect(globalFilters).toEqual(originalGlobal);
    expect(localFilters).toEqual(originalLocal);
  });

  it('should return a new object reference', () => {
    const globalFilters = createMockFilters();
    const localFilters = createMockFilters();

    const result = resolveFilters(globalFilters, localFilters);

    expect(result).not.toBe(globalFilters);
    expect(result).not.toBe(localFilters);
  });
});
