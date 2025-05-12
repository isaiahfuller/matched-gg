import { AgeRatingContentDescriptionsv2 } from '../schema/ageRatingContentDescriptionsv2';

export const mapAgeRatingContentDescriptionv2 = (ageRatingCD) => {
  const mappedAgeRatingCDv2 = {
    checksum: ageRatingCD.checksum,
    description: ageRatingCD.description,
    igdbId: ageRatingCD.id,
    organization: ageRatingCD.organization,
    updatedAt: new Date(),
  } satisfies AgeRatingContentDescriptionsv2;
  return mappedAgeRatingCDv2;
};
