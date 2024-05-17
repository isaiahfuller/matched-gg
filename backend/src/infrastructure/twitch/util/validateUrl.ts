import { logger } from 'src/util/logger';
import { ZodError, ZodString, ZodUnion, z } from 'zod';

export enum UrlProtocol {
  HTTP = 'http://',
  HTTPS = 'https://',
}

/**
 * Validates a URL using the Zod library.
 *
 * @param {string} url - The URL to validate.
 * @returns The validated URL.
 * @example validateUrl('https://www.example.com')
 */
export default function validateUrl(url: string): string {
  try {
    const urlHttpErrorMessage = {
      message: 'URL must start with https:// or http://',
    };

    const urlSchema: ZodUnion<[ZodString, ZodString]> = z
      .string()
      .url()
      .includes(UrlProtocol.HTTPS, urlHttpErrorMessage)
      .or(z.string().url().includes(UrlProtocol.HTTP, urlHttpErrorMessage));
    const validUrl: string = urlSchema.parse(url);

    return validUrl;
  } catch (error) {
    error instanceof ZodError &&
      error.errors.forEach((err) => logger.error(err));
    throw new Error('Failed to validate URL');
  }
}
