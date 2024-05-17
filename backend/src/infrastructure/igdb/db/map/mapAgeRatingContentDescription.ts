import {
  AgeRatingCDCategoryPGEnum,
  AgeRatingContentDescriptions,
} from '../schema/ageRatingContentDescriptions';

export const mapAgeRatingContentDescription = (ageRatingCD) => {
  const mappedAgeRatingCD = {
    category: ageRatingCD.category
      ? AgeRatingCDCategoryPGEnum.enumValues[ageRatingCD.category]
      : null,
    checksum: ageRatingCD.checksum,
    description: ageRatingCD.description,
    igdbId: ageRatingCD.id,
    updatedAt: new Date(),
  } satisfies AgeRatingContentDescriptions;
  return mappedAgeRatingCD;
};
