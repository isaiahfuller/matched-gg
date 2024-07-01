import { GameEngines } from '../schema/gameEngines';

export const mapGameEngine = (engine) => {
  const mapped = {
    checksum: engine.checksum,
    igdbCreatedAt: engine.created_at
      ? new Date(engine.created_at * 1000)
      : null,
    igdbId: engine.id,
    name: engine.name || 'NO_NAME',
    slug: engine.slug,
    updatedAt: new Date(),
    url: engine.url,
  } satisfies GameEngines;
  return mapped;
};
