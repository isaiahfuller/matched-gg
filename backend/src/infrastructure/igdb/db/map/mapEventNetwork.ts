import { EventNetworks } from '../schema/eventNetwork';

export const mapEventNetwork = (network) => {
  const mapped = {
    checksum: network.checksum,
    event: network.event,
    igdbCreatedAt: network.created_at
      ? new Date(network.created_at * 1000)
      : null,
    igdbId: network.id,
    igdbUpdatedAt: network.updated_at
      ? new Date(network.updated_at * 1000)
      : null,
    networkType: network.network_type,
    updatedAt: new Date(),
    url: network.url,
  } satisfies EventNetworks;
  return mapped;
};
