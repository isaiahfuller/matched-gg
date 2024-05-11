import { AlternativeNames } from '../schema/alternativeNames';

export const mapAlternativeName = (altName) => {
  const mappedAltName = {
    igdbId: altName.id,
    checksum: altName.checksum,
    comment: altName.comment,
    game: altName.game,
    name: altName.name,
    updatedAt: new Date(),
  } satisfies AlternativeNames;
  return mappedAltName;
};
