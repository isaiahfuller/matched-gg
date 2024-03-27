import { z, ZodString } from 'zod';

/**
 * Validates a URL using the Zod library.
 *
 * @param {string} url - The URL to validate.
 * @returns The validated URL.
 * @example validateUrl('https://www.example.com')
 */
export default function validateUrl(url: string): string {
  const urlSchema: ZodString = z.string().url();
  const validUrl: string = urlSchema.parse(url);

  return validUrl;
}
