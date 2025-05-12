import { GameStatuses } from '../schema/gameStatus';

export const mapGameStatus = (data) => {
  const mapped = {
    checksum: data.checksum,
    igdbCreatedAt: data.created_at ? new Date(data.created_at * 1000) : null,
    igdbId: data.id,
    igdbUpdatedAt: data.updated_at ? new Date(data.updated_at * 1000) : null,
    status: data.status,
    updatedAt: new Date(),
  } satisfies GameStatuses;
  return mapped;
};
