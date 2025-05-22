import validateTimestamp from '@util/validateTimestamp';

import { DateFormats } from '../schema/dateFormats';

export const mapDateFormat = (data) => {
  const mapped = {
    checksum: data.checksum,
    format: data.format,
    igdbCreatedAt: validateTimestamp(data.created_at),
    igdbId: data.id,
    igdbUpdatedAt: validateTimestamp(data.updated_at),
    updatedAt: new Date(),
  } satisfies DateFormats;
  return mapped;
};
