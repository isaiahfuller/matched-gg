import {
  AgeRatingCDCategoryPGEnum,
  AgeRatingContentDescriptions,
} from '../schema/ageRatingContentDescriptions';

export const mapAgeRatingContentDescription = (ageRatingCD) => {
  const mappedAgeRatingCD = {
    igdbId: ageRatingCD.id,
    category: ageRatingCD.category
      ? AgeRatingCDCategoryPGEnum.enumValues[ageRatingCD.category]
      : null,
    description: ageRatingCD.description,
    checksum: ageRatingCD.checksum,
    updatedAt: new Date(),
  } satisfies AgeRatingContentDescriptions;
  return mappedAgeRatingCD;
};
