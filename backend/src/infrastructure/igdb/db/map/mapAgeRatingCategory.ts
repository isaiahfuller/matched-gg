import { AgeRatingCategories } from '../schema/ageRatingCategories';

export const mapAgeRatingOrganization = (data) => {
  const mapped = {
    checksum: data.checksum,
    igdbCreatedAt: data.created_at ? new Date(data.created_at * 1000) : null,
    igdbId: data.id,
    igdbUpdatedAt: data.updated_at ? new Date(data.updated_at * 1000) : null,
    organization: data.organization,
    rating: data.rating,
    updatedAt: new Date(),
  } satisfies AgeRatingCategories;
  return mapped;
};
