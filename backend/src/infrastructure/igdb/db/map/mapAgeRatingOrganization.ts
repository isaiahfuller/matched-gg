import { AgeRatingOrgnizations } from '../schema/ageRatingOrganizations';

export const mapAgeRatingOrganization = (data) => {
  const mapped = {
    checksum: data.checksum,
    igdbCreatedAt: data.created_at ? new Date(data.created_at * 1000) : null,
    igdbId: data.id,
    igdbUpdatedAt: data.updated_at ? new Date(data.updated_at * 1000) : null,
    name: data.name || 'NO_NAME',
    updatedAt: new Date(),
  } satisfies AgeRatingOrgnizations;
  return mapped;
};
