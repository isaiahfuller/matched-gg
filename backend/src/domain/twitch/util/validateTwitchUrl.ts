import { z, ZodString } from 'zod';

export default function validateTwitchUrl(url: string): string {
  const urlSchema: ZodString = z.string().url();
  const validUrl = urlSchema.parse(url);

  return validUrl;
}
