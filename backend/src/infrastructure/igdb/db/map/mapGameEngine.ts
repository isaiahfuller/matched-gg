import { GameEngines } from '../schema/gameEngines';

export const mapGameEngine = (engine) => {
  const mapped = {
    checksum: engine.checksum,
    igdbCreatedAt: engine.created_at
      ? new Date(engine.created_at * 1000)
      : null,
    igdbId: engine.id,
    igdbUpdatedAt: engine.updated_at
      ? new Date(engine.updated_at * 1000)
      : null,
    name: engine.name || 'NO_NAME',
    slug: engine.slug,
    updatedAt: new Date(),
    url: engine.url,
  } satisfies GameEngines;
  return mapped;
};
