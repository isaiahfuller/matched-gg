import { NetworkTypes } from '../schema/networkTypes';

export const mapNetworkType = (type) => {
  const mapped = {
    checksum: type.checksum,
    eventNetworks: type.event_networks,
    igdbCreatedAt: type.created_at ? new Date(type.created_at * 1000) : null,
    igdbId: type.id,
    igdbUpdatedAt: type.updated_at ? new Date(type.updated_at * 1000) : null,
    name: type.name || 'NO_NAME',
    updatedAt: new Date(),
  } satisfies NetworkTypes;
  return mapped;
};
