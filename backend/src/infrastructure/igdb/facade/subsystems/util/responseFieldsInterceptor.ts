import { logger } from 'src/util/logger';
import { AllFields } from '../types';

const log = logger.child({ module: 'ResponseFieldsInterceptor' });

/**
 * Intercepts the response fields and logs the response and requested fields.
 * Logs the response and requested fields.
 *
 * @param data - The response data.
 * @param fields - The requested fields.
 * @returns The intercepted response data.
 */
export const responseFieldsInterceptor: any = (
  data: any,
  fields: AllFields,
) => {
  try {
    const resJson = JSON.parse(data);

    log.debug({ response: resJson, requestedFields: fields });
    log.info({ responseCount: resJson.length });

    return resJson;
  } catch (error) {
    log.error({ error: error });
  }
};
