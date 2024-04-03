import { GameFields, ExpandedGameFields } from '../enums/fields/GameFields';
import { logger } from 'src/util/logger';

const log = logger.child({ module: 'RequestFieldsInterceptor' });

/**
 * Intercepts the request fields and adds them to the data object.
 * @param data - The data object to be modified.
 * @param fields - The fields to be added to the data object. Only adds the fields if they are not already present.
 * @returns The modified data object with the added fields.
 */
export const requestFieldsInterceptor = (
  data: any,
  fields: GameFields | GameFields[] | ExpandedGameFields | ExpandedGameFields[],
  totalGameCount?: number,
) => {
  const gameRequest = JSON.stringify(data);
  const isMultipleFields = Array.isArray(fields);

  const offsetMatch = gameRequest.match(/offset (\d+);/);
  const offset = offsetMatch ? Number(offsetMatch[1]) : 0;

  const progress = totalGameCount
    ? ((Number(offset) / totalGameCount) * 100).toFixed(2) + '%'
    : '0%';

  log.debug({
    request: gameRequest,
    requestedFields: fields,
    isMultipleFields,
  });

  log.info({
    requestedFieldsCount: isMultipleFields ? fields.length : 1,
    offset: offset ? offset[1] : 0,
    progress,
  });

  if (gameRequest.includes('fields')) {
    return data;
  }

  if (isMultipleFields) {
    return `fields ${fields.join(',')};${data}`;
  }

  return `fields ${fields};${data}`;
};
