import { AgeRating } from '../schema/ageRatings';

export const mapAgeRating = (rating) => {
  const mappedRating = {
    checksum: rating.checksum,
    igdbId: rating.id,
    organization: rating.organization,
    ratingCategory: rating.rating_category,
    ratingContentDescriptions: rating.rating_content_descriptions,
    ratingCoverUrl: rating.rating_cover_url,
    synopsis: rating.synopsis,
    updatedAt: new Date(),
  } satisfies AgeRating;
  return mappedRating;
};
