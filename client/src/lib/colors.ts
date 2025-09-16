/**
 * Utility functions for getting computed CSS variable values for charts
 */

/**
 * Get the computed value of a CSS custom property
 */
export function getCSSVariable(variable: string): string {
  if (typeof window === 'undefined') {
    // Return fallback values for SSR
    return getFallbackColor(variable);
  }

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();

  return value || getFallbackColor(variable);
}

/**
 * Get fallback color values for SSR or when CSS variables aren't available
 */
function getFallbackColor(variable: string): string {
  const fallbacks: Record<string, string> = {
    '--brand-primary': '#F12585',
    '--brand-secondary': '#3A0CA3',
    '--card': '#ffffff',
    '--card-foreground': '#0a0a0a',
    '--border': '#e4e4e7',
    '--muted-foreground': '#71717a',
    '--chart-1': '#f59e0b',
    '--chart-2': '#3b82f6',
    '--chart-3': '#8b5cf6',
    '--chart-4': '#10b981',
    '--chart-5': '#f97316',
  };

  return fallbacks[variable] || '#000000';
}

/**
 * Get chart color palette
 */
export function getChartColors() {
  return {
    primary: getCSSVariable('--brand-primary'),
    secondary: getCSSVariable('--brand-secondary'),
    card: getCSSVariable('--card'),
    cardForeground: getCSSVariable('--card-foreground'),
    border: getCSSVariable('--border'),
    mutedForeground: getCSSVariable('--muted-foreground'),
    chart1: getCSSVariable('--chart-1'),
    chart2: getCSSVariable('--chart-2'),
    chart3: getCSSVariable('--chart-3'),
    chart4: getCSSVariable('--chart-4'),
    chart5: getCSSVariable('--chart-5'),
  };
}

/**
 * Get an array of chart colors for datasets
 */
export function getChartColorPalette(): string[] {
  const colors = getChartColors();
  return [
    colors.chart1,
    colors.chart2,
    colors.chart3,
    colors.chart4,
    colors.chart5,
  ];
}
