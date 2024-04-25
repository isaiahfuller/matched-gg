import { AgeRatingCategoryEnum } from '../../facade/subsystems/enums/AgeRatingCategoryEnum';
import {
  AgeRating,
  AgeRatingCategoryPGEnum,
  RatingPGEnum,
} from '../schema/ageRatings';

export const mapAgeRating = (rating) => {
  const mappedRating = {
    category:
      rating.category === undefined
        ? null
        : AgeRatingCategoryPGEnum.enumValues[rating.category],
    checksum: rating.checksum,
    rating:
      rating.rating === undefined
        ? null
        : RatingPGEnum.enumValues[rating.rating],
    ratingCoverUrl: rating.rating_cover_url,
    synopsis: rating.synopsis,
  } satisfies AgeRating;
  return mappedRating;
};
