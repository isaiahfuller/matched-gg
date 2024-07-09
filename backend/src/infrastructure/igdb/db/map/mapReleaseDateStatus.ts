import { ReleaseDateStatuses } from '../schema/releaseDateStatuses';

export const mapReleaseDateStatus = (status) => {
  const mapped = {
    checksum: status.checksum,
    igdbCreatedAt: status.created_at
      ? new Date(status.created_at * 1000)
      : null,
    igdbId: status.id,
    igdbUpdatedAt: status.updated_at
      ? new Date(status.updated_at * 1000)
      : null,
    name: status.name || 'NO_NAME',
    updatedAt: new Date(),
  } satisfies ReleaseDateStatuses;
  return mapped;
};
