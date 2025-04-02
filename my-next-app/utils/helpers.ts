// src/utils/helpers.ts

/**
 * Formats a given date into a human-readable string.
 * @param date A Date object or a date string.
 * @returns The formatted date string.
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Capitalizes the first letter of the given string.
 * @param str The input string.
 * @returns The string with the first letter capitalized.
 */
export function capitalizeFirstLetter(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
