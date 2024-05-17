import { AlternativeNames } from '../schema/alternativeNames';

export const mapAlternativeName = (altName) => {
  const mappedAltName = {
    checksum: altName.checksum,
    comment: altName.comment,
    game: altName.game,
    igdbId: altName.id,
    name: altName.name,
    updatedAt: new Date(),
  } satisfies AlternativeNames;
  return mappedAltName;
};
